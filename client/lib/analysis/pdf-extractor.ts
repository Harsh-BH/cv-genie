import * as pdfjsLib from 'pdfjs-dist';

/**
 * Extract text from base64 encoded PDF data in a server environment
 * @param base64Data The base64 encoded PDF data
 * @returns Extracted text content
 */
export async function extractTextFromPdf(base64Data: string): Promise<string> {
  // Remove data URL prefix if present
  const strippedBase64 = base64Data.replace(/^data:application\/pdf;base64,/, '');
  
  try {
    // For server environments, we'll use a simpler approach to avoid worker issues
    if (typeof window === 'undefined') {
      // Server environment - return base64 length and metadata for debugging
      const pdfLengthMB = Math.round(strippedBase64.length / 1024 / 1024 * 100) / 100;
      console.log(`[PDF Extract] PDF detected (${pdfLengthMB}MB). Beginning extraction...`);
      
      // We can detect basic PDF metadata from the header
      let pdfInfo = "PDF document detected. ";
      
      // Look for PDF title in the base64
      const titleMatch = strippedBase64.match(/\/Title\s*\(([^)]+)\)/);
      if (titleMatch && titleMatch[1]) {
        const title = Buffer.from(titleMatch[1], 'ascii').toString('utf-8');
        console.log(`[PDF Extract] Found PDF title: ${title}`);
        pdfInfo += `Title: ${title}. `;
      }
      
      // Look for PDF author in the base64
      const authorMatch = strippedBase64.match(/\/Author\s*\(([^)]+)\)/);
      if (authorMatch && authorMatch[1]) {
        const author = Buffer.from(authorMatch[1], 'ascii').toString('utf-8');
        console.log(`[PDF Extract] Found PDF author: ${author}`);
        pdfInfo += `Author: ${author}. `;
      }

      // First try to extract text using PDF object stream content approach
      console.log('[PDF Extract] Attempting primary text extraction method...');
      let extractedText = await extractTextFromPdfBase64Advanced(strippedBase64);
      
      if (extractedText && extractedText.length > 200) {
        console.log(`[PDF Extract] Successfully extracted text using primary method (${extractedText.length} chars)`);
        return `${pdfInfo}\n\nEXTRACTED CONTENT:\n${extractedText}`;
      }
      
      // Second, try simpler text extraction with a more permissive regex
      console.log('[PDF Extract] Primary extraction failed, trying backup method...');
      extractedText = extractTextUsingMultiplePatterns(strippedBase64);
      
      if (extractedText && extractedText.length > 200) {
        console.log(`[PDF Extract] Successfully extracted text using backup method (${extractedText.length} chars)`);
        return `${pdfInfo}\n\nEXTRACTED CONTENT:\n${extractedText}`;
      }
      
      console.log('[PDF Extract] All extraction methods failed. Likely an image-based or secured PDF.');
      pdfInfo += `This appears to be an image-based PDF or one with secured text content.`;
      
      return pdfInfo;
    }

    // Client-side extraction (won't run in this code path on the server)
    throw new Error("Client-side PDF extraction should be handled separately");
    
  } catch (error) {
    console.error('[PDF Extract] Error extracting PDF text:', error);
    return `Error extracting PDF text: ${error instanceof Error ? error.message : String(error)}. Using fallback method.`;
  }
}

/**
 * More advanced extraction that tries to parse PDF objects and streams
 */
