import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            require: true,
            minlength: [3, "First name must be at 3 charecters long"],
        },
        lastName: {
            type: String,
            minlength: [3, "Last name must be at 3 charecters long"],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at 5 charecter long"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    }
})

userSchema.method.generateAuthToken = () => {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRECT);
    return token;
}

userSchema.method.comparePassword = async () => {
    return await bcryptjs.compareSync(password, this.password);
}

userSchema.method.hashPassword = async () => {
    return await bcryptjs.hashSync(password, 10);
}


const User = mongoose.model("User", userSchema);

export default User;