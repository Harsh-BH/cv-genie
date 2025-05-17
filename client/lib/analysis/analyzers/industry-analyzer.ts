import { StructuredResume } from '../models/analysis-types';
import { generatePerplexityResponse, createStructuredPrompt } from '../api/perplexity';

export async function analyzeIndustryFit(resume: StructuredResume): Promise<string> {
  try {
    const industryPrompt = createStructuredPrompt(
      resume,
      `Conduct a comprehensive industry alignment analysis of this resume.

ANALYSIS PROCESS:
1. First, identify the primary industry and specific role type this resume appears to be targeting.
2. Then analyze how well this resume aligns with current industry standards and expectations for that role.

INDUSTRY ALIGNMENT CRITERIA:
1. Keyword Optimization (25%):
   - Assess presence of industry-specific terminology and technical keywords
   - Evaluate use of role-specific competencies and skills
   - Check for relevant tools, methodologies, and systems
   - Analyze keyword density and strategic placement

2. Experience Framing (25%):
   - Evaluate how experiences are contextualized for the target industry
   - Assess demonstration of industry-relevant achievements
   - Check if industry-specific challenges and solutions are highlighted
   - Analyze if experiences match current industry trends and demands

3. Qualification Alignment (20%):
   - Compare resume against typical qualifications for the identified role
   - Assess education, certifications, and credentials relevance
   - Evaluate technical and soft skill alignment
   - Analyze any potential qualification gaps

4. Industry Formatting Conventions (15%):
   - Assess adherence to industry-specific resume conventions
   - Evaluate section organization and emphasis for the target role
   - Check presentation of industry-specific projects or achievements
   - Analyze use of industry-appropriate language and tone

5. Competitive Positioning (15%):
   - Compare against typical industry competitor profiles
   - Assess unique selling points for the target industry
   - Evaluate demonstration of industry-valued traits
   - Analyze potential competitive advantages and disadvantages

RESPONSE FORMAT:
1. Industry & Role Identification:
   - Primary industry identified with confidence level
   - Specific role/position type with explanation
   - Alternative industries/roles this resume might target

2. Industry Alignment Score: Rate overall industry alignment on a scale of 1-10, with explanation

3. Industry-Specific Strengths:
   - List 3-4 elements that strongly align with industry expectations
   - Provide specific examples from the resume for each strength
   - Explain why these elements are valuable in the identified industry

4. Industry Alignment Gaps:
   - Identify 3-5 specific industry expectations not adequately addressed
   - For each gap, explain its importance in the target industry
   - Provide a specific suggestion for addressing each gap

5. Industry Keyword Analysis:
   - List 5-8 critical industry keywords present in the resume
   - Identify 5-8 missing industry keywords that should be incorporated
   - Suggest optimal placement for missing keywords

6. Industry-Specific Recommendations:
   - Provide 3-5 prioritized, actionable recommendations to better align with industry standards
   - Include specific examples of how to implement each recommendation
   - Reference current industry trends or standards in recommendations

Be specific, actionable, and provide concrete examples from both the resume and industry standards.`,
      'This analysis evaluates how well the resume aligns with standards and expectations of the target industry, with detailed recommendations for improving industry fit.'
    );
    
    return await generatePerplexityResponse(industryPrompt, 'sonar', 0.7);
  } catch (error) {
    console.error('Industry analysis error:', error);
    return `Error analyzing industry fit: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
