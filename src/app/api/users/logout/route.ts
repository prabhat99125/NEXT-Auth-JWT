import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function GET() {
    const response = NextResponse.json({ message: "Logout successful", statusCode: 200 });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
}