import express from "express";
import {body, query} from "express-validator";
import { calculateGetFare, createRideController } from "../controllers/ride.controller.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/create",
    body('pickup').isObject().withMessage('Invalid pickup address'),
    body('destination').isObject().withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'bike']).withMessage('Invalid vechile type'),
    authUserMiddleware,
    createRideController
);

router.post("/get-fare",
    authUserMiddleware,
    body('pickup').isObject().withMessage('Invalid pickup'),
    body('destination').isObject().withMessage('Invalid destination'),
    calculateGetFare
)

export default router;