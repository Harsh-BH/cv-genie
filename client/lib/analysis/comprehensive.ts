import { analyzeContent } from './analyzers/content-analyzer';
import { analyzeAtsCompatibility } from './analyzers/ats-analyzer';
import { analyzeIndustryFit } from './analyzers/industry-analyzer';
import { analyzeSkills } from './analyzers/skills-analyzer';
import { generateImprovements } from './analyzers/improvement-generator';
import { analyzeScores } from './analyzers/score-analyzer';
import { analyzeFormatting } from './analyzers/format-analyzer';
import { analyzeGrammar } from './analyzers/grammar-analyzer';
import { generatePositionedSuggestions } from './analyzers/position-analyzer';
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
    const [
      contentResults, 
      atsResults, 
      industryResults, 
      skillsResults,
      formattingResults,
      grammarResults
    ] = await Promise.all([
      analyzeContent(normalizedResume),
      analyzeAtsCompatibility(normalizedResume),
      analyzeIndustryFit(normalizedResume),
      analyzeSkills(normalizedResume),
      analyzeFormatting(normalizedResume),
      analyzeGrammar(normalizedResume)
    ]);
    
    // Step 2: Generate improvement suggestions based on previous analyses
    const improvementsResult = await generateImprovements(normalizedResume);
    
    // Step 3: Generate positioned suggestions for specific issues
    const positionedSuggestions = await generatePositionedSuggestions(normalizedResume);
    
    // Step 4: Calculate scores based on all the analyses
    const scores = await analyzeScores(normalizedResume, {
      contentQuality: contentResults.contentQuality,
      atsCompatibility: atsResults,
      industryFit: industryResults,
      skillsAnalysis: skillsResults,
      formattingReview: formattingResults
    });
    
    // Step 5: Compile all results into a structured response
    return {
      executiveSummary: contentResults.executiveSummary,
      overview: contentResults.overview,
      contentQuality: { set: contentResults.contentQuality }, // Formatted for Prisma
      atsCompatibility: atsResults,
      industryFit: industryResults,
      formattingReview: formattingResults,
      skillsAnalysis: skillsResults,
      careerTrajectory: "Career trajectory analysis will be provided in future update.", // Placeholder
      improvementSuggestions: improvementsResult.improvementSuggestions,
      scoreBreakdown: scores,
      aiGeneratedImprovements: improvementsResult.aiGeneratedImprovements,
      positionedSuggestions: [
        ...positionedSuggestions,
        ...grammarResults.grammarIssues.map(issue => ({
          id: issue.id,
          type: 'grammar' as const,
          sectionType: 'Grammar & Language',
          original: issue.text,
          improved: issue.suggestion,
          issue: `Grammar Issue: ${issue.explanation}`,
          suggestion: issue.suggestion,
          reasoning: issue.explanation,
          severity: issue.severity,
          category: 'grammar' as const,
          position: {
            sectionTitle: 'Grammar & Language',
            textSnippet: issue.text,
            lineNumber: issue.position.lineNumber,
            charRange: issue.position.offset && issue.position.length 
              ? [issue.position.offset, issue.position.offset + issue.position.length] as [number, number]
              : undefined
          }
        }))
      ],
      grammarIssues: grammarResults.grammarIssues
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
        overall: 50,
        content: 45,
        ats: 52,
        formatting: 48,
        impact: 47,
        skills: 53,
        grammar: 55,
        clarity: 51
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
  // Extract skills from sections if they exist
  let skills: string[] = [];
  if (resume.sections) {
    const skillsSection = resume.sections.find((s: any) => 
      s.title.toLowerCase().includes('skill') || 
      s.title.toLowerCase().includes('technolog') ||
      s.title.toLowerCase().includes('proficienc')
    );
    
    if (skillsSection) {
      // Extract skills by splitting on commas, bullets, or newlines
      skills = skillsSection.content
        .split(/[,•\n]/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0);
    }
  }
  
  return {
    fileName: resume.fileName || "Resume",
    fileData: resume.fileData || "",
    rawContent: resume.rawContent || resume.fileData || "",
    sections: Array.isArray(resume.sections) ? resume.sections : [],
    skills: skills,
    user: resume.user || { name: "Unknown", email: "" }
  };
}
