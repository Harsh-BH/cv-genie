import { Resume } from '@prisma/client';

type ResumeWithSections = Resume & {
  sections: any[];
  personalDetails: any;
};

// New types for position-based suggestions
type IssuePosition = {
  sectionId?: number;
  sectionTitle?: string;
  paragraphIndex?: number;  // 0-based index of paragraph within section
  bulletIndex?: number;     // 0-based index of bullet point within section
  lineIndex?: number;       // 0-based index of line
  textSnippet?: string;     // The problematic text
  startPos?: number;        // Character position in section content
  endPos?: number;          // End character position in section content
};

type IssueSeverity = 'critical' | 'high' | 'medium' | 'low';

type PositionedSuggestion = {
  id: string;               // Unique identifier for the suggestion
  issue: string;            // Description of the issue
  suggestion: string;       // How to fix it
  reasoning: string;        // Why this matters
  severity: IssueSeverity;  // How important this fix is
  position: IssuePosition;  // Where it's located
  category: string;         // Content, formatting, ATS, etc.
  exampleFix?: string;      // Example of how to fix it
};

type AnalysisResult = {
  executiveSummary: string;
  overview: string;
  contentQuality: string;
  atsCompatibility: string;
  industryFit: string;
  formattingReview: string;
  skillsAnalysis: string;
  careerTrajectory: string;
  improvementSuggestions: string;
  scoreBreakdown: {
    overall: number;
    content: number;
    atsOptimization: number;
    industryAlignment: number;
    formatting: number;
    skills: number;
  };
  aiGeneratedImprovements: {
    summary?: string;
    bulletPoints?: string[];
    skillsSection?: string;
    achievements?: string[];
  };
  // New property for positioned suggestions
  positionedSuggestions: PositionedSuggestion[];
};

/**
 * Main function to analyze a resume with detailed feedback using Perplexity AI
 */
export async function analyzeResumeComprehensive(
  resume: ResumeWithSections, 
  jobPosting?: string
): Promise<AnalysisResult> {
  const perplexityApiKey = process.env.PERPLEXITY_API_KEY;
  
  if (!perplexityApiKey) {
    throw new Error("Perplexity API key is missing");
  }

  try {
    // Format resume data for better analysis
    const formattedResume = formatResumeForAnalysis(resume);
    
    // Detect industry for specialized analysis
    const detectedIndustry = detectIndustry(resume);
    
    // Create analysis tasks with specialized prompts
    const analysisPromises = [
      runAnalysisWithPrompt(formattedResume, createGeneralAnalysisPrompt()),
      runAnalysisWithPrompt(formattedResume, createAtsAnalysisPrompt()),
      runAnalysisWithPrompt(formattedResume, createIndustrySpecificPrompt(resume, detectedIndustry)),
      runAnalysisWithPrompt(formattedResume, createFormattingAnalysisPrompt()),
      runAnalysisWithPrompt(formattedResume, createSkillsGapAnalysisPrompt(resume, detectedIndustry)),
      runAnalysisWithPrompt(formattedResume, createCareerTrajectoryPrompt(resume))
    ];

    // Add job-specific analysis if a job posting is provided
    if (jobPosting) {
      analysisPromises.push(runAnalysisWithPrompt(formattedResume, createJobMatchPrompt(resume, jobPosting)));
    }

    // Run all analysis tasks in parallel
    const analysisResults = await Promise.all(analysisPromises);
    
    const [
      overview, 
      atsCompatibility, 
      industryFit, 
      formattingReview, 
      skillsAnalysis,
      careerTrajectory,
      // jobMatch is optional and may not exist
    ] = analysisResults;

    // Calculate scores based on analysis results
    const scoreBreakdown = calculateScores({
      overview, atsCompatibility, industryFit, formattingReview, skillsAnalysis
    });

    // Generate improvement suggestions based on all analyses
    const improvementPromises = [
      generateImprovementSuggestions({
        overview, atsCompatibility, industryFit, formattingReview, skillsAnalysis, careerTrajectory,
        ...(analysisResults[6] ? { jobMatch: analysisResults[6] } : {})
      }),
      generateAiImprovements(resume, formattedResume, detectedIndustry),
      // New: Generate positioned suggestions
      generatePositionedSuggestions(resume, {
        overview, atsCompatibility, industryFit, formattingReview, skillsAnalysis, careerTrajectory
      })
    ];

    const [improvementSuggestions, aiGeneratedImprovements, positionedSuggestions] = await Promise.all(improvementPromises);

    // Create executive summary
    const executiveSummary = await generateExecutiveSummary({
      overview, atsCompatibility, industryFit, formattingReview, 
      skillsAnalysis, careerTrajectory, scoreBreakdown
    });

    return {
      executiveSummary: executiveSummary.trim(),
      overview: overview.trim(),
      contentQuality: extractContentQuality(overview),
      atsCompatibility: atsCompatibility.trim(),
      industryFit: industryFit.trim(),
      formattingReview: formattingReview.trim(),
      skillsAnalysis: skillsAnalysis.trim(),
      careerTrajectory: careerTrajectory.trim(),
      improvementSuggestions: improvementSuggestions.trim(),
      scoreBreakdown,
      aiGeneratedImprovements,
      positionedSuggestions
    };
  } catch (error) {
    console.error("Resume analysis error:", error);
    throw new Error(`Failed to analyze resume: ${error.message}`);
  }
}

