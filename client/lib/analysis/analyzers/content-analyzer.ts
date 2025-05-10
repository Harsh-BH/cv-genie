import { StructuredResume } from '../models/analysis-types';
import { generatePerplexityResponse, createStructuredPrompt } from '../api/perplexity';
import { textReplacements } from '../models/common-replacements';

// Clean text before analysis to remove any remaining mangled characters
function cleanContentForAnalysis(text: string): string {
  if (!text) return '';
  
  // Replace any remaining Korean/CJK character sequences
  let cleaned = text.replace(/[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF]+/g, ' ');
  
  // Remove any character that's not standard ASCII, common punctuation, or common symbols
  cleaned = cleaned.replace(/[^\x20-\x7E\u2022\u2023\u25E6\u2043\u2219\n]/g, ' ');
  
  // Clean up multiple spaces and line breaks
  cleaned = cleaned.replace(/ {2,}/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
  
  return cleaned;
}

// Analyze resume content quality
export async function analyzeContent(resume: StructuredResume): Promise<{ 
  executiveSummary: string; 
  overview: string;
  contentQuality: string;
}> {
  try {
    // First, ensure all content is clean
    const cleanedResume = {
      ...resume,
      rawContent: resume.rawContent ? cleanContentForAnalysis(resume.rawContent) : undefined,
      sections: resume.sections.map(section => ({
        ...section,
        content: cleanContentForAnalysis(section.content)
      }))
    };
    
    // Create the prompt for executive summary
    const summaryPrompt = createStructuredPrompt(
      cleanedResume,
      `Provide a comprehensive executive summary of this resume's strengths and weaknesses. 
       Include an assessment of the candidate's overall profile based on experience, skills, and accomplishments.
       Focus on how effectively the resume portrays the candidate and their career narrative.`,
      'This analysis will become the executive summary of the resume review.'
    );
    
    // Create the prompt for content quality analysis
    const contentPrompt = createStructuredPrompt(
      cleanedResume,
      `Analyze the quality of this resume's content. Focus on:
       1. The effectiveness of the language and phrasing used
       2. Use of strong action verbs and specific accomplishments
       3. Clarity and specificity of responsibilities and achievements
       4. Quantified achievements and results
       5. Appropriate level of detail
       
       Provide specific examples from the resume to illustrate your points.`,
      'This analysis will focus specifically on the content quality.'
    );
    
    // Create the prompt for overall resume review 
    const overviewPrompt = createStructuredPrompt(
      cleanedResume,
      `Provide a comprehensive review of this resume, organized as follows:
       
       ## Strengths
       [List 3-5 standout strengths with specific examples]
       
       ## Weaknesses
       [List 3-5 key weaknesses or areas for improvement with specific examples]
       
       ## Overall Assessment
       [Provide a general assessment of the resume's effectiveness]`,
      'This analysis will serve as the overview section of the resume review.'
    );
    
    // Run all prompts in parallel
    const [executiveSummary, contentQuality, overview] = await Promise.all([
      generatePerplexityResponse(summaryPrompt, 'sonar', 0.7),
      generatePerplexityResponse(contentPrompt, 'sonar', 0.7),
      generatePerplexityResponse(overviewPrompt, 'sonar', 0.7)
    ]);
    
    return { executiveSummary, overview, contentQuality };
  } catch (error) {
    console.error('Content analysis error:', error);
    return {
      executiveSummary: `Error analyzing content: ${error instanceof Error ? error.message : 'Unknown error'}`,
      overview: 'Content analysis failed. Please try again.',
      contentQuality: 'Unable to analyze content quality due to an error.'
    };
  }
}
