import { connect } from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import User from "@/models/userModel"
import { NextRequest, NextResponse} from "next/server"
connect();

export async function POST(request:NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        const users = await User.findOne({_id: userID}).select("-password"); 
        return NextResponse.json({message: "User found  ", data: users, statusCode: 200});
    } catch  {
        return NextResponse.json({message: "User not found", statusCode: 404});
    }
}