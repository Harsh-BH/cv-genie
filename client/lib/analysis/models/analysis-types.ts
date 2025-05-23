export interface AnalysisResult {
  executiveSummary: string;
  overview: string;
  contentQuality: { set: string };
  atsCompatibility: string;
  industryFit: string;
  formattingReview: string;
  skillsAnalysis: string;
  careerTrajectory: string;
  improvementSuggestions: string;
  scoreBreakdown: ScoreBreakdown;
  aiGeneratedImprovements: AIGeneratedImprovements;
  positionedSuggestions: PositionedSuggestion[];
  grammarIssues?: GrammarIssue[];
}

export interface PositionedSuggestion {
  id: string;
  type: 'content' | 'formatting' | 'ats' | 'skills' | 'industry' | 'overall' | 'grammar';
  sectionType: string;
  original: string;
  improved: string;
  suggestion: string; 
  issue: string;
  reasoning: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'content' | 'formatting' | 'ats' | 'skills' | 'industry' | 'overall' | 'grammar';
  position: {
    sectionTitle: string;
    textSnippet: string;
    lineNumber?: number;
    charRange?: [number, number];
  };
}

export interface ResumeSection {
  id: number;        // Add this to match your implementation
  title: string;
  type: string;
  content: string;
  order: number;
}


export interface StructuredResume {
  fileName?: string;
  fileData?: string;
  rawContent: string;
  sections: ResumeSection[];
  skills?: string[];
  user?: {
    name: string;
    email: string;
  };
}

export interface ScoreBreakdown {
  overall: number;
  content: number;
  ats: number;
  formatting: number;
  impact: number;
  skills: number;
  grammar: number;
  clarity: number;
}

export interface AIGeneratedImprovements {
  summary: string;
  bulletPoints: string[];
  achievements: string[];
  experience: string[];
  skills: string[];
  education: string[];
  projects: string[];
}

export interface GrammarIssue {
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
}
