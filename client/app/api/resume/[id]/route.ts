import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

// Define a type for JWT payload
interface JwtPayload {
  userId: number;
  [key: string]: unknown;
}

export const runtime = "nodejs";

export async function GET(
    req: NextRequest,
    context: { params: { id: string } }
  ) {
    try {
      // Remove the incorrect 'await' here
      const param = context.params.id;
      const resumeId = parseInt(param); 

      // 1️⃣ Extract and verify auth token
      const authToken = req.cookies.get("auth_token")?.value;
      if (!authToken) {
        return new Response(JSON.stringify({ error: "Authentication required" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      let userId: number;
      try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET!) as JwtPayload;
        userId = decoded.userId;
      } catch (err: unknown) {
        // Type narrowing for better error handling
        let message = "Invalid token";
        if (err instanceof TokenExpiredError) {
          message = "Token expired";
        } else if (err instanceof JsonWebTokenError) {
          message = "Invalid token format";
        } else if (err instanceof Error) {
          message = err.message;
        }
        
        return new Response(JSON.stringify({ error: message }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      // 2️⃣ Get resume ID from params
      if (isNaN(resumeId)) {
        return new Response(JSON.stringify({ error: "Invalid resume ID" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // 3️⃣ Fetch resume
      const resume = await prisma.resume.findUnique({
        where: { id: resumeId },
      });

      if (!resume) {
        return new Response(JSON.stringify({ error: "Resume not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      // 4️⃣ Authorization check
      if (resume.userId !== userId) {
        return new Response(JSON.stringify({ error: "Unauthorized access" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        });
      }

      // 5️⃣ Convert from base64 to buffer
      const fileBuffer = Buffer.from(resume.fileData, "base64");

      // 6️⃣ Send file as response
      return new Response(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": resume.fileType,
          "Content-Disposition": `inline; filename="${resume.fileName}"`,
          "Content-Length": fileBuffer.length.toString(),
        },
      });
    } catch (err: unknown) {
      console.error("Error retrieving resume:", err);
      return new Response(JSON.stringify({
        error: "Failed to retrieve resume",
        details: process.env.NODE_ENV === "development" ? 
          (err instanceof Error ? err.message : String(err)) : 
          undefined,
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
}