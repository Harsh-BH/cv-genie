import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

// Define a type for the JWT token payload
interface JwtPayload {
  userId: number;
  email?: string;
  // Change any to unknown for additional properties
  [key: string]: unknown;
}

export async function GET(req: NextRequest) {
  try {
    // Get the token from cookies
    const token = req.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    
    // Verify and decode the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret-not-for-production") as JwtPayload;
    } catch (jwtError) { // Fixed: Using the error variable
      console.error("JWT verification error:", jwtError);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    
    // Get user from database - Fixed: No more any type
    const userId = decoded.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        avatar: true,
        // Add other fields you want to return, excluding sensitive ones
      }
    });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json({ user: user, status: 200 });
  } catch (error: unknown) { // Fixed: Changed any to unknown
    console.error("Auth check error:", error);
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: process.env.NODE_ENV === 'development' ? 
        (error instanceof Error ? error.message : String(error)) : 
        undefined
    }, { status: 500 });
  }
}