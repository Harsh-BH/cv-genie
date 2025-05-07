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
  executiveSummary: string;
  overview: string;
  contentQuality: string;
  atsCompatibility: string;
  industryFit: string;
  formattingReview: string;
  skillsAnalysis: string;
  careerTrajectory: string;
  improvementSuggestions: string;
  scoreBreakdown: ScoreBreakdown;
  aiGeneratedImprovements: AIGeneratedImprovements;
  positionedSuggestions: PositionedSuggestion[];
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
    severity: string;
    position: IssuePosition;
    section: string;
    textSnippet: string;
  }>;
  improvements: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    type?: string;
    severity?: string;
    position?: IssuePosition;
  }>;
  score: number;
}
