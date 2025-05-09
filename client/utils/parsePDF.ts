import { PDFExtract } from 'pdf.js-extract';

type ParsedPDFResult = {
  personalDetails: {
    name?: string;
    email?: string;
   
    profileSummary?: string;
  };
  sections: {
    title: string;
    content: string;
    orderIndex: number;
  }[];
  rawText: string;
};

/**
 * Very basic PDF parser to extract content and try to identify sections
 * In a real application, you would want a more sophisticated parsing logic
 */
export async function parsePDFContent(base64PDF: string): Promise<ParsedPDFResult> {
  try {
    // Convert base64 to buffer
    const pdfBuffer = Buffer.from(
      base64PDF.replace(/^data:application\/pdf;base64,/, ''), 
      'base64'
    );
    
    const pdfExtract = new PDFExtract();
    const data = await pdfExtract.extractBuffer(pdfBuffer);
    
    // Combine all pages into a single text
    const fullText = data.pages.map(page => 
      page.content.map(item => item.str).join(' ')
    ).join('\n');
    
    // Attempt to extract sections (very basic approach)
    const sections = [];
    let currentSection = null;
    let sectionContent = [];
    let orderIndex = 0;
    
    // Split by newlines and process line by line
    const lines = fullText.split('\n');
    
    // Look for potential headlines (all caps, short lines)
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (!trimmedLine) continue;
      
      // If line is likely a section header (all caps, short)
      if (
        trimmedLine === trimmedLine.toUpperCase() && 
        trimmedLine.length < 50 &&
        trimmedLine.length > 3
      ) {
        // Save previous section if exists
        if (currentSection && sectionContent.length > 0) {
          sections.push({
            title: currentSection,
            content: sectionContent.join('\n'),
            orderIndex: orderIndex++
          });
          sectionContent = [];
        }
        
        currentSection = trimmedLine;
      } else if (currentSection) {
        // Add to current section content
        sectionContent.push(trimmedLine);
      }
    }
    
    // Add the last section
    if (currentSection && sectionContent.length > 0) {
      sections.push({
        title: currentSection,
        content: sectionContent.join('\n'),
        orderIndex: orderIndex++
      });
    }
    
    // If no sections were detected, create a generic one
    if (sections.length === 0) {
      sections.push({
        title: 'Resume Content',
        content: fullText,
        orderIndex: 0
      });
    }
    
    // Simple personal details extraction (very basic)
    const personalDetails = {
      name: extractName(fullText),
      email: extractEmail(fullText),
    
    };
    
    return {
      personalDetails,
      sections,
      rawText: fullText
    };
  } catch (error) {
    console.error('PDF parsing error:', error);
    
    // Return a minimal structure on error
    return {
      personalDetails: {},
      sections: [{
        title: 'Resume Content',
        content: 'Failed to parse PDF content',
        orderIndex: 0
      }],
      rawText: 'Failed to parse PDF content'
    };
  }
}

// Helper functions for extraction
function extractEmail(text: string): string | undefined {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = text.match(emailRegex);
  return match ? match[0] : undefined;
}



function extractName(text: string): string | undefined {
  // This is very simplistic - in reality name extraction is complex
  // We're assuming the name is one of the first lines of the document
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length > 0) {
    // Take first non-empty line that's not an email or phone
    for (const line of lines.slice(0, 5)) {
      if (!extractEmail(line)  && line.length < 50) {
        return line.trim();
      }
    }
    return lines[0].trim();
  }
  return undefined;
}
