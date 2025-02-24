import { connect } from "@/dbConfig/dbConfig";
import user from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();

        const users = await user.findOne({ verifyToken: token, verifyExpire: { $gt: Date.now() } });
        if (!users) {
            return NextResponse.json({ message: "Invalid token" }, { status: 400 });
        }
        console.log(users);
        users.isverify = true;
        users.verifyToken = undefined;
        users.verifyExpire = undefined;
        await users.save();
        return NextResponse.json({ message: "Email verified successfully", success: true }, { status: 200 });

    } catch {
        return NextResponse.json({ message: "email verify error" }, { status: 500 });

    }
}