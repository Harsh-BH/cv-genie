// Helper functions for resume analysis

export function calculateSectionScores(resume: any, analysis: any) {
  const sectionScores: Record<string, number> = {};
  
  // Get sections from resume
  if (resume.sections) {
    // Map section titles to standardized keys
    const sectionMap: Record<string, string> = {
      header: ['header', 'contact', 'personal', 'information'],
      summary: ['summary', 'profile', 'objective', 'about'],
      experience: ['experience', 'work', 'employment', 'professional'],
      education: ['education', 'academic', 'study', 'qualification'],
      skills: ['skills', 'abilities', 'expertise', 'competencies']
    };
    
    // Calculate scores based on analysis
    for (const section of resume.sections) {
      const sectionLower = section.title.toLowerCase();
      
      // Find matching section key
      let key: string | null = null;
      for (const [standardKey, keywords] of Object.entries(sectionMap)) {
        if (keywords.some(keyword => sectionLower.includes(keyword))) {
          key = standardKey;
          break;
        }
      }
      
      if (key) {
        // Calculate score based on relevant metrics from the analysis
        let score = 0;
        switch (key) {
          case 'header':
            score = Math.round((analysis.formattingScore * 0.5) + (analysis.clarityScore * 0.5));
            break;
          case 'summary':
            score = Math.round((analysis.contentScore * 0.6) + (analysis.clarityScore * 0.4));
            break;
          case 'experience':
            score = Math.round((analysis.contentScore * 0.4) + (analysis.atsOptimizationScore * 0.3) + (analysis.industryAlignmentScore * 0.3));
            break;
          case 'education':
            score = Math.round((analysis.formattingScore * 0.6) + (analysis.clarityScore * 0.4));
            break;
          case 'skills':
            score = Math.round((analysis.skillsScore * 0.7) + (analysis.atsOptimizationScore * 0.3));
            break;
          default:
            score = Math.round(analysis.overallScore);
        }
        
        // Ensure score is within valid range
        sectionScores[key] = Math.max(0, Math.min(100, score));
      }
    }
  }
  
  return sectionScores;
}

export function extractIssues(analysis: any) {
  const issues: Record<string, any[]> = {
    grammar: [],
    format: [],
    content: [],
    ats: []
  };
  
  // Try to parse positioned suggestions to extract issues
  try {
    let suggestions: any[] = [];
    
    if (analysis.positionedSuggestions) {
      // If it's already an array, use it directly
      if (Array.isArray(analysis.positionedSuggestions)) {
        suggestions = analysis.positionedSuggestions;
      } 
      // If it's a JSON string, parse it
      else if (typeof analysis.positionedSuggestions === 'string') {
        suggestions = JSON.parse(analysis.positionedSuggestions);
      }
      // If it's an object (parsed JSON), serialize and parse again to be safe
      else {
        suggestions = JSON.parse(JSON.stringify(analysis.positionedSuggestions));
      }
    }
    
    // Map each suggestion to an issue category
    suggestions.forEach(suggestion => {
      const type = suggestion.type.toLowerCase();
      
      if (type.includes('grammar') || type.includes('spelling')) {
        issues.grammar.push(suggestion);
      } else if (type.includes('format') || type.includes('layout')) {
        issues.format.push(suggestion);
      } else if (type.includes('ats') || type.includes('keyword')) {
        issues.ats.push(suggestion);
      } else {
        // Default to content issues
        issues.content.push(suggestion);
      }
    });
  } catch (error) {
    console.error("Error extracting issues from analysis:", error);
  }
  
  return issues;
}
