import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
try {
    const body = await req.json();
    const { email, newPassword } = body;
    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    let user;
    try {
        user = await prisma.user.findUnique({
            where: { email }
        });
    } catch (dbError: any) {
        console.error("Database error:", dbError);
        return NextResponse.json({ error: "Database connection error" }, { status: 500 });
    }

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    try {
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword }
        });

        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
    } catch (updateError: any) {
        console.error("Update error:", updateError);
        return NextResponse.json({ error: "Error updating password" }, { status: 500 });
    }
} catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
}

};