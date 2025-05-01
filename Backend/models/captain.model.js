import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First name should be greater than 3 charecter"],
        },
        lastName: {
            type: String,
            minlength: [3, "Last name should be greater than 3 charecter"],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please Enter a Valid Email"],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password length must be greater than 6"],
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color name should be greater than 3 charecter"],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate name should be greater than 3 charecter"],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"],
        },
        vehicleType: {
            type: String,
            enum: ["car", "bike", "auto"],
            required: true,
        },
        location: {
            lat: {
                type: Number,
            },
            lng: {
                type: Number,
            },
        }
    },
    userType: {
        type: String,
        default: "captain",
    }
});


captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRECT, { expiresIn: "24h" });
    return token;
};

captainSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password, this.password);
};

captainSchema.statics.hashPassword = async (password) => {
    return await bcryptjs.hash(password, 10);
}

const Captainmodel = mongoose.model("Captain", captainSchema);

export default Captainmodel;