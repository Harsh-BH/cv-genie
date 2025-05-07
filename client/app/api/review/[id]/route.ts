import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const resumeId = parseInt(params.id);

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
            const message =
                err.name === "TokenExpiredError"
                    ? "Token expired"
                    : "Invalid token";
            return new Response(JSON.stringify({ error: message }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        if (isNaN(resumeId)) {
            return new Response(JSON.stringify({ error: "Invalid resume ID" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const resume = await prisma.resume.findUnique({
            where: { id: resumeId },
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

        // Check if we already have a completed analysis for this resume
        const existingAnalysis = await prisma.resumeAnalysis.findFirst({
            where: {
                resumeId: resumeId,
                status: "completed"
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        if (existingAnalysis) {
            // If we have an analysis, return it
            return NextResponse.json({ 
                analysis: {
                    executiveSummary: existingAnalysis.executiveSummary,
                    overview: existingAnalysis.overview,
                    contentQuality: existingAnalysis.contentQuality,
                    atsCompatibility: existingAnalysis.atsCompatibility,
                    industryFit: existingAnalysis.industryFit,
                    formattingReview: existingAnalysis.formattingReview,
                    skillsAnalysis: existingAnalysis.skillsAnalysis,
                    careerTrajectory: existingAnalysis.careerTrajectory,
                    improvementSuggestions: existingAnalysis.improvementSuggestions,
                    scoreBreakdown: {
                        overall: existingAnalysis.overallScore,
                        content: existingAnalysis.contentScore,
                        atsOptimization: existingAnalysis.atsOptimizationScore,
                        industryAlignment: existingAnalysis.industryAlignmentScore,
                        formatting: existingAnalysis.formattingScore,
                        skills: existingAnalysis.skillsScore,
                    },
                    aiGeneratedImprovements: existingAnalysis.aiGeneratedImprovements,
                    positionedSuggestions: existingAnalysis.positionedSuggestions
                },
                source: "database"
            });
        }

        // If no analysis exists or is not complete, check if one is in progress
        const inProgressAnalysis = await prisma.resumeAnalysis.findFirst({
            where: {
                resumeId: resumeId,
                status: "processing"
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        if (inProgressAnalysis) {
            return NextResponse.json({
                status: "processing",
                message: "Analysis is currently being processed",
                analysisId: inProgressAnalysis.id
            });
        }

        // If no analysis exists at all, inform the client they need to trigger one
        return NextResponse.json({
            status: "not_found",
            message: "No analysis exists for this resume. Please trigger an analysis first."
        }, { status: 404 });

    } catch (error) {
        console.error("Resume review error:", error);
        return new Response(JSON.stringify({ error: "Failed to retrieve resume analysis" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
