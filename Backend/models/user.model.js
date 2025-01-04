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

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRECT);
    return token;
    // this. is did't work for => function. it only work for normal javascript function.
};

userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compareSync(password, this.password);
}

userSchema.statics.hashPassword = async (password) => {
    return await bcryptjs.hash(password, 10);
};


const User = mongoose.model("User", userSchema);

export default User;