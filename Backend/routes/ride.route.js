import express from "express";
import {body} from "express-validator";
import { createRideController } from "../controllers/ride.controller.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/create",
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min: 3}).withMessage('Invalid destination address'),
    body('vechicleType').isString().isIn(['auto', 'car', 'bike']).withMessage('Invalid vechile type'),
    authUserMiddleware,
    createRideController
)

export default router;