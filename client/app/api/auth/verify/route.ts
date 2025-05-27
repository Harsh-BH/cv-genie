import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt, { TokenExpiredError } from "jsonwebtoken";

// Define a type for JWT payload
interface JwtPayload {
  userId: number;
  [key: string]: unknown;
}

export async function GET(req: NextRequest) {
  try {
    // Get auth_token cookie
    const authToken = req.cookies.get('auth_token')?.value;
    
    if (!authToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify token
    let userId;
    try {
      const decodedToken = jwt.verify(
        authToken, 
        process.env.JWT_SECRET || "fallback-secret-not-for-production"
      ) as JwtPayload;
      
      userId = decodedToken.userId;
    } catch (jwtError: unknown) {
      // Check for specific JWT error types
      if (jwtError instanceof TokenExpiredError) {
        return NextResponse.json({ error: "Token expired" }, { status: 401 });
      }
      
      // Log the error but don't expose details to client
      console.error("JWT verification error:", jwtError);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    console.log("Verifying auth token");
    
    if (!userId) {
      console.log("Invalid token payload: missing userId");
      return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
        }
      });
      
      if (!user) {
        console.log(`User not found with ID: ${userId}`);
        return NextResponse.json({ error: "User not found" }, { status: 401 });
      }
      
      // Return success response
      return NextResponse.json({
        authenticated: true,
        user: {
          ...user,
          profileImage: user.avatar
        }
      });
    } catch (dbError) {
      console.error("Database error during user lookup:", dbError);
      throw dbError; // Re-throw to be caught by the outer catch block
    }
  } catch (error: unknown) {
    // More detailed error logging
    console.error("Verification error:", error);
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: process.env.NODE_ENV === 'development' ? 
        (error instanceof Error ? error.message : String(error)) : 
        undefined
    }, { status: 500 });
  }
}