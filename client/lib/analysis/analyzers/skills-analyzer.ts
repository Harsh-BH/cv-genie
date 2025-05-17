import { StructuredResume } from '../models/analysis-types';
import { generatePerplexityResponse, createStructuredPrompt } from '../api/perplexity';

export async function analyzeSkills(resume: StructuredResume): Promise<string> {
  try {
    // Extract target role/industry if available
    
    
    const skillsPrompt = createStructuredPrompt(
      resume,
      `Provide a comprehensive analysis of this resume's skills presentation. 

ANALYSIS AREAS:
1. SKILLS INVENTORY (Comprehensiveness):
   - Evaluate the range and depth of skills presented
   - Identify if technical, soft, and domain-specific skills are well-balanced
   - Note any industry-standard skills that appear outdated or cutting-edge

2. INDUSTRY & ROLE ALIGNMENT:
   - Assess how well the skills align with  'their apparent target role/industry'}
   - Identify any critical missing skills for this career path
   - Evaluate if skill proficiency levels (if mentioned) seem appropriate

3. SKILLS DEMONSTRATION:
   - Analyze how effectively skills are demonstrated through work experiences
   - Identify which skills are merely listed versus substantiated with achievements
   - Note if technical skills are backed by specific projects or certifications

4. KEYWORD OPTIMIZATION:
   - Evaluate the use of industry-specific keywords and phrases
   - Identify opportunities to incorporate more ATS-friendly skill terms
   - Assess if skill descriptions match current industry terminology

RECOMMENDATIONS:
- Provide 3-5 specific, actionable recommendations for improving skills presentation
- Suggest ways to better demonstrate existing skills through accomplishments
- Recommend any critical skills to add based on the apparent career target
- Suggest optimal organization/categorization of skills if improvements needed

Please provide a balanced assessment that acknowledges strengths while offering concrete improvement areas.`,
      'This analysis evaluates the resume\'s skills presentation, focusing on relevance, demonstration, and optimization for the target role.'
    );
    
    return await generatePerplexityResponse(skillsPrompt, 'sonar', 0.6); // Reduced temperature for more focused analysis
  } catch (error) {
    console.error('Skills analysis error:', error);
    return `Error analyzing skills: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
