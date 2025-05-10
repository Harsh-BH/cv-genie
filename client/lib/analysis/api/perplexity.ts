import { StructuredResume } from '../models/analysis-types';

// API configuration
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY!;
const API_URL = 'https://api.perplexity.ai/chat/completions';

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

// Generate a chat completion using Perplexity API
export async function generatePerplexityResponse(
  prompt: string,
  model = 'sonar',
  temperature = 0.7
): Promise<string> {
  if (!PERPLEXITY_API_KEY) {
    throw new Error('PERPLEXITY_API_KEY is not set in environment variables');
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
            content: 'You are an expert resume analyst and career coach with deep knowledge of industry standards, ATS systems, and effective resume writing. Provide detailed, professional analysis and advice.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Perplexity API error (${response.status}): ${errorText}`);
    }

    const data: PerplexityResponse = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Perplexity API error:', error);
    throw new Error(`Failed to generate analysis: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Create a more structured prompt from resume content
export function createStructuredPrompt(
  resume: StructuredResume, 
  task: string,
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
    // Use the raw content directly
    resumeContent = resume.rawContent;
  } else if (resume.sections && resume.sections.length > 0) {
    // Format sections in a structured way with clear separation
    resumeContent = resume.sections.map(section => {
      return `## ${section.title.toUpperCase()}\n${section.content}\n`;
    }).join('\n---\n');
  } else if (resume.fileData) {
    // Fall back to file data if available
    resumeContent = resume.fileData;
  } else {
    // Last resort - empty content
    resumeContent = "No content available for analysis";
  }
  
  return `
# SPECIFIC RESUME ANALYSIS TASK
You are analyzing a real resume for ${name}. This is NOT a hypothetical exercise.
Your analysis must be highly personalized to THIS SPECIFIC RESUME content only.

## File Information
- Name: ${fileName}
- Format: ${fileType}

${additionalContext}

# RESUME CONTENT (ANALYZE THIS SPECIFIC CONTENT ONLY):
${resumeContent}

# SPECIFIC TASK:
${task}

IMPORTANT INSTRUCTIONS:
1. Focus ONLY on the actual content in this specific resume
2. Do not make generic statements that could apply to any resume
3. Reference specific phrases and wording from the resume
4. Provide concrete, actionable feedback based on the exact content 
5. Do not invent or assume information not present in the resume

Provide your analysis in a clear, structured format with specific examples from this resume.
`;
}