/**
 * Format resume for better AI analysis
 */
function formatResumeForAnalysis(resume: ResumeWithSections): string {
  let formattedContent = `RESUME TITLE: ${resume.fileName || "Unnamed Resume"}\n\n`;
  
  // Use user info directly instead of personalDetails
  if (resume.user) {
    formattedContent += "PERSONAL DETAILS:\n";
    formattedContent += `Name: ${resume.user.name || 'Not provided'}\n`;
    formattedContent += `Email: ${resume.user.email || 'Not provided'}\n`;
    formattedContent += `Phone: ${resume.user.phone || 'Not provided'}\n`;
    formattedContent += `Location: ${resume.user.location || 'Not provided'}\n`;
    
    // Profile summary is now at the resume level
    if (resume.profileSummary) {
      formattedContent += `Profile Summary: ${resume.profileSummary}\n`;
    }
    
    formattedContent += "\n";
  }
  
  if (resume.sections && resume.sections.length > 0) {
    resume.sections.forEach(section => {
      formattedContent += `${section.title.toUpperCase()}:\n`;
      formattedContent += `${section.content}\n\n`;
    });
  } else {
    // If no sections, use the raw file data
    formattedContent += "EXTRACTED CONTENT:\n";
    formattedContent += `${resume.fileData.substring(0, 1000)}...\n\n`;
    formattedContent += "NOTE: No structured sections found. Using raw extracted text.\n";
  }
  
  return formattedContent;
}

/**
 * Detect industry from resume content
 */
function detectIndustry(resume: ResumeWithSections): string {
  const resumeText = JSON.stringify(resume).toLowerCase();
  
  // Map of industries and their associated keywords
  const industryKeywords = {
    "software development": [
      "software", "developer", "programming", "code", "javascript", "python", "java", "react", 
      "node", "frontend", "backend", "fullstack", "web development", "app development", 
      "devops", "cloud", "aws", "azure", "github", "git", "api"
    ],
    "finance": [
      "finance", "accounting", "budget", "financial", "analyst", "investment", "banking", 
      "cpa", "tax", "audit", "revenue", "profit", "balance sheet", "portfolio", "stocks", 
      "securities", "compliance", "risk management", "forecast"
    ],
    "marketing": [
      "marketing", "social media", "campaign", "branding", "digital marketing", "seo", 
      "content strategy", "advertisement", "market research", "ppc", "google ads", 
      "analytics", "customer acquisition", "funnel", "lead generation"
    ],
    "healthcare": [
      "healthcare", "medical", "clinical", "doctor", "nurse", "patient", "hospital", 
      "pharmacy", "healthcare management", "health insurance", "medical records", 
      "diagnostic", "treatment", "therapy", "physician"
    ],
    "education": [
      "education", "teaching", "teacher", "professor", "instructor", "curriculum", 
      "classroom", "school", "college", "university", "student", "learning", 
      "educational", "academic", "pedagogy", "lecture", "course"
    ],
    "engineering": [
      "engineering", "mechanical", "electrical", "civil", "chemical", "industrial", 
      "design", "structural", "construction", "manufacturing", "product development", 
      "cad", "autocad", "specifications", "technical drawing"
    ],
    "sales": [
      "sales", "business development", "account management", "client", "customer", 
      "revenue growth", "targets", "quota", "pipeline", "crm", "salesforce", "closing", 
      "negotiation", "prospect", "lead"
    ],
    "hr": [
      "human resources", "hr", "recruitment", "talent acquisition", "hiring", "onboarding", 
      "employee relations", "benefits", "compensation", "people management", "workforce", 
      "training", "development", "hr policies", "hris"
    ],
    "data science": [
      "data science", "analytics", "machine learning", "ai", "artificial intelligence", 
      "big data", "statistics", "data mining", "modeling", "data analysis", "predictive", 
      "tensorflow", "pytorch", "pandas", "python", "r", "sql", "tableau"
    ]
  };
  
  // Count matches for each industry
  const matches = Object.entries(industryKeywords).map(([industry, keywords]) => {
    const matchCount = keywords.reduce((count, keyword) => {
      const regex = new RegExp(keyword, 'gi');
      const matches = resumeText.match(regex);
      return count + (matches ? matches.length : 0);
    }, 0);
    
    return { industry, matchCount };
  });
  
  // Sort by match count and get the top industry
  matches.sort((a, b) => b.matchCount - a.matchCount);
  
  // Return the industry with most matches, or "general" if no strong matches
  return matches[0].matchCount > 3 ? matches[0].industry : "general";
}

