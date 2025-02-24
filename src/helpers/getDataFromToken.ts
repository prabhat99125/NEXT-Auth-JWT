import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (req: NextRequest) => {
    try {
        interface DecodedToken {
            id: string;
            // You can add more fields if your token contains other data
        }
        const token = req.cookies.get("token")?.value || "";
        const decoded = jwt.verify(token, process.env.token!) as DecodedToken;
        return decoded.id;
    } catch {
        throw new Error("Invalid token");
    }
};