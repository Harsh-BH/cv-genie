import { analyzeContent } from './analyzers/content-analyzer';
import { analyzeAtsCompatibility } from './analyzers/ats-analyzer';
import { analyzeIndustryFit } from './analyzers/industry-analyzer';
import { analyzeSkills } from './analyzers/skills-analyzer';
import { generateImprovements } from './analyzers/improvement-generator';
import { analyzeScores } from './analyzers/score-analyzer';
import { analyzeFormatting } from './analyzers/format-analyzer';
import { analyzeGrammar } from './analyzers/grammar-analyzer';
import { generatePositionedSuggestions } from './analyzers/position-analyzer';
import { StructuredResume, AnalysisResult } from './models/analysis-types';
import { setTimeout } from 'timers/promises';

// Queue for limiting concurrent API calls
const analysisQueue = new Map<string, Promise<any>>();

// Track rate limiting status
let isRateLimited = false;
let rateLimitResetTime = Date.now();
const RATE_LIMIT_WINDOW = 60000; // 1 minute default window
const MAX_CONCURRENT_REQUESTS = 4; // Maximum number of concurrent API calls

// Track active request count
let activeRequestCount = 0;

/**
 * Wrapper function with rate limit handling and concurrency control
 * @param analyzerFn The analyzer function to call
 * @param key Unique key for this analysis type
 * @param params Parameters to pass to the analyzer
 * @param maxRetries Maximum number of retry attempts
 */
async function withRateLimitHandling<T, P>(
  analyzerFn: (params: P) => Promise<T>,
  key: string,
  params: P,
  maxRetries = 3
): Promise<T> {
  // Create a unique key for the queue
  const queueKey = `${key}-${Date.now()}`;
  let retries = 0;
  let lastError: Error | null = null;
  
  const executeWithBackoff = async (): Promise<T> => {
    try {
      // Wait if too many requests are already active
      while (activeRequestCount >= MAX_CONCURRENT_REQUESTS) {
        console.log(`Max concurrent requests (${MAX_CONCURRENT_REQUESTS}) reached, waiting...`);
        await setTimeout(1000); // Wait 1 second before checking again
      }
      
      // Initial backoff time (exponential backoff with jitter)
      const baseDelay = 2000; // Start with 2 seconds
      
      while (retries <= maxRetries) {
        try {
          // Check if we're currently rate limited
          if (isRateLimited) {
            const waitTime = rateLimitResetTime - Date.now();
            if (waitTime > 0) {
              console.log(`Rate limited, waiting ${Math.ceil(waitTime/1000)}s before retry...`);
              await setTimeout(waitTime + Math.random() * 1000); // Add random jitter
            }
            isRateLimited = false;
          }
          
          // Increment active request counter
          activeRequestCount++;
          
          // Attempt the API call
          const result = await analyzerFn(params);
          
          // Decrement active request counter on success
          activeRequestCount--;
          
          return result;
        } catch (error) {
          // Decrement active request counter on error
          activeRequestCount--;
          
          lastError = error instanceof Error ? error : new Error(String(error));
          
          // Check if it's a rate limit error
          if (lastError.message.includes('rate limit') || lastError.message.includes('429')) {
            retries++;
            isRateLimited = true;
            
            // Parse reset time from error if available, or use default window
            rateLimitResetTime = Date.now() + RATE_LIMIT_WINDOW;
            
            if (retries <= maxRetries) {
              // Calculate backoff with exponential increase and jitter
              const delay = baseDelay * Math.pow(2, retries - 1) * (0.5 + Math.random());
              console.log(`Rate limit hit, retry ${retries}/${maxRetries} in ${Math.ceil(delay/1000)}s`);
              await setTimeout(delay);
              continue;
            }
          }
          
          // For non-rate limit errors or if we've exhausted retries
          throw lastError;
        }
      }
      
      // This should not be reached but TypeScript needs it
      throw lastError || new Error("Maximum retries exceeded");
    } finally {
      // Clean up the queue when done
      analysisQueue.delete(queueKey);
    }
  };
  
  // Add the execution to our queue and return the promise
  const executionPromise = executeWithBackoff();
  analysisQueue.set(queueKey, executionPromise);
  return executionPromise;
}

/**
 * Performs a comprehensive analysis of a resume with rate limit handling
 */
