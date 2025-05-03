import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import os from "os";
import path from "path";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

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

async function authenticateToken(token: string) {
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
  await fs.writeFile(tmpPath, buffer);

  return {
    filepath: tmpPath,
    originalFilename: file.name,
    mimetype: file.type,
    size: file.size,
  };
}

export async function POST(req: NextRequest) {
  try {
    // Get auth_token cookie
    const authToken = req.cookies.get('auth_token')?.value;
    
    if (!authToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Verify token
    let userId;
    try {
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET || "fallback-secret-not-for-production") as { userId: number };
      userId = decodedToken.userId;
    } catch (jwtError: any) {
      if (jwtError.name === "TokenExpiredError") {
        return NextResponse.json({ error: "Token expired" }, { status: 401 });
      }
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!userId) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
    }

    // Process the uploaded file
    const formData = await req.formData();
    const file = formData.get('resume') as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      fileName: file.name,
      fileSize: file.size,
      userId: userId // Include the userId from the token
    });
    
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }, { status: 500 });
  }
}
