import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get auth_token cookie for authentication
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

    // Get CV ID from route parameters
    const cvId = params.id;
    
    if (!cvId) {
      return NextResponse.json({ error: "CV ID is required" }, { status: 400 });
    }

    // Verify that the CV belongs to the user
    const cv = await prisma.resume.findFirst({
      where: {
        id: parseInt(cvId),
        userId: userId
      }
    });

    if (!cv) {
      return NextResponse.json({ error: "CV not found or access denied" }, { status: 404 });
    }

    // Delete any associated analysis
    await prisma.resumeAnalysis.deleteMany({
      where: {
        resumeId: parseInt(cvId)
      }
    });

    // Delete any resume sections
    await prisma.resumeSection.deleteMany({
      where: {
        resumeId: parseInt(cvId)
      }
    });

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
  } catch (error: any) {
    console.error("Error deleting CV:", error);
    return NextResponse.json({ 
      error: "An error occurred while deleting the CV",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}