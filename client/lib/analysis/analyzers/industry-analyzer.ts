import { StructuredResume } from '../models/analysis-types';
import { generatePerplexityResponse, createStructuredPrompt } from '../api/perplexity';

export async function analyzeIndustryFit(resume: StructuredResume): Promise<string> {
  try {
    // First, try to determine the industry/role this resume targets
    const industryPrompt = createStructuredPrompt(
      resume,
      `First, determine what industry and role type this resume appears to be targeting.
       Then analyze how well this resume aligns with industry expectations for that role:
       
       1. Use of appropriate industry terminology and keywords
       2. Demonstration of relevant skills and experiences
       3. Formatting and style alignment with industry norms
       4. Highlighting of industry-relevant achievements and metrics
       5. Areas where industry alignment could be improved
       
       Provide specific recommendations for better industry alignment.`,
      'This analysis will focus on industry fit and targeting.'
    );
    
    return await generatePerplexityResponse(industryPrompt, 'sonar', 0.7);
  } catch (error) {
    console.error('Industry analysis error:', error);
    return `Error analyzing industry fit: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
