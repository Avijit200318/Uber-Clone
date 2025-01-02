import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from "./db/db.js";

dotenv.config();

const app = express();

app.use(cors());

connectToDB();

app.get('/', (req, res) => {
    res.send("hello world");
})

export default app;