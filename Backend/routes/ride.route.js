import express from "express";
import {body, query} from "express-validator";
import { calculateGetFare, createRideController, confirmRide, startRide,endRide } from "../controllers/ride.controller.js";
import { authCaptainMiddleware, authUserMiddleware } from "../middlewares/auth.middleware.js";

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

router.post("/confirm", 
    authCaptainMiddleware,
    body('rideId').isMongoId().withMessage('Invalid ride Id'),
    confirmRide
)

router.get("/start-ride",
    authCaptainMiddleware,
    query('rideId').isMongoId().withMessage('Invalid ride Id'),
    query('otp').isString().withMessage('Invalid Otp'),
    startRide
)

router.post("/end-ride",
    authCaptainMiddleware,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    endRide
)

export default router;