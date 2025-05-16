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
  id?: number;
  resumeId?: number;
  executiveSummary: string;
  overview: string;
  contentQuality: string;
  atsCompatibility: string;
  industryFit: string;
  formattingReview: string;
  skillsAnalysis: string;
  careerTrajectory: string;
  improvementSuggestions: string;
  
  // Complete score fields
  overallScore: number;
  contentScore: number;
  atsOptimizationScore: number;
  formattingScore: number;
  industryAlignmentScore: number;
  skillsScore: number;
  grammarScore: number;
  clarityScore: number;
  
  // Additional derived data
  currentImpactScore?: number;
  potentialImprovement?: number;
  sectionScores?: {
    header?: number;
    summary?: number;
    experience?: number;
    education?: number;
    skills?: number;
    [key: string]: number | undefined;
  };
  issues?: {
    grammar?: Array<any>;
    format?: Array<any>;
    content?: Array<any>;
    ats?: Array<any>;
    [key: string]: Array<any> | undefined;
  };
  aiGeneratedImprovements?: {
    summary: string | string[];
    experience: any[];
    skills: any[];
    education: any[];
    projects: any[];
    [key: string]: any;
  };
  positionedSuggestions: Array<{
    id: string;
    type: string;
    section: string;
    suggestion: string;
    rationale: string;
    position?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }>;
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
