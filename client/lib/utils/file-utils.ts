/**
 * Utilities for file processing and text extraction
 */

// Avoid direct import of pdfjs which requires worker configuration
// import * as pdfjs from 'pdfjs-dist';

/**
 * Extract text from base64-encoded PDF data using multiple fallback methods
 */
export async function extractTextFromBase64(base64Data: string): Promise<string> {
  try {
    console.log("Starting text extraction from base64 data");
    
    // Remove data URL prefix if present
    if (base64Data.startsWith('data:application/pdf;base64,')) {
      base64Data = base64Data.replace(/^data:application\/pdf;base64,/, '');
    }
    
    // First try the simplest method - regex-based extraction directly from base64
    try {
      console.log("Attempting direct regex extraction from base64...");
      const regexResult = extractTextWithRegex(base64Data);
      
      // If we got a reasonable amount of text, use it
      if (regexResult && regexResult.length > 200 && isReadableText(regexResult)) {
        console.log(`Regex extraction successful: ${regexResult.length} characters`);
        return regexResult;
      }
      console.log("Direct regex extraction yielded insufficient or unreadable text, trying other methods...");
    } catch (regexError) {
      console.log("Regex extraction failed:", regexError);
    }

    // Try multiple extraction methods and pick the best result
    const extractionResults = [];
    
    // Method 2: Try text pattern extraction
    try {
      console.log("Attempting binary data text pattern extraction...");
      const decodedText = decodeBase64AndFindText(base64Data);
      if (decodedText && decodedText.length > 200) {
        extractionResults.push({
          text: decodedText,
          quality: assessTextQuality(decodedText),
          method: "binary pattern extraction"
        });
      }
    } catch (binaryError) {
      console.log("Binary text extraction failed:", binaryError);
    }
    
    // Method 3: Try fallback method
    try {
      console.log("Attempting fallback text extraction...");
      const fallbackResult = fallbackExtractText(base64Data);
      if (fallbackResult && fallbackResult.length > 100) {
        extractionResults.push({
          text: fallbackResult,
          quality: assessTextQuality(fallbackResult),
          method: "fallback extraction"
        });
      }
    } catch (fallbackError) {
      console.log("Fallback extraction failed:", fallbackError);
    }
    
    // Method 4: Try simplified TJ extraction (often works better for certain PDFs)
    try {
      console.log("Attempting TJ operator extraction...");
      const tjResult = extractTjOperators(base64Data);
      if (tjResult && tjResult.length > 100) {
        extractionResults.push({
          text: tjResult,
          quality: assessTextQuality(tjResult),
          method: "TJ extraction"
        });
      }
    } catch (tjError) {
      console.log("TJ extraction failed:", tjError);
    }
    
    // Sort results by quality score and pick the best one
    if (extractionResults.length > 0) {
      extractionResults.sort((a, b) => b.quality - a.quality);
      const bestResult = extractionResults[0];
      console.log(`Best extraction method: ${bestResult.method} (quality score: ${bestResult.quality})`);
      
      // Only return if quality meets minimum threshold
      if (bestResult.quality >= 0.4) {
        return bestResult.text;
      }
      
      console.log("All extraction methods produced poor quality text.");
    }
    
    // If all methods failed or produced poor quality text, return error message with instructions
    return `We could not extract readable text from this PDF. 
    
This may be because:
1. The PDF contains only scanned images (OCR would be required)
2. The PDF has security restrictions
3. The PDF uses non-standard text encoding
4. The PDF is corrupted or password-protected

Please try uploading a different version of your resume, or copy-paste the text directly into the editor.`;
  } catch (error) {
    console.error("All PDF text extraction methods failed:", error);
    throw new Error(`PDF text extraction failed: ${error.message}`);
  }
}

/**
 * Extract text using regex patterns that look for text content markers in PDF
 */
