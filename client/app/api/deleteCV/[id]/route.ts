import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt, { TokenExpiredError } from "jsonwebtoken";

// Define a type for JWT payload
interface JwtPayload {
  userId: number;
  [key: string]: unknown;
}

// Promise wrapper utility
async function wewrapper<T>(promise: Promise<T>): Promise<[Error | null, T | null]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err as Error, null];
  }
}

export async function DELETE(req: NextRequest) {
  // Extract the CV ID from the URL
  const url = new URL(req.url);
  const cvId = url.pathname.split("/").pop();

  if (!cvId) {
    return NextResponse.json({ error: "CV ID is required" }, { status: 400 });
  }

  // Get auth_token cookie for authentication
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
    if (jwtError instanceof TokenExpiredError) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (!userId) {
    return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
  }

  // Verify CV belongs to user before deletion (optional security check)
  const [findErr, resume] = await wewrapper(
    prisma.resume.findUnique({
      where: { id: parseInt(cvId) },
      select: { id: true, userId: true }
    })
  );
  if (findErr) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
  if (!resume) {
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }
  if (resume.userId !== userId) {
    return NextResponse.json({ error: "Unauthorized to delete this CV" }, { status: 403 });
  }

  // Delete the CV
  const [delErr] = await wewrapper(
    prisma.resume.delete({ where: { id: parseInt(cvId) } })
  );
  if (delErr) {
    return NextResponse.json({ error: "Error deleting CV" }, { status: 500 });
  }

  return NextResponse.json({ 
    success: true,
    message: "CV deleted successfully" 
  });
}