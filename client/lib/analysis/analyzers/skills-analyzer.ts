import { StructuredResume } from '../models/analysis-types';
import { generatePerplexityResponse, createStructuredPrompt } from '../api/perplexity';

export async function analyzeSkills(resume: StructuredResume): Promise<string> {
  try {
    const skillsPrompt = createStructuredPrompt(
      resume,
      `Analyze this resume's skills presentation. Focus on:
       1. Comprehensiveness of skills listed
       2. Relevance of skills to apparent target role/industry
       3. Balance of technical, soft, and domain-specific skills
       4. How well skills are demonstrated through experiences (not just listed)
       5. Missing critical skills for their apparent target role
       
       Identify key strengths and gaps in the skills presentation.
       Suggest improvements on how skills could be better presented or demonstrated.`,
      'This analysis will focus on skills presentation, relevance, and gaps.'
    );
    
    return await generatePerplexityResponse(skillsPrompt, 'sonar', 0.7);
  } catch (error) {
    console.error('Skills analysis error:', error);
    return `Error analyzing skills: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
