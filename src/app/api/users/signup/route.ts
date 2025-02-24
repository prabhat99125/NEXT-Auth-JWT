import { connect } from "@/dbConfig/dbConfig";
import user from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailes";
connect();

export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json();
        
        const users = await user.findOne({ email });
        if (users) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new user({
            username, email, password: hashedPassword
        });
        const saveUser = await newUser.save();
        console.log(saveUser);
        const msg = await sendMail({ email, emailType: "VERIFY", userId: saveUser._id });
        console.log(msg);
        return NextResponse.json({ message: "User created successfully", success: true, saveUser }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}