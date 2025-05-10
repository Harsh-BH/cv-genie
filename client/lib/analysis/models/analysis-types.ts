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
  scoreBreakdown: {
    overall: number;
    content: number;
    ats: number;
    formatting: number;
    impact: number;
    skills: number;
  };
  aiGeneratedImprovements: {
    summary: string | string[];
    experience: string[];
    skills: string[];
    education: string[];
    projects: string[];
    bulletPoints?: string[];
    achievements?: string[];
  };
  positionedSuggestions: PositionedSuggestion[];
}

export interface PositionedSuggestion {
  id: string;
  issue: string;
  suggestion: string;
  reasoning: string;
  exampleFix?: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'content' | 'formatting' | 'ats' | 'skills' | 'industry' | 'overall';
  position: {
    sectionTitle?: string;
    textSnippet?: string;
    lineNumber?: number;
    charRange?: [number, number];
  };
}

export interface ResumeSection {
  id: number;
  title: string;
  content: string;
  order: number;
  type: string;
}

export interface StructuredResume {
  id: number;
  title?: string;
  fileName?: string;
  fileData?: string;
  sections: ResumeSection[];
  user?: {
    name: string;
    email: string;
  };
  [key: string]: any;
}
