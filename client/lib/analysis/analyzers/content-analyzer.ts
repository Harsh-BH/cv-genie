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
  
  // Handle special characters commonly used in resumes
  cleaned = cleaned.replace(/[""'']/g, '"')
                  .replace(/[–—]/g, '-')
                  .replace(/…/g, '...');
  
  // Clean up multiple spaces and line breaks
  cleaned = cleaned.replace(/ {2,}/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
  
  return cleaned;
}

// Analyze resume content quality
export async function analyzeContent(resume: StructuredResume): Promise<{ 
  executiveSummary: string; 
  overview: string;
  contentQuality: string;
  atsCompatibility?: string;
}> {
  try {
    // First, ensure all content is clean
    const cleanedResume = {
      ...resume,
      rawContent: resume.rawContent ? cleanContentForAnalysis(resume.rawContent) : '',
      sections: resume.sections.map(section => ({
        ...section,
        content: cleanContentForAnalysis(section.content)
      }))
    };

    // Create the prompt for executive summary
    const summaryPrompt = createStructuredPrompt(
      cleanedResume,
      `Provide a comprehensive executive summary of this resume's strengths and weaknesses in 3-4 paragraphs. 
       
       First paragraph: Assess the candidate's overall profile based on their experience, skills, and accomplishments.
       Focus on how effectively the resume portrays the candidate and their career narrative.
       
       Second paragraph: Highlight 3-4 specific strengths with concrete examples from the resume.
       
       Third paragraph: Identify 3-4 clear areas for improvement, again with specific examples.
       
       Final paragraph: Provide a forward-looking conclusion with 2-3 high-impact recommendations for improving this resume.
       
       If the resume mentions targeting a  role in the industry, tailor your analysis accordingly.
       
       Use professional, constructive language throughout. Be direct but encouraging.`,
      'This analysis will become the executive summary of the resume review.'
    );
    
    // Create the prompt for content quality analysis
    const contentPrompt = createStructuredPrompt(
      cleanedResume,
      `Analyze the quality of this resume's content in detail, organized by the following sections:

       ## Achievement Focus
       - Evaluate how well achievements are highlighted vs. just listing responsibilities
       - Rate the use of metrics, numbers, and quantifiable results (excellent/good/needs improvement)
       - Provide 2-3 specific examples of achievements that are effectively presented
       - Identify 2-3 bullet points that could be improved with more achievement focus
       
       ## Language and Phrasing
       - Assess the strength of action verbs used throughout the resume
       - Identify any passive voice, clichés, or generic phrasing
       - Note any inconsistencies in tense (past vs. present)
       - Provide 3-4 specific examples of strong or weak phrasing
       
       ## Specificity and Detail
       - Evaluate the balance between being concise and providing sufficient detail
       - Note any vague claims that lack supporting evidence
       - Recommend 2-3 specific areas where more precision would improve impact
       
       For each section, provide concrete examples from the resume and specific recommendations for improvement.`,
      'This analysis will focus specifically on the content quality.'
    );
    
    // Create the prompt for overall resume review 
    const overviewPrompt = createStructuredPrompt(
      cleanedResume,
      `Provide a comprehensive review of this resume from a hiring manager's perspective, organized as follows:
       
       ## Key Strengths (3-5)
       - List each strength with a specific example from the resume
       - Explain why this strength matters for a  position
       
       ## Areas for Improvement (3-5)
       - List each weakness with a specific example from the resume
       - Provide a concrete suggestion to address each weakness
       
       ## Impact Assessment
       - Evaluate how impactful this resume would be in a competitive job search
       - Assess whether the candidate's value proposition is clear
       - Determine if career progression and accomplishments tell a coherent story
       
       ## Overall Recommendation
       - Provide a clear overall assessment (Strong/Moderate/Needs Significant Work)
       - Identify the 3 most critical changes needed to improve this resume
       
       Be specific, actionable, and balanced in your analysis. Support all observations with concrete examples from the resume.`,
      'This analysis will serve as the overview section of the resume review.'
    );
    
    // Add ATS compatibility analysis
    const atsPrompt = createStructuredPrompt(
      cleanedResume,
      `Analyze this resume for ATS (Applicant Tracking System) compatibility. Focus on:

       ## Keyword Optimization
       - Identify key industry and role-specific keywords present and missing for positions
       - Rate keyword density and placement (excellent/good/needs improvement)
       - Suggest 5-7 specific keywords that should be added based on the  industry standards
       
       ## Format and Structure
       - Evaluate if the resume structure is ATS-friendly
       - Identify any potential formatting issues that might cause parsing problems
       - Assess section headers and organization for ATS readability
       
       ## Technical Compatibility
       - Note any potential issues with tables, graphics, headers/footers, or unusual formatting
       - Evaluate the clarity of job titles, company names, and dates
       - Rate overall ATS compatibility (Highly Compatible/Moderately Compatible/Needs Improvement)
       
       Provide specific recommendations to improve this resume's performance through ATS systems, with examples.`,
      'This analysis will focus on ATS compatibility and keyword optimization.'
    );
    
    // Run all prompts in parallel
    const [executiveSummary, contentQuality, overview, atsCompatibility] = await Promise.all([
      generatePerplexityResponse(summaryPrompt, 'sonar', 0.7),
      generatePerplexityResponse(contentPrompt, 'sonar', 0.7),
      generatePerplexityResponse(overviewPrompt, 'sonar', 0.7),
      generatePerplexityResponse(atsPrompt, 'sonar', 0.7)
    ]);
    
    return { 
      executiveSummary, 
      overview, 
      contentQuality,
      atsCompatibility 
    };
  } catch (error) {
    console.error('Content analysis error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);
    
    return {
      executiveSummary: `Error analyzing content: ${errorMessage}. Please check your resume format and try again.`,
      overview: 'Content analysis failed. Our systems encountered an issue processing your resume. Please try again or contact support if this persists.',
      contentQuality: 'Unable to analyze content quality due to an error. This might be caused by unusual formatting or content in your resume.',
      atsCompatibility: 'ATS compatibility analysis failed. Please ensure your resume doesn\'t contain complex formatting that might be causing issues.'
    };
  }
}
