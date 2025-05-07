import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Extract and verify auth token
    const authToken = req.cookies.get("auth_token")?.value;
    if (!authToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    let userId: number;
    try {
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET!) as { userId: number };
      userId = decoded.userId;
    } catch (err: any) {
      const message =
        err.name === "TokenExpiredError"
          ? "Token expired"
          : "Invalid token";
      return NextResponse.json({ error: message }, { status: 401 });
    }

    // 2️⃣ Parse the form data
    const formData = await req.formData();
    const file = formData.get("resume");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Resume file not found" }, { status: 400 });
    }

    // 3️⃣ Validate file type and size
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 });
    }

    // 4️⃣ Convert file to Base64 for storage
    const fileBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(fileBuffer).toString('base64');

    // 5️⃣ Save to DB using Prisma
    const createdResume = await prisma.resume.create({
      data: {
        fileName: file.name,
        fileType: file.type,
        fileData: base64Data, // Store the file data directly in the database
        userId: userId,
      },
    });

    // ✅ Final success response
    return NextResponse.json({ 
      success: true, 
      resumeId: createdResume.id,
      fileName: file.name,
      fileType: file.type
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      {
        error: "Upload failed",
        details: process.env.NODE_ENV === "development" ? err.message : undefined,
      },
      { status: 500 }
    );
  }
}