function extractTextWithRegex(base64Data: string): string {
  // Decode a portion of the base64 data to look for text
  // We don't process the entire file to avoid memory issues
  let decodedChunk = '';
  
  try {
    // Take portions from different parts of the PDF for better coverage
    const chunks = [
      base64Data.substring(0, 10000),                                // Beginning
      base64Data.substring(Math.floor(base64Data.length / 2), 10000), // Middle
      base64Data.substring(base64Data.length - 10000)                // End
    ];
    
    // Partially decode each chunk
    decodedChunk = chunks.map(chunk => {
      try {
        return atob(chunk);
      } catch (e) {
        return '';
      }
    }).join('');
  } catch (e) {
    // If decoding fails, use the raw base64 data
    decodedChunk = base64Data;
  }
  
  const textResults = [];
  
  // Pattern 1: Text between parentheses (common PDF text encoding)
  const parenthesesTexts = extractTextBetweenMarkers(decodedChunk, '(', ')');
  if (parenthesesTexts) textResults.push(parenthesesTexts);
  
  // Pattern 2: Text after "BT" (Begin Text) markers
  const btTexts = extractPdfTextAfterMarker(decodedChunk, 'BT');
  if (btTexts) textResults.push(btTexts);
  
  // Pattern 3: Look for plain text sequences
  const plainTextMatches = decodedChunk.match(/[a-zA-Z0-9]{3,}(?:\s+[a-zA-Z0-9]{3,}){2,}/g);
  if (plainTextMatches) textResults.push(plainTextMatches.join(' '));
  
  // Return the longest result, which is most likely to be actual content
  return textResults.sort((a, b) => b.length - a.length)[0] || '';
}

/**
 * Extract text between specified markers
 */
function extractTextBetweenMarkers(text: string, startMarker: string, endMarker: string): string {
  const result = [];
  let startPos = 0;
  let openPos, closePos;
  
  // Find all occurrences of text between markers
  while ((openPos = text.indexOf(startMarker, startPos)) !== -1) {
    closePos = text.indexOf(endMarker, openPos + 1);
    if (closePos === -1) break;
    
    const content = text.substring(openPos + 1, closePos);
    // Only keep content that looks like text (has multiple alphanumeric chars)
    if (/[a-zA-Z0-9]{2,}/.test(content)) {
      result.push(content);
    }
    
    startPos = closePos + 1;
  }
  
  // Clean up and join results
  return result
    .filter(text => text.length > 1 && !/^\d+$/.test(text)) // Filter out numbers-only
    .join(' ');
}

/**
 * Extract text after PDF BT (Begin Text) markers
 */
