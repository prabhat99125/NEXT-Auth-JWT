import { connect } from "@/dbConfig/dbConfig";
import user from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(req:NextRequest) {
    try {
        const { email, password } = await req.json();

        const users = await user.findOne({ email });
        if (!users) {
            return NextResponse.json({ status: "error", message: "User not found", statusCode: 404 });
        }
        console.log(users);

        const isMatch = await bcryptjs.compare(password, users.password);
        if (!isMatch) {
            return NextResponse.json({ status: "error", message: "Invalid credentials", statusCode: 401 });
        }
        const tokenData = {
            id: users._id,
            email: users.email,
        };
        const token = jwt.sign(tokenData, process.env.token!, { expiresIn: "1d" },);
        const userResponse = NextResponse.json({ status: "success", message: "User logged in", statusCode: 200 });
        userResponse.cookies.set("token", token, { httpOnly: true, });
        return userResponse;


    } catch (error: any) {
        console.log(error);
        
        return NextResponse.json({ status: "error", message: error.message, statusCode: 500 });
    }

};