async function extractTextFromPdfBase64Advanced(base64Data: string): Promise<string> {
  try {
    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Check for common text patterns in the PDF
    const pdfText = buffer.toString('binary');
    
    // Log the PDF structure for debugging
    console.log('[PDF Extract] Analyzing PDF structure...');
    
    // Check if it's a normal PDF or a linearized "web optimized" PDF
    const isLinearized = pdfText.includes('/Linearized');
    console.log(`[PDF Extract] PDF is ${isLinearized ? 'linearized (web optimized)' : 'standard'}`);
    
    // Check if the PDF seems to be encrypted or has security
    const hasEncryption = pdfText.includes('/Encrypt') || pdfText.includes('/Encryption');
    if (hasEncryption) {
      console.log('[PDF Extract] Warning: PDF appears to be encrypted or has security settings');
    }
    
    // Look for text content in object streams
    console.log('[PDF Extract] Searching for text content in PDF object streams...');
    
    // Count text streams
    const streamCount = (pdfText.match(/stream[\r\n].*?[\r\n]endstream/gs) || []).length;
    console.log(`[PDF Extract] Found ${streamCount} streams in the PDF`);
    
    // Extract text from object streams - match BT (Begin Text) and ET (End Text) sections
    const textSections = [];
    
    // Pattern for text objects
    const btEtPattern = /BT[\s\S]*?ET/g;
    const btEtMatches = pdfText.match(btEtPattern) || [];
    console.log(`[PDF Extract] Found ${btEtMatches.length} BT/ET text sections`);
    
    if (btEtMatches.length > 0) {
      for (const match of btEtMatches) {
        // Extract text strings from the BT/ET section
        const textMatches = match.match(/\(([^)]+)\)/g) || [];
        if (textMatches.length > 0) {
          const extractedTexts = textMatches
            .map(t => t.slice(1, -1))  // Remove parentheses
            .filter(t => t.length > 2); // Filter out very short strings
          
          if (extractedTexts.length > 0) {
            textSections.push(...extractedTexts);
          }
        }
        
        // Also try to extract text using Tj and TJ operators
        const tjMatches = match.match(/\([^)]+\)\s*Tj/g) || [];
        const tjTexts = tjMatches.map(tj => tj.match(/\(([^)]+)\)/)?.[1]).filter(Boolean);
        
        if (tjTexts.length > 0) {
          textSections.push(...tjTexts);
        }
        
        // Extract from TJ arrays
        const tjArrayMatches = match.match(/\[[^\]]+\]\s*TJ/g) || [];
        for (const tjArray of tjArrayMatches) {
          const stringMatches = tjArray.match(/\(([^)]+)\)/g) || [];
          const strings = stringMatches.map(s => s.slice(1, -1));
          if (strings.length > 0) {
            textSections.push(...strings);
          }
        }
      }
    }
    
    console.log(`[PDF Extract] Extracted ${textSections.length} text sections from BT/ET blocks`);
    
    // If we found text sections, join them with appropriate spacing
    if (textSections.length > 0) {
      // Process text sections to handle potential encoding issues and add spacing
      const processedText = textSections
        .filter(text => 
          // Filter out sections that likely aren't real text content
          text.length > 1 && 
          !text.startsWith('/') && 
          !/^\d+(\.\d+)?$/.test(text) // Skip sections that are just numbers
        )
        .join(' ');
      
      if (processedText.length > 200) {
        console.log(`[PDF Extract] Successfully extracted ${processedText.length} chars of text content`);
        return processedText;
      } else {
        console.log(`[PDF Extract] Extracted text too short (${processedText.length} chars), likely not meaningful`);
      }
    }
    
    // If BT/ET extraction failed, try a more general approach
    console.log('[PDF Extract] BT/ET extraction failed, trying generic string extraction...');
    return null;
  } catch (error) {
    console.error('[PDF Extract] Advanced extraction failed:', error);
    return null;
  }
}

/**
 * Extract text using multiple regex patterns to maximize chances of getting content
 */
function extractTextUsingMultiplePatterns(base64Data: string): string {
  try {
    const pdfData = Buffer.from(base64Data, 'base64').toString('binary');
    console.log('[PDF Extract] Attempting text extraction using multiple regex patterns...');
    
    // Pattern 1: Standard text in parentheses with minimum length
    const pattern1 = /\((\w[^)]{10,})\)/g;
    const matches1 = pdfData.match(pattern1) || [];
    console.log(`[PDF Extract] Pattern 1 found ${matches1.length} matches`);
    
    // Pattern 2: Any content between parentheses with word characters
    const pattern2 = /\(([^)]*\w[^)]*)\)/g;
    const matches2 = pdfData.match(pattern2) || [];
    console.log(`[PDF Extract] Pattern 2 found ${matches2.length} matches`);
    
    // Pattern 3: Look for sequences that might be words (alphanumeric sequences)
    const pattern3 = /(\w{4,})/g; 
    const matches3 = pdfData.match(pattern3) || [];
    console.log(`[PDF Extract] Pattern 3 found ${matches3.length} matches`);
    
    // Combine and process the matches
    let combinedMatches = [
      ...matches1.map(m => m.slice(1, -1)),  // Remove parentheses
      ...matches2.map(m => m.slice(1, -1))   // Remove parentheses
    ];
    
    // Filter out short and likely non-text items
    const filteredMatches = combinedMatches.filter(text => {
      return text.length > 3 && 
             /\w/.test(text) &&              // Contains at least one word character
             !/^\d+(\.\d+)?$/.test(text) &&  // Not just a number
             !text.startsWith('/') &&        // Not a PDF command
             !/^(true|false)$/i.test(text);  // Not just boolean values
    });
    
    console.log(`[PDF Extract] After filtering, found ${filteredMatches.length} potential text blocks`);
    
    if (filteredMatches.length > 0) {
      // Join the matches with spaces
      const extractedText = filteredMatches.join(' ');
      
      // Clean up the extracted text (remove repeated spaces, fix common encoding issues)
      const cleanedText = extractedText
        .replace(/\s+/g, ' ')
        .trim();
      
      console.log(`[PDF Extract] Extracted ${cleanedText.length} characters of text`);
      if (cleanedText.length > 200) {
        return cleanedText;
      }
    }
    
    // If standard patterns don't work, try a more aggressive approach with pattern3
    // but only use it if it seems to contain actual words
    if (matches3.length > 50) {
      // Join a sample of the matches to see if they form coherent text
      const sampleText = matches3.slice(0, 100).join(' ');
      
      // Check if the sample contains common English words that would suggest it's actual text
      const commonWords = ['the', 'and', 'for', 'with', 'this', 'that', 'from', 'have'];
      const hasCommonWords = commonWords.some(word => 
        sampleText.toLowerCase().includes(` ${word} `) ||
        sampleText.toLowerCase().startsWith(`${word} `)
      );
      
      if (hasCommonWords) {
        console.log('[PDF Extract] Detected common words in pattern 3 matches, using them');
        return matches3.slice(0, 300).join(' ');
      }
    }
    
    console.log('[PDF Extract] Could not extract meaningful text using regex patterns');
    return null;
    
  } catch (error) {
    console.error('[PDF Extract] Error in multiple pattern extraction:', error);
    return null;
  }
}

