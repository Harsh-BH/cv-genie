import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    try {
        // 1️⃣ Extract and verify auth token
        const authToken = req.cookies.get("auth_token")?.value;
        if (!authToken) {
        return NextResponse.json({ error: "Authentication required" }, { status: 401 });
        }
    
        let userId: number;
        try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET!) as { userId: number };
        userId = decoded.userId;
        } catch (err: any) {
        const message =
            err.name === "TokenExpiredError"
            ? "Token expired"
            : "Invalid token";
        return NextResponse.json({ error: message }, { status: 401 });
        }
    
        // 2️⃣ Fetch resumes from DB using Prisma
        const resumes = await prisma.resume.findMany({
        where: { userId },
        });
    
        return NextResponse.json({resumes, status: 200 });
    } catch (error) {
        console.error("Error fetching resumes:", error);
        return NextResponse.json({error: "Internal server error" , status: 500 });
    }
}