/**
 * Run analysis with specific prompt using Perplexity API
 */
async function runAnalysisWithPrompt(resumeContent: string, prompt: string): Promise<string> {
  try {
    const perplexityApiKey = process.env.PERPLEXITY_API_KEY;
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${perplexityApiKey}`
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content: "You are an expert resume analyst with experience in HR, recruiting, and career coaching. You have deep knowledge of hiring practices across industries."
          },
          {
            role: "user",
            content: `${prompt}\n\nRESUME TO ANALYZE:\n${resumeContent}`
          }
        ],
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      console.error(`API error: ${response.status} - ${await response.text()}`);
      return `Failed to analyze due to API error: ${response.status}`;
    }

    const result = await response.json();
    // Check if the expected properties exist
    if (!result.choices || !result.choices[0] || !result.choices[0].message || !result.choices[0].message.content) {
      console.error("Unexpected API response format:", JSON.stringify(result));
      return "Failed to analyze due to an unexpected API response format.";
    }

    return result.choices[0].message.content;
  } catch (error) {
    console.error("Analysis error:", error);
    return "Failed to analyze due to an error.";
  }
}

/**
 * Create prompts for different analysis types
 */
function createGeneralAnalysisPrompt(): string {
  return `Provide a comprehensive review of this resume. Analyze:
1. Overall quality and first impression as seen by a hiring manager
2. Content strength, relevance, and clarity of communication
3. Quantification of achievements and use of metrics to demonstrate impact
4. Effectiveness in showcasing the candidate's unique value proposition
5. Key strengths of the resume that stand out
6. Major areas for improvement with specific examples

Be direct, specific and actionable in your feedback. Use concrete examples from the resume.
Avoid generalities and provide granular assessment to help improve this resume.`;
}

function createAtsAnalysisPrompt(): string {
  return `Analyze this resume specifically for ATS (Applicant Tracking System) compatibility:
1. Identify keyword optimization issues and specific missed opportunities
2. Evaluate use of industry-standard terminology and potential synonym problems
3. Check for formatting issues that might affect parsing (tables, columns, headers, etc.)
4. Suggest specific keywords and phrases missing that would improve ATS performance
5. Evaluate the use of job-specific language vs. generic terms
6. Rate its overall ATS-friendliness on a scale of 1-10 with justification

Focus exclusively on ATS optimization in your analysis. Most ATS systems rank candidates based on keyword matching,
so focus on missing terminology that could improve the match rate.`;
}

function createIndustrySpecificPrompt(resume: ResumeWithSections, industry: string): string {
  return `Analyze this resume from the perspective of the ${industry} industry:
1. Evaluate industry-specific terminology and skills - note any missing critical terms
2. Identify key qualifications or experiences expected in this field that are missing
3. Compare to industry standards and expectations for someone at this career level
4. Suggest industry-specific improvements such as certifications, tools, or experiences to highlight
5. Assess competitiveness for roles in this field compared to typical candidates
6. Evaluate how well the resume speaks to industry pain points and priorities
7. Suggest industry-specific accomplishments that could be better highlighted

If you detect the resume is actually for a different industry, please redirect your analysis to that industry.
Be extremely specific with examples of what top resumes in this field typically include.`;
}

function createFormattingAnalysisPrompt(): string {
  return `Review this resume's structure and formatting:
1. Analyze overall organization, visual hierarchy, and readability
2. Evaluate section structure, placement, and ordering for maximum impact
3. Assess use of bullet points, whitespace, and organization of information
4. Check for consistency in formatting (dates, headers, punctuation, capitalization, etc.)
5. Evaluate the visual scan-ability for busy recruiters (who typically spend 6-10 seconds initially)
6. Identify any distracting elements or unnecessary information
7. Suggest specific formatting improvements that would enhance readability and impact

Focus exclusively on structure, organization, and visual presentation. Consider both human readers and ATS systems.`;
}

function createSkillsGapAnalysisPrompt(resume: ResumeWithSections, industry: string): string {
  return `Analyze the skills presented in this resume for ${industry} roles:
1. Identify key technical/hard skills present and evaluate their presentation
2. Identify key soft skills present and evaluate their presentation
3. Detect potential skills gaps based on job titles and experiences listed
4. Compare skills listed to current in-demand skills in the ${industry} industry
5. Note any outdated skills that should be downplayed or updated
6. Suggest additional relevant skills that would complement the candidate's profile
7. Evaluate the balance of technical/hard skills vs. soft skills
8. Suggest how to better showcase existing skills with specific examples

Be specific about which skills should be added, better emphasized, or potentially removed.
Focus on both explicit skills (listed in a skills section) and implicit skills (demonstrated through experience).`;
}

function createCareerTrajectoryPrompt(resume: ResumeWithSections): string {
  return `Analyze this candidate's career trajectory and professional narrative:
1. Evaluate the clarity of the candidate's career progression
2. Identify any potential red flags (employment gaps, frequent job changes, regression in responsibility)
3. Assess how well the resume explains career transitions or changes
4. Evaluate how effectively the resume builds a coherent professional story
5. Identify potential questions a hiring manager might have about the career path
6. Suggest improvements to strengthen the narrative and address potential concerns
7. Assess whether the resume effectively positions the candidate for their likely next career move

Focus on the overall career story and how well the resume supports the candidate's likely career goals.`;
}

function createJobMatchPrompt(resume: ResumeWithSections, jobPosting: string): string {
  return `Compare this resume against the following job posting and analyze the match:
1. Identify key requirements from the job posting that are well-addressed in the resume
2. Identify key requirements from the job posting that are missing or underemphasized in the resume
3. Evaluate overall alignment between the candidate's experience and the job requirements
4. Suggest specific modifications to better align the resume with this job opportunity
5. Score the resume's current match for this position on a scale of 1-10

JOB POSTING:
${jobPosting}

Provide specific, actionable recommendations for tailoring this resume to this specific job.`;
}

/**
 * Extract content quality assessment from general analysis
 */
function extractContentQuality(generalAnalysis: string): string {
  // Extract content quality section or generate summary if not clearly separated
  const contentSection = generalAnalysis.match(/content (strength|quality)[\s\S]*?((\n\n)|$)/i);
  return contentSection ? contentSection[0].trim() : 
    "Content quality assessment included in the overview analysis.";
}

/**
 * Calculate scores based on analysis results
 */
function calculateScores(analyses: Record<string, string>): AnalysisResult['scoreBreakdown'] {
  // Scoring logic based on keywords and phrases in the analyses
  
  // Helper function to calculate score based on positive and negative indicators
  const calculateComponentScore = (text: string, positiveIndicators: string[], negativeIndicators: string[]): number => {
    const textLower = text.toLowerCase();
    
    // Count positive indicators
    const positiveCount = positiveIndicators.filter(indicator => 
      textLower.includes(indicator.toLowerCase())
    ).length;
    
    // Count negative indicators
    const negativeCount = negativeIndicators.filter(indicator => 
      textLower.includes(indicator.toLowerCase())
    ).length;
    
    // Calculate score on 1-10 scale
    let score = 5 + (positiveCount - negativeCount);
    
    // Look for explicit scores in the text (e.g., "score: 7/10")
    const explicitScoreMatch = textLower.match(/(?:rate|score|rating)[^\d]*(\d+)(?:\s*\/\s*|\s*out of\s*)(?:10|ten)/i);
    if (explicitScoreMatch) {
      const explicitScore = parseInt(explicitScoreMatch[1]);
      if (explicitScore >= 1 && explicitScore <= 10) {
        // Weight explicit score more heavily than calculated score
        score = (score + explicitScore * 2) / 3;
      }
    }
    
    // Ensure score is in 1-10 range
    return Math.max(1, Math.min(10, Math.round(score)));
  };
  
  // Define indicators for each component
  const indicatorsByComponent = {
    content: {
      positive: ["excellent", "impressive", "strong", "clear", "effective", "well-structured", "quantified", "specific", "achievements", "metrics", "impact"],
      negative: ["lacking", "missing", "vague", "generic", "weak", "unclear", "insufficient", "sparse", "improve", "needs work", "should add"]
    },
    atsOptimization: {
      positive: ["optimized", "keywords", "well-formatted", "parsable", "relevant terms", "specific skills", "industry terminology"],
      negative: ["missing keywords", "parser issues", "formatting problems", "lacks terms", "not optimized", "generic", "ambiguous"]
    },
    industryAlignment: {
      positive: ["aligned", "industry-specific", "relevant experience", "demonstrates knowledge", "appropriate terminology", "meets expectations"],
      negative: ["misaligned", "irrelevant", "missing key experience", "lacks industry terms", "inappropriate", "outdated"]
    },
    formatting: {
      positive: ["well-formatted", "consistent", "readable", "clean", "professional", "organized", "scannable", "good structure"],
      negative: ["inconsistent", "cluttered", "hard to read", "disorganized", "unprofessional", "confusing", "busy", "dense"]
    },
    skills: {
      positive: ["comprehensive", "appropriate", "current", "relevant", "balanced", "demonstrated", "aligned", "in-demand"],
      negative: ["gaps", "missing", "outdated", "irrelevant", "insufficient", "lacks", "unbalanced"]
    }
  };
  
  // Calculate scores for each component
  const contentScore = calculateComponentScore(
    analyses.overview,
    indicatorsByComponent.content.positive,
    indicatorsByComponent.content.negative
  );
  
  const atsScore = calculateComponentScore(
    analyses.atsCompatibility,
    indicatorsByComponent.atsOptimization.positive,
    indicatorsByComponent.atsOptimization.negative
  );
  
  const industryScore = calculateComponentScore(
    analyses.industryFit,
    indicatorsByComponent.industryAlignment.positive,
    indicatorsByComponent.industryAlignment.negative
  );
  
  const formattingScore = calculateComponentScore(
    analyses.formattingReview,
    indicatorsByComponent.formatting.positive,
    indicatorsByComponent.formatting.negative
  );
  
  const skillsScore = calculateComponentScore(
    analyses.skillsAnalysis,
    indicatorsByComponent.skills.positive,
    indicatorsByComponent.skills.negative
  );
  
  // Calculate overall score as weighted average of component scores
  const overallScore = Math.round((
    contentScore * 0.3 + 
    atsScore * 0.2 + 
    industryScore * 0.2 + 
    formattingScore * 0.15 + 
    skillsScore * 0.15
  ) * 10) / 10;
  
  return {
    overall: overallScore,
    content: contentScore,
    atsOptimization: atsScore,
    industryAlignment: industryScore,
    formatting: formattingScore,
    skills: skillsScore
  };
}

/**
 * Generate executive summary based on all analyses
 */
async function generateExecutiveSummary(analyses: Record<string, any>): Promise<string> {
  try {
    const perplexityApiKey = process.env.PERPLEXITY_API_KEY;
    
    // Create a condensed version of the analyses for the executive summary
    const condensedAnalyses = {
      overview: analyses.overview.substring(0, 300) + "...",
      atsCompatibility: analyses.atsCompatibility.substring(0, 200) + "...",
      industryFit: analyses.industryFit.substring(0, 200) + "...",
      formattingReview: analyses.formattingReview.substring(0, 200) + "...",
      skillsAnalysis: analyses.skillsAnalysis.substring(0, 200) + "...",
      careerTrajectory: analyses.careerTrajectory?.substring(0, 200) + "..."
    };
    
    const scoreInfo = `Overall Score: ${analyses.scoreBreakdown.overall}/10
Content: ${analyses.scoreBreakdown.content}/10
ATS Compatibility: ${analyses.scoreBreakdown.atsOptimization}/10
Industry Alignment: ${analyses.scoreBreakdown.industryAlignment}/10
Formatting: ${analyses.scoreBreakdown.formatting}/10
Skills: ${analyses.scoreBreakdown.skills}/10`;
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${perplexityApiKey}`
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content: "You are an executive career coach who specializes in concise, impactful resume feedback."
          },
          {
            role: "user",
            content: `Create a concise executive summary (250-300 words) of this resume analysis. Focus on the most important strengths and areas for improvement. Be direct and specific.\n\nANALYSIS DETAILS:\n${JSON.stringify(condensedAnalyses)}\n\nSCORE BREAKDOWN:\n${scoreInfo}`
          }
        ],
        max_tokens: 500
      })
    });

    if (!response.ok) {
      console.error(`Executive summary API error: ${response.status} - ${await response.text()}`);
      return "Unable to generate executive summary. Please refer to the detailed sections for analysis.";
    }

    const result = await response.json();
    // Check if the expected properties exist
    if (!result.choices || !result.choices[0] || !result.choices[0].message || !result.choices[0].message.content) {
      console.error("Unexpected API response format:", JSON.stringify(result));
      return "Unable to generate executive summary due to an unexpected API response format.";
    }

    return result.choices[0].message.content;
  } catch (error) {
    console.error("Executive summary generation error:", error);
    return "Unable to generate executive summary. Please refer to the detailed sections for analysis.";
  }
}

/**
 * Generate improvement suggestions based on all analyses
 */
async function generateImprovementSuggestions(analyses: Record<string, string>): Promise<string> {
  // Combine relevant parts of all analyses to generate prioritized improvement suggestions
  const combinedAnalysis = Object.entries(analyses)
    .map(([key, value]) => `${key.toUpperCase()}:\n${value.substring(0, 300)}...`)
    .join("\n\n");
  
  try {
    const perplexityApiKey = process.env.PERPLEXITY_API_KEY;
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${perplexityApiKey}`
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content: "You are an expert resume improvement specialist with years of recruiting experience."
          },
          {
            role: "user",
            content: `Based on the following resume analyses, provide a prioritized list of 7-10 specific, actionable improvements that would have the greatest impact on this resume's effectiveness. For each suggestion:
1. Clearly state what needs to be improved
2. Explain why it matters (impact on hiring decision)
3. Provide a concrete example of how to implement the change
4. Indicate the priority level (Critical, High, Medium)

Focus on practical changes that can be implemented immediately and will have the biggest impact on interview chances.\n\nANALYSES:\n${combinedAnalysis}`
          }
        ],
        max_tokens: 1200
      })
    });

    if (!response.ok) {
      console.error(`Improvement suggestions API error: ${response.status} - ${await response.text()}`);
      return "Could not generate improvement suggestions due to an API error.";
    }

    const result = await response.json();
    // Check if the expected properties exist
    if (!result.choices || !result.choices[0] || !result.choices[0].message || !result.choices[0].message.content) {
      console.error("Unexpected API response format:", JSON.stringify(result));
      return "Could not generate improvement suggestions due to an unexpected API response format.";
    }

    return result.choices[0].message.content;
  } catch (error) {
    console.error("Suggestion generation error:", error);
    return "Could not generate improvement suggestions due to an error.";
  }
}

