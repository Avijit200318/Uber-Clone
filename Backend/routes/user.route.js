import express from "express";
import { body } from "express-validator";
// this package help us to validate data that is comming from the frontend. we have to write it after the /signup like route using [].
import { signUp, login, getUserProfile, logOut, userOrCaptainInfo } from "../controllers/user.controller.js";
import { authCaptainMiddleware, authUserMiddleware } from "../middlewares/auth.middleware.js";
import {query} from "express-validator";
import { errorHandler } from "../middlewares/error.js";

const authEitherMiddleware = async (req, res, next) => {
    try {
        await authCaptainMiddleware(req, res, (err) => {
            if (!err) return next(); // If captain authentication is successful, proceed.

            // If captain auth fails, try user auth.
            authUserMiddleware(req, res, (err) => {
                if (!err) return next(); // If user authentication is successful, proceed.

                // If both fail, return Unauthorized error.
                return next(errorHandler(401, "Unauthorized"));
            });
        });
    } catch (error) {
        return next(errorHandler(401, "Unauthorized"));
    }
};

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

router.get("/userInfo",
    query('userId').isString().isLength({min: 5}),
    authEitherMiddleware,
    userOrCaptainInfo
);

export default router;