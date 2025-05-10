import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { analyzeResumeComprehensive } from "@/lib/analysis/comprehensive";
import { isPdfData } from "@/lib/analysis/pdf-extractor";

interface AnalysisResult {
  executiveSummary: string;
  overview: string;
  contentQuality: { set: string };
  atsCompatibility: string;
  industryFit: string;
  formattingReview: string;
  skillsAnalysis: string;
  careerTrajectory: string;
  improvementSuggestions: string;
  scoreBreakdown: {
    overall: number;
    content: number;
    ats: number;
    formatting: number;
    impact: number;
    skills: number;
  };
  aiGeneratedImprovements: {
    summary: string | string[];
    experience: any[];
    skills: any[];
    education: any[];
    projects: any[];
  };
  positionedSuggestions: any[];
}

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
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET!) as { userId: number };
      userId = decoded.userId;
    } catch (err: any) {
      const message = err.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
      return new Response(JSON.stringify({ error: message }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    // Get the resume and check ownership
    const resume = await prisma.resume.findUnique({
      where: { id: parseInt(resumeId) },
      include: { sections: true, user: true },
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
    
    // Check for existing analysis
    const existingAnalysis = await prisma.resumeAnalysis.findFirst({
      where: {
        resumeId: parseInt(resumeId),
        status: "completed"
      },
      orderBy: { createdAt: 'desc' }
    });
    
    if (existingAnalysis) {
      return NextResponse.json({
        status: "completed",
        message: "Analysis already exists",
        analysisId: existingAnalysis.id,
        analysis: existingAnalysis
      });
    }
    
    // If no completed analysis, check for in-progress analysis
    const inProgressAnalysis = await prisma.resumeAnalysis.findFirst({
      where: {
        resumeId: parseInt(resumeId),
        status: { in: ["pending", "processing"] }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    if (inProgressAnalysis) {
      return NextResponse.json({
        status: "processing",
        message: "Analysis is already in progress",
        analysisId: inProgressAnalysis.id
      });
    }
    
    // Create a new analysis and start processing
    const newAnalysis = await prisma.resumeAnalysis.create({
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
    processAnalysis(resume, newAnalysis.id);
    
    return NextResponse.json({
      status: "processing",
      message: "Analysis has been started",
      analysisId: newAnalysis.id
    });
    
  } catch (error) {
    console.error("GET analysis trigger error:", error);
    return new Response(JSON.stringify({ error: "Failed to process analysis request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Make the processAnalysis function more defensive against undefined results
async function processAnalysis(resume: any, analysisId: number) {
    try {
        // Log the resume type to debug
        console.log("====== RESUME ANALYSIS START ======");
        console.log("Processing resume analysis for ID:", analysisId);
        console.log("Resume file type:", resume.fileName ? resume.fileName.split('.').pop() : "unknown");
        
        // ENHANCED: Better validation of the incoming data
        if (resume.fileData) {
            const dataLength = resume.fileData.length;
            
            // Check if it's a PDF and log differently to avoid large data in logs
            if (isPdfData(resume.fileData)) {
                console.log(`Resume contains PDF data (base64 encoded, ${dataLength} characters)`);
                
                // Check if we have sections despite having PDF data
                if (resume.sections && resume.sections.length > 0) {
                    console.log(`Resume has ${resume.sections.length} structured sections despite being PDF format`);
                }
                
                // Get first few characters to verify it's truly PDF data
                const dataPreview = resume.fileData.substring(0, 50);
                console.log(`PDF data preview: ${dataPreview}...`);
            } else {
                // For text data, check if it's readable
                console.log(`Resume contains plain text data (${dataLength} characters)`);
                const textSample = resume.fileData.substring(0, 200);
                
                // This helps catch corrupted files early
                const readableCharRatio = (textSample.match(/[a-zA-Z0-9\s.,;:]/g) || []).length / textSample.length;
                console.log(`Readable character ratio: ${readableCharRatio}`);
                
                if (readableCharRatio < 0.6) {
                    console.warn("Resume text appears potentially corrupted or not readable text");
                }
                
                console.log(`Text preview: ${textSample.substring(0, 100)}...`);
            }
        } else {
            console.log("No file data available in resume");
        }
        
        // Extract text from PDF if needed
        let resumeContent = resume.fileData || '';
        
        if (resumeContent && isPdfData(resumeContent)) {
            try {
                console.log("Extracting text from PDF data...");
                const { extractResumeText } = await import("@/lib/analysis/pdf-extractor");
                const extractedText = await extractResumeText(resumeContent);
                
                if (extractedText && extractedText.length > 0) {
                    console.log(`Successfully extracted ${extractedText.length} characters from PDF`);
                    
                    // Log full content that will be used for analysis
                    console.log("==== RESUME CONTENT FOR ANALYSIS START ====");
                    console.log(extractedText);
                    console.log("==== RESUME CONTENT FOR ANALYSIS END ====");
                    
                    resumeContent = extractedText;
                } else {
                    console.warn("PDF extraction returned empty or short text, using existing sections if available");
                }
            } catch (extractError) {
                console.error("PDF extraction error:", extractError);
                // Continue with whatever we have
            }
        } else if (resumeContent) {
            // Log text content as well for consistency
            console.log("==== RESUME TEXT CONTENT START ====");
            console.log(resumeContent.substring(0, 1000) + (resumeContent.length > 1000 ? '...' : ''));
            console.log("==== RESUME TEXT CONTENT END ====");
        }
        
        // Create a simple normalized resume with the raw text
        const normalizedResume = {
            ...resume,
            fileName: resume.fileName || "Resume",
            fileData: resumeContent,
            rawContent: resumeContent, // Add raw content for analysis
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
        console.log(`Raw content length: ${normalizedResume.rawContent.length} characters`);
        
        // Perform the analysis with normalized resume data
        const result = await analyzeResumeComprehensive(normalizedResume);
        
        // Add defensive check to prevent TypeError
        if (!result) {
            console.error("Analysis returned undefined result");
            await prisma.resumeAnalysis.update({
                where: { id: analysisId },
                data: {
                    executiveSummary: "Analysis failed: No result returned from analysis process",
                    status: "failed"
                }
            });
            return;
        }
        
        // ENHANCED: Log better details to find corruption issues
        console.log("====== ANALYSIS RESULTS DETAILS ======");
        console.log(`Executive Summary Length: ${result.executiveSummary?.length || 0} chars`);
        console.log(`Overview Analysis Length: ${result.overview?.length || 0} chars`);
        console.log(`Industry Fit Analysis Length: ${result.industryFit?.length || 0} chars`);
        console.log(`ATS Compatibility Length: ${result.atsCompatibility?.length || 0} chars`);
        
        // Check if analysis looks like an error message
        const errorIndicators = [
            "could not extract",
            "extraction failed", 
            "could not process",
            "could not analyze",
            "corrupted"
        ];
        
        const hasErrorMessage = errorIndicators.some(phrase => 
            result.executiveSummary?.toLowerCase().includes(phrase)
        );
        
        if (hasErrorMessage) {
            console.log("Analysis produced an error message in the executive summary");
            
            // Update with failed status but still save any analysis we have
            await updateAnalysisInDatabase(analysisId, result);
            
            // Also mark status as failed
            await prisma.resumeAnalysis.update({
                where: { id: analysisId },
                data: { status: "failed" }
            });
            
            return;
        }
        
        // Add additional safety checks on all fields that will be saved to database
        const safeResult = {
            executiveSummary: result.executiveSummary || "Analysis completed, but no executive summary was generated.",
            overview: result.overview || "No overview analysis available.",
            contentQuality: result.contentQuality || { set: "No content quality analysis available." },
            atsCompatibility: result.atsCompatibility || "No ATS compatibility analysis available.",
            industryFit: result.industryFit || "No industry fit analysis available.",
            formattingReview: result.formattingReview || "No formatting review available.",
            skillsAnalysis: result.skillsAnalysis || "No skills analysis available.",
            careerTrajectory: result.careerTrajectory || "No career trajectory analysis available.",
            improvementSuggestions: result.improvementSuggestions || "No improvement suggestions available.",
            scoreBreakdown: result.scoreBreakdown || {
                overall: 50,
                content: 50,
                ats: 50,
                formatting: 50,
                impact: 50,
                skills: 50
            },
            aiGeneratedImprovements: result.aiGeneratedImprovements || {
                summary: [],
                experience: [],
                skills: [],
                education: [],
                projects: []
            },
            positionedSuggestions: result.positionedSuggestions || []
        };
        
        // Check if analysis contains content rather than just metadata
        const contentAnalyzed = [
            safeResult.executiveSummary,
            safeResult.overview,
            safeResult.industryFit
        ].join(' ');
        
        // Update the analysis record with the safe results
        await updateAnalysisInDatabase(analysisId, safeResult);
        
        console.log("Analysis completed successfully for resume ID:", resume.id);
        console.log("====== RESUME ANALYSIS COMPLETE ======");
    } catch (error) {
        console.error("Analysis process error:", error);
        
        // Enhanced error logging to diagnose issues
        if (error instanceof Error) {
            console.error(`Error type: ${error.name}`);
            console.error(`Error message: ${error.message}`);
            if (error.stack) {
                console.error(`Stack trace: ${error.stack}`);
            }
        }
        
        try {
            // Update the analysis record with error status and detailed error message
            await prisma.resumeAnalysis.update({
                where: { id: analysisId },
                data: {
                    executiveSummary: `Analysis failed: ${error instanceof Error ? error.message : String(error)}`,
                    overview: `We encountered an error while analyzing your resume. This could be due to issues with the file format or content extraction. Please try uploading a different file format or contact support for assistance.`,
                    status: "failed"
                }
            });
        } catch (dbError) {
            console.error("Failed to update analysis status in database:", dbError);
        }
    }
}

// Add this function or adjust your existing one
async function updateAnalysisInDatabase(analysisId: number, result: AnalysisResult) {
  try {
    // Map the AnalysisResult to the database schema
    await prisma.resumeAnalysis.update({
      where: {
        id: analysisId
      },
      data: {
        executiveSummary: result.executiveSummary,
        overview: result.overview,
        contentQuality: result.contentQuality.set, // Use the 'set' property
        atsCompatibility: result.atsCompatibility,
        industryFit: result.industryFit,
        formattingReview: result.formattingReview,
        skillsAnalysis: result.skillsAnalysis,
        careerTrajectory: result.careerTrajectory,
        improvementSuggestions: result.improvementSuggestions,
        overallScore: result.scoreBreakdown.overall,
        contentScore: result.scoreBreakdown.content,
        atsOptimizationScore: result.scoreBreakdown.ats,
        industryAlignmentScore: result.scoreBreakdown.impact,
        formattingScore: result.scoreBreakdown.formatting,
        skillsScore: result.scoreBreakdown.skills,
        aiGeneratedImprovements: result.aiGeneratedImprovements,
        positionedSuggestions: result.positionedSuggestions,
        status: "completed"
      }
    });
  } catch (error) {
    console.error("Error updating database:", error);
    throw error;
  }
}
