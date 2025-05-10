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
    // Ensure headings have proper space after # for markdown parsing
    .replace(/^(#{1,6})([^#\s])/gm, '$1 $2')
    
    // Convert "Strengths:" and similar section titles to markdown headings
    .replace(/^([A-Za-z\s]+):$/gm, '### $1')
    
    // Highlight score numbers with bold and color
    .replace(/(\d{1,3}%|score of \d{1,2})/gi, '**$1**')
    
    // Highlight important keywords
    .replace(/\b(excellent|strong|good|effective|professional|impressive)\b/gi, '**$1**')
    .replace(/\b(weak|poor|lacking|inadequate|generic|missing)\b/gi, '*$1*')
    
    // Ensure bullet points are properly formatted
    .replace(/^[*\-•]\s*/gm, '* ');
  
  // Convert markdown to HTML
  const htmlContent = marked(processedText);
  
  // Sanitize the HTML to prevent XSS
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);
  
  return sanitizedHtml;
}

/**
 * Ensures numerical scores are valid, with fallback values for NaN or undefined
 */
export function ensureValidScore(score?: number | null): number {
  if (score === undefined || score === null || isNaN(score)) {
    return 5; // Default middle score
  }
  return score;
}
