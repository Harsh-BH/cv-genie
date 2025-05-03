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
    // 🔐 Step 1: Authenticate first (before parsing/uploading)
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const user = await authenticateToken(token);

    // 📄 Step 2: Handle form and file
    const uploadedFile = await parseMultipartForm(req);

    // ☁️ Step 3: Upload to Cloudinary
    const cloudRes = await cloudinary.uploader.upload(uploadedFile.filepath, {
      folder: "cv-reviewer",
      resource_type: "raw",
      public_id: uploadedFile.originalFilename.replace(/\.[^/.]+$/, ""),
    });

    // 🧹 Step 4: Clean up and write to DB
    await fs.unlink(uploadedFile.filepath);

    await prisma.resume.create({
      data: {
        fileUrl: cloudRes.secure_url,
        fileName: uploadedFile.originalFilename,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
