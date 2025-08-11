import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from "./db/db.js";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.route.js";
import captainRoutes from "./routes/captain.route.js";
import mapsRoutes from "./routes/maps.route.js";
import rideRoutes from "./routes/ride.route.js";

import path from "path"

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

connectToDB();

// deployment code
const __dirname = path.resolve();

// add new created routes

app.use("/api/users", userRoutes);
app.use("/api/captains", captainRoutes);
app.use("/api/maps", mapsRoutes);
app.use("/api/ride", rideRoutes);

// deployment code
app.use(express.static(path.join(__dirname, '/Frontend/dist')));
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

export default app;