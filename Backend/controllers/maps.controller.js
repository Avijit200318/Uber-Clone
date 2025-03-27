import { getAddressCordinate } from "../services/maps.service.js";
import { validationResult } from "express-validator";

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
}

