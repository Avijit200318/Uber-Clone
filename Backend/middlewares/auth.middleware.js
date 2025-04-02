import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blocklistToken.model.js";
import captainModel from "../models/captain.model.js";
import {errorHandler} from "./error.js";

export const authUserMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token) return next(errorHandler(401, "Unauthorized"));

    // update the authUserMiddleware function to check if the token is blacklisted or not
    const isBlackListed = await blacklistTokenModel.findOne({token: token})
    if(isBlackListed) return next(errorHandler(401, "Unauthorized"));

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRECT);

        const user = await userModel.findById(decoded._id);
        req.user = user;

        return next();
    }catch(error){
        return next(errorHandler(401, "Unauthorized"));
    }
}

export const authCaptainMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token) return next(errorHandler(401, "Unauthorized"));

    // update the authCaptainMiddleware function to check if the token is blacklisted or not
    const isBlackListed = await blacklistTokenModel.findOne({token: token})
    if(isBlackListed) return next(errorHandler(401, "Unauthorized"));

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRECT);

        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;

        return next();
    }catch(error){
        return next(errorHandler(401, "Unauthorized"));
    }
}