/**
 * Generate AI improvements for the resume
 */
async function generateAiImprovements(
  resume: ResumeWithSections, 
  formattedResume: string,
  industry: string
): Promise<AnalysisResult['aiGeneratedImprovements']> {
  try {
    const perplexityApiKey = process.env.PERPLEXITY_API_KEY;
    
    // Find relevant sections in the resume
    const experienceSection = resume.sections?.find(s => 
      s.title.toLowerCase().includes('experience') || 
      s.title.toLowerCase().includes('work')
    );
    
    const skillsSection = resume.sections?.find(s => 
      s.title.toLowerCase().includes('skill') || 
      s.title.toLowerCase().includes('technical') ||
      s.title.toLowerCase().includes('competencies')
    );
    
    // Update this to check resume.profileSummary instead of personalDetails
    const summaryExists = resume.profileSummary || 
      resume.sections?.some(s => s.title.toLowerCase().includes('summary') || s.title.toLowerCase().includes('objective'));
    
    // Create prompts for different improvements
    const improvementPrompts = [];
    
    // Always generate an improved summary
    improvementPrompts.push({
      type: 'summary',
      prompt: `Based on this resume, create a powerful professional summary paragraph (3-5 sentences) that highlights the candidate's unique value proposition, key qualifications, and career focus for a ${industry} professional. Make it impactful, modern, and focused on results. If the resume already has a summary, improve upon it significantly.`
    });
    
    // Generate improved bullet points if experience section exists
    if (experienceSection) {
      improvementPrompts.push({
        type: 'bulletPoints',
        prompt: `Find the weakest 2-3 bullet points in the experience/work section of this resume and rewrite them to be more impactful, results-focused, and quantified. Use the PAR (Problem-Action-Result) or STAR (Situation-Task-Action-Result) format. Start each bullet with a strong action verb and include metrics where possible. Keep each bullet to 1-2 lines.`
      });
    }
    
    // Generate improved skills section if relevant
    if (skillsSection || industry !== 'general') {
      improvementPrompts.push({
        type: 'skillsSection',
        prompt: `Create an improved, reorganized skills section for this ${industry} professional's resume. Group skills by category (e.g., Technical Skills, Soft Skills, Industry Knowledge). Include only the most relevant and impressive skills for the ${industry} industry based on the resume content. If the resume doesn't have a skills section, create one from scratch based on the experiences listed.`
      });
    }
    
    // Generate achievement statements
    improvementPrompts.push({
      type: 'achievements',
      prompt: `Based on this resume, create 3-5 powerful achievement statements that could be added to strengthen the resume. Focus on quantifiable results and high-impact contributions that would impress a hiring manager in the ${industry} industry. These should highlight accomplishments that appear to be missing or underemphasized in the current resume. Format each as a single bullet point starting with a strong action verb.`
    });
    
    // Run all improvement prompts in parallel
    const improvementPromises = improvementPrompts.map(async ({ type, prompt }) => {
      try {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${perplexityApiKey}`
          },
          body: JSON.stringify({
            model: "sonar",
            messages: [
              {
                role: "system",
                content: "You are an expert resume writer who specializes in creating high-impact content for job seekers."
              },
              {
                role: "user",
                content: `${prompt}\n\nRESUME CONTENT:\n${formattedResume}`
              }
            ],
            max_tokens: 800
          })
        });
        
        if (!response.ok) {
          console.error(`${type} improvement API error: ${response.status} - ${await response.text()}`);
          return { type, content: null };
        }
        
        const result = await response.json();
        // Check if the expected properties exist
        if (!result.choices || !result.choices[0] || !result.choices[0].message || !result.choices[0].message.content) {
          console.error(`Unexpected ${type} API response format:`, JSON.stringify(result));
          return { type, content: null };
        }
        
        return { type, content: result.choices[0].message.content };
      } catch (error) {
        console.error(`Error generating ${type} improvement:`, error);
        return { type, content: null };
      }
    });
    
    const improvementResults = await Promise.all(improvementPromises);
    
    // Process results into the expected structure
    const aiGeneratedImprovements: AnalysisResult['aiGeneratedImprovements'] = {};
    
    improvementResults.forEach(result => {
      if (result.content) {
        if (result.type === 'summary') {
          aiGeneratedImprovements.summary = result.content.trim();
        } else if (result.type === 'bulletPoints') {
          // Extract bullet points from content
          const bulletPoints = result.content
            .split(/[\n•-]/)
            .map(line => line.trim())
            .filter(line => line.length > 20); // Filter out short lines that aren't full bullet points
          
          aiGeneratedImprovements.bulletPoints = bulletPoints;
        } else if (result.type === 'skillsSection') {
          aiGeneratedImprovements.skillsSection = result.content.trim();
        } else if (result.type === 'achievements') {
          // Extract achievement statements
          const achievements = result.content
            .split(/[\n•-]/)
            .map(line => line.trim())
            .filter(line => line.length > 20); // Filter out short lines
          
          aiGeneratedImprovements.achievements = achievements;
        }
      }
    });
    
    return aiGeneratedImprovements;
  } catch (error) {
    console.error("AI improvements generation error:", error);
    return {}; // Return empty object on error
  }
}

/**
 * Generate positioned suggestions that map feedback to specific locations in the resume
 */
async function generatePositionedSuggestions(
  resume: ResumeWithSections,
  analyses: Record<string, string>
): Promise<PositionedSuggestion[]> {
  try {
    const perplexityApiKey = process.env.PERPLEXITY_API_KEY;
    
    // Create a resume map to track sections and their content
    const resumeMap = createResumeMap(resume);
    
    // Create specific text for the positioned suggestions prompt
    const resumeSectionsText = createResumeMapText(resumeMap);
    
    // Combine relevant parts of all analyses for context
    const combinedAnalysisText = Object.entries(analyses)
      .map(([key, value]) => `${key.toUpperCase()} ANALYSIS:\n${value.substring(0, 200)}...`)
      .join("\n\n");
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${perplexityApiKey}`
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content: "You are a precise resume analysis system that identifies exact locations of issues in resumes."
          },
          {
            role: "user",
            content: `Analyze this resume and provide specific, positioned suggestions for improvement. For each issue:
1. Identify the exact section where the issue occurs (using the sectionId from the provided map)
2. Specify the location within that section (paragraph number, bullet point number, or line number)
3. Include a snippet of the problematic text
4. Provide a clear suggestion for how to fix it
5. Explain why this change matters
6. Assign a severity level (critical, high, medium, or low)
7. Categorize the issue (content, formatting, ATS, skills, etc.)
8. Provide an example of the fixed text when applicable

Format your response as a valid JSON array of objects with these properties:
[
  {
    "id": "unique-id",
    "issue": "Description of the issue",
    "suggestion": "How to fix it",
    "reasoning": "Why this matters",
    "severity": "critical|high|medium|low",
    "position": {
      "sectionId": 123,
      "sectionTitle": "section name",
      "paragraphIndex": 0,
      "bulletIndex": 0,
      "textSnippet": "problematic text"
    },
    "category": "content|formatting|ats|skills",
    "exampleFix": "Example of improved text"
  }
]

Focus on the most important 5-8 issues across the resume. Keep the response concise, as there are token limits.

RESUME SECTION MAP:
${resumeSectionsText}

ANALYSIS CONTEXT:
${combinedAnalysisText}
`
          }
        ],
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      console.error(`Positioned suggestions API error: ${response.status} - ${await response.text()}`);
      return fallbackPositionedSuggestions(resume, analyses);
    }

    const result = await response.json();
    // Check if the expected properties exist
    if (!result.choices || !result.choices[0] || !result.choices[0].message || !result.choices[0].message.content) {
      console.error("Unexpected positioned suggestions API response format:", JSON.stringify(result));
      return fallbackPositionedSuggestions(resume, analyses);
    }
    
    const content = result.choices[0].message.content;
    
    // Extract the JSON array from the content
    // The content might have explanatory text before or after the JSON, so we need to extract just the JSON
    const jsonMatch = content.match(/\[\s*{[\s\S]*}\s*\]/);
    if (!jsonMatch) {
      console.error("Could not find JSON array in response:", content);
      return fallbackPositionedSuggestions(resume, analyses);
    }
    
    try {
      const suggestions = JSON.parse(jsonMatch[0]);
      return suggestions;
    } catch (jsonError) {
      console.error("Error parsing positioned suggestions:", jsonError);
      return fallbackPositionedSuggestions(resume, analyses);
    }
  } catch (error) {
    console.error("Error generating positioned suggestions:", error);
    return fallbackPositionedSuggestions(resume, analyses);
  }
}

