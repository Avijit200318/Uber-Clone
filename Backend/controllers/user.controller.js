import userModel from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
// this validationResult help us to validate the data that is send to this route is correct or not and any further action.


export const signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullName, email, password} = req.body;

    const hashPassword = await userModel.hashPassword(password);

    const user = await createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token, user});
};

export const login = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');
    
    // here the +password help us to get the password from the mongodb. by default we set the mongodb in a way so that password did not came through any request.

    if(!user){
        return res.status(401).json({message: "Invalid Email or Password"});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch) return res.status(401).json({message: "Wrong Credentials"});

    const token = await user.generateAuthToken();

    res.status(200).json({token, user});
};

export const getUserProfile = async (req, res, next) => {
       
}