import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
import blackListToken from "../models/blocklistToken.model.js";
import { errorHandler } from "../middlewares/error.js";

export const signUpCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // return res.status(400).json({errors: errors.array()});
        return next(errorHandler(400, errors.array()))
    }

    const {fullName, email, password, vehicle} = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});

    if(isCaptainAlreadyExist){
        return next(errorHandler(400, "User already exist through this email"));
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
        userType: 'captain',
    });

    const token = captain.generateAuthToken();

    const {password: pass, ...rest} = captain._doc;
    res.status(201).json({token, captain: rest});
};

export const captainLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(errorHandler(400, errors.array()));
    }

    const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select("+password");
    
    if(!captain){
        return next(errorHandler(400, "Invalid email or password"));
    }

    const isPasswordMatched = await captain.comparePassword(password);
    if(!isPasswordMatched){
        return next(errorHandler(400, "Invalid Password"));
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    const {password: pass, ...rest} = captain._doc;
    res.status(200).json({token, captain: rest});
};

export const getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
};

export const captainLogout = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blackListToken.create({token});

    res.clearCookie("token");

    res.status(200).json({message: "Logout successfully"});
}