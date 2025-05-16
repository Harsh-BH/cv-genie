import { analyzeContent } from './analyzers/content-analyzer';
import { analyzeAtsCompatibility } from './analyzers/ats-analyzer';
import { analyzeIndustryFit } from './analyzers/industry-analyzer';
import { analyzeSkills } from './analyzers/skills-analyzer';
import { generateImprovements } from './analyzers/improvement-generator';
import { analyzeScores } from './analyzers/score-analyzer';
import { StructuredResume, AnalysisResult } from './models/analysis-types';

/**
 * Performs a comprehensive analysis of a resume, combining multiple analyzers
 * to create a complete assessment and scoring.
 */
export async function analyzeResumeComprehensive(resume: any): Promise<AnalysisResult> {
  try {
    console.log("Starting comprehensive resume analysis...");
    const normalizedResume: StructuredResume = normalizeResumeStructure(resume);
    
    // Step 1: First-pass analyses (run in parallel)
    const [contentResults, atsResults, industryResults, skillsResults] = await Promise.all([
      analyzeContent(normalizedResume),
      analyzeAtsCompatibility(normalizedResume),
      analyzeIndustryFit(normalizedResume),
      analyzeSkills(normalizedResume)
    ]);
    
    // Step 2: Generate improvement suggestions based on previous analyses
    const improvementsResult = await generateImprovements(normalizedResume);
    
    // Step 3: Calculate scores based on all the analyses
    const scores = await analyzeScores(normalizedResume, {
      contentQuality: contentResults.contentQuality,
      atsCompatibility: atsResults,
      industryFit: industryResults,
      skillsAnalysis: skillsResults
    });
    
    // Step 4: Compile all results
    return {
      executiveSummary: contentResults.executiveSummary,
      overview: contentResults.overview,
      contentQuality: { set: contentResults.contentQuality }, // Formatted for Prisma
      atsCompatibility: atsResults,
      industryFit: industryResults,
      formattingReview: "Formatting analysis will be provided in future update.", // Placeholder
      skillsAnalysis: skillsResults,
      careerTrajectory: "Career trajectory analysis will be provided in future update.", // Placeholder
      improvementSuggestions: improvementsResult.improvementSuggestions,
      scoreBreakdown: scores,
      aiGeneratedImprovements: improvementsResult.aiGeneratedImprovements,
      positionedSuggestions: [] // Placeholder for future enhancement
    };
  } catch (error) {
    console.error("Comprehensive analysis error:", error);
    // Return a minimal result with error information
    return {
      executiveSummary: `Error analyzing resume: ${error instanceof Error ? error.message : 'Unknown error'}`,
      overview: "Analysis could not be completed due to an error.",
      contentQuality: { set: "Content analysis failed." },
      atsCompatibility: "ATS compatibility analysis failed.",
      industryFit: "Industry fit analysis failed.",
      formattingReview: "Formatting review could not be completed.",
      skillsAnalysis: "Skills analysis failed.",
      careerTrajectory: "Career trajectory analysis failed.",
      improvementSuggestions: "Improvement suggestions could not be generated due to an error.",
      scoreBreakdown: {
        overall: 0,
        content: 0,
        ats: 0,
        formatting: 0,
        impact: 0,
        skills: 0,
        grammar: 0,
        clarity: 0
      },
      aiGeneratedImprovements: {
        summary: "",
        bulletPoints: [],
        achievements: [],
        experience: [],
        skills: [],
        education: [],
        projects: []
      },
      positionedSuggestions: []
    };
  }
}

/**
 * Normalize resume data structure to ensure consistent format for analysis
 */
function normalizeResumeStructure(resume: any): StructuredResume {
  return {
    fileName: resume.fileName || "Resume",
    fileData: resume.fileData || "",
    rawContent: resume.rawContent || resume.fileData || "",
    sections: Array.isArray(resume.sections) ? resume.sections : [],
    user: resume.user || { name: "Unknown", email: "" }
  };
}
