import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
import blackListToken from "../models/blocklistToken.model.js";

export const signUpCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullName, email, password, vehicle} = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});

    if(isCaptainAlreadyExist){
        return res.status(400).json({message: "Captain already exist with this email"});
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
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({token, captain});
};

export const captainLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select("+password");
    
    if(!captain){
        return res.status(400).json({message: "Invalid email or password"});
    }

    const isPasswordMatched = await captain.comparePassword(password);
    if(!isPasswordMatched){
        return res.status(400).json({message: "Invalid password"});
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token);

    res.status(200).json({token, captain});
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