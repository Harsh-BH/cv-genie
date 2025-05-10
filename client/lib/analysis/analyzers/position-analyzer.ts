import { StructuredResume, PositionedSuggestion } from '../models/analysis-types';
import { generatePerplexityResponse, createStructuredPrompt } from '../api/perplexity';
import { v4 as uuidv4 } from 'uuid';

export async function generatePositionedSuggestions(resume: StructuredResume): Promise<PositionedSuggestion[]> {
  try {
    const sectionsPrompt = createStructuredPrompt(
      resume,
      `Identify specific issues in this resume that need improvement. For each issue:
      
      1. Identify the specific section where the issue occurs
      2. Extract a brief text snippet showing the problematic content
      3. Describe the specific issue
      4. Explain why it's a problem
      5. Provide a suggested fix
      6. Rate the severity as: critical, high, medium, or low
      7. Categorize as: content, formatting, ats, skills, industry, or overall
      
      Format your response as JSON with this structure:
      [
        {
          "sectionTitle": "Experience",
          "textSnippet": "Responsible for managing team",
          "issue": "Weak action verb",
          "reasoning": "Starting with 'Responsible for' is passive and less impactful",
          "suggestion": "Replace with stronger action verb",
          "exampleFix": "Led and mentored team of 5 developers",
          "severity": "medium",
          "category": "content"
        },
        ...more issues
      ]
      
      Include at least 5-8 specific issues across different sections and severity levels.`,
      'This analysis will identify specific problem areas in the resume.'
    );
    
    const response = await generatePerplexityResponse(sectionsPrompt, 'sonar', 0.7);
    
    // Extract the JSON part from the response
    let jsonStr = response.replace(/```json|```/g, '').trim();
    
    // Try to find a JSON array in the response if direct parsing fails
    if (jsonStr.indexOf('[') !== 0) {
      const match = jsonStr.match(/\[\s*{[\s\S]*}\s*\]/);
      if (match) {
        jsonStr = match[0];
      } else {
        throw new Error('Could not find valid JSON array in response');
      }
    }
    
    // Parse the JSON and convert to PositionedSuggestion[]
    const suggestions = JSON.parse(jsonStr) as any[];
    
    return suggestions.map(suggestion => ({
      id: uuidv4(),
      issue: suggestion.issue || 'Identified Issue',
      suggestion: suggestion.suggestion || 'Suggested Improvement',
      reasoning: suggestion.reasoning || 'No reasoning provided',
      exampleFix: suggestion.exampleFix,
      severity: (suggestion.severity || 'medium') as 'critical' | 'high' | 'medium' | 'low',
      category: (suggestion.category || 'content') as 'content' | 'formatting' | 'ats' | 'skills' | 'industry' | 'overall',
      position: {
        sectionTitle: suggestion.sectionTitle || '',
        textSnippet: suggestion.textSnippet || '',
        lineNumber: suggestion.lineNumber,
        charRange: suggestion.charRange
      }
    }));
  } catch (error) {
    console.error('Positioned suggestions error:', error);
    return [{
      id: uuidv4(),
      issue: 'Error Analyzing Resume',
      suggestion: 'Please try again or contact support',
      reasoning: `Failed to generate positioned suggestions: ${error instanceof Error ? error.message : 'Unknown error'}`,
      severity: 'medium',
      category: 'overall',
      position: {
        sectionTitle: 'General',
        textSnippet: ''
      }
    }];
  }
}
