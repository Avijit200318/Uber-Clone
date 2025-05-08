import rideModel from "../models/ride.model.js";
import { getDistanceTimeService, getAddressCordinate } from "./maps.service.js";
import { errorHandler } from "../middlewares/error.js";
import crypto from "crypto";
import { sendMessageToSocketId } from "../socket.js";


export const getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        return errorHandler(400, "Pickup and destination are required");
    }

    const pickupCordinate = { ltd: pickup.ltd, lng: pickup.lng };
    const destinationCordinate = { ltd: destination.ltd, lng: destination.lng };

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


export const createRide = async ({ user, pickup, destination, vehicleType, pickupLocation, distance, duration }) => {
    if (!user || !pickup || !destination || !vehicleType || !pickupLocation || !distance || !duration) {
        return errorHandler(400, "All fields are required");
    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user, pickup: pickup.name, destination: destination.name, fare: fare[vehicleType], otp: getOtp(6), pickupLocation, distance, duration
    });

    return ride;
}

export const getOtp = (num) => {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}

export const getConfirmRide = async (rideId, captainId) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    },{
            status: 'accepted',
            captain: captainId
        }
    )

    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
};

export const rideStartedService = async (rideId, otp) => {
    if(!rideId || !otp){
        throw new Error('Ride id and Otp are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

    if(ride.status !== 'accepted'){
        return errorHandler(500, 'Ride not accepted');
    }

    if(ride.otp != otp){
        return errorHandler(500, 'Invalid Otp');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    })

    return ride;
}

export const endRideService = async (rideId, captain) => {
    if(!rideId) return errorHandler(404, "Ride id is required");

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        return errorHandler(404, "Ride not found");
    }

    if(ride.status !== 'ongoing'){
        return errorHandler(400, "Ride not ongoing");
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: "complted"
    });

    return ride;
}