import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

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
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET || "fallback-secret-not-for-production") as { userId: number };
      userId = decodedToken.userId;
    } catch (jwtError: any) {
      if (jwtError.name === "TokenExpiredError") {
        return NextResponse.json({ error: "Token expired" }, { status: 401 });
      }
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!userId) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
    }

    // Get user data with the correct field name (avatar instead of profileImage)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true, // Changed from profileImage to avatar
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Return user data with consistent field naming
    return NextResponse.json({
      authenticated: true,
      user: {
        ...user,
        profileImage: user.avatar // Map avatar to profileImage for consistency with frontend
      }
    });
    
  } catch (err: any) {
    console.error("Verification error:", err);
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }, { status: 500 });
  }
}
