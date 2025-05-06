import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Find user by email with explicit error handling
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
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email 
      }, 
      process.env.JWT_SECRET || "fallback-secret-not-for-production",
      { expiresIn: '7d' } // Extended expiration for persistent login
    );
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // Create the response object
    const response = NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
      }
    });
    
    // Set HTTP-only cookie with the JWT token
    // maxAge is in seconds: 7 days = 7 * 24 * 60 * 60 = 604800 seconds
    // Set HTTP-only cookie with the JWT token
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 604800, // 7 days
      path: '/',
    });

    // 👇 Set a non-HttpOnly cookie for client-side UI login state
    response.cookies.set({
      name: 'isLoggedIn',
      value: 'true',
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 604800,
      path: '/',
    });


    return response;
    
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }, { status: 500 });
  }
}


