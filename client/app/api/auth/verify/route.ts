// app/api/auth/verify/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    const cookieStore = await cookies(); // NO await here
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET!);

    console.log("Token verified successfully");

    return NextResponse.json({ authenticated: true });
  } catch (err) {
    console.error("Token verification failed:", err);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

