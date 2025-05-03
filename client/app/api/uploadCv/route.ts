import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import fs from "fs";
import os from "os";

//Next.js body parsing not needed for form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Helper function to convert Web API Request to form data
async function requestToFormData(req: NextRequest) {
  const formData = await req.formData();
  const fields: Record<string, string[]> = {};
  const files: Record<string, any[]> = {};
  
  // Process each form entry
  for (const [name, value] of formData.entries()) {
    // Handle file entries
    if (typeof value !== 'string' && 'arrayBuffer' in value) {
      const file = value as File;
      
      if (!files[name]) {
        files[name] = [];
      }
      
      // Create temp file path
      const tempDir = os.tmpdir();
      const filePath = `${tempDir}/${file.name}-${Date.now()}`;
      
      // Convert file to buffer and write to temp file
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      
      // Add file info to files object
      files[name].push({
        filepath: filePath,
        originalFilename: file.name,
        mimetype: file.type,
        size: file.size
      });
    } 
    // Handle text fields
    else {
      if (!fields[name]) {
        fields[name] = [];
      }
      fields[name].push(value as string);
    }
  }
  
  return { fields, files };
}

export async function POST(req: NextRequest) {
  try {
    const { fields, files } = await requestToFormData(req);

    const file = files.resume?.[0]; // `resume` is the input name
    const userId = parseInt(fields.userId?.[0] || "0"); // sent as form field

    if (!file || !userId) {
      return NextResponse.json({ error: "Missing file or userId" }, { status: 400 });
    }

    //Upload to Cloudinary
    const upload = await cloudinary.uploader.upload(file.filepath, {
      folder: "cv-reviewer",
      resource_type: "raw", //PDF/doc
    });

    // Save to DB
    const newResume = await prisma.resume.create({
      data: {
        userId,
        fileUrl: upload.secure_url,
        fileName: upload.original_filename || file.originalFilename,
      },
    });

    // Delete temp file
    fs.unlinkSync(file.filepath);

    return NextResponse.json({ success: true, data: newResume });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