/**
 * Check if data is likely PDF data (starts with PDF header in base64)
 */
export function isPdfData(data: string): boolean {
  if (!data) return false;
  const isPdf = data.startsWith('JVBERi0') || data.startsWith('data:application/pdf;base64,');
  if (isPdf) {
    console.log('[PDF Extract] Detected PDF format in data');
  }
  return isPdf;
}

/**
 * Extract basic information about a PDF without parsing its content
 * Used as a fallback when full parsing fails
 */
export async function extractPdfMetadata(pdfData: string): Promise<string> {
  console.log('[PDF Extract] Starting PDF metadata extraction...');
  try {
    // Remove data URL prefix if present
    const strippedBase64 = pdfData.replace(/^data:application\/pdf;base64,/, '');
    
    // Get size information
    const sizeMB = Math.round(strippedBase64.length / 1024 / 1024 * 100) / 100;
    console.log(`[PDF Extract] PDF size: ${sizeMB}MB`);
    
    // Create a text representation with available metadata
    let metadata = `PDF Document (${sizeMB}MB)\n\n`;
    
    // Look for common metadata patterns in the PDF header
    const titleMatch = strippedBase64.match(/\/Title\s*\(([^)]+)\)/);
    if (titleMatch && titleMatch[1]) {
      console.log(`[PDF Extract] Found PDF title metadata`);
      metadata += `Title: ${titleMatch[1]}\n`;
    }
    
    const authorMatch = strippedBase64.match(/\/Author\s*\(([^)]+)\)/);
    if (authorMatch && authorMatch[1]) {
      console.log(`[PDF Extract] Found PDF author metadata`);
      metadata += `Author: ${authorMatch[1]}\n`;
    }
    
    const creatorMatch = strippedBase64.match(/\/Creator\s*\(([^)]+)\)/);
    if (creatorMatch && creatorMatch[1]) {
      console.log(`[PDF Extract] Found PDF creator metadata`);
      metadata += `Creator: ${creatorMatch[1]}\n`;
    }
    
    // Try extracting text using our improved methods
    console.log('[PDF Extract] Attempting enhanced text content extraction...');
    
    // First try advanced method
    let extractedText = null;
    
    try {
      extractedText = await extractTextFromPdfBase64Advanced(strippedBase64);
    } catch (e) {
      console.error('[PDF Extract] Advanced extraction method failed:', e);
    }
    
    // If advanced method failed, try the multiple patterns approach
    if (!extractedText) {
      extractedText = extractTextUsingMultiplePatterns(strippedBase64);
    }
    
    // If we got text, add it to our output
    if (extractedText && extractedText.length > 200) {
      console.log('[PDF Extract] Successfully extracted text content from PDF');
      metadata += "\n\nEXTRACTED CONTENT:\n";
      metadata += extractedText;
      return metadata;
    }
    
    console.log('[PDF Extract] Could not extract meaningful text content. This may be an image-based PDF.');
    metadata += "\nThis appears to be an image-based PDF or one with secured text content.";
    metadata += "\nFull text extraction was not possible. Analysis will be based on available metadata.";
    
    return metadata;
  } catch (error) {
    console.error('[PDF Extract] Error extracting PDF metadata:', error);
    return 'PDF document detected. Content could not be extracted due to technical limitations.';
  }
}
