import { AnalysisData } from '@/types/analysis';
import { AnalysisResult } from '../analysis/models/analysis-types';

/**
 * Maps the backend analysis result to the frontend analysis data format
 */
export function mapAnalysisResultToFrontend(result: AnalysisResult): AnalysisData {
  return {
    executiveSummary: result.executiveSummary,
    overview: result.overview,
    contentQuality: result.contentQuality.set,
    atsCompatibility: result.atsCompatibility,
    industryFit: result.industryFit,
    formattingReview: result.formattingReview,
    skillsAnalysis: result.skillsAnalysis,
    careerTrajectory: result.careerTrajectory,
    improvementSuggestions: result.improvementSuggestions,
    
    // Map scores
    overallScore: result.scoreBreakdown.overall,
    contentScore: result.scoreBreakdown.content,
    atsOptimizationScore: result.scoreBreakdown.ats,
    formattingScore: result.scoreBreakdown.formatting,
    industryAlignmentScore: result.scoreBreakdown.impact,
    skillsScore: result.scoreBreakdown.skills,
    grammarScore: result.scoreBreakdown.grammar,
    clarityScore: result.scoreBreakdown.clarity,
    
    // Map AI improvements
    aiSummary: result.aiGeneratedImprovements.summary,
    aiBulletPoints: result.aiGeneratedImprovements.bulletPoints,
    aiAchievements: result.aiGeneratedImprovements.achievements,
    aiSkills: result.aiGeneratedImprovements.skills,
    
    // Map positioned suggestions
    positionedSuggestions: result.positionedSuggestions,
    
    // Map grammar issues
    grammarIssues: result.grammarIssues
  };
}
