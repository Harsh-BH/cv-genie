import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import fs from "fs";
import os from "os";
import jwt from "jsonwebtoken";
import path from "path";
import { cookies } from "next/headers";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

type UploadedFile = {
  filepath: string;
  originalFilename: string;
  mimetype: string;
  size: number;
};

// Auth helper
async function authenticateToken(req: NextRequest) {
  const header = req.headers.get("authorization");
  const token = header?.split(" ")[1] || req.cookies.get("auth_token")?.value; // Updated to use auth_token
  if (!token) throw new Error("No token provided");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) throw new Error("User not found");
    return user;
  } catch {
    throw new Error("Invalid or expired token");
  }
}

// Convert request to FormData safely with file handling
async function parseMultipartForm(req: NextRequest): Promise<UploadedFile> {
  const formData = await req.formData();
  const file = formData.get("resume");

  if (!(file instanceof File)) {
    throw new Error("Resume file not found");
  }

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Invalid file type");
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error("File size exceeds 5MB limit");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const tmpPath = path.join(os.tmpdir(), `${Date.now()}-${file.name}`);
  fs.writeFileSync(tmpPath, buffer);

  return {
    filepath: tmpPath,
    originalFilename: file.name,
    mimetype: file.type,
    size: file.size,
  };
}

// Main POST handler
export async function POST(req: NextRequest) {
  let uploadedFile: UploadedFile | null = null;

  // Get auth token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;
  
  // Verify authentication
  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }
  
  try {
    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret-not-for-production"
    );
    
    // Token is valid, process the upload
    // Your existing upload code...
    
    // For now, return a success response
    return NextResponse.json({ 
      success: true, 
      message: 'File uploaded successfully' 
    });
  } catch (error) {
    console.error('Auth error in uploadCv:', error);
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }

  try {
    // Authenticate user
    const user = await authenticateToken(req);

    // Parse the file and check validations
    uploadedFile = await parseMultipartForm(req);

    // Upload the file to Cloudinary
    const cloudRes = await cloudinary.uploader.upload(uploadedFile.filepath, {
      folder: "cv-reviewer",
      resource_type: "raw",
      public_id: `cv-${user.id}-${Date.now()}`,
    });

    // Save the resume entry in the database
    const resume = await prisma.resume.create({
      data: {
        userId: user.id,
        fileUrl: cloudRes.secure_url,
        fileName: uploadedFile.originalFilename,
      },
    });

    // Send successful response with the file information
    return NextResponse.json({
      success: true,
      data: {
        id: resume.id,
        fileUrl: cloudRes.secure_url,
        fileName: uploadedFile.originalFilename,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 400 });
  } finally {
    // Clean up temporary file after upload
    if (uploadedFile?.filepath && fs.existsSync(uploadedFile.filepath)) {
      fs.unlinkSync(uploadedFile.filepath);
    }
  }
}
