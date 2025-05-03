import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import fs from "fs";
import os from "os";

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

// Helper function to convert Web API Request to Node.js readable stream
async function requestToFormData(req: NextRequest) {
  // Create a boundary string for the form data
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

    // Extract user data from form fields
    const email = fields.email?.[0];
    const password = fields.password?.[0];
    const name = fields.name?.[0] || "";
    
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Check if user already exists with better error handling
    let existingUser;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email }
      });
    } catch (dbError: any) {
      console.error("Database error checking existing user:", dbError);
      return NextResponse.json({ error: "Database connection error" }, { status: 500 });
    }

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Upload profile image if provided
    let avatarUrl = null;
    if (files.profileImage && files.profileImage[0]) {
      const file = files.profileImage[0];
      
      // Upload to Cloudinary
      const upload = await cloudinary.uploader.upload(file.filepath, {
        folder: "cv-reviewer-profiles",
      });
      
      avatarUrl = upload.secure_url;
      
      // Delete temp file
      fs.unlinkSync(file.filepath);
    }
    
    // Create user in database with better error handling
    let newUser;
    try {
      newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          avatar: avatarUrl, // Using the correct field from your schema
        },
      });
    } catch (createError: any) {
      console.error("Error creating user:", createError);
      return NextResponse.json({ 
        error: "Failed to create user account",
        details: process.env.NODE_ENV === 'development' ? createError.message : undefined
      }, { status: 500 });
    }
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json({ 
      success: true, 
      data: userWithoutPassword
    });
    
  } catch (err: any) {
    console.error("Signup error:", err);
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }, { status: 500 });
  }
}
