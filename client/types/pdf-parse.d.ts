declare module 'pdf-parse/lib/pdf-parse.js' {
  interface PDFVersion {
    major: number;
    minor: number;
  }

  interface PDFInfo {
    PDFFormatVersion: PDFVersion;
    IsAcroFormPresent: boolean;
    IsXFAPresent: boolean;
    [key: string]: any;
  }
  
  interface PDFResult {
    text: string;
    version: string;
    numpages: number;
    info: PDFInfo;
    metadata: any;
  }

  function parse(dataBuffer: Buffer, options?: any): Promise<PDFResult>;
  
  namespace parse {
    export const version: string;
  }
  
  export default parse;
}
