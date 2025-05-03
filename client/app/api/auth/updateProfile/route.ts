import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
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

function getUserIdFromToken(token: string): number | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret-not-for-production") as any;
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Get authorization header
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    const userId = getUserIdFromToken(token);
    
    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { fields, files } = await requestToFormData(req);
    
    // Prepare update data
    const updateData: any = {};
    
    // Update name if provided
    if (fields.name && fields.name[0]) {
      updateData.name = fields.name[0];
    }
    
    // Handle profile image upload if provided
    if (files.profileImage && files.profileImage[0]) {
      const file = files.profileImage[0];
      
      // Upload to Cloudinary
      const upload = await cloudinary.uploader.upload(file.filepath, {
        folder: "cv-reviewer-profiles",
      });
      
      // Update with the correct field name (avatar instead of profileImage)
      updateData.avatar = upload.secure_url;
      
      // Delete temp file
      fs.unlinkSync(file.filepath);
    }
    
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No data to update" }, { status: 400 });
    }
    
    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser;
    
    return NextResponse.json({ 
      success: true, 
      data: userWithoutPassword
    });
    
  } catch (err: any) {
    console.error("Update profile error:", err);
    return NextResponse.json({ 
      error: err.message || "Internal Server Error",
      details: err.toString()
    }, { status: 500 });
  }
}
