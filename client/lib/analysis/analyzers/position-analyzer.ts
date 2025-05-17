import { StructuredResume, PositionedSuggestion } from '../models/analysis-types';
import { generatePerplexityResponse, createStructuredPrompt } from '../api/perplexity';
import { v4 as uuidv4 } from 'uuid';

export async function generatePositionedSuggestions(resume: StructuredResume): Promise<PositionedSuggestion[]> {
  try {
    const sectionsPrompt = createStructuredPrompt(
      resume,
      `As a professional resume analyst, thoroughly review this resume and identify specific issues that need improvement. Be precise in your analysis.

      For each issue you identify:
      
      1. Identify the exact section where the issue occurs (e.g., "Experience", "Education", "Skills", "Summary", etc.)
      2. Extract the exact text snippet showing the problematic content (be specific and use actual text from the resume)
      3. Describe the specific issue in a concise way (e.g., "weak action verb", "missing quantifiable results", "vague skill description")
      4. Provide detailed reasoning why this is a problem for recruiters, ATS systems, or hiring managers
      5. Offer a specific, tailored suggestion for improvement
      6. Include an example of the fixed/improved text
      7. Rate the severity as:
         - critical: seriously impairs chances of getting an interview
         - high: significantly weakens the resume
         - medium: should be improved but not blocking
         - low: minor improvement opportunity
      8. Categorize the issue as:
         - content: issues with the actual information presented
         - formatting: issues with layout, spacing, or organization
         - ats: issues that might prevent passing Applicant Tracking Systems
         - skills: issues with how skills are presented or which skills are included/missing
         - industry: issues with industry-specific expectations or standards
         - overall: general issues affecting the entire resume
      
      For example:
      - Weak bullet points like "Responsible for managing team" should be improved to "Led cross-functional team of 5 engineers, delivering 3 major projects ahead of schedule"
      - Vague skill listings like "Programming languages" should be specific: "Python (5 years), JavaScript (3 years), SQL (4 years)"
      - Missing quantifiable achievements in experience sections should include metrics like "increased efficiency by 27%"
      
      Format your response as valid JSON with this exact structure:
      [
        {
          "sectionTitle": "Experience",
          "textSnippet": "Responsible for managing team",
          "issue": "Weak action verb",
          "reasoning": "Starting with 'Responsible for' is passive and less impactful. Recruiters look for achievements and direct actions.",
          "suggestion": "Replace with stronger action verb and add specific team size and achievements",
          "exampleFix": "Led and mentored team of 5 developers, delivering 3 major projects on time and 15% under budget",
          "severity": "medium",
          "category": "content"
        },
        ...more issues
      ]
      
      Focus on the most impactful improvements first. Include at least 8-10 specific issues across different sections and varying severity levels. Be extremely thorough and precise in your analysis.`,
      'This detailed analysis will identify specific problem areas in the resume with actionable suggestions for improvement.'
    );
    
    const response = await generatePerplexityResponse(sectionsPrompt, 'sonar', 0.7);
    
    // Extract and parse the JSON part from the response
    const parsedSuggestions = extractJsonFromResponse(response);
    
    if (!parsedSuggestions || !Array.isArray(parsedSuggestions) || parsedSuggestions.length === 0) {
      console.warn('Failed to parse suggestions or empty result:', response);
      return generateFallbackSuggestion('Failed to parse suggestions properly');
    }
    
    // Convert to PositionedSuggestion[] with validation
    return parsedSuggestions.map(suggestion => mapToPositionedSuggestion(suggestion));
  } catch (error) {
    console.error('Positioned suggestions error:', error);
    return generateFallbackSuggestion(error instanceof Error ? error.message : 'Unknown error');
  }
}

function extractJsonFromResponse(response: string): any[] {
  try {
    // First, try to find a JSON block in markdown format
    const jsonBlockMatch = response.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonBlockMatch && jsonBlockMatch[1]) {
      const jsonContent = jsonBlockMatch[1].trim();
      return JSON.parse(jsonContent);
    }
    
    // Next, try to find anything that looks like a JSON array
    const jsonArrayMatch = response.match(/\[\s*\{\s*"[^"]+"\s*:/);
    if (jsonArrayMatch && jsonArrayMatch.index !== undefined) {
      const startIndex = jsonArrayMatch.index;
      let bracketCount = 0;
      let endIndex = startIndex;
      
      // Find the matching closing bracket
      for (let i = startIndex; i < response.length; i++) {
        if (response[i] === '[') bracketCount++;
        if (response[i] === ']') bracketCount--;
        if (bracketCount === 0) {
          endIndex = i + 1;
          break;
        }
      }
      
      const jsonStr = response.substring(startIndex, endIndex);
      return JSON.parse(jsonStr);
    }
    
    // Last resort: try to parse the entire response as JSON
    return JSON.parse(response.trim());
  } catch (e) {
    console.error('JSON extraction failed:', e, 'Response:', response);
    return [];
  }
}

function mapToPositionedSuggestion(suggestion: any): PositionedSuggestion {
  const category = validateField(
    suggestion.category, 
    ['content', 'formatting', 'ats', 'skills', 'industry', 'overall'], 
    'content'
  ) as 'content' | 'formatting' | 'ats' | 'skills' | 'industry' | 'overall';

  const severity = validateField(
    suggestion.severity, 
    ['critical', 'high', 'medium', 'low'], 
    'medium'
  ) as 'critical' | 'high' | 'medium' | 'low';

  // Validate and provide defaults for required fields
  return {
    id: uuidv4(),
    type: category, // Using category for type ensures consistency
    sectionType: suggestion.sectionTitle || 'General',
    original: suggestion.textSnippet || '',
    improved: suggestion.exampleFix || '',
    issue: suggestion.issue || 'Identified Issue',
    suggestion: suggestion.suggestion || 'Suggested Improvement',
    reasoning: suggestion.reasoning || 'No reasoning provided',
    severity,
    category,
    position: {
      sectionTitle: suggestion.sectionTitle || 'General',
      textSnippet: suggestion.textSnippet || '',
      lineNumber: suggestion.lineNumber || undefined,
      charRange: suggestion.charRange || undefined
    }
  };
}

function validateField(value: any, allowedValues: string[], defaultValue: string): string {
  if (!value || typeof value !== 'string' || !allowedValues.includes(value.toLowerCase())) {
    return defaultValue;
  }
  return value.toLowerCase();
}

function generateFallbackSuggestion(errorMessage: string): PositionedSuggestion[] {
  return [{
    id: uuidv4(),
    type: 'overall',
    sectionType: 'General',
    original: '',
    improved: '',
    issue: 'Error Analyzing Resume',
    suggestion: 'Please try again or contact support',
    reasoning: `Failed to generate positioned suggestions: ${errorMessage}`,
    severity: 'medium',
    category: 'overall',
    position: {
      sectionTitle: 'General',
      textSnippet: '',
      lineNumber: undefined,
      charRange: undefined
    }
  }];
}
