import { createRide } from "../services/ride.service.js";
import { validationResult } from "express-validator";


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