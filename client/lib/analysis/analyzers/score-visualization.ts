import { ScoreBreakdown } from './score-analyzer';

/**
 * Generates color values for score visualization
 * @param score A numeric score from 0-100
 * @returns A color code and text color appropriate for the score
 */
export function getScoreColor(score: number): { color: string, textColor: string } {
  // Ensure score is valid
  const validScore = Math.max(0, Math.min(100, score));
  
  if (validScore < 40) {
    return { color: '#ff4d4f', textColor: '#ffffff' }; // Red
  } else if (validScore < 60) {
    return { color: '#faad14', textColor: '#000000' }; // Yellow/Orange
  } else if (validScore < 80) {
    return { color: '#52c41a', textColor: '#ffffff' }; // Green
  } else {
    return { color: '#1890ff', textColor: '#ffffff' }; // Blue
  }
}

/**
 * Provides descriptive text for score ranges
 * @param score A numeric score from 0-100
 * @param category The category being evaluated
 * @returns A short descriptive text for the score
 */
export function getScoreDescription(score: number, category: keyof ScoreBreakdown): string {
  // Normalize score
  const validScore = Math.max(0, Math.min(100, score));
  
  // Generic descriptions
  if (validScore < 40) {
    return 'Needs significant improvement';
  } else if (validScore < 60) {
    return 'Has room for improvement';
  } else if (validScore < 80) {
    return 'Good, above average';
  } else {
    return 'Excellent, highly competitive';
  }
  
  // TODO: Add category-specific descriptions if needed
}

/**
 * Returns a list of improvement suggestions based on score breakdown
 * @param scores The complete score breakdown
 * @returns Array of improvement suggestions in order of priority
 */
export function getPrioritizedImprovements(scores: ScoreBreakdown): string[] {
  // Convert scores to an array of [category, score] pairs
  const scoreArray = Object.entries(scores) as [keyof ScoreBreakdown, number][];
  
  // Filter out the overall score and sort by ascending score (lowest first)
  const sortedScores = scoreArray
    .filter(([category]) => category !== 'overall')
    .sort(([, scoreA], [, scoreB]) => scoreA - scoreB);
  
  // Generate suggestions for the 3 lowest categories
  return sortedScores.slice(0, 3).map(([category, score]) => {
    switch(category) {
      case 'content':
        return 'Enhance your content with more quantifiable achievements and specifics about your contributions.';
      case 'ats':
        return 'Improve ATS compatibility by using industry-standard keywords relevant to your target positions.';
      case 'formatting':
        return 'Refine your resume formatting for better readability and professional presentation.';
      case 'impact':
        return 'Strengthen your impact statements to better demonstrate your value and contributions.';
      case 'skills':
        return 'Reorganize your skills section to better highlight relevant technical and soft skills.';
      case 'grammar':
        return 'Review your resume for grammatical errors, consistent tense, and professional language.';
      case 'clarity':
        return 'Improve clarity by using more concise language and clear achievement statements.';
      default:
        return 'Focus on improving the overall quality of your resume content and presentation.';
    }
  });
}
