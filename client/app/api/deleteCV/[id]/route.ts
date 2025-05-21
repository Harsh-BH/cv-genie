import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt, { TokenExpiredError } from "jsonwebtoken";

// Define a type for JWT payload
interface JwtPayload {
  userId: number;
  [key: string]: unknown;
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Handle both Promise and direct object cases
    const params = 'then' in context.params 
      ? await context.params 
      : context.params;
    
    // Extract the CV ID from route parameters
    const cvId = params.id;
    
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
      // Type narrowing to handle specific JWT errors
      if (jwtError instanceof TokenExpiredError) {
        return NextResponse.json({ error: "Token expired" }, { status: 401 });
      }
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!userId) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
    }

    // Verify CV belongs to user before deletion (optional security check)
    const resume = await prisma.resume.findUnique({
      where: {
        id: parseInt(cvId),
      },
      select: {
        id: true,
        userId: true,
      }
    });

    if (!resume) {
      return NextResponse.json({ error: "CV not found" }, { status: 404 });
    }

    // Ensure the CV belongs to the authenticated user
    if (resume.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized to delete this CV" }, { status: 403 });
    }

    // Delete the CV
    await prisma.resume.delete({
      where: {
        id: parseInt(cvId)
      }
    });

    return NextResponse.json({ 
      success: true,
      message: "CV deleted successfully" 
    });
  } catch (error: unknown) {
    console.error("Error deleting CV:", error);
    return NextResponse.json({ 
      error: "An error occurred while deleting the CV",
      details: process.env.NODE_ENV === 'development' ? 
        (error instanceof Error ? error.message : String(error)) : 
        undefined
    }, { status: 500 });
  }
}