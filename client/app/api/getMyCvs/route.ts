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
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET!) as JwtPayload;
      userId = decoded.userId;
    } catch (err: unknown) {
      // Use type checking for more specific error handling
      const message = err instanceof TokenExpiredError 
        ? "Token expired" 
        : "Invalid token";
      
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

    // Transform data to include detailed scores from analysis
    const formattedResumes = resumes.map((resume) => {
      // Get the analysis or default values
      const analysis = resume.analyses.length > 0 ? resume.analyses[0] : null;
      
      // Format the overall score
      let overallScore = analysis?.overallScore ?? null;
      
      // Process overall score if exists
      if (overallScore !== null) {
        // If score is between 0-1, convert to percentage (0-100)
        if (overallScore >= 0 && overallScore <= 1) {
          overallScore = Math.round(overallScore * 100);
        } 
        // Otherwise ensure it's a rounded integer
        else {
          overallScore = Math.round(overallScore);
        }
        
        // Make sure the score is within 0-100 range
        overallScore = Math.max(0, Math.min(100, overallScore));
      }
      
      // Helper function to format all scores consistently
      const formatScore = (score: number | null): number | null => {
        if (score === null) return null;
        
        // If score is between 0-1, convert to percentage
        if (score >= 0 && score <= 1) {
          score = Math.round(score * 100);
        } else {
          score = Math.round(score);
        }
        
        // Ensure score is within 0-100 range
        return Math.max(0, Math.min(100, score));
      };
      
      // Return formatted resume with all available scores
      return {
        id: resume.id,
        fileName: resume.fileName,
        updatedAt: resume.updatedAt,
        score: overallScore, // For backward compatibility
        scores: {
          overall: overallScore,
          content: formatScore(analysis?.contentScore ?? null),
          atsOptimization: formatScore(analysis?.atsOptimizationScore ?? null),
          industryAlignment: formatScore(analysis?.industryAlignmentScore ?? null),
          formatting: formatScore(analysis?.formattingScore ?? null),
          skills: formatScore(analysis?.skillsScore ?? null),
          grammar: formatScore(analysis?.grammarScore ?? null),
          clarity: formatScore(analysis?.clarityScore ?? null)
        },
        // Include analysis status if available
        analysisStatus: analysis?.status ?? null,
        // Include analysis creation date for reference
        analysisDate: analysis?.createdAt ?? null
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