import { getAddressCordinate } from "../services/maps.service.js";
import { validationResult } from "express-validator";
import { errorHandler } from "../middlewares/error.js";
import { getDistanceTimeService } from "../services/maps.service.js";
import { getAutoCompleteSuggestion } from "../services/maps.service.js";

export const getCoordinate = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await getAddressCordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: "Coordinate not found", error: error.message });
    }
};

export const getDisTime = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error: errors.array()});
        }

        const {origin, destination} = req.query;

        const originCoordinates = await getAddressCordinate(origin);
        const destinationCoordinates = await getAddressCordinate(destination);

        const distanceTime = await getDistanceTimeService(originCoordinates, destinationCoordinates);

        return res.status(200).json(distanceTime);
    }catch(error){
        next(error);
    }
};


export const getSuggestion = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error: errors.array()});
        }

        const {input} = req.query;
        const suggestion = await getAutoCompleteSuggestion(input);
        res.status(200).json(suggestion);
    }catch(error){

    }
}