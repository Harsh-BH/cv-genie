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
      `Conduct a detailed analysis of this resume and generate strategic improvement recommendations.

ANALYSIS FRAMEWORK:
1. Content Effectiveness (40%):
   - Assess impact and strength of achievement statements
   - Evaluate quantification of results (metrics, percentages, numbers)
   - Analyze use of action verbs and industry-specific terminology
   - Check for evidence of skills rather than mere listing

2. Career Narrative & Positioning (25%):
   - Evaluate how well the resume tells a cohesive career story
   - Assess alignment between experience and career objectives
   - Check for clear professional progression/growth
   - Analyze how well unique value proposition is communicated

3. Targeting & Relevance (20%):
   - Evaluate focus on relevant skills and experiences for target roles
   - Assess customization level for industry standards
   - Check for appropriate emphasis on transferable skills
   - Analyze keyword optimization for applicant tracking systems

4. Strategic Gaps (15%):
   - Identify critical missing elements (skills, experiences, certifications)
   - Assess potential red flags (employment gaps, lack of progression)
   - Evaluate competitive positioning against typical candidates

RESPONSE FORMAT:
1. Overall Assessment: Brief summary of the resume's current state with a score (1-10)
2. Key Strengths: 2-3 elements that should be preserved or emphasized
3. Critical Improvement Areas: 3-5 highest-impact improvement opportunities, prioritized, with specific examples
4. Section-by-Section Recommendations:
   a. Professional Summary/Objective
   b. Experience Section
   c. Skills Section
   d. Education/Certifications
   e. Additional Sections
5. Strategic Recommendations: 3 high-level strategic changes to better position the candidate

For each recommendation, include: (1) The specific issue, (2) Why it's problematic, (3) A concrete suggestion for improvement with an example.`,
      'This analysis provides a strategic resume evaluation with actionable, prioritized recommendations for improvement.'
    );
    
    const improvementSuggestions = await generatePerplexityResponse(improvementsPrompt, 'sonar', 0.7);
    
    // AI-generated specific improvements
    const specificImprovementsPrompt = createStructuredPrompt(
      resume,
      `Generate specific rewrites and improvements for this resume. Provide detailed, ready-to-use content that the candidate can directly implement.

IMPORTANT: Format your response using the exact section headers below and maintain consistent formatting for parsing purposes.

## PROFESSIONAL SUMMARY
Analyze the current summary (or create one if missing). Then provide a completely rewritten 3-5 line professional summary that:
- Opens with a compelling professional identity statement
- Incorporates 2-3 most impressive achievements with metrics
- Includes relevant technical skills and industry keywords
- Aligns with the candidate's apparent career trajectory
- Conveys unique value proposition

## IMPROVED BULLET POINTS
Identify 5 weak bullet points from the experience section and rewrite them. For each:
1. Show the original bullet point (labeled "ORIGINAL")
2. Show your improved version (labeled "IMPROVED")
3. Explain the specific improvements made (labeled "RATIONALE")

Focus on:
- Starting with strong action verbs
- Including specific metrics and quantifiable results
- Demonstrating impact and scope
- Highlighting relevant skills
- Using industry-specific terminology

## ADDITIONAL ACHIEVEMENTS
Create 3-4 new achievement bullet points that appear plausible based on the roles described but aren't explicitly mentioned. These should:
- Fill gaps in the skills or accomplishments presented
- Follow the same format as the improved bullet points
- Include metrics and results where logical
- Enhance the candidate's perceived value

## SKILLS SECTION
Provide a completely reorganized skills section that:
- Groups skills by category (Technical, Soft, Industry-Specific, etc.)
- Prioritizes most relevant skills for the apparent target role
- Adds relevant missing skills that are implied by experience
- Removes or deprioritizes less impactful skills
- Incorporates appropriate industry keywords

## EXPERIENCE SECTION
For one key position, rewrite the entire role description, including:
- A more impactful position description
- 4-6 strengthened bullet points
- Better demonstration of skills and impact

## EDUCATION SECTION
Provide an optimized format for presenting education credentials, including:
- Proper ordering and emphasis
- Relevant coursework or academic achievements worth highlighting
- Proper formatting of degrees and institutions

## PROJECTS SECTION (if applicable)
For one project (or create a recommended project description based on experience), provide:
- A compelling project title and concise description
- Technologies/skills utilized
- 2-3 bullet points highlighting contributions and results`,
      'This content generation provides specific, ready-to-implement improvements across all resume sections.'
    );
    
    const specificImprovements = await generatePerplexityResponse(specificImprovementsPrompt, 'claude-3-opus-20240229', 0.8);
    
    // Enhanced parsing logic for each section
    function extractSection(text: string, sectionName: string): string {
      const regex = new RegExp(`## ${sectionName}\\s*([\\s\\S]*?)(?=## |$)`, 'i');
      const match = text.match(regex);
      return match ? match[1].trim() : '';
    }
    
    function extractBulletPoints(text: string): string[] {
      if (!text) return [];
      
      // Look for IMPROVED: sections or bullet points
      const improvedPoints: string[] = [];
      
      // Try to extract IMPROVED: labeled points first
      const improvedRegex = /IMPROVED:?\s*([^\n]+)/gi;
      let match;
      while ((match = improvedRegex.exec(text)) !== null) {
        if (match[1].trim()) improvedPoints.push(match[1].trim());
      }
      
      // If no IMPROVED: labels found, extract bullet points
      if (improvedPoints.length === 0) {
        return text
          .split(/(?:\r?\n|\r)(?:[-•*]|\d+\.)\s+/)
          .filter(item => item.trim().length > 0 && !item.trim().startsWith('ORIGINAL') && !item.trim().startsWith('RATIONALE'))
          .map(item => item.trim());
      }
      
      return improvedPoints;
    }
    
    // Extract all sections
    const summarySection = extractSection(specificImprovements, 'PROFESSIONAL SUMMARY');
    const bulletPointsSection = extractSection(specificImprovements, 'IMPROVED BULLET POINTS');
    const achievementsSection = extractSection(specificImprovements, 'ADDITIONAL ACHIEVEMENTS');
    const skillsSection = extractSection(specificImprovements, 'SKILLS SECTION');
    const experienceSection = extractSection(specificImprovements, 'EXPERIENCE SECTION');
    const educationSection = extractSection(specificImprovements, 'EDUCATION SECTION');
    const projectsSection = extractSection(specificImprovements, 'PROJECTS SECTION');
    
    return {
      improvementSuggestions,
      aiGeneratedImprovements: {
        summary: summarySection,
        bulletPoints: extractBulletPoints(bulletPointsSection),
        achievements: extractBulletPoints(achievementsSection),
        experience: extractBulletPoints(experienceSection),
        skills: extractBulletPoints(skillsSection),
        education: extractBulletPoints(educationSection),
        projects: extractBulletPoints(projectsSection)
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
