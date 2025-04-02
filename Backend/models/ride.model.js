import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
    },
    pickup: {
        type: String,
        requird: true,
    },
    destination: {
        type: String,
        requird: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongooing', 'completed', 'cancelled'],
        default: 'pending',
    },

    duration: {
        type: Number,
    },//in second
    distance: {
        type: Number,
    }, //in meaters
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    }
});

const rideModel = mongoose.model("Ride", rideSchema);
export default rideModel;