export async function analyzeResumeComprehensive(resume: any): Promise<AnalysisResult> {
  try {
    console.log("Starting comprehensive resume analysis with controlled concurrency...");
    const normalizedResume: StructuredResume = normalizeResumeStructure(resume);
    
    // Step 1: Process most critical analyses first (content and ATS)
    console.log("Starting critical analyses...");
    const contentPromise = withRateLimitHandling(
      (r) => analyzeContent(r), 
      'content',
      normalizedResume
    );
    
    const atsPromise = withRateLimitHandling(
      (r) => analyzeAtsCompatibility(r), 
      'ats',
      normalizedResume
    );
    
    // Wait for critical analyses to finish
    const [contentResults, atsResults] = await Promise.all([contentPromise, atsPromise]);
    console.log("Critical analyses complete");
    
    // Step 2: Process secondary analyses with controlled concurrency
    console.log("Starting secondary analyses...");
    const industryPromise = withRateLimitHandling(
      (r) => analyzeIndustryFit(r), 
      'industry',
      normalizedResume
    );
    
    const skillsPromise = withRateLimitHandling(
      (r) => analyzeSkills(r), 
      'skills',
      normalizedResume
    );
    
    // Wait for industry and skills to complete before starting formatting
    const [industryResults, skillsResults] = await Promise.all([industryPromise, skillsPromise]);
    
    // Step 3: Run formatting and grammar analyses
    console.log("Starting formatting and grammar analyses...");
    const formattingPromise = withRateLimitHandling(
      (r) => analyzeFormatting(r), 
      'formatting',
      normalizedResume
    );
    
    const grammarPromise = withRateLimitHandling(
      (r) => analyzeGrammar(r), 
      'grammar',
      normalizedResume
    );
    
    const [formattingResults, grammarResults] = await Promise.all([formattingPromise, grammarPromise]);
    
    // Step 4: Generate improvements and positioning based on results obtained so far
    console.log("Generating insights and improvements...");
    const improvementsPromise = withRateLimitHandling(
      (r) => generateImprovements(r), 
      'improvements',
      normalizedResume
    );
    
    const positionedPromise = withRateLimitHandling(
      (r) => generatePositionedSuggestions(r), 
      'positioned',
      normalizedResume
    );
    
    const [improvementsResult, positionedSuggestions] = await Promise.all([improvementsPromise, positionedPromise]);
    
    // Step 5: Calculate scores (local computation, no API call)
    console.log("Calculating final scores...");
    const scores = await analyzeScores(normalizedResume, {
      contentQuality: contentResults.contentQuality,
      atsCompatibility: atsResults,
      industryFit: industryResults,
      skillsAnalysis: skillsResults,
      formattingReview: formattingResults
    });
    
    console.log("Analysis complete with controlled concurrency");
    
    // Step 6: Compile all results
    return {
      executiveSummary: contentResults.executiveSummary,
      overview: contentResults.overview,
      contentQuality: { set: contentResults.contentQuality },
      atsCompatibility: atsResults,
      industryFit: industryResults,
      formattingReview: formattingResults,
      skillsAnalysis: skillsResults,
      careerTrajectory: "Career trajectory analysis will be provided in future update.",
      improvementSuggestions: improvementsResult.improvementSuggestions,
      scoreBreakdown: scores,
      aiGeneratedImprovements: improvementsResult.aiGeneratedImprovements,
      positionedSuggestions: [
        ...positionedSuggestions,
        ...grammarResults.grammarIssues.map(issue => ({
          id: issue.id,
          type: 'grammar' as const,
          sectionType: 'Grammar & Language',
          original: issue.text,
          improved: issue.suggestion,
          issue: `Grammar Issue: ${issue.explanation}`,
          suggestion: issue.suggestion,
          reasoning: issue.explanation,
          severity: issue.severity,
          category: 'grammar' as const,
          position: {
            sectionTitle: 'Grammar & Language',
            textSnippet: issue.text,
            lineNumber: issue.position.lineNumber,
            charRange: issue.position.offset && issue.position.length 
              ? [issue.position.offset, issue.position.offset + issue.position.length] as [number, number]
              : undefined
          }
        }))
      ],
      grammarIssues: grammarResults.grammarIssues
    };
  } catch (error) {
    console.error("Comprehensive analysis error:", error);
    // Return a minimal result with error information
    return {
      executiveSummary: `Error analyzing resume: ${error instanceof Error ? error.message : 'Unknown error'}`,
      overview: "Analysis could not be completed due to an error.",
      contentQuality: { set: "Content analysis failed." },
      atsCompatibility: "ATS compatibility analysis failed.",
      industryFit: "Industry fit analysis failed.",
      formattingReview: "Formatting review could not be completed.",
      skillsAnalysis: "Skills analysis failed.",
      careerTrajectory: "Career trajectory analysis failed.",
      improvementSuggestions: "Improvement suggestions could not be generated due to an error.",
      scoreBreakdown: {
        overall: 50,
        content: 45,
        ats: 52,
        formatting: 48,
        impact: 47,
        skills: 53,
        grammar: 55,
        clarity: 51
      },
      aiGeneratedImprovements: {
        summary: "",
        bulletPoints: [],
        achievements: [],
        experience: [],
        skills: [],
        education: [],
        projects: []
      },
      positionedSuggestions: []
    };
  }
}

// Normalize resume structure function remains unchanged
function normalizeResumeStructure(resume: any): StructuredResume {
  // Extract skills from sections if they exist
  let skills: string[] = [];
  if (resume.sections) {
    const skillsSection = resume.sections.find((s: any) => 
      s.title.toLowerCase().includes('skill') || 
      s.title.toLowerCase().includes('technolog') ||
      s.title.toLowerCase().includes('proficienc')
    );
    
    if (skillsSection) {
      // Extract skills by splitting on commas, bullets, or newlines
      skills = skillsSection.content
        .split(/[,•\n]/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0);
    }
  }
  
  return {
    fileName: resume.fileName || "Resume",
    fileData: resume.fileData || "",
    rawContent: resume.rawContent || resume.fileData || "",
    sections: Array.isArray(resume.sections) ? resume.sections : [],
    skills: skills,
    user: resume.user || { name: "Unknown", email: "" }
  };
}