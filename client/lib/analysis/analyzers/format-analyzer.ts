import { StructuredResume } from '../models/analysis-types';
import { generatePerplexityResponse, createStructuredPrompt } from '../api/perplexity';

export async function analyzeFormatting(resume: StructuredResume): Promise<string> {
  try {
    const formatPrompt = createStructuredPrompt(
      resume,
      `Analyze this resume's formatting and structure. Focus on:
       1. Overall organization and readability
       2. Section structure and ordering
       3. Consistency in formatting (dates, bullet points, etc.)
       4. Use of whitespace and visual hierarchy
       5. Length appropriateness
       
       Look for formatting issues like inconsistent date formats, bullet styles, or organization.
       Provide recommendations to improve the resume's visual appeal and readability.`,
      'This analysis will focus on the resume structure, formatting, and visual organization.'
    );
    
    return await generatePerplexityResponse(formatPrompt, 'sonar', 0.6);
  } catch (error) {
    console.error('Format analysis error:', error);
    return `Error analyzing formatting: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
