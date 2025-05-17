import { StructuredResume } from '../models/analysis-types';
import { generatePerplexityResponse, createStructuredPrompt } from '../api/perplexity';

interface AtsAnalysisOptions {
  jobDescription?: string;
  industry?: string;
  includeScoring?: boolean;
  detailLevel?: 'basic' | 'comprehensive' | 'expert';
}

export async function analyzeAtsCompatibility(
  resume: StructuredResume, 
  options: AtsAnalysisOptions = {}
): Promise<string> {
  const { 
    jobDescription, 
    industry, 
    includeScoring = true, 
    detailLevel = 'comprehensive' 
  } = options;
  
  try {
    const targetJobContext = jobDescription 
      ? `\n\nJOB DESCRIPTION TO MATCH AGAINST:\n${jobDescription}\n\nAnalyze how well the resume is optimized for this specific job description.`
      : '';
    
    const industryContext = industry
      ? `\n\nThe candidate is targeting the ${industry} industry. Include industry-specific ATS considerations.`
      : '';
    
    const atsPrompt = createStructuredPrompt(
      resume,
      `Perform a detailed ATS (Applicant Tracking System) compatibility analysis on this resume.${targetJobContext}${industryContext}

YOUR ANALYSIS SHOULD COVER:

1. KEYWORD OPTIMIZATION (30% of analysis)
   - Identify critical keywords present and missing
   - Assess keyword placement throughout the resume
   - Evaluate use of both acronyms and spelled-out terms (e.g., "AI" and "Artificial Intelligence")
   - Check for relevant action verbs and industry terminology
   ${jobDescription ? '- Match rate between resume keywords and job description keywords' : ''}

2. FORMATTING & STRUCTURE (25% of analysis)
   - Evaluate section headers and organization
   - Assess parsing challenges with bullet points, special characters, and symbols
   - Review line spacing and document structure
   - Identify potential parsing issues with tables, columns, or non-standard layouts

3. TECHNICAL COMPATIBILITY (15% of analysis)
   - File format considerations
   - Font compatibility
   - Assess for hidden text or images that may confuse ATS
   - Check for headers/footers that might be missed

4. CONTENT QUALITY (20% of analysis)
   - Balance between keyword optimization and readability
   - Assess for keyword stuffing that might trigger spam filters
   - Evaluate quantification of achievements
   - Check if skills are substantiated with examples

5. OVERALL EFFECTIVENESS (10% of analysis)
   - Provide an overall ATS compatibility score (1-100)
   - Assess first impression for human reviewers after ATS scanning
   
${includeScoring ? 'INCLUDE a score out of 100 for each section and an overall score.' : ''}

RECOMMENDATIONS:
- Provide 3-5 specific, high-impact recommendations to improve ATS compatibility
- Prioritize these recommendations by potential impact
- Include examples of improved phrasing where relevant
- Suggest specific keywords to add based on industry standards${jobDescription ? ' and the job description' : ''}

FORMAT YOUR RESPONSE AS FOLLOWS:
1. Brief summary of ATS compatibility (2-3 sentences)
2. Section-by-section analysis with specific examples
3. Prioritized recommendations
${includeScoring ? '4. Scoring breakdown' : ''}`,
      'This in-depth analysis focuses on maximizing the resume\'s compatibility with Applicant Tracking Systems to increase the chances of passing initial automated screening.'
    );
    
    const temperature = detailLevel === 'basic' ? 0.7 : detailLevel === 'expert' ? 0.3 : 0.5;
    return await generatePerplexityResponse(atsPrompt, 'sonar', temperature);
  } catch (error) {
    console.error('ATS analysis error:', error);
    return `Error analyzing ATS compatibility: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again later or contact support if the problem persists.`;
  }
}

// Function to analyze resume against a specific job description
export async function analyzeAtsJobMatch(
  resume: StructuredResume,
  jobDescription: string
): Promise<string> {
  return analyzeAtsCompatibility(resume, { 
    jobDescription, 
    includeScoring: true,
    detailLevel: 'expert'
  });
}
