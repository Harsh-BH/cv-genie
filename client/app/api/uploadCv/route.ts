import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { IncomingForm } from "formidable";
import fs from "fs";

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

function parseForm(req: any): Promise<{ fields: any; files: any }> {
  const form = new IncomingForm({ uploadDir: "/tmp", keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    const res = await parseForm(req);

    const file = res.files.resume[0]; // `resume` is the input name
    const userId = parseInt(res.fields.userId[0]); // sent as form field

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
        fileName: upload.original_filename,
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
