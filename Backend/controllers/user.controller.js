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
}