/**
 * Create a map of the resume sections and their content
 */
function createResumeMap(resume: ResumeWithSections): Array<{
  id: number;
  title: string;
  content: string;
  type: 'personal' | 'section';
  bulletPoints?: string[];
  paragraphs?: string[];
}> {
  const resumeMap = [];
  
  // Add user details
  if (resume.user) {
    const personalDetailsContent = [
      `Name: ${resume.user.name || 'Not provided'}`,
      `Email: ${resume.user.email || 'Not provided'}`,
      `Phone: ${resume.user.phone || 'Not provided'}`,
      `Location: ${resume.user.location || 'Not provided'}`
    ].join('\n');
    
    resumeMap.push({
      id: 0,
      title: 'Personal Details',
      content: personalDetailsContent,
      type: 'personal',
      paragraphs: [personalDetailsContent]
    });
    
    // Add profile summary if exists
    if (resume.profileSummary) {
      resumeMap.push({
        id: -1,
        title: 'Profile Summary',
        content: resume.profileSummary,
        type: 'personal',
        paragraphs: [resume.profileSummary]
      });
    }
  }
  
  // Add sections
  if (resume.sections && resume.sections.length > 0) {
    resume.sections.forEach(section => {
      // Try to parse content into bullet points or paragraphs
      const bulletPointsMatch = section.content.match(/^[-•*]\s.+$/gm);
      const paragraphs = section.content.split(/\n\n+/);
      
      resumeMap.push({
        id: section.id,
        title: section.title,
        content: section.content,
        type: 'section',
        bulletPoints: bulletPointsMatch || undefined,
        paragraphs: paragraphs.filter(p => p.trim().length > 0)
      });
    });
  }
  
  return resumeMap;
}

