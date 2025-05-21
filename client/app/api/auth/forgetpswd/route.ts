import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'; // Removed unused import

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
    } catch (dbError: unknown) {
        console.error("Database error:", dbError);
        
        if (dbError instanceof PrismaClientKnownRequestError) {
            // Handle specific Prisma errors
            console.error("Prisma code:", dbError.code);
        }
        
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
    } catch (updateError: unknown) {
        console.error("Update error:", updateError);
        
        // Still handle PrismaClientKnownRequestError with type narrowing
        if (updateError instanceof PrismaClientKnownRequestError) {
            console.error("Prisma error code:", updateError.code);
        }
        
        return NextResponse.json({ error: "Error updating password" }, { status: 500 });
    }
} catch (error: unknown) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
}

};