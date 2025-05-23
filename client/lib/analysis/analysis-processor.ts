import prisma from "@/lib/prisma";
import { isPdfData } from "@/lib/analysis/pdf-extractor";
import { analyzeResumeComprehensive } from "@/lib/analysis/comprehensive";
import { AnalysisResult } from "@/lib/analysis/models/analysis-types";

export async function processAnalysis(resume: any, analysisId: number) {
  console.log("====== RESUME ANALYSIS START ======");
  console.log("Processing resume analysis for ID:", analysisId);
  console.log("Resume file type:", resume.fileName ? resume.fileName.split('.').pop() : "unknown");

  // ENHANCED: Better validation of the incoming data
  if (resume.fileData) {
    const dataLength = resume.fileData.length;
    if (isPdfData(resume.fileData)) {
      console.log(`Resume contains PDF data (base64 encoded, ${dataLength} characters)`);
      if (resume.sections && resume.sections.length > 0) {
        console.log(`Resume has ${resume.sections.length} structured sections despite being PDF format`);
      } else {
        const dataPreview = resume.fileData.substring(0, 50);
        console.log(`PDF data preview: ${dataPreview}...`);
      }
    } else {
      console.log(`Resume contains plain text data (${dataLength} characters)`);
      const textSample = resume.fileData.substring(0, 200);
      const readableCharRatio = (textSample.match(/[a-zA-Z0-9\s.,;:]/g) || []).length / textSample.length;
      console.log(`Readable character ratio: ${readableCharRatio}`);
      if (readableCharRatio < 0.6) {
        console.warn("Resume text appears potentially corrupted or not readable text");
      } else {
        console.log(`Text preview: ${textSample.substring(0, 100)}...`);
      }
    }
  } else {
    console.log("No file data available in resume");
  }

  const normalizedResume = {
    ...resume,
    fileName: resume.fileName || "Resume",
    fileData: resume.fileData || "",
    sections: resume.sections || [],
    user: resume.user || {
      name: "Unknown",
      email: "",
    },
  };

  // Update analysis status to processing
  await prisma.resumeAnalysis.update({
    where: { id: analysisId },
    data: { status: "processing" },
  });

  console.log("Starting comprehensive resume analysis...");
  const result = await analyzeResumeComprehensive(normalizedResume);

  // Add defensive check to prevent TypeError
  if (!result) {
    console.error("Analysis returned undefined result");
    await prisma.resumeAnalysis.update({
      where: { id: analysisId },
      data: { status: "failed" },
    });
    return;
  }

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
    "corrupted",
  ];
  const hasErrorMessage = errorIndicators.some(phrase =>
    result.executiveSummary?.toLowerCase().includes(phrase)
  );

  if (hasErrorMessage) {
    console.log("Analysis produced an error message in the executive summary");
    await prisma.resumeAnalysis.update({
      where: { id: analysisId },
      data: { status: "failed" },
    });
    await updateAnalysisInDatabase(analysisId, result);
    return;
  }

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
      skills: 50,
    },
    aiGeneratedImprovements: result.aiGeneratedImprovements || {},
    positionedSuggestions: result.positionedSuggestions || [],
  };

  // Check if analysis contains content rather than just metadata
  const contentAnalyzed = [
    safeResult.executiveSummary,
    safeResult.overview,
    safeResult.industryFit,
  ].join(' ');

  await updateAnalysisInDatabase(analysisId, safeResult);

  console.log("Analysis completed successfully for resume ID:", resume.id);
  console.log("====== RESUME ANALYSIS COMPLETE ======");
}

async function updateAnalysisInDatabase(analysisId: number, result: AnalysisResult) {
  try {
    await prisma.resumeAnalysis.update({
      where: { id: analysisId },
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
        aiGeneratedImprovements: result.aiGeneratedImprovements as any,
        positionedSuggestions: result.positionedSuggestions as any,
        status: "completed"
      },
    });
  } catch (error) {
    console.error("Error updating database:", error);
    throw error;
  }
}