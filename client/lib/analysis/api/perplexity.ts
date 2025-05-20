import { StructuredResume } from '../models/analysis-types';

// API configuration
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY!;
const API_URL = 'https://api.perplexity.ai/chat/completions';
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // ms

export interface PerplexityResponse {
  id: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export type AnalysisType = 
  | 'general' 
  | 'ats-compatibility' 
  | 'keyword-optimization' 
  | 'strength-weakness' 
  | 'improvement-focused'
  | 'custom';

export interface PerplexityOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  presencePenalty?: number;
  frequencyPenalty?: number;
  retries?: number;
}

const defaultOptions: PerplexityOptions = {
  model: 'sonar',  // Using latest model
  temperature: 0.7,
  maxTokens: 2048,
  retries: MAX_RETRIES
};

// Generate a chat completion using Perplexity API with improved error handling and retries
export async function generatePerplexityResponse(
  prompt: string,
  options: PerplexityOptions = {}
): Promise<string> {
  if (!PERPLEXITY_API_KEY) {
    throw new Error('PERPLEXITY_API_KEY is not set in environment variables');
  }

  const { 
    model, temperature, maxTokens, topP, 
    presencePenalty, frequencyPenalty, retries 
  } = { ...defaultOptions, ...options };
  
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= (retries || 0); attempt++) {
    if (attempt > 0) {
      // Wait before retry with exponential backoff
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * Math.pow(2, attempt-1)));
      console.log(`Retrying Perplexity API request (attempt ${attempt}/${retries})`);
    }
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content: `You are an expert resume analyst, career coach, and hiring manager with 15+ years of experience. 
You have deep knowledge of industry standards, ATS systems, hiring practices across various industries, and effective resume writing techniques.
Provide detailed, data-driven, and professional analysis based STRICTLY on the resume content provided.
Your analysis should be specific, actionable, and directly reference content from the resume.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature,
          max_tokens: maxTokens,
          top_p: topP,
          presence_penalty: presencePenalty,
          frequency_penalty: frequencyPenalty,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Perplexity API error (${response.status}): ${errorText}`);
      }

      const data: PerplexityResponse = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      // Only continue to retry on network or server errors, not on client errors
      if (error instanceof Error && error.message.includes('API error (4')) {
        break;
      }
    }
  }
  
  console.error('Perplexity API error after retries:', lastError);
  throw new Error(`Failed to generate analysis: ${lastError?.message || 'Unknown error'}`);
}

// Extract key resume information to help focus the analysis
function extractResumeHighlights(resume: StructuredResume): string {
  const highlights: string[] = [];
  
  // Extract skills if available
  if (resume.skills && resume.skills.length > 0) {
    highlights.push(`## SKILLS\n${resume.skills.join(', ')}`);
  }
  
  // Extract job titles and companies for career trajectory
  const experienceSection = resume.sections?.find(s => 
    s.title.toLowerCase().includes('experience') || 
    s.title.toLowerCase().includes('employment')
  );
  
  if (experienceSection) {
    const content = experienceSection.content;
    const companies = content.match(/(?:at|@|with)\s+([A-Z][A-Za-z0-9\s&.,]+)(?:,|\.|$|\n)/g) || [];
    const positions = content.match(/(?:^|\n)([A-Z][A-Za-z\s]+)(?:\s+at|\s*\-|\s*\|)/g) || [];
    
    if (positions.length > 0 || companies.length > 0) {
      highlights.push(`## CAREER PROGRESSION\n${positions.map(p => p.trim()).join('\n')}`);
    }
  }
  
  // Extract education level
  const education = resume.sections?.find(s => s.title.toLowerCase().includes('education'))?.content;
  if (education) {
    const degrees = education.match(/(?:Bachelor|Master|MBA|Ph\.D|Doctor|Associate)['']?s?(?:\s+of\s+|\s+in\s+|\s+degree\s+in\s+)?[A-Z][A-Za-z\s]+/g) || [];
    if (degrees.length > 0) {
      highlights.push(`## EDUCATION HIGHLIGHTS\n${degrees.map(d => d.trim()).join('\n')}`);
    } else {
      highlights.push(`## EDUCATION HIGHLIGHTS\n${education.split('\n').slice(0, 3).join('\n')}`);
    }
  }
  
  return highlights.length > 0 ? highlights.join('\n\n') : '';
}

