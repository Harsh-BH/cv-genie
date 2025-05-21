import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

// Define a type for JWT payload
interface JwtPayload {
  userId: number;
  [key: string]: unknown;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const resumeId = searchParams.get('resumeId');
    
    if (!resumeId) {
      return new Response(JSON.stringify({ error: "Missing resumeId parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    const authToken = req.cookies.get("auth_token")?.value;
    if (!authToken) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    let userId: number;
    try {
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET!) as JwtPayload;
      userId = decoded.userId;
    } catch (err: unknown) {
      // Type checking for better error handling
      let message = "Invalid token";
      if (err instanceof TokenExpiredError) {
        message = "Token expired";
      } else if (err instanceof JsonWebTokenError) {
        message = "Invalid token format";
      }
      
      return new Response(JSON.stringify({ error: message }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    // Get the resume and check ownership
    const resume = await prisma.resume.findUnique({
      where: { id: parseInt(resumeId) },
      select: { userId: true }
    });
    
    if (!resume) {
      return new Response(JSON.stringify({ error: "Resume not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    if (resume.userId !== userId) {
      return new Response(JSON.stringify({ error: "Unauthorized access" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    // Get the most recent analysis for this resume
    const analysis = await prisma.resumeAnalysis.findFirst({
      where: {
        resumeId: parseInt(resumeId),
      },
      orderBy: { createdAt: 'desc' }
    });
    
    if (!analysis) {
      return NextResponse.json({
        status: "not_found",
        message: "No analysis found for this resume"
      });
    }
    
    return NextResponse.json({
      status: "success",
      data: analysis
    });
    
  } catch (error) {
    console.error("Error fetching analysis:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch analysis" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
