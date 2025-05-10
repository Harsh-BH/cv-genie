// Don't rely on libraries with file path dependencies for PDF extraction

// Checks if data is Base64 PDF data
export function isPdfData(data: string): boolean {
  if (!data) return false;
  return data.startsWith('data:application/pdf;base64,') || 
         data.startsWith('JVBERi'); // PDF magic number in base64
}

// Extract text from PDF data - use proper text extraction
export async function extractTextFromPdf(pdfData: string): Promise<string> {
  try {
    // Check if we're running on the server
    if (typeof window === 'undefined') {
      console.log("Using server-side PDF extraction with pdf-parse");
      
      const dataWithoutPrefix = pdfData.startsWith('data:')
        ? pdfData.split(',')[1]
        : pdfData;
      
      try {
        // Use pdf-parse properly by passing the buffer directly
        const buffer = Buffer.from(dataWithoutPrefix, 'base64');
        
        // Import with proper type assertions
        const pdfParse = (await import('pdf-parse/lib/pdf-parse.js')).default;
        
        console.log("Extracting PDF text with pdf-parse");
        const result = await pdfParse(buffer);
        
        if (!result.text || result.text.trim().length < 10) {
          console.warn("PDF extraction returned very little text:", result.text);
          return `Could not extract sufficient text from PDF. The document appears to have ${result.numpages} page(s).`;
        }
        
        console.log(`PDF extraction successful: extracted ${result.text.length} characters`);
        return result.text;
      } catch (pdfLibError) {
        console.error("PDF parsing error:", pdfLibError);
        
        // Try the API route as a fallback
        console.log("Falling back to API extraction route");
        try {
          const response = await fetch('http://localhost:3000/api/extract-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pdfData })
          });
          
          if (!response.ok) {
            throw new Error(`API extraction failed: ${response.status}`);
          }
          
          const result = await response.json();
          if (result.text) {
            return result.text;
          }
        } catch (apiError) {
          console.error("API extraction fallback failed:", apiError);
        }
        
        // If everything fails, return a useful error
        return "PDF text extraction failed. The document may be scanned, image-based, or protected.";
      }
    } else {
      // Client-side extraction - fallback to API endpoint
      console.log('Using client-side PDF extraction via API');
      
      try {
        const response = await fetch('/api/extract-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pdfData })
        });
        
        if (!response.ok) {
          throw new Error(`PDF extraction API failed: ${response.status}`);
        }
        
        const result = await response.json();
        return result.text || "PDF processing completed, but no text was extracted.";
      } catch (apiError) {
        console.error("API extraction error:", apiError);
        return "PDF detected but text extraction failed. Using available section data.";
      }
    }
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return "PDF extraction error: The document couldn't be processed.";
  }
}

// Import our predefined replacements
import { textReplacements, techReplacements } from './models/common-replacements';

