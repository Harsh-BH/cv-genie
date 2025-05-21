import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body; // First 'password' declaration here

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email }
      });
    } catch (dbError: unknown) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Database connection error" }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Check if password exists in the user record
    if (!user.password) {
      return NextResponse.json({ error: "Account setup is incomplete" }, { status: 401 });
    }

    // Verify password - now TypeScript knows password is a string
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

    // Remove password from response using ESLint disable comment
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _userPassword, ...userWithoutPassword } = user;

    // Create the response object
    const response = NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
      }
    });

    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 604800, // 7 days
      path: '/',
    });

    // Set a non-HttpOnly cookie for client-side UI login state
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
    
  } catch (error: unknown) { // Fixed: Changed any to unknown
    console.error("Login error:", error);
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: process.env.NODE_ENV === 'development' ? 
        (error instanceof Error ? error.message : String(error)) : 
        undefined
    }, { status: 500 });
  }
}