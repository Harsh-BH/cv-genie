export type IssueSeverity = 'critical' | 'high' | 'medium' | 'low';

export type IssuePosition = {
  sectionId?: number;
  sectionTitle?: string;
  paragraphIndex?: number;
  bulletIndex?: number;
  lineIndex?: number;
  textSnippet?: string;
  startPos?: number;
  endPos?: number;
};

export type PositionedSuggestion = {
  id: string;
  issue: string;
  suggestion: string;
  reasoning: string;
  severity: IssueSeverity;
  position: IssuePosition;
  category: string;
  exampleFix?: string;
};

// Score breakdown for different resume aspects
export interface ScoreBreakdown {
  overall: number;
  content: number;
  atsOptimization: number;
  industryAlignment: number;
  formatting: number;
  skills: number;
}

// AI generated content improvements
export interface AIGeneratedImprovements {
  summary?: string;
  bulletPoints?: string[];
  skillsSection?: string;
  achievements?: string[];
}

// Complete resume analysis data structure
export interface AnalysisData {
  id?: string;
  resumeId?: string;
  userId?: string;
  
  // Executive summary and overviews
  executiveSummary: string;
  overview: string;
  contentQuality: string;
  
  // Compatibility reviews
  atsCompatibility: string;
  industryFit: string;
  formattingReview: string;
  skillsAnalysis: string;
  careerTrajectory?: string;
  
  // Improvement suggestions
  improvementSuggestions: string;
  
  // Scores (0-100)
  overallScore: number;
  contentScore: number;
  atsOptimizationScore: number;
  formattingScore: number;
  industryAlignmentScore: number;
  skillsScore: number;
  grammarScore: number;
  clarityScore: number;
  
  // AI-generated improvements
  aiSummary?: string;
  aiBulletPoints?: string[];
  aiAchievements?: string[];
  aiSkills?: string[];
  
  // Positioned suggestions for specific improvements
  positionedSuggestions?: Array<{
    id: string;
    type: string;
    sectionType: string;
    original: string;
    improved: string;
    issue: string;
    suggestion: string;
    reasoning: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    category: string;
    position: {
      sectionTitle: string;
      textSnippet: string;
      lineNumber?: number;
      charRange?: [number, number];
    };
  }>;
  
  // Grammar issues
  grammarIssues?: Array<{
    id: string;
    text: string;
    explanation: string;
    suggestion: string;
    position: {
      lineNumber?: number;
      offset?: number;
      length?: number;
    };
    severity: 'critical' | 'high' | 'medium' | 'low';
  }>;
  
  createdAt?: Date;
  updatedAt?: Date;
}

// Structure used by the sidebar component
export interface SidebarFeedback {
  insights: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
  }>;
  mistakes: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    severity?: string;
    position?: any;
    section?: string;
    textSnippet?: string;
  }>;
  improvements: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    severity?: string;
    position?: any;
    type?: 'replacement' | 'addition' | 'suggestion';
  }>;
  score: number;
}
