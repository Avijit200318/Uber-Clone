import express from "express";
import { body } from "express-validator";
// this package help us to validate data that is comming from the frontend. we have to write it after the /signup like route using [].
import { signUp } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/signUp', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min: 3}).withMessage('First name should be greater than 3 charecter'),
    body('password').isLength({min: 6}).withMessage('Password length must be greater than 6'),
],
    signUp
)

export default router;