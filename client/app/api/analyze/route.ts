import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { analyzeResumeComprehensive } from "@/lib/analysis/resume-analyzer";

export async function POST(req: NextRequest) {
    try {
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

        // Parse request body
        const body = await req.json();
        const { resumeId } = body;
        
        if (!resumeId || isNaN(parseInt(resumeId))) {
            return new Response(JSON.stringify({ error: "Invalid resume ID" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        console.log("Resume ID:", resumeId);    

        // Get resume with its sections and personal details
        const resume = await prisma.resume.findUnique({
            where: { id: parseInt(resumeId) },
            include: {
                sections: true,
               
                user: true
            },
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

        // Check if analysis is already in progress
        const inProgressAnalysis = await prisma.resumeAnalysis.findFirst({
            where: {
                resumeId: parseInt(resumeId),
                status: { in: ["pending", "processing"] }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        if (inProgressAnalysis) {
            return NextResponse.json({
                status: "processing",
                message: "Analysis is already in progress",
                analysisId: inProgressAnalysis.id
            });
        }

        // Create a new analysis record with pending status
        const analysis = await prisma.resumeAnalysis.create({
            data: {
                resumeId: parseInt(resumeId),
                executiveSummary: "Analysis in progress...",
                overallScore: 0,
                contentScore: 0,
                atsOptimizationScore: 0,
                industryAlignmentScore: 0,
                formattingScore: 0,
                skillsScore: 0,
                status: "processing"
            }
        });

        // Start the analysis process (non-blocking)
        processAnalysis(resume, analysis.id);

        return NextResponse.json({
            status: "processing",
            message: "Analysis has been started",
            analysisId: analysis.id
        });

    } catch (error) {
        console.error("Analysis trigger error:", error);
        return new Response(JSON.stringify({ error: "Failed to start analysis" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// Function to process analysis asynchronously
async function processAnalysis(resume: any, analysisId: number) {
    try {
        // Simplify normalization to just use the user data
        const normalizedResume = {
            ...resume,
            sections: resume.sections || [],
            // No need for personalDetails - just use user directly
            user: resume.user || {
                name: "Unknown",
                email: "",
            }
        };
        
        // Perform the analysis with normalized resume data
        const result = await analyzeResumeComprehensive(normalizedResume);
        
        // Update the analysis record with the results
        await prisma.resumeAnalysis.update({
            where: { id: analysisId },
            data: {
                executiveSummary: result.executiveSummary,
                overview: result.overview,
                contentQuality: result.contentQuality,
                atsCompatibility: result.atsCompatibility,
                industryFit: result.industryFit,
                formattingReview: result.formattingReview,
                skillsAnalysis: result.skillsAnalysis,
                careerTrajectory: result.careerTrajectory,
                improvementSuggestions: result.improvementSuggestions,
                overallScore: result.scoreBreakdown.overall,
                contentScore: result.scoreBreakdown.content,
                atsOptimizationScore: result.scoreBreakdown.atsOptimization,
                industryAlignmentScore: result.scoreBreakdown.industryAlignment,
                formattingScore: result.scoreBreakdown.formatting,
                skillsScore: result.scoreBreakdown.skills,
                aiGeneratedImprovements: result.aiGeneratedImprovements,
                positionedSuggestions: result.positionedSuggestions,
                status: "completed"
            }
        });
    } catch (error) {
        console.error("Analysis process error:", error);
        
        // Update the analysis record with error status
        await prisma.resumeAnalysis.update({
            where: { id: analysisId },
            data: {
                executiveSummary: `Analysis failed: ${error instanceof Error ? error.message : String(error)}`,
                status: "failed"
            }
        });
    }
}
