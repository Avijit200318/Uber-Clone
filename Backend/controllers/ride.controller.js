import { createRide } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { getDistanceTimeService } from "../services/maps.service.js";
import { getFare } from "../services/ride.service.js";
import {getCaptainsInTheRadius} from "../services/maps.service.js";

export const createRideController = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { pickup, destination, vehicleType, pickupLocation } = req.body;
    
    try {
        const ride = await createRide({ user: req.user._id, pickup, destination, vehicleType, pickupLocation});

        const captainsInRadius = await getCaptainsInTheRadius(pickupLocation.ltd, pickupLocation.lng, 2);
        console.log("captains: ", captainsInRadius);

        return res.status(201).json(ride);
    } catch (error) {
        next(error);
    }
}

export const calculateGetFare = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.body;

    const fare = await getFare(pickup, destination);
    return res.status(200).json(fare);
}