// Create a more structured prompt from resume content with enhanced guidance
export function createStructuredPrompt(
  resume: StructuredResume, 
  analysisType: AnalysisType,
  customTask?: string,
  additionalContext = ''
): string {
  // Get personal info
  const name = resume.user?.name || 'Applicant';
  
  // Get resume metadata for more personalized analysis
  const fileName = resume.fileName || 'Resume';
  const fileType = fileName.split('.').pop()?.toLowerCase() || 'unknown';
  
  // Get content - either use the raw content or format the sections
  let resumeContent: string;
  
  if (resume.rawContent) {
    resumeContent = resume.rawContent;
  } else if (resume.sections && resume.sections.length > 0) {
    resumeContent = resume.sections.map(section => {
      return `## ${section.title.toUpperCase()}\n${section.content}\n`;
    }).join('\n---\n');
  } else if (resume.fileData) {
    resumeContent = resume.fileData;
  } else {
    resumeContent = "No content available for analysis";
  }
  
  // Extract key highlights to help focus the analysis
  const highlights = extractResumeHighlights(resume);
  
  // Select the appropriate task based on analysis type
  let task = '';
  
  switch (analysisType) {
    case 'ats-compatibility':
      task = `Perform a detailed ATS (Applicant Tracking System) compatibility analysis on this resume:

1. FORMAT ANALYSIS:
   - Evaluate the resume structure for ATS readability
   - Assess the file format compatibility with ATS systems
   - Identify any formatting elements that could cause parsing errors

2. KEYWORD OPTIMIZATION:
   - Identify which industry-specific keywords are present
   - Note which important keywords appear to be missing
   - Evaluate keyword placement and frequency

3. SECTION STRUCTURE:
   - Assess if the resume has proper section headers that ATS systems recognize
   - Check for proper chronological ordering of experience
   - Evaluate if contact information is properly formatted

4. SPECIFIC PARSING CONCERNS:
   - Identify any tables, columns, headers, footers, or graphics that may cause issues
   - Check for unusual characters or formatting that could confuse ATS systems
   - Assess if dates and company names are formatted consistently

5. QUANTIFIABLE SCORING:
   - Provide an ATS compatibility score from 1-10
   - Explain the exact reasons for the score with specific examples from the resume
   - List the top 3-5 critical improvements needed to improve ATS compatibility

Your analysis must cite specific examples from the resume text for each issue identified and recommendation made.`;
      break;
      
    case 'keyword-optimization':
      task = `Perform comprehensive keyword analysis and optimization for this resume:

1. CURRENT KEYWORD INVENTORY:
   - List all industry-specific keywords and phrases currently present in the resume
   - Evaluate their placement, frequency, and context
   - Identify which sections have strong keyword presence and which are lacking

2. MISSING CRITICAL KEYWORDS:
   - Identify industry-standard keywords that are notably absent but should be included
   - Suggest relevant technical skills, certifications, or methodologies that are missing
   - Recommend domain-specific terminology that would strengthen the resume

3. KEYWORD INTEGRATION STRATEGY:
   - Provide specific recommendations for where and how to naturally incorporate missing keywords
   - Suggest rewording of existing phrases to better incorporate relevant terminology
   - Identify opportunities to transform generic language into industry-specific language

4. CONTEXT OPTIMIZATION:
   - Evaluate if keywords are used in the proper context
   - Suggest ways to connect keywords to achievements and results
   - Recommend improvements to demonstrate proficiency with key terms

5. BEFORE/AFTER EXAMPLES:
   - Provide 3-5 specific examples from the resume with before/after rewrites
   - Show how to transform generic statements into keyword-rich, impactful statements
   - Demonstrate natural keyword integration without "keyword stuffing"

Be extremely specific, citing exact phrases from the resume and providing concrete, tailored rewrites.`;
      break;
      
    case 'strength-weakness':
      task = `Conduct a comprehensive strengths and weaknesses analysis of this resume:

1. MAJOR STRENGTHS (Cite specific examples from the resume for each):
   - Identify 3-5 most impactful strengths of this specific resume
   - Highlight particularly effective phrasing, achievements, or presentation elements
   - Explain why these elements are effective from a hiring manager's perspective
   - Quote the exact text from the resume that demonstrates each strength

2. PRIMARY WEAKNESSES (Cite specific examples from the resume for each):
   - Identify 3-5 critical improvement areas with specific examples
   - Explain why each weakness could negatively impact hiring potential
   - Highlight vague, generic, or duty-focused statements that lack impact
   - Quote the exact text from the resume that demonstrates each weakness

3. CONTENT EVALUATION:
   - Assess the balance between responsibilities and accomplishments
   - Evaluate the effectiveness of quantification and result metrics
   - Analyze the clarity and specificity of role descriptions
   - Identify any critical missing information

4. PRESENTATION ASSESSMENT:
   - Evaluate the overall organization and readability
   - Assess the consistency of formatting and structure
   - Analyze the effectiveness of the resume's visual hierarchy
   - Identify any distracting or confusing elements

5. PRIORITIZED IMPROVEMENT PLAN:
   - Rank the 3 most critical improvements needed in order of importance
   - Provide specific, actionable recommendations for each weakness
   - Include before/after examples to demonstrate how to implement changes
   - Suggest how to leverage existing strengths while addressing weaknesses

Every observation must reference specific content from this resume with direct quotes.`;
      break;
      
    case 'improvement-focused':
      task = `Provide a detailed, improvement-focused analysis of this resume with specific recommendations:

1. ACHIEVEMENT ENHANCEMENT:
   - Identify statements that could be strengthened with metrics, results, or specific contributions
   - Provide before/after examples showing how to transform weak statements into compelling ones
   - Suggest ways to quantify accomplishments that currently lack measurements

2. LANGUAGE OPTIMIZATION:
   - Identify passive or weak phrasing that should be replaced with strong action verbs
   - Highlight vague or generic statements that need more specificity
   - Suggest improvements for technical language and industry terminology
   - Flag any grammatical issues, inconsistencies, or unprofessional language

3. STRUCTURAL IMPROVEMENTS:
   - Analyze the overall organization and suggest any needed structural changes
   - Evaluate the effectiveness of section ordering and content hierarchy
   - Identify content that should be emphasized or de-emphasized
   - Suggest improvements for scanability and reader engagement

4. CONTENT GAPS:
   - Identify critical missing information that should be added
   - Highlight experience or skills that appear underrepresented
   - Suggest additions that would strengthen the overall presentation
   - Identify redundancies or unnecessary content that should be removed

5. HIGH-IMPACT TRANSFORMATIONS:
   - Provide 5 specific, high-impact changes that would most improve this resume
   - For each, include the existing text and a specific rewrite
   - Explain the rationale behind each improvement
   - Prioritize changes that will have the greatest impact on hiring potential

Be extremely specific in your analysis, quoting directly from the resume and providing concrete rewrites and suggestions.`;
      break;
      
    case 'general':
      task = `Provide a comprehensive professional analysis of this resume with actionable feedback:

1. INITIAL IMPRESSION:
   - Assess the overall impact and clarity of the resume
   - Evaluate the effectiveness of the layout and visual organization
   - Analyze how well the resume conveys the applicant's value proposition
   - Identify the strongest and weakest elements at first glance

2. CONTENT QUALITY ASSESSMENT:
   - Evaluate the strength and specificity of accomplishments and contributions
   - Assess the balance between responsibilities and achievements
   - Analyze the effectiveness of skill presentation and relevance
   - Evaluate how well experience is contextualized and quantified

3. CAREER NARRATIVE:
   - Assess how effectively the resume tells a coherent career story
   - Identify any gaps, inconsistencies, or progression issues
   - Evaluate the alignment between experience, skills, and apparent career goals
   - Suggest improvements to strengthen the overall narrative

4. SECTION-BY-SECTION ANALYSIS:
   - Provide specific feedback on each major section (Summary/Objective, Experience, Education, Skills, etc.)
   - Identify the strongest and weakest points in each section
   - Suggest specific improvements for each section with examples
   - Note any missing sections that should be added

5. PRIORITIZED RECOMMENDATIONS:
   - List the 5 most important changes needed in order of priority
   - Provide specific, actionable guidance for implementing each change
   - Include before/after examples for key improvements
   - Explain the expected impact of each recommended change

Every point of feedback must reference specific content from this resume with exact quotes or clear references.`;
      break;
      
    case 'custom':
      task = customTask || 'Analyze this resume and provide detailed feedback.';
      break;
  }
  
  return `
# EXPERT RESUME ANALYSIS - DETAILED EVALUATION
You are analyzing a real resume for ${name}. This is NOT a hypothetical scenario.
Your analysis must be STRICTLY based on the ACTUAL CONTENT provided in THIS SPECIFIC RESUME.

## Document Information
- Filename: ${fileName}
- Format: ${fileType}
${additionalContext ? `\n## Additional Context\n${additionalContext}` : ''}

${highlights ? `# KEY HIGHLIGHTS EXTRACTED FOR REFERENCE\n${highlights}\n` : ''}

# COMPLETE RESUME CONTENT TO ANALYZE:
${resumeContent}

# ANALYSIS TASK:
${task}

## CRITICAL GUIDELINES - FOLLOW THESE EXACTLY:
1. NEVER invent or assume details not explicitly stated in the resume
2. ALWAYS cite specific text, bullet points, or sections from the resume in your analysis
3. Provide SPECIFIC, CONCRETE examples and rewrites, not generic advice
4. Format your response with clear HEADINGS, SUBHEADINGS, and BULLET POINTS
5. Focus on ACTIONABLE recommendations with clear BEFORE/AFTER examples
6. Be HONEST but CONSTRUCTIVE - balance critique with appreciation of strengths
7. Base ALL feedback on ACTUAL CONTENT in this specific resume
8. For each recommendation, explain both WHAT to change and WHY it matters
9. Address both CONTENT and PRESENTATION aspects of the resume
10. NEVER provide generic "template" feedback that could apply to any resume

FORMAT YOUR RESPONSE WITH CLEAR SECTIONS, BULLET POINTS, AND EXAMPLES FOR MAXIMUM READABILITY.
`;
}

// Helper functions to create specialized prompts for different analysis types
export function createATSCompatibilityPrompt(resume: StructuredResume): string {
  return createStructuredPrompt(resume, 'ats-compatibility');
}

export function createKeywordOptimizationPrompt(resume: StructuredResume): string {
  return createStructuredPrompt(resume, 'keyword-optimization');
}

export function createStrengthWeaknessPrompt(resume: StructuredResume): string {
  return createStructuredPrompt(resume, 'strength-weakness');
}

export function createImprovementFocusedPrompt(resume: StructuredResume): string {
  return createStructuredPrompt(resume, 'improvement-focused');
}

export function createGeneralAnalysisPrompt(resume: StructuredResume): string {
  return createStructuredPrompt(resume, 'general');
}

export function createCustomPrompt(resume: StructuredResume, customTask: string): string {
  return createStructuredPrompt(resume, 'custom', customTask);
}

// Function to get combined analysis with multiple perspectives
export async function getComprehensiveAnalysis(
  resume: StructuredResume,
  options: PerplexityOptions = {}
): Promise<string> {
  // Use a cooler temperature for more precise analysis
  const analysisOptions = {
    ...options,
    temperature: options.temperature || 0.5,
  };
  
  const prompt = `
# COMPREHENSIVE RESUME ANALYSIS REQUEST
I need a complete, multi-dimensional analysis of the following resume.

The analysis should include:
1. OVERALL ASSESSMENT - General strengths and weaknesses
2. ATS COMPATIBILITY - How well the resume will perform with ATS systems
3. CONTENT EVALUATION - Quality and impact of the accomplishments and experience
4. IMPROVEMENT ROADMAP - Prioritized list of specific changes needed

For each element of your analysis:
- Reference specific text from the resume
- Provide concrete before/after examples for improvements
- Explain the rationale behind each recommendation

${createStructuredPrompt(resume, 'general').split('# ANALYSIS TASK:')[0]}
`;

  return generatePerplexityResponse(prompt, analysisOptions);
}
