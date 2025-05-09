import * as pdfjs from 'pdfjs-dist';

// Configure the worker differently based on environment
if (typeof window !== 'undefined') {
  // Client-side (browser environment)
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
}

/**
 * Parse base64 encoded PDF data into text content
 * @param base64Data Base64 encoded PDF data
 * @returns Extracted text content from the PDF
 */
export async function parsePdfFromBase64(base64Data: string): Promise<string> {
  try {
    // If server-side, log and return placeholder text
    if (typeof window === 'undefined') {
      console.log('Server-side PDF processing is limited. Processing will continue on client-side.');
      return "PDF content will be extracted in the browser";
    }

    // Remove potential data URL prefix
    const strippedBase64 = base64Data.replace(/^data:.+;base64,/, '');
    
    // Convert base64 to binary data
    const binaryData = atob(strippedBase64);
    
    // Convert binary data to Uint8Array
    const len = binaryData.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryData.charCodeAt(i);
    }
    
    // Load the PDF document
    const loadingTask = pdfjs.getDocument({ data: bytes });
    const pdfDocument = await loadingTask.promise;
    
    // Get total number of pages
    const numPages = pdfDocument.numPages;
    
    // Extract text from all pages
    const extractedText: string[] = [];
    
    for (let i = 1; i <= numPages; i++) {
      const page = await pdfDocument.getPage(i);
      const textContent = await page.getTextContent();
      
      // Concatenate text items into a single string
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      extractedText.push(pageText);
    }
    
    return extractedText.join('\n\n');
  } catch (error) {
    console.error('Error parsing PDF:', error);
    
    // Return a more graceful error message instead of throwing
    return `Error extracting text from PDF: ${error instanceof Error ? error.message : String(error)}. Please upload a text-based resume or extract text from PDF first.`;
  }
}

/**
 * Check if a string is base64 encoded PDF data
 * @param data String to check
 * @returns Boolean indicating if the string is likely PDF data
 */
export function isPdfData(data: string): boolean {
  // Check if it starts with PDF header in base64
  return data?.startsWith('JVBERi0') || data?.startsWith('data:application/pdf;base64,');
}

/**
 * Process resume file data, converting from PDF if necessary
 * @param fileData The resume file data (either text or base64 PDF)
 * @returns Processed text content
 */
export async function processResumeFileData(fileData: string): Promise<string> {
  if (!fileData) {
    return '';
  }
  
  // Check if it's a PDF
  if (isPdfData(fileData)) {
    try {
      if (typeof window === 'undefined') {
        // On server-side, don't attempt to parse PDF content
        return 'PDF content detected. Text extraction will happen in the browser.';
      }

      const extractedText = await parsePdfFromBase64(fileData);
      
      // If we get an error message, return a user-friendly message
      if (extractedText.startsWith('Error extracting text from PDF')) {
        console.warn('Falling back to raw PDF data');
        return 'PDF content could not be extracted properly. Please upload a text-based resume or convert your PDF to text first.';
      }
      
      return extractedText;
    } catch (error) {
      console.error('Error processing PDF resume data:', error);
      return 'PDF content could not be extracted properly. Please upload a text-based resume or convert your PDF to text first.';
    }
  }
  
  // Return as-is if not a PDF
  return fileData;
}
