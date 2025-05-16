import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { calculateSectionScores, extractIssues } from "@/lib/analysis/helpers";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const resumeId = parseInt(params.id);
    
    if (isNaN(resumeId)) {
      return new Response(JSON.stringify({ error: "Invalid resume ID" }), {
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
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET!) as { userId: number };
      userId = decoded.userId;
    } catch (err: any) {
      const message = err.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
      return new Response(JSON.stringify({ error: message }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    // Get the resume
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
      include: { sections: true },
    });
    
    if (!resume) {
      return new Response(JSON.stringify({ error: "Resume not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    // Check if the user owns this resume
    if (resume.userId !== userId) {
      return new Response(JSON.stringify({ error: "Unauthorized access" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    // Get the completed analysis
    const analysis = await prisma.resumeAnalysis.findFirst({
      where: {
        resumeId: resumeId,
        status: "completed"
      },
      orderBy: { createdAt: 'desc' }
    });
    
    if (!analysis) {
      return new Response(JSON.stringify({ error: "No analysis found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    // Calculate derived metrics
    const sectionScores = calculateSectionScores(resume, analysis);
    const issues = extractIssues(analysis);
    
    // Calculate impact score and improvement potential
    const currentImpactScore = Math.round(analysis.overallScore * 0.6);
    const potentialImprovement = Math.round(analysis.overallScore * 0.4);

    // Build the full response with all scores
    const fullAnalysis = {
      ...analysis,
      
      // Include ALL score fields
      overallScore: analysis.overallScore || 0,
      contentScore: analysis.contentScore || 0,
      atsOptimizationScore: analysis.atsOptimizationScore || 0,
      formattingScore: analysis.formattingScore || 0,
      industryAlignmentScore: analysis.industryAlignmentScore || 0,
      skillsScore: analysis.skillsScore || 0,
      grammarScore: analysis.grammarScore || 0,
      clarityScore: analysis.clarityScore || 0,
      
      // Include derived data
      sectionScores,
      issues,
      currentImpactScore,
      potentialImprovement,
      
      // Parse JSON fields
      aiGeneratedImprovements: analysis.aiGeneratedImprovements 
        ? JSON.parse(JSON.stringify(analysis.aiGeneratedImprovements)) 
        : undefined,
      positionedSuggestions: analysis.positionedSuggestions 
        ? JSON.parse(JSON.stringify(analysis.positionedSuggestions)) 
        : []
    };

    return NextResponse.json({ analysis: fullAnalysis });
    
  } catch (error) {
    console.error("Error fetching analysis:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch analysis" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
