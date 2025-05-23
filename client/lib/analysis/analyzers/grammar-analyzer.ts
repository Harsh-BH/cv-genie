import { StructuredResume, GrammarIssue } from '../models/analysis-types';
import { generatePerplexityResponse, createStructuredPrompt } from '../api/perplexity';
import { v4 as uuidv4 } from 'uuid';

/**
 * Analyzes the resume for grammar, spelling, and language issues
 * @param resume The structured resume data
 * @returns A list of grammar issues with explanations and suggestions
 */
export async function analyzeGrammar(resume: StructuredResume): Promise<{ 
  grammarAnalysis: string;
  grammarIssues: GrammarIssue[];
}> {
  try {
    // Create a focused prompt for grammar analysis
    const grammarPrompt = createStructuredPrompt(
      resume,
      'custom',
      `Analyze this resume for grammar, spelling, language usage, and style issues.

ANALYSIS FRAMEWORK:
1. Spelling & Grammar (40%):
   - Identify misspelled words, typos, and grammatical errors
   - Note inconsistent or incorrect punctuation
   - Flag awkward phrasing or sentence structures

2. Verb Tense Consistency (20%):
   - Check for consistent use of past tense for previous positions
   - Verify present tense usage for current positions
   - Identify any jarring tense shifts

3. Style & Language (30%):
   - Evaluate professional tone and language appropriateness
   - Identify clichés, redundancies, or overly complex language
   - Flag unnecessarily wordy phrases that could be simplified

4. Formatting Consistency (10%):
   - Check for consistent capitalization in titles, headings, and bullet points
   - Note inconsistent date formats or number presentations
   - Identify inconsistent spacing or bullet point styling

RESPONSE FORMAT:
1. General Assessment: Brief overview of the resume's grammar and language quality on a scale of 1-10
2. Key Issues Summary: Summary of the most prevalent issues found
3. Detailed Analysis: Section-by-section breakdown of specific issues
4. Improvement Recommendations: 3-5 key suggestions for improving grammar and language

Be specific, diplomatic, and constructive in your feedback.`
    );
    
    // Create a structured format for specific issues
    const issuesPrompt = createStructuredPrompt(
      resume,
      'custom',
      `Identify specific grammar, spelling, and language usage issues in this resume. 

For each issue:
1. Extract the exact problematic text
2. Explain why it's an issue
3. Provide a suggested correction
4. Rate the severity as:
   - critical: serious error that significantly impacts professional impression
   - high: clear error that's noticeable to most readers
   - medium: minor issue that could be improved
   - low: stylistic suggestion rather than a clear error

Format your response as a valid JSON array with this exact structure:
[
  {
    "text": "Responsible for managing team",
    "explanation": "Passive voice construction weakens impact",
    "suggestion": "Managed team",
    "severity": "medium"
  },
  ...more issues
]

Focus only on clear grammar, spelling, punctuation, and language usage issues. Do not comment on resume content or formatting unless it relates directly to grammar or language.`
    );
    
    // Run both prompts in parallel
    const [grammarAnalysis, issuesResponse] = await Promise.all([
      generatePerplexityResponse(grammarPrompt, 'sonar', 0.5),
      generatePerplexityResponse(issuesPrompt, 'sonar', 0.3)
    ]);
    
    // Extract and parse the JSON issues
    let grammarIssues: GrammarIssue[] = [];
    
    try {
      // Extract JSON array from response
      const jsonMatch = issuesResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || 
                        issuesResponse.match(/\[\s*\{\s*"text"/);
      
      let jsonText = '';
      if (jsonMatch) {
        if (jsonMatch[1]) {
          jsonText = jsonMatch[1].trim();
        } else {
          // If we matched the array start pattern, extract the full array
          let bracketCount = 0;
          let startIdx = issuesResponse.indexOf('[');
          let endIdx = startIdx;
          
          for (let i = startIdx; i < issuesResponse.length; i++) {
            if (issuesResponse[i] === '[') bracketCount++;
            if (issuesResponse[i] === ']') bracketCount--;
            if (bracketCount === 0) {
              endIdx = i + 1;
              break;
            }
          }
          
          jsonText = issuesResponse.substring(startIdx, endIdx);
        }
      } else {
        // Last attempt - try to parse the whole response
        jsonText = issuesResponse.trim();
      }
      
      const parsedIssues = JSON.parse(jsonText);
      
      if (Array.isArray(parsedIssues)) {
        grammarIssues = parsedIssues.map(issue => ({
          id: uuidv4(),
          text: issue.text || '',
          explanation: issue.explanation || '',
          suggestion: issue.suggestion || '',
          position: issue.position || {},
          severity: (issue.severity || 'medium') as 'critical' | 'high' | 'medium' | 'low'
        }));
      }
    } catch (error) {
      console.error('Failed to parse grammar issues:', error);
      // Provide fallback issues if parsing fails
      grammarIssues = generateFallbackGrammarIssues();
    }
    
    return {
      grammarAnalysis,
      grammarIssues
    };
  } catch (error) {
    console.error('Grammar analysis error:', error);
    return {
      grammarAnalysis: `Error analyzing grammar: ${error instanceof Error ? error.message : 'Unknown error'}`,
      grammarIssues: generateFallbackGrammarIssues()
    };
  }
}

/**
 * Generate fallback grammar issues when the API fails
 */
function generateFallbackGrammarIssues(): GrammarIssue[] {
  return [
    {
      id: uuidv4(),
      text: "Could not analyze grammar issues",
      explanation: "The system encountered an error while analyzing grammar in your resume.",
      suggestion: "Please try again or contact support if the issue persists.",
      position: {},
      severity: 'medium'
    }
  ];
}
