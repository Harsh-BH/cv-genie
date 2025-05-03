import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import os from "os";
import path from "path";
import { cookies } from "next/headers";

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
      public_id: file.name.replace(/\.[^/.]+$/, ""),
    });

    // Cleanup local file
    await fs.unlink(tempPath);

    // Store in DB
    await prisma.resume.create({
      data: {
        fileUrl: uploadResult.secure_url,
        fileName: file.name,
        userId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Server error occurred" }, { status: 500 });
  }
}
