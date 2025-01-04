import mongoose from "mongoose";

const blocklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 * 24,
    }
});

const blackListToken = mongoose.model("BlackListToken", blocklistTokenSchema);

export default blackListToken;