function extractPdfTextAfterMarker(text: string, marker: string): string {
  const matches = [];
  let pos = 0;
  
  // Find all occurrences of the marker
  while ((pos = text.indexOf(marker, pos)) !== -1) {
    // Take a chunk after the marker
    const chunk = text.substring(pos + marker.length, pos + marker.length + 100);
    // Look for text in that chunk
    const textMatch = chunk.match(/[a-zA-Z0-9\s.,;:'"(){}\[\]<>\/\\|`~!@#$%^&*\-=_+]{5,}/);
    if (textMatch) {
      matches.push(textMatch[0]);
    }
    pos += marker.length;
  }
  
  return matches.join(' ');
}

/**
 * Decode base64 and search for text patterns
 */
function decodeBase64AndFindText(base64: string): string {
  try {
    // We can't decode the entire PDF at once (memory issues),
    // so we'll process it in chunks
    const chunkSize = 5000;
    const textChunks = [];
    
    for (let i = 0; i < base64.length; i += chunkSize) {
      const chunk = base64.substring(i, i + chunkSize);
      try {
        // Try to decode the chunk
        const decoded = atob(chunk);
        
        // Extract text-like sequences
        const textMatches = decoded.match(/[a-zA-Z0-9\s.,;:'"(){}\[\]<>\/\\|`~!@#$%^&*\-=_+]{5,}/g);
        if (textMatches) {
          textChunks.push(...textMatches);
        }
      } catch (e) {
        // Skip chunks that can't be decoded
        continue;
      }
    }
    
    // Filter to keep only chunks that look like real text
    const textResults = textChunks
      .filter(chunk => {
        // Require certain character density of letters and spaces
        const letters = (chunk.match(/[a-zA-Z]/g) || []).length;
        const spaces = (chunk.match(/\s/g) || []).length;
        return letters > 5 && spaces > 0 && letters/chunk.length > 0.3;
      })
      .join(' ');
    
    return textResults;
  } catch (error) {
    console.error("Error in decodeBase64AndFindText:", error);
    return '';
  }
}

/**
 * Enhanced fallback text extraction method
 */
export function fallbackExtractText(data: string): string {
  try {
    console.log("Using fallback text extraction method");
    
    // Try multiple regex patterns to extract text content
    const extractedTexts = [];
    
    // Method 1: Find text inside parentheses (common in PDF format)
    const parenthesesMatches = data.match(/\(([^)]{3,})\)/g);
    if (parenthesesMatches && parenthesesMatches.length > 0) {
      const parenthesesText = parenthesesMatches
        .map(match => match.substring(1, match.length - 1))
        .filter(text => text.trim().length > 1 && !/^\d+$/.test(text))
        .join(' ');
      
      if (parenthesesText.length > 50) {
        extractedTexts.push(parenthesesText);
      }
    }
    
    // Method 2: Look for patterns of ASCII text clusters
    const asciiMatches = data.match(/[a-zA-Z]{3,}(?:\s+[a-zA-Z]{2,}){2,}/g);
    if (asciiMatches && asciiMatches.length > 0) {
      const asciiText = asciiMatches.join(' ');
      if (asciiText.length > 50) {
        extractedTexts.push(asciiText);
      }
    }
    
    // Method 3: Look for text after "TJ" markers (PDF text markers)
    const tjPattern = /TJ\s*\(([^)]+)\)/g;
    const tjMatches = [];
    let match;
    while ((match = tjPattern.exec(data)) !== null) {
      tjMatches.push(match[1]);
    }
    
    if (tjMatches.length > 0) {
      extractedTexts.push(tjMatches.join(' '));
    }
    
    // Method 4: Simply look for sequences of letters between spaces
    const wordPattern = /\s([a-zA-Z]{4,})\s/g;
    const words = [];
    while ((match = wordPattern.exec(data)) !== null) {
      words.push(match[1]);
    }
    
    if (words.length > 10) {
      extractedTexts.push(words.join(' '));
    }
    
    // If we found some text, return the longest extracted content
    if (extractedTexts.length > 0) {
      const bestText = extractedTexts.sort((a, b) => b.length - a.length)[0];
      console.log(`Fallback extraction found ${bestText.length} characters`);
      return bestText;
    }
    
    // Last resort - return error message as text
    return "Text extraction failed - please upload your resume in a different format (like DOCX or plain text)";
  } catch (error) {
    console.error("Fallback extraction error:", error);
    return "Could not process document";
  }
}

/**
 * Detect if content is likely binary/base64 data
 */
export function isBinaryContent(content: string): boolean {
  if (!content) return false;
  
  // Check for PDF header in base64
  if (content.startsWith('JVBERi')) {
    return true;
  }
  
  // Check for data URL format
  if (content.startsWith('data:application/pdf;base64,')) {
    return true;
  }
  
  // Check if content is mostly base64 characters
  const base64Regex = /^[A-Za-z0-9+/=]+$/;
  
  // If it's a long string of just base64 characters, it's likely binary
  if (content.length > 100 && base64Regex.test(content.substring(0, 100))) {
    return true;
  }
  
  return false;
}

/**
 * Extract just TJ operators which often hold the main text
 */
function extractTjOperators(data: string): string {
  try {
    // Decode a portion to work with
    let decodedText = '';
    try {
      // Decode chunks to handle large PDFs
      const chunkSize = 10000;
      for (let i = 0; i < Math.min(data.length, 100000); i += chunkSize) {
        try {
          decodedText += atob(data.substring(i, i + chunkSize));
        } catch (e) {
          // Skip chunks that can't be decoded
          continue;
        }
      }
    } catch (e) {
      console.log("Couldn't decode base64", e);
      decodedText = data; // Fallback to raw data
    }
    
    // Extract text strings from TJ operators
    const textChunks = [];
    
    // Look for text in TJ operators (common in PDFs)
    const tjRegex = /\[([^\]]*)\]\s*TJ/g;
    let tjMatch;
    
    while ((tjMatch = tjRegex.exec(decodedText)) !== null) {
      // Extract text from the TJ array
      const tjContent = tjMatch[1];
      
      // Extract strings in parentheses
      const stringRegex = /\(([^)]+)\)/g;
      let stringMatch;
      
      while ((stringMatch = stringRegex.exec(tjContent)) !== null) {
        if (stringMatch[1] && stringMatch[1].length > 0) {
          textChunks.push(stringMatch[1]);
        }
      }
    }
    
    // If we found text content, join it
    if (textChunks.length > 0) {
      // Process to insert spaces where appropriate
      let text = '';
      let lastChunk = '';
      
      for (const chunk of textChunks) {
        // Add space if the current chunk starts with uppercase and last chunk ends with period
        // Or if chunks are clearly separate words
        if ((lastChunk.endsWith('.') && /^[A-Z]/.test(chunk)) || 
            (!chunk.startsWith('-') && !chunk.startsWith(',') && !chunk.startsWith('.') && !lastChunk.endsWith('-'))) {
          text += ' ';
        }
        
        text += chunk;
        lastChunk = chunk;
      }
      
      return text.replace(/\s+/g, ' ').trim();
    }
    
    return '';
  } catch (error) {
    console.error("TJ operator extraction failed:", error);
    return '';
  }
}