/**
 * Create a formatted text representation of the resume map
 */
function createResumeMapText(resumeMap: ReturnType<typeof createResumeMap>): string {
  return resumeMap.map(section => {
    return `SECTION ID: ${section.id}
TITLE: ${section.title}
TYPE: ${section.type}
CONTENT:
${section.content}
-------------------`;
  }).join('\n\n');
}

/**
 * Fallback method to generate basic positioned suggestions when the AI response fails
 */
function fallbackPositionedSuggestions(
  resume: ResumeWithSections,
  analyses: Record<string, string>
): PositionedSuggestion[] {
  // Generate some basic positioned suggestions based on common resume issues
  const suggestions: PositionedSuggestion[] = [];
  
  // Check for summary presence
  if (!resume.profileSummary) {
    suggestions.push({
      id: "missing-summary",
      issue: "Missing professional summary",
      suggestion: "Add a concise professional summary at the top of your resume",
      reasoning: "A summary quickly communicates your value proposition to recruiters who spend just 6-10 seconds on initial resume screening",
      severity: "high",
      position: {
        sectionTitle: "Personal Details"
      },
      category: "content",
      exampleFix: "Results-driven software developer with 5+ years of experience in full-stack development, specializing in React and Node.js applications that drive business growth and improve user experience."
    });
  }
  
  // Check sections for potential issues
  if (resume.sections && resume.sections.length > 0) {
    resume.sections.forEach(section => {
      // Check work experience bullet points for action verbs and metrics
      if (section.title.toLowerCase().includes('experience') || section.title.toLowerCase().includes('work')) {
        // Check if bullet points don't start with action verbs
        const bullets = section.content.match(/^[-•*]\s(.+)$/gm);
        
        if (bullets) {
          bullets.forEach((bullet, index) => {
            const bulletText = bullet.replace(/^[-•*]\s/, '');
            
            // Check for lack of metrics
            if (!bulletText.match(/\d+%|increased|reduced|improved|generated|saved|led/i)) {
              suggestions.push({
                id: `metrics-${section.id}-${index}`,
                issue: "Bullet point lacks quantifiable metrics",
                suggestion: "Add specific numbers or percentages to demonstrate impact",
                reasoning: "Quantifiable achievements are more impactful and demonstrate the concrete value you provided",
                severity: "medium",
                position: {
                  sectionId: section.id,
                  sectionTitle: section.title,
                  bulletIndex: index,
                  textSnippet: bulletText
                },
                category: "content",
                exampleFix: bulletText.replace(/^(Developed|Created|Managed|Led|Implemented)/i, match => 
                  `${match} resulting in 20% improvement in efficiency`)
              });
            }
            
            // Check for weak action verbs
            if (bulletText.match(/^(worked on|helped|assisted|was responsible for|did)/i)) {
              suggestions.push({
                id: `weak-verb-${section.id}-${index}`,
                issue: "Weak action verb",
                suggestion: "Replace with a stronger, more specific action verb",
                reasoning: "Strong action verbs convey leadership, initiative, and impact",
                severity: "medium",
                position: {
                  sectionId: section.id,
                  sectionTitle: section.title,
                  bulletIndex: index,
                  textSnippet: bulletText
                },
                category: "content",
                exampleFix: bulletText.replace(/^worked on/i, "Spearheaded")
                  .replace(/^helped/i, "Facilitated")
                  .replace(/^assisted/i, "Supported")
                  .replace(/^was responsible for/i, "Managed")
                  .replace(/^did/i, "Executed")
              });
            }
          });
        }
      }
      
      // Check for skill section issues
      if (section.title.toLowerCase().includes('skill')) {
        // Check if skills are just listed as commas without organization
        if (section.content.split(',').length > 5) {
          suggestions.push({
            id: `unorganized-skills-${section.id}`,
            issue: "Skills not organized by category",
            suggestion: "Group skills by category for better readability",
            reasoning: "Categorized skills are easier to scan and show thoughtful organization",
            severity: "medium",
            position: {
              sectionId: section.id,
              sectionTitle: section.title,
              textSnippet: section.content.substring(0, 50) + "..."
            },
            category: "formatting",
            exampleFix: "Technical Skills: JavaScript, Python, React, Node.js\n\nSoft Skills: Project Management, Team Leadership, Client Communication\n\nTools: Git, JIRA, AWS, Docker"
          });
        }
      }
    });
  }
  
  return suggestions;
}
