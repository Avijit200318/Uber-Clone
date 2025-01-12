import express from "express";
import { body } from "express-validator";

import { signUpCaptain, captainLogin, getCaptainProfile, captainLogout } from "../controllers/captain.controller.js";
import { authCaptainMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/signUp', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min: 3}).withMessage('First name should be greater than 3 charecter'),
    body('password').isLength({min: 6}).withMessage('Password length must be greater than 6'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color name should be greater than 3 charecter'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Plate name should be greater than 3 charecter'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Invalid Vehicle Type'),
],
    signUpCaptain
);

router.post("/login", [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password length must be greater than 6'),
], captainLogin);

router.get("/profile", authCaptainMiddleware, getCaptainProfile);

router.get("/logout", authCaptainMiddleware, captainLogout);

export default router;