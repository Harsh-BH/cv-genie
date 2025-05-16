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
}

export interface PositionedSuggestion {
  id: string;
  type: string;
  sectionType: string;
  original: string;
  improved: string;
  suggestion: string; 
  issue: string;
  reasoning: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'content' | 'formatting' | 'ats' | 'skills' | 'industry' | 'overall';
  position: {
    sectionTitle: string;
    textSnippet: string;
    lineNumber?: number;
    charRange?: any;
  };
}

export interface ResumeSection {
  type: string;
  heading?: string;
  content: string;
}

export interface StructuredResume {
  fileName: string;
  fileData: string;
  rawContent: string;
  sections: ResumeSection[];
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
  summary: string | string[];
  bulletPoints?: string[];
  achievements?: string[];
  experience: any[];
  skills: any[];
  education: any[];
  projects: any[];
}
