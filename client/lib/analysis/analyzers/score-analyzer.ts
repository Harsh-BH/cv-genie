import { StructuredResume } from '../models/analysis-types';
import { generatePerplexityResponse, createStructuredPrompt } from '../api/perplexity';

interface ScoreBreakdown {
  overall: number;
  content: number;
  ats: number;
  formatting: number;
  impact: number;
  skills: number;
  grammar: number;
  clarity: number;
}

/**
 * Analyzes the resume content and returns a breakdown of scores across different dimensions
 */
export async function analyzeScores(
  resume: StructuredResume,
  existingAnalysis: {
    contentQuality?: string;
    atsCompatibility?: string;
    formattingReview?: string;
    industryFit?: string;
    skillsAnalysis?: string;
  }
): Promise<ScoreBreakdown> {
  try {
    // Create a specific prompt to generate scores
    const scorePrompt = createStructuredPrompt(
      resume,
      `Based on the resume content and previous analyses, provide percentage scores from 0-100% for each of these categories:
      
      ${existingAnalysis.contentQuality ? 'Taking into account this content quality analysis: ' + existingAnalysis.contentQuality.substring(0, 500) + '...' : ''}
      ${existingAnalysis.atsCompatibility ? 'Taking into account this ATS compatibility analysis: ' + existingAnalysis.atsCompatibility.substring(0, 500) + '...' : ''}
      ${existingAnalysis.formattingReview ? 'Taking into account this formatting review: ' + existingAnalysis.formattingReview.substring(0, 500) + '...' : ''}
      ${existingAnalysis.industryFit ? 'Taking into account this industry fit analysis: ' + existingAnalysis.industryFit.substring(0, 500) + '...' : ''}
      ${existingAnalysis.skillsAnalysis ? 'Taking into account this skills analysis: ' + existingAnalysis.skillsAnalysis.substring(0, 500) + '...' : ''}
      
      Return only a JSON object with these exact keys in this format:
      {
        "overall": [a number from 0-100 representing overall resume quality as a percentage],
        "content": [a number from 0-100 representing content quality as a percentage],
        "ats": [a number from 0-100 representing ATS compatibility as a percentage],
        "formatting": [a number from 0-100 representing formatting quality as a percentage],
        "impact": [a number from 0-100 representing industry alignment as a percentage],
        "skills": [a number from 0-100 representing skills presentation as a percentage],
        "grammar": [a number from 0-100 representing grammar correctness as a percentage],
        "clarity": [a number from 0-100 representing clarity as a percentage]
      }
      
      IMPORTANT: All scores must be numerical values from 0 to 100 representing percentages, not text descriptions.
      Do not include any explanatory text before or after the JSON. Only return the JSON object.
      `,
      'This task focuses on generating specific numerical percentage scores for resume evaluation metrics.'
    );
    
    // Get the scores from the AI
    const scoresResponse = await generatePerplexityResponse(scorePrompt, 'sonar', 0.1);
    
    // Parse the JSON response to get scores
    try {
      // Extract JSON object - it might have markdown code block formatting around it
      const jsonMatch = scoresResponse.match(/```json\s*(\{[\s\S]*?\})\s*```/) || 
                         scoresResponse.match(/\s*(\{[\s\S]*?\})\s*/);
      
      const jsonString = jsonMatch ? jsonMatch[1] : scoresResponse;
      const scores = JSON.parse(jsonString);
      
      console.log("Raw scores received:", scores);
      
      // Validate all required scores are present, or provide defaults
      return {
        overall: ensureValidScore(scores.overall),
        content: ensureValidScore(scores.content),
        ats: ensureValidScore(scores.ats),
        formatting: ensureValidScore(scores.formatting),
        impact: ensureValidScore(scores.impact),
        skills: ensureValidScore(scores.skills),
        grammar: ensureValidScore(scores.grammar),
        clarity: ensureValidScore(scores.clarity)
      };
    } catch (parseError) {
      console.error('Failed to parse score response:', parseError);
      console.log('Raw score response:', scoresResponse);
      
      // Return default scores if parsing fails
      return getDefaultScores();
    }
  } catch (error) {
    console.error('Score analysis error:', error);
    return getDefaultScores();
  }
}

// Helper to ensure score is a valid number between 0-100
// Detects if score is on a 0-10 scale and converts to 0-100 percentage
function ensureValidScore(score: any): number {
  // Convert to number, handling string representations
  let numScore: number;
  
  if (typeof score === 'string') {
    // Remove any % sign and convert to number
    numScore = Number(score.replace('%', ''));
  } else {
    numScore = Number(score);
  }
  
  // If not a valid number, return default
  if (isNaN(numScore)) return 50;
  
  // Check if score appears to be on a 0-10 scale
  if (numScore >= 0 && numScore <= 10 && Number.isInteger(numScore)) {
    // Convert from 0-10 scale to 0-100 percentage
    console.log(`Converting score ${numScore} from 0-10 scale to percentage`);
    numScore = numScore * 10;
  }
  
  // Ensure the score is within 0-100 range and rounded to nearest integer
  return Math.max(0, Math.min(100, Math.round(numScore)));
}

// Default scores if analysis fails
function getDefaultScores(): ScoreBreakdown {
  return {
    overall: 50,
    content: 50,
    ats: 50,
    formatting: 50,
    impact: 50,
    skills: 50,
    grammar: 50,
    clarity: 50
  };
}