// Function to normalize extracted text with enhanced Unicode handling
function normalizeExtractedText(text: string): string {
  if (!text) return '';
  
  let normalizedText = text;
  
  // More aggressive Korean/CJK character replacement approach
  // Replace any Korean Hangul characters with a space
  // Unicode ranges for Korean Hangul: \u1100-\u11FF, \u3130-\u318F, \uA960-\uA97F, \uAC00-\uD7AF
  normalizedText = normalizedText.replace(/[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uAC00-\uD7AF]+/g, ' ');
  
  // Apply specific known mappings from our replacement files
  Object.entries({ ...textReplacements, ...techReplacements }).forEach(([pattern, replacement]) => {
    try {
      normalizedText = normalizedText.replace(new RegExp(pattern, 'g'), replacement);
    } catch (e) {
      // Some patterns might be regex-problematic, skip them
      console.warn(`Skipping problematic replacement pattern: ${pattern}`);
    }
  });
  
  // Handle numbers and percentages that might be mangled
  normalizedText = normalizedText.replace(/ퟵퟴ/g, "98");
  normalizedText = normalizedText.replace(/ퟵퟯ/g, "90");
  normalizedText = normalizedText.replace(/ퟱퟯ/g, "50");
  
  // Replace common mangled phrases in resume context
  const commonPhrases = [
    // Skills
    { from: /헔헜/, to: 'AI' },
    { from: /헠헟/, to: 'ML' },
    { from: /헗헲헲헽 헟헲헮헿헻헶헴/, to: 'Deep Learning' },
    { from: /헗헮픁헮 헦헰헶헲헻헰헲/, to: 'Data Science' },
    
    // Action verbs
    { from: /헗헲혃헲헹헼헽헲헱/, to: 'Developed' },
    { from: /헜헺헽헹헲헺헲헻픁헲헱/, to: 'Implemented' },
    { from: /헟헲헱/, to: 'Led' },
    { from: /헠헮헻헮헴헲헱/, to: 'Managed' },
    { from: /헖헿헲헮픁헲헱/, to: 'Created' },
    { from: /헗헲헽헹헼혆헲헱/, to: 'Deployed' },
    { from: /헗헲픀헶헴헻헲헱/, to: 'Designed' },
    { from: /헔헻헮헹혆혇헲헱/, to: 'Analyzed' },
    
    // Common resume section headers
    { from: /험헱픂헰헮픁헶헼헻/, to: 'Education' },
    { from: /험혅헽헲헿헶헲헻헰헲/, to: 'Experience' },
    { from: /헦헸헶헹헹픀/, to: 'Skills' },
    { from: /헦픂헺헺헮헿혆/, to: 'Summary' },
    { from: /헣헿헼헷헲헰픁픀/, to: 'Projects' },
  ];
  
  // Apply common phrase replacements
  commonPhrases.forEach(({ from, to }) => {
    normalizedText = normalizedText.replace(from, to);
  });
  
  // General cleanup for readability
  normalizedText = normalizedText
    // Replace multiple spaces with a single space
    .replace(/ {2,}/g, ' ')
    // Fix bullet points that might have been converted
    .replace(/[●•․]/g, '• ')
    // Fix common Unicode issues with quotation marks
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    // Fix common Unicode issues with dashes
    .replace(/[\u2013\u2014]/g, '-')
    // Replace unusual whitespace characters
    .replace(/[\u00A0\u2002-\u200A\u202F]/g, ' ')
    // Remove any leftover unreadable characters (often displayed as boxes or question marks)
    .replace(/�/g, '')
    // Remove zero-width spaces and joiners
    .replace(/[\u200B-\u200D\uFEFF]/g, '');
  
  // Replace % with "percent" if it appears after a number
  normalizedText = normalizedText.replace(/(\d+)%/g, '$1 percent');
  
  // Clean up line breaks and spacing
  normalizedText = normalizedText
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
    
  console.log("Text normalization applied to fix Unicode and mangled character issues");
  return normalizedText;
}

// Process raw resume data with improved validation
export async function extractResumeText(fileData: string): Promise<string> {
  try {
    if (!fileData) {
      console.warn('No file data provided to extractResumeText');
      return ""; // Return empty string instead of throwing
    }
    
    // Check if it's PDF data
    const isPdf = isPdfData(fileData);
    console.log(`File data is ${isPdf ? 'PDF' : 'not PDF'} format`);
    
    if (isPdf) {
      console.log(`Detected PDF data (${fileData.length} chars), extracting text...`);
      let extractedText = await extractTextFromPdf(fileData);
      
      // Apply enhanced text normalization to fix Unicode issues
      extractedText = normalizeExtractedText(extractedText);
      
      // Log sample of normalized text
      console.log("==== SAMPLE OF NORMALIZED TEXT ====");
      console.log(extractedText.substring(0, 500));
      console.log("==== END SAMPLE ====");
      
      return extractedText;
    }
    
    // If not PDF, assume it's already plain text
    if (typeof fileData === 'string' && fileData.length > 0) {
      console.log(`Using provided text data (${fileData.length} chars)`);
      return fileData;
    }
    
    console.warn('Invalid file data format', typeof fileData);
    return ""; // Return empty string instead of throwing
  } catch (error) {
    console.error('Resume text extraction error:', error);
    return ""; // Return empty string to allow process to continue
  }
}
