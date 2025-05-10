import { StructuredResume } from '../models/analysis-types';
import { generatePerplexityResponse, createStructuredPrompt } from '../api/perplexity';

export async function generateImprovements(resume: StructuredResume): Promise<{
  improvementSuggestions: string;
  aiGeneratedImprovements: {
    summary: string;
    bulletPoints: string[];
    achievements: string[];
    experience: string[];
    skills: string[];
    education: string[];
    projects: string[];
  };
}> {
  try {
    // General improvement suggestions
    const improvementsPrompt = createStructuredPrompt(
      resume,
      `Generate specific improvement suggestions for this resume. Include:
       1. Overall strategic improvements
       2. Content improvements (stronger phrasing, better focus)
       3. Format/structure improvements
       4. Specific sections that need the most attention
       
       Format your response in clear sections with actionable recommendations.`,
      'This task focuses on generating practical improvement suggestions.'
    );
    
    const improvementSuggestions = await generatePerplexityResponse(improvementsPrompt, 'sonar', 0.7);
    
    // AI-generated specific improvements
    const specificImprovementsPrompt = createStructuredPrompt(
      resume,
      `Generate specific rewrites and improvements for this resume in the following format:
      
      # PROFESSIONAL SUMMARY
      [Write an improved professional summary section, 3-4 lines]
      
      # IMPROVED BULLET POINTS
      [Rewrite 3-5 weak bullet points from the resume with stronger, achievement-focused language]
      
      # ADDITIONAL ACHIEVEMENTS
      [Suggest 2-3 achievements that could be added based on the experiences listed]
      
      For each section, first analyze what's missing or weak, then provide the improved version.`,
      'This task focuses on generating specific rewrites and new content for the resume.'
    );
    
    const specificImprovements = await generatePerplexityResponse(specificImprovementsPrompt, 'sonar', 0.8);
    
    // Parse out the different sections
    const summaryMatch = specificImprovements.match(/# PROFESSIONAL SUMMARY\s*([\s\S]*?)(?=# |$)/i);
    const bulletsMatch = specificImprovements.match(/# IMPROVED BULLET POINTS\s*([\s\S]*?)(?=# |$)/i);
    const achievementsMatch = specificImprovements.match(/# ADDITIONAL ACHIEVEMENTS\s*([\s\S]*?)(?=# |$)/i);
    
    // Extract and clean up the bullet points and achievements
    function extractItems(text: string | undefined): string[] {
      if (!text) return [];
      
      // Split by bullet points or numbered items and clean
      return text
        .split(/(?:\r?\n|\r)(?:[-•*]|\d+\.)\s+/)
        .filter(item => item.trim().length > 0)
        .map(item => item.trim());
    }
    
    const bulletPoints = bulletsMatch 
      ? extractItems(bulletsMatch[1]) 
      : [];
      
    const achievements = achievementsMatch 
      ? extractItems(achievementsMatch[1])
      : [];
    
    return {
      improvementSuggestions,
      aiGeneratedImprovements: {
        summary: summaryMatch ? summaryMatch[1].trim() : '',
        bulletPoints,
        achievements,
        experience: [], // These would require more complex generation logic
        skills: [],
        education: [],
        projects: []
      }
    };
  } catch (error) {
    console.error('Improvements generation error:', error);
    return {
      improvementSuggestions: `Error generating improvements: ${error instanceof Error ? error.message : 'Unknown error'}`,
      aiGeneratedImprovements: {
        summary: '',
        bulletPoints: [],
        achievements: [],
        experience: [],
        skills: [],
        education: [],
        projects: []
      }
    };
  }
}
