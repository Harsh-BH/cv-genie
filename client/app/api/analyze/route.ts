import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { analyzeResumeComprehensive } from "@/lib/analysis/resume-analyzer";
import { isPdfData } from "@/lib/analysis/pdf-extractor";

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
        // Log the resume type to debug
        console.log("====== RESUME ANALYSIS START ======");
        console.log("Processing resume analysis for ID:", analysisId);
        console.log("Resume file type:", resume.fileName ? resume.fileName.split('.').pop() : "unknown");
        
        // Check if it's a PDF and log differently to avoid large data in logs
        if (resume.fileData && isPdfData(resume.fileData)) {
            const dataLength = resume.fileData.length;
            console.log(`Resume contains PDF data (base64 encoded, ${dataLength} characters)`);
            
            // Check if we have sections despite having PDF data
            if (resume.sections && resume.sections.length > 0) {
                console.log(`Resume has ${resume.sections.length} structured sections despite being PDF format`);
            }
            
            // Get first few characters to verify it's truly PDF data
            const dataPreview = resume.fileData.substring(0, 50);
            console.log(`PDF data preview: ${dataPreview}...`);
        } else if (resume.fileData) {
            // For text data, show a preview
            const textLength = resume.fileData.length;
            console.log(`Resume contains plain text data (${textLength} characters)`);
            console.log(`Text preview: ${resume.fileData.substring(0, 100)}...`);
        } else {
            console.log("No file data available in resume");
        }
        
        // Simplify normalization to just use the user data
        const normalizedResume = {
            ...resume,
            fileName: resume.fileName || "Resume",
            fileData: resume.fileData || "",
            sections: resume.sections || [],
            user: resume.user || {
                name: "Unknown",
                email: "",
            }
        };
        
        // Update analysis status to processing
        await prisma.resumeAnalysis.update({
            where: { id: analysisId },
            data: { status: "processing" }
        });
        
        console.log("Starting comprehensive resume analysis...");
        
        // Perform the analysis with normalized resume data
        const result = await analyzeResumeComprehensive(normalizedResume);
        
        // Log the analysis results to verify we're getting proper content-based analysis
        console.log("====== ANALYSIS RESULTS SUMMARY ======");
        console.log(`Executive Summary Length: ${result.executiveSummary.length} chars`);
        console.log(`Overview Analysis Length: ${result.overview.length} chars`);
        console.log(`Industry Fit Analysis Length: ${result.industryFit.length} chars`);
        console.log(`ATS Compatibility Length: ${result.atsCompatibility.length} chars`);
        
        // Check if the analysis contains industry-specific terms that would indicate content was analyzed
        const contentAnalyzed = [
            result.executiveSummary,
            result.overview,
            result.industryFit
        ].join(' ');
        
        console.log("Analysis check - Content contains relevant terms:");
        for (const term of ['experience', 'skills', 'professional', 'job', 'career', 'position', 'qualification']) {
            if (contentAnalyzed.toLowerCase().includes(term)) {
                console.log(`✓ Term found: "${term}"`);
            }
        }
        
        // Check if analysis looks like it's based on content rather than just metadata
        const contentBasedAnalysis = 
            contentAnalyzed.length > 500 && 
            !contentAnalyzed.includes("could not extract") &&
            !contentAnalyzed.includes("limited data") &&
            !contentAnalyzed.includes("metadata only");
            
        console.log(`Analysis appears to be based on actual content: ${contentBasedAnalysis ? "YES" : "NO"}`);
        console.log("Overview preview:", result.overview.substring(0, 150) + "...");
        
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
        
        console.log("Analysis completed successfully for resume ID:", resume.id);
        console.log("====== RESUME ANALYSIS COMPLETE ======");
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
