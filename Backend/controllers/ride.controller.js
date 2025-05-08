import { createRide, getConfirmRide, rideStartedService } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { getDistanceTimeService } from "../services/maps.service.js";
import { getFare } from "../services/ride.service.js";
import {getCaptainsInTheRadius} from "../services/maps.service.js";
import {sendMessageToSocketId} from "../socket.js";
import rideModel from "../models/ride.model.js";
import { errorHandler } from "../middlewares/error.js";

export const createRideController = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { pickup, destination, vehicleType, pickupLocation } = req.body;
    
    try {
        const distanceAndTime = await getDistanceTimeService(pickup, destination);

        const ride = await createRide({ user: req.user._id, pickup, destination, vehicleType, pickupLocation, distance: Math.round(distanceAndTime.distance), duration: Math.round(distanceAndTime.duration)});

        const captainsInRadius = await getCaptainsInTheRadius(pickupLocation.ltd, pickupLocation.lng, 2);
        console.log("captains: ", captainsInRadius);

        const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user');

        captainsInRadius.map((captain) => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

        return res.status(201).json(rideWithUser);
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
};

export const confirmRide = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {rideId, captainId} = req.body;

    try{
        const ride = await getConfirmRide(rideId, captainId);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        return res.status(200).json(ride);
    }catch(error){
        next(error);
    }
}

export const startRide = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    const {rideId, otp} = req.query;

    try{
        const ride = await rideStartedService(rideId, otp);

        return res.status(200).json(ride);
    }catch(error){
        next(error.message);
    }
}