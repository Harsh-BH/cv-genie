/**
 * Common text replacements for PDF extraction normalization
 * 
 * These mappings help fix encoding issues commonly found in extracted text
 * from PDFs, especially with certain fonts or Unicode characters.
 */
export const textReplacements: Record<string, string> = {
  // Tech terms
  '헦헰헮헻헫': 'Scanh',
  '헔헜': 'AI',
  '헴헲헻헲헿헮픁헲헱': 'generated',
  '헗헶픀픁헶헹B험헥헧': 'DistilBERT',
  '헚헲헻헫': 'Genh',
  'B헹헮헰헸 헙헼헿헲픀픁': 'Black Forest',
  'B헟헜헣': 'BLIP',
  '헡헙헧': 'NFT',
  'M헶헻픁헶헻헴': 'Minting',
  '헡헲혅픁.헷픀': 'Next.js',
  '헙헮픀픁헔헣헜': 'FastAPI',
  
  // Percentages and numbers
  'ퟵퟴ%': '98%',
  'ퟵퟱ%': '95%',
  'ퟵퟯ%': '90%',
  'ퟴퟱ%': '85%',
  'ퟴퟯ%': '80%',
  
  // Common resume terms
  '헮헰헰픂헿헮헰혆': 'accuracy',
  '헱헲헽헹헼혆헲헱': 'deployed',
  '헱헲혃헲헹헼헽헲헱': 'developed',
  '헶헻헽헹헲헺헲헻픁헲헱': 'implemented',
  '헮헻헮헹혆혇헲헱': 'analyzed',
  '헼헽픁헶헺헶혇헲헱': 'optimized',
  '헨헼헼헴헹헲': 'Google',
  '헠헶헰헿헼픀헼헳픁': 'Microsoft',
  '헔헺헮혇헼헻': 'Amazon',
  '헙헮헰헲헯헼헼헸': 'Facebook',
  '헠헲픁헮': 'Meta'
};

/**
 * Maps of common programming languages and technologies that might be incorrectly extracted
 */
export const techReplacements: Record<string, string> = {
  // Programming languages
  '헣혆픁헵헼헻': 'Python',
  '헝헮혃헮헦헰헿헶헽픁': 'JavaScript',
  '헧혆헽헲헦헰헿헶헽픁': 'TypeScript',
  '헝헮혃헮': 'Java',
  '헖++': 'C++',
  '헖#': 'C#',
  '헥픂헯혆': 'Ruby',
  '헚헼': 'Go',
  '헦헾헹': 'SQL',
  '헣헵헽': 'PHP',
  
  // Frameworks and libraries
  '헥헲헮헰픁': 'React',
  '헡헲혅픁': 'Next',
  '헡헼헱헲': 'Node',
  '헙헮픀픁헔헣헜': 'FastAPI',
  '헗헷헮헻헴헼': 'Django',
  '헧헲헻픀헼헿헙헹헼현': 'TensorFlow',
  '헣혆픁헼헿헰헵': 'PyTorch',
  '헙헹헮픀헸': 'Flask',
  '헦헽헿헶헻헴': 'Spring',
  '헔헻헴픂헹헮헿': 'Angular',
  '헩픂헲': 'Vue'
};
