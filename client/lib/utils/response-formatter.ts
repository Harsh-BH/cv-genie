import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

/**
 * Formats raw text responses from the AI model into structured HTML
 * - Converts markdown to HTML
 * - Ensures proper heading structure
 * - Highlights key points and metrics
 * - Sanitizes output for security
 */
export function formatModelResponse(text: string): string {
  if (!text) return '';
  
  // Pre-process text for better markdown formatting
  let processedText = text
    // Replace section separators with horizontal rule
    .replace(/^\s*--\s*$/gm, '<hr class="section-divider">')
    
    // Clean up any excessive asterisks that aren't part of markdown syntax
    .replace(/\*{3,}/g, '**') // Convert *** or more to just **
    .replace(/\*([^*\s].*?[^*\s])\*/g, '_$1_') // Convert single asterisks to underscore for italic
    
    // Ensure headings have proper space after # for markdown parsing
    .replace(/^(#{1,6})([^#\s])/gm, '$1 $2')
    
    // Convert "Strengths:" and similar major section titles to markdown headings
    .replace(/^(Strengths|Weaknesses|Executive Summary|Overall Assessment|Actionable Recommendations|Detailed Overview):\s*$/gim, '## $1\n')
    
    // Convert subsections with numbered points (e.g. "1. Strong Academic Credentials") to proper subheadings
    .replace(/^\s*(\d+)\.\s+([A-Za-z\s]+[\*]*)$/gm, '### $1. $2')
    
    // Clean up bullet points - remove any stray asterisks or hyphens that aren't being used as bullet points
    .replace(/^[ \t]*[-*][ \t]*(?=[-*])/gm, '') // Remove multiple consecutive bullet points
    .replace(/^\s*[-*]\s*$/gm, '') // Remove lines that are just bullet points with no content
    
    // Properly format bullet points that should be kept
    .replace(/^[*\-•]\s*/gm, '* ')
    
    // Highlight score numbers with bold and color and add stat box for important metrics
    .replace(/(\d{1,3}%|score of \d{1,2}|\b[0-9]+\.[0-9]+\b|CGPA of [0-9]+\.[0-9]+|All India Rank[s]* of [0-9,]+)/gi, '<span class="highlight-metric">$1</span>')
    
    // Wrap important numerical metrics in stat boxes
    .replace(/\b(Overall score|Total score|Final score): (\d{1,3}[%]?)\b/gi, 
      '<div class="stat-box"><div class="stat-number">$2</div><div>$1</div></div>')
    
    // Highlight important positive keywords
    .replace(/\b(excellent|strong|good|effective|professional|impressive|innovative|cutting-edge|expertise|demonstrates|versatility|adaptability)\b/gi, '<span class="highlight-positive hover-underline">$1</span>')
    
    // Highlight important negative keywords
    .replace(/\b(weak|poor|lacking|inadequate|generic|missing|limited|incomplete|ambiguity|unclear)\b/gi, '<span class="highlight-negative">$1</span>')
    
    // Add classes to strengths and weaknesses sections
    .replace(/^## Strengths/gm, '## <span class="section-strengths glow-text">Strengths</span>')
    .replace(/^## Weaknesses/gm, '## <span class="section-weaknesses">Weaknesses and Areas for Improvement</span>')
    
    // Format educational achievements
    .replace(/\b([A-Z]+) of ([0-9.]+)\b/g, '<strong>$1 of $2</strong>')
    
    // Highlight project achievements with glass card effect
    .replace(/\n(Achieved|Developed|Implemented|Created|Built|Designed|Authored)([^.!?]*[.!?])/gi, 
      '\n<div class="achievement glass-card">$1$2</div>')
    
    // Wrap key recommendations in glass boxes
    .replace(/\n(Recommendation|Suggested improvement|Action item|Key takeaway)[s]?:([^.!?]*[.!?])/gi, 
      '\n<div class="tip-box neon-border">$1:$2</div>')
    
    // Add wave animation to important keywords
    .replace(/\b(critical|crucial|essential|important|key|significant)\b/gi, (match) => {
      // Create wave effect by wrapping each letter in a span
      let result = '<span class="wave-text">';
      for (let i = 0; i < match.length; i++) {
        result += `<span style="--i:${i};">${match[i]}</span>`;
      }
      result += '</span>';
      return result;
    });
  
  // Set options for marked
  marked.setOptions({
    gfm: true,
    breaks: true,
    headerIds: true
  });
  
  // Convert markdown to HTML
  const htmlContent = marked(processedText);
  
  // Add wrapper div with custom class
  const wrappedHtml = `<div class="cv-analysis-response glass-effect">
    <div class="particles-container">
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
    </div>
    ${htmlContent}
  </div>`;
  
  // Sanitize the HTML to prevent XSS
  const sanitizedHtml = DOMPurify.sanitize(wrappedHtml, {
    ADD_ATTR: ['class', 'style', '--i'], // Allow class, style attributes and custom properties
  });
  
  return sanitizedHtml;
}

