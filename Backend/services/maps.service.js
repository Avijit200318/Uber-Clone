import axios from "axios";
import { errorHandler } from "../middlewares/error.js";
import captainModel from "../models/captain.model.js";

export const getAddressCordinate = async (address) => {
    const query = `${address}, Kolkata, India`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=IN`;


    try {
        const response = await axios.get(url);

        if (response.data.length > 0) {
            const location = response.data[0];
            return {
                ltd: parseFloat(location.lat),
                lng: parseFloat(location.lon)
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        throw new Error(`Error fetching distance and time: ${error.message}`);
    }
};

export const getDistanceTimeService = async (origin, destination) => {
    if (!origin || !destination) {
        return errorHandler(401, "Origin and destination are required");
    }

    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.ORS_API_KEY}&start=${origin.lng},${origin.ltd}&end=${destination.lng},${destination.ltd}`;

    try {
        const response = await axios.get(url);
        // console.log(url)
        if (response.data.features && response.data.features.length > 0) {
            const segment = response.data.features[0].properties.segments[0];

            return {
                distance: segment.distance / 1000, // Convert meters to kilometers
                duration: segment.duration / 60 // Convert seconds to minutes
            };
        } else {
            return errorHandler(401, "No route found");
        }
    } catch (error) {
        console.error("Error fetching distance and time:", error.message);
        throw new Error(`Error fetching distance and time: ${error.message}`);
    }
};

export const getAutoCompleteSuggestion = async (input) => {
    consle.log("hit suggestion route");
    if(!input){
        return errorHandler(400, "query is required");
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&countrycodes=IN&limit=5`;

    try {
        const response = await axios.get(url);

        if (response.data.length > 0) {
            return response.data.map((place) => ({
                name: place.display_name,
                ltd: parseFloat(place.lat),
                lng: parseFloat(place.lon),
            }));
        } else {
            console.log("no output");
            return res.json([]);
        }
    } catch (error) {
        throw new Error(`Error fetching autocomplete suggestions: ${error.message}`);
    }
};

export const getCaptainsInTheRadius = async (ltd, lng, radius) => {
    // radius in KM
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius/3963.2]
            }
        }
    });

    return captains;
}