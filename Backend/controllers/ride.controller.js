import { createRide } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { getDistanceTimeService } from "../services/maps.service.js";

export const createRideController = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    const {pickup, destination, vechicleType} = req.body;

    try{
        const ride = await createRide({user: req.user._id, pickup, destination, vechicleType});
        return res.status(201).json(ride);
    }catch(error){
        next(error);
    }
}

export const calculateGetFare = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {pickup, destination} = req.body;
    
    console.log(pickup);
    const pickupCordinate = {ltd: pickup.ltd, lng: pickup.lng};
    const destinationCordinate = {ltd: destination.ltd, lng: destination.lng};

    try{
        const distanceTime = await getDistanceTimeService(pickupCordinate, destinationCordinate);
        
            // base fare
            const baseFare = {
                auto: 30,
                car: 50,
                bike: 20
            };
        
            const perKmRate = {
                auto: 10,
                car: 15,
                bike: 8
            };
        
            const perMinuteRate = {
                auto: 2,
                car: 3,
                bike: 1.5
            };
        
            const fare = {
                auto: Math.round(baseFare.auto + (distanceTime.distance * perKmRate.auto) + (distanceTime.duration * perMinuteRate.auto)),
                car: Math.round(baseFare.car + (distanceTime.distance * perKmRate.car) + (distanceTime.duration * perMinuteRate.car)),
                bike: Math.round(baseFare.bike + (distanceTime.distance * perKmRate.bike) + (distanceTime.duration * perMinuteRate.bike))
            };
            
        return res.status(200).json(fare);
    }catch(error){
        next(error);
    }
}