/**
 * Check if extracted text is actually readable content and not garbage
 */
export function isReadableText(text: string): boolean {
  // Skip short text
  if (!text || text.length < 100) return false;
  
  // Count alphabet characters and spaces
  const alphabetCount = (text.match(/[a-zA-Z]/g) || []).length;
  const spaceCount = (text.match(/\s/g) || []).length;
  
  // Calculate the ratio of alphabet characters to total length
  const alphabetRatio = alphabetCount / text.length;
  const spaceRatio = spaceCount / text.length;
  
  // Check for common resume terms
  const resumeTerms = ['experience', 'education', 'skills', 'job', 'work', 'project'];
  const hasResumeTerms = resumeTerms.some(term => text.toLowerCase().includes(term));
  
  // Check for too many unusual characters
  const unusualCharRatio = (text.match(/[^\w\s.,;:!?'"()-]/g) || []).length / text.length;
  
  // Good text has a reasonable ratio of letters, spaces, and not too many unusual characters
  return (alphabetRatio > 0.4) && 
         (spaceRatio > 0.05 && spaceRatio < 0.3) && 
         (unusualCharRatio < 0.15) &&
         hasResumeTerms;
}

/**
 * Assess text quality on a scale of 0 (unusable) to 1 (excellent)
 */
export function assessTextQuality(text: string): number {
  if (!text || text.length < 100) return 0;
  
  let score = 0;
  
  // Calculate various quality indicators
  
  // 1. Ratio of alphabet characters (0-0.4)
  const alphabetCount = (text.match(/[a-zA-Z]/g) || []).length;
  const alphabetRatio = alphabetCount / text.length;
  score += Math.min(alphabetRatio * 1.0, 0.4); // Max 0.4 points for alphabet ratio
  
  // 2. Word count and length distribution (0-0.2)
  const words = text.split(/\s+/).filter(w => w.length > 1);
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / Math.max(words.length, 1);
  if (words.length > 50 && avgWordLength > 3 && avgWordLength < 12) {
    score += 0.2;
  } else if (words.length > 20) {
    score += 0.1;
  }
  
  // 3. Presence of common resume terms (0-0.2)
  const resumeTerms = [
    'experience', 'education', 'skills', 'work', 'job', 'project', 
    'university', 'degree', 'professional', 'resume', 'cv', 'career'
  ];
  const termMatches = resumeTerms.filter(term => text.toLowerCase().includes(term)).length;
  score += Math.min(termMatches / resumeTerms.length * 0.4, 0.2);
  
  // 4. Structure indicators like line breaks and formatting (0-0.1)
  if (text.includes('\n') || text.includes('\r')) {
    score += 0.1;
  }
  
  // 5. Lack of garbage indicators (0-0.1)
  const unusualCharRatio = (text.match(/[^\w\s.,;:!?'"()-]/g) || []).length / text.length;
  if (unusualCharRatio < 0.05) {
    score += 0.1;
  } else if (unusualCharRatio > 0.2) {
    score -= 0.2; // Penalize heavily for too many unusual characters
  }
  
  return Math.max(0, Math.min(score, 1)); // Ensure score is between 0 and 1
}
