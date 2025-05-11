import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    // Get auth token from cookies
    const authToken = req.cookies.get("auth_token")?.value;

    if (!authToken) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify token
    let userId: number;
    try {
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET!) as { userId: number };
      userId = decoded.userId;
    } catch (err: any) {
      const message = err.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
      return NextResponse.json(
        { status: 401, message },
        { status: 401 }
      );
    }

    // Fetch user's resumes with their latest analysis
    const resumes = await prisma.resume.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        // Include the most recent analysis for each resume
        analyses: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        }
      }
    });

    // Transform data to include score from analysis
    const formattedResumes = resumes.map((resume) => {
      // Get the score from the most recent analysis or default to null
      const rawScore = resume.analyses.length > 0 
        ? resume.analyses[0].overallScore 
        : null;

      // Format the score correctly
      let score = rawScore;
      
      // If score is not null, ensure it's in the proper format
      if (score !== null) {
        // If score is between 0-1, convert to percentage (0-100)
        if (score >= 0 && score <= 1) {
          score = Math.round(score * 100);
        } 
        // Otherwise ensure it's a rounded integer
        else {
          score = Math.round(score);
        }
        
        // Make sure the score is within 0-100 range
        score = Math.max(0, Math.min(100, score));
      }

      return {
        id: resume.id,
        fileName: resume.fileName,
        updatedAt: resume.updatedAt,
        score: score
      };
    });

    return NextResponse.json({
      status: 200,
      message: "Resumes fetched successfully",
      resumes: formattedResumes,
    });
    
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json(
      {
        status: 500,
        message: "An error occurred while fetching resumes",
      },
      { status: 500 }
    );
  }
}