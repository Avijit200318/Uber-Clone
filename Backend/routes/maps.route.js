import express from "express";
import { authCaptainMiddleware } from "../middlewares/auth.middleware.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";
import { getCoordinate } from "../controllers/maps.controller.js";
import { getDisTime } from "../controllers/maps.controller.js";
import { getSuggestion } from "../controllers/maps.controller.js";

import {query} from "express-validator";

const router = express.Router();

const authEitherMiddleware = (req, res, next) => {
    authCaptainMiddleware(req, res, (err) => {
        if (!err) return next();
        authUserMiddleware(req, res, (err) => {
            if (!err) return next();
            next(err || new Error("Unauthorized"));
        });
    });
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