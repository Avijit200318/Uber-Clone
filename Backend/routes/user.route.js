import express from "express";
import { body } from "express-validator";
// this package help us to validate data that is comming from the frontend. we have to write it after the /signup like route using [].
import { signUp, login, getUserProfile, logOut } from "../controllers/user.controller.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/signUp', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min: 3}).withMessage('First name should be greater than 3 charecter'),
    body('password').isLength({min: 6}).withMessage('Password length must be greater than 6'),
],
    signUp
);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Message'),
    body('password').isLength({min: 6}).withMessage('Password must be greater thatn 6'),
],
    login
);

router.get("/profile", authUserMiddleware, getUserProfile);
router.get("/logout", authUserMiddleware, logOut);

export default router;