import { NextResponse, NextRequest } from "next/server";
import { isPdfData } from "@/lib/analysis/pdf-extractor";
import pdfParse from 'pdf-parse';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pdfData } = body;
    
    if (!pdfData) {
      return NextResponse.json({ error: "No PDF data provided" }, { status: 400 });
    }
    
    if (!isPdfData(pdfData)) {
      return NextResponse.json({ error: "Invalid PDF data format" }, { status: 400 });
    }
    
    // Strip data URL prefix if present
    const dataWithoutPrefix = pdfData.startsWith('data:')
      ? pdfData.split(',')[1]
      : pdfData;
      
    // Convert Base64 to buffer
    const buffer = Buffer.from(dataWithoutPrefix, 'base64');
    
    // Extract text
    const result = await pdfParse(buffer);
    
    // Validate extracted text
    if (!result.text || result.text.trim().length < 10) {
      return NextResponse.json({ 
        error: "PDF extraction failed to produce meaningful text" 
      }, { status: 500 });
    }
    
    console.log(`API: PDF extraction successful - ${result.text.length} characters`);
    
    return NextResponse.json({ 
      text: result.text,
      pages: result.numpages,
      info: result.info
    });
    
  } catch (error) {
    console.error("PDF extraction error:", error);
    return NextResponse.json({ 
      error: `PDF extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
