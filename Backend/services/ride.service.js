import rideModel from "../models/ride.model.js";
import {getDistanceTimeService, getAddressCordinate} from "./maps.service.js";
import { errorHandler } from "../middlewares/error.js";
import crypto from "crypto";


export const getFare = async (pickup, destination) => {
    if(!pickup || !destination){
        return errorHandler(400, "Pickup and destination are required");
    }

    const pickupCordinate = await getAddressCordinate(pickup);
    const destinationCordinate = await getAddressCordinate(destination);

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
    return fare;
};


export const createRide = async({user, pickup, destination, vechicleType}) => {
    if(!user || !pickup || !destination || !vechicleType){
        return errorHandler(400, "All fields are required");
    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user, pickup, destination, fare: fare[vechicleType], otp: getOtp(6)
    });

    return ride;
}

export const getOtp = (num) => {
    const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
    return otp;
}