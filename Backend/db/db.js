import mongoose from "mongoose";

export const connectToDB = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("mongodb is connected");
    }).catch((error) => {
        console.log(error);
    })
}