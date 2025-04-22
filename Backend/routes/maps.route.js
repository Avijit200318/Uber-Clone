import express from "express";
import { authCaptainMiddleware } from "../middlewares/auth.middleware.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";
import { getCoordinate } from "../controllers/maps.controller.js";
import { getDisTime } from "../controllers/maps.controller.js";
import { getSuggestion } from "../controllers/maps.controller.js";
import { errorHandler } from "../middlewares/error.js";

import {query} from "express-validator";

const router = express.Router();

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


router.get("/get-coordinates",
    query('address').isString().isLength({ min: 3 }),
    authEitherMiddleware,
    getCoordinate
);

router.get("/get-distance-time",
    query('origin').isString().isLength({min: 3}),
    authEitherMiddleware,
    getDisTime
);

router.get("/get-suggestion",
    query('input').isString().isLength({min: 3}),
    authEitherMiddleware,
    getSuggestion
)

export default router;