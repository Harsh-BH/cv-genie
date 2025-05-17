import { StructuredResume } from '../models/analysis-types';
import { generatePerplexityResponse, createStructuredPrompt } from '../api/perplexity';

export async function analyzeFormatting(resume: StructuredResume): Promise<string> {
  try {
    const formatPrompt = createStructuredPrompt(
      resume,
      `Perform a comprehensive analysis of this resume's formatting and structure. 

ANALYSIS CRITERIA:
1. Overall Layout & Visual Appeal:
   - Professional appearance and readability
   - Proper use of margins, spacing, and alignment
   - Effective use of emphasis (bold, italics, etc.)
   - Balance of text density and white space

2. Structural Organization:
   - Logical section ordering and hierarchy
   - Clear section headings and visual separation
   - Consistent formatting across similar elements
   - Appropriate resume length (1-2 pages for most candidates)

3. Content Formatting:
   - Consistent date formats (MM/YYYY, YYYY, etc.)
   - Uniform bullet point style and alignment
   - Consistent use of punctuation and capitalization
   - Font consistency and appropriate sizing

4. Specific Formatting Issues:
   - Identify any inconsistent spacing between sections
   - Check for awkward page breaks or orphaned content
   - Note any overuse of text decorations (bold, italics, underline)
   - Assess header/footer implementation if present

RESPONSE FORMAT:
1. Formatting Score: Rate the overall formatting on a scale of 1-10, with explanation
2. Strengths: List 2-3 specific strong formatting elements with concrete examples
3. Areas for Improvement: Identify 3-5 specific formatting issues with concrete examples from the resume
4. Prioritized Recommendations: Provide actionable, prioritized formatting improvements
5. Industry Best Practices: Mention 1-2 industry-specific formatting conventions relevant to this resume

Be specific and provide clear examples from the resume. Focus on practical, actionable improvements that will enhance visual appeal and readability.`,
      'This analysis provides a detailed assessment of resume formatting, structure, and visual organization with concrete examples and actionable recommendations.'
    );
    
    return await generatePerplexityResponse(formatPrompt, 'sonar', 0.7);
  } catch (error) {
    console.error('Format analysis error:', error);
    return `Error analyzing formatting: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
