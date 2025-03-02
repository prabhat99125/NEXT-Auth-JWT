// const mongoose = require('mongoose');
import mongoose from "mongoose";
export async function connect() {
    try {
        mongoose.connect(process.env.mongoose_url!)
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });
        connection.on("error", (error:Error) => {
            console.log("Error while connecting to MongoDB", error);
            process.exit();
        });
    } catch (error) {
        console.log("Error while connecting to MongoDB", error);

    }
}