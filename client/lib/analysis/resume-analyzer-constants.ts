export const industryKeywords = {
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

export const scoreIndicators = {
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
