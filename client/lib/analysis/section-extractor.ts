import { ResumeSection, StructuredResume } from './models/analysis-types';

// Common section headers in resumes
const SECTION_HEADERS = [
  { title: 'Summary', type: 'summary', regex: /\b(professional\s+summary|summary|profile|objective|about me)\b/i },
  { title: 'Experience', type: 'experience', regex: /\b(experience|work\s+experience|employment|work\s+history|career\s+history)\b/i },
  { title: 'Education', type: 'education', regex: /\b(education|academic\s+background|qualifications|academic|degrees)\b/i },
  { title: 'Skills', type: 'skills', regex: /\b(skills|technical\s+skills|core\s+competencies|competencies|expertise|proficiencies)\b/i },
  { title: 'Projects', type: 'projects', regex: /\b(projects|key\s+projects|project\s+experience)\b/i },
  { title: 'Certifications', type: 'certifications', regex: /\b(certifications|certificates|accreditations|licenses)\b/i },
  { title: 'Languages', type: 'languages', regex: /\b(languages|language\s+proficiencies)\b/i },
  { title: 'Publications', type: 'publications', regex: /\b(publications|published\s+works|research\s+papers|articles)\b/i },
  { title: 'Volunteering', type: 'volunteering', regex: /\b(volunteering|volunteer\s+experience|community\s+service)\b/i },
  { title: 'Awards', type: 'awards', regex: /\b(awards|honors|recognition|achievements)\b/i },
  { title: 'References', type: 'references', regex: /\b(references)\b/i }
];

// Extracts sections from plain text resume
export function extractSectionsFromText(text: string): ResumeSection[] {
  if (!text) {
    console.warn("Empty text provided to extractSectionsFromText");
    return [];
  }
  
  console.log(`Attempting to extract sections from ${text.length} characters of text`);
  
  // Preprocess text: fix line breaks and remove excessive whitespace
  const cleanedText = text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  
  // Split text by lines
  const lines = cleanedText.split('\n');
  console.log(`Text contains ${lines.length} lines`);
  
  // Find potential section headers
  const potentialHeaders: {index: number, type: string, title: string}[] = [];
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // Skip empty lines or very long lines (unlikely to be headers)
    if (!trimmedLine || trimmedLine.length > 50) return;
    
    // Check if line matches any known section header pattern
    for (const pattern of SECTION_HEADERS) {
      if (pattern.regex.test(trimmedLine)) {
        potentialHeaders.push({
          index,
          type: pattern.type,
          title: trimmedLine.replace(/[:]+$/, '').trim() // Remove trailing colons
        });
        break;
      }
    }
  });
  
  console.log(`Found ${potentialHeaders.length} potential section headers`);
  potentialHeaders.forEach(header => console.log(`- Found header: "${header.title}" (${header.type}) at line ${header.index}`));
  
  // If no sections found, create a single section with all content
  if (potentialHeaders.length === 0) {
    console.log("No section headers found, creating single section with all content");
    return [{
      id: Math.floor(Math.random() * 10000),
      title: 'Resume Content',
      type: 'content',
      content: cleanedText,
      order: 0
    }];
  }
  
  // Extract content between headers
  const sections: ResumeSection[] = [];
  
  for (let i = 0; i < potentialHeaders.length; i++) {
    const currentHeader = potentialHeaders[i];
    const nextHeader = potentialHeaders[i + 1];
    
    // Get start and end line for this section
    const startLineIndex = currentHeader.index + 1;
    const endLineIndex = nextHeader ? nextHeader.index : lines.length;
    
    // Extract content
    const sectionContent = lines.slice(startLineIndex, endLineIndex).join('\n').trim();
    
    sections.push({
      id: Math.floor(Math.random() * 10000),
      title: currentHeader.title,
      type: currentHeader.type,
      content: sectionContent,
      order: i
    });
  }
  
  console.log(`Created ${sections.length} sections from text`);
  sections.forEach((section, i) => {
    console.log(`- Section ${i+1}: "${section.title}" (${section.content.length} chars)`);
  });
  
  return sections;
}

// Process a resume to ensure it has structured sections
export async function ensureResumeSections(
  resume: StructuredResume, 
  extractedText?: string
): Promise<StructuredResume> {
  // If resume already has sections, use them
  if (resume.sections && resume.sections.length > 0) {
    return resume;
  }
  
  // If we were provided with extracted text, use it to create sections
  if (extractedText) {
    const sections = extractSectionsFromText(extractedText);
    return {
      ...resume,
      sections
    };
  }
  
  // Otherwise, create a single section with all content
  let content = resume.fileData || '';
  if (content.startsWith('data:') || content.startsWith('JVBERi')) {
    // This looks like raw file data that we can't directly use as text
    content = "Resume content could not be processed as text.";
  }
  
  return {
    ...resume,
    sections: [{
      id: Math.floor(Math.random() * 10000),
      title: 'Resume Content',
      type: 'content',
      content,
      order: 0
    }]
  };
}
