import userModel from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
// this validationResult help us to validate the data that is send to this route is correct or not and any further action.

import blackListTokenModel from "../models/blocklistToken.model.js";
import { errorHandler } from "../middlewares/error.js";
import captainModel from "../models/captain.model.js";


export const signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(errorHandler(400, errors.array()));
    }

    const {fullName, email, password} = req.body;

    const isCaptainAlreadyExist = await userModel.findOne({email});

    if(isCaptainAlreadyExist){
        return next(errorHandler(400, "User already exist"));
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashPassword,
        userType: 'user',
    });

    const token = user.generateAuthToken();

    const {password: pass, ...rest} = user._doc;
    res.status(201).json({token, user: rest});
};

export const login = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(errorHandler(400, errors.array()));
    }

    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email}).select('+password');
        
        // here the +password help us to get the password from the mongodb. by default we set the mongodb in a way so that password did not came through any request.
    
        if(!user){
            return next(errorHandler(401, "Invalid username or password"));
        }
    
        const isMatch = await user.comparePassword(password);
    
        if(!isMatch) return next(errorHandler(401, "Invalid password"));
    
        const token = await user.generateAuthToken();
    
        const {password: pass, ...rest } = user._doc;
        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        res.status(200).json({token, user: rest});
    }catch(error){
        next(error);
    }
};

export const getUserProfile = async (req, res, next) => {
    return res.status(200).json(req.user);
};

export const logOut = async (req, res, next) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await blackListTokenModel.create({ token });

    return res.status(200).json({message: "Logged Out Successfully"});
};

export const userOrCaptainInfo = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(errorHandler(400, errors.array()));
    }
    
    const {userId} = req.query;
    
    try{
        let user = await userModel.findById(userId);
        if(!user){
            console.log("user is not normal user");
            user = await captainModel.findById(userId);
            if(!user){
                console.log("not captain and user");
                return next(errorHandler(404, "Invalid User Id"));
            }
        }

        res.status(200).json(user);
    }catch(error){
        next(error);
    }
}