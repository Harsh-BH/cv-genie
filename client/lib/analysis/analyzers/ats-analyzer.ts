import { StructuredResume } from '../models/analysis-types';
import { generatePerplexityResponse, createStructuredPrompt } from '../api/perplexity';

export async function analyzeAtsCompatibility(resume: StructuredResume): Promise<string> {
  try {
    const atsPrompt = createStructuredPrompt(
      resume,
      `Analyze this resume for ATS (Applicant Tracking System) compatibility. Focus on:
       1. Keyword optimization and relevance
       2. Proper formatting for ATS parsing
       3. Potential issues with tables, columns, headers, or graphics
       4. File format considerations
       5. Keyword stuffing concerns
       
       Provide specific examples of what works well and what needs improvement.
       Include recommendations for improving ATS compatibility.`,
      'This analysis will focus on how well the resume can be parsed by Applicant Tracking Systems.'
    );
    
    return await generatePerplexityResponse(atsPrompt, 'sonar', 0.6);
  } catch (error) {
    console.error('ATS analysis error:', error);
    return `Error analyzing ATS compatibility: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
