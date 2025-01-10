import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from "./db/db.js";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.route.js";
import captainRoutes from "./routes/captain.route.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

connectToDB();

app.get('/', (req, res) => {
    res.send("hello world");
})

// add new created routes

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

export default app;