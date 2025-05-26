import { StructuredResume } from '../models/analysis-types';

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

const API_URL = 'https://api.perplexity.ai/chat/completions';

// ✅ Server-side call to Perplexity API
export async function generatePerplexityResponse(
  prompt: string,
  model = 'sonar',
  temperature = 0.7
): Promise<string> {
  const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

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
            content:
              'You are an expert resume analyst and career coach with deep knowledge of industry standards, ATS systems, and effective resume writing. Provide detailed, professional analysis and advice.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature,
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(`Perplexity API error (${response.status}): ${text}`);
    }

    const data: PerplexityResponse = JSON.parse(text);
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Perplexity API error:', error);
    throw new Error(
      `Failed to generate analysis: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

// ✅ Structured prompt builder
export function createStructuredPrompt(
  resume: StructuredResume,
  task: string,
  additionalContext = ''
): string {
  const name = resume.user?.name || 'Applicant';
  const fileName = resume.fileName || 'Resume';
  const fileType = fileName.split('.').pop()?.toLowerCase() || 'unknown';

  let resumeContent: string;

  if (resume.rawContent) {
    resumeContent = resume.rawContent;
  } else if (resume.sections && resume.sections.length > 0) {
    resumeContent = resume.sections
      .map(
        (section) =>
          `## ${section.title.toUpperCase()}\n${section.content}\n`
      )
      .join('\n---\n');
  } else if (resume.fileData) {
    resumeContent = resume.fileData;
  } else {
    resumeContent = 'No content available for analysis';
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
