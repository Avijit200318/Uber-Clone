import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blocklistToken.model.js";
import captainModel from "../models/captain.model.js";

export const authUserMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token) return res.status(401).json({message: "Unauthorized"});

    // update the authUserMiddleware function to check if the token is blacklisted or not
    const isBlackListed = await blacklistTokenModel.findOne({token: token})
    if(isBlackListed) return res.status(401).json({message: "Unauthorized"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRECT);

        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();
    }catch(error){
        return res.status(401).json({message: "Unauthorized"});
    }
}

export const authCaptainMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token) return res.status(401).json({message: "Unauthorized"});

    // update the authCaptainMiddleware function to check if the token is blacklisted or not
    const isBlackListed = await blacklistTokenModel.findOne({token: token})
    if(isBlackListed) return res.status(401).json({message: "Unauthorized"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRECT);

        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;

        return next();
    }catch(error){
        return res.status(401).json({message: "Unauthorized"});
    }
}