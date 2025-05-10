import { StructuredResume, AnalysisResult } from "@/lib/analysis/models/analysis-types";
import { analyzeContent } from "./analyzers/content-analyzer";
import { analyzeFormatting } from "./analyzers/format-analyzer";
import { analyzeAtsCompatibility } from "./analyzers/ats-analyzer";
import { analyzeSkills } from "./analyzers/skills-analyzer";
import { analyzeIndustryFit } from "./analyzers/industry-analyzer";
import { generateImprovements } from "./analyzers/improvement-generator";
import { generatePositionedSuggestions } from "./analyzers/position-analyzer";

export async function analyzeResumeComprehensive(resume: StructuredResume): Promise<AnalysisResult> {
  try {
    console.log("Starting comprehensive resume analysis");
    
    // Check for raw content first, then fallback to sections if available
    const rawContent = resume.rawContent || resume.fileData || "";
    let contentToAnalyze = rawContent;
    
    // If we have sections, use that formatted content instead
    if (resume.sections && resume.sections.length > 0) {
      console.log(`Resume has ${resume.sections.length} sections, using those for analysis`);
      contentToAnalyze = resume.sections
        .map(section => `## ${section.title.toUpperCase()}\n${section.content}`)
        .join('\n\n');
    } else if (rawContent) {
      console.log(`Using raw content (${rawContent.length} chars) for analysis`);
    } else {
      throw new Error("Resume has no content for analysis");
    }
    
    // Create a minimal sections array if none exists
    if (!resume.sections || resume.sections.length === 0) {
      resume.sections = [{
        id: Math.floor(Math.random() * 10000),
        title: "Resume Content",
        type: "content", 
        content: contentToAnalyze,
        order: 0
      }];
    }
    
    console.log(`Analyzing resume with ${resume.sections.length} sections and ${contentToAnalyze.length} characters`);

    // Log section titles to verify content
    const sectionTitles = resume.sections.map(s => s.title).join(', ');
    console.log(`Resume sections: ${sectionTitles}`);

    // Run all analysis tasks in parallel
    const [
      contentAnalysis,
      formattingReview,
      atsCompatibility,
      skillsAnalysis,
      industryFit,
      improvements,
      positionedSuggestions
    ] = await Promise.all([
      analyzeContent(resume),
      analyzeFormatting(resume),
      analyzeAtsCompatibility(resume),
      analyzeSkills(resume),
      analyzeIndustryFit(resume),
      generateImprovements(resume),
      generatePositionedSuggestions(resume)
    ]);

    // Calculate scores based on analysis results
    const scores = calculateScores({
      content: contentAnalysis.contentQuality,
      formatting: formattingReview,
      ats: atsCompatibility,
      skills: skillsAnalysis,
      industry: industryFit
    });

    // Generate career trajectory insights
    const careerTrajectory = `Based on your resume, your career appears to be progressing in the direction of ${
      resume.sections.find(s => s.title.toLowerCase().includes("experience"))?.content.split("\n")[0] || "your current field"
    }. Consider how your current skills and experiences align with your long-term goals.`;

    return {
      executiveSummary: contentAnalysis.executiveSummary,
      overview: contentAnalysis.overview,
      contentQuality: { set: contentAnalysis.contentQuality },
      formattingReview,
      atsCompatibility,
      skillsAnalysis,
      industryFit,
      careerTrajectory,
      improvementSuggestions: improvements.improvementSuggestions,
      scoreBreakdown: scores,
      aiGeneratedImprovements: improvements.aiGeneratedImprovements,
      positionedSuggestions
    };
  } catch (error) {
    console.error("Comprehensive analysis failed:", error);
    throw error;
  }
}

function calculateScores(analyses: Record<string, string>): {
  overall: number;
  content: number;
  ats: number;
  formatting: number;
  impact: number;
  skills: number;
} {
  // Simplified scoring logic
  function calculateScoreFromText(text: string): number {
    const positives = (text.match(/\b(strong|excellent|good|effective|clear|specific)\b/gi) || []).length;
    const negatives = (text.match(/\b(weak|poor|missing|inadequate|vague)\b/gi) || []).length;
    return Math.max(2, Math.min(9, Math.round((positives - negatives + 5) * 10 / 10)));
  }

  const content = calculateScoreFromText(analyses.content);
  const ats = calculateScoreFromText(analyses.ats);
  const formatting = calculateScoreFromText(analyses.formatting);
  const skills = calculateScoreFromText(analyses.skills);
  const impact = calculateScoreFromText(analyses.industry);

  const overall = (content * 0.35 + ats * 0.25 + formatting * 0.15 + impact * 0.15 + skills * 0.1);
  return {
    overall: parseFloat(overall.toFixed(1)),
    content,
    ats,
    formatting,
    impact,
    skills
  };
}
