import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isverify: {
        type: Boolean,
        default: false
    },
    isadmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgetPasswordExpire: Date,
    verifyToken: String,
    verifyExpire: Date
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
