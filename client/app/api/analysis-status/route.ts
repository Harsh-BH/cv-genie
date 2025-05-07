import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    try {
        const authToken = req.cookies.get("auth_token")?.value;
        if (!authToken) {
            return new Response(JSON.stringify({ error: "Authentication required" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
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
            return new Response(JSON.stringify({ error: message }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        const searchParams = req.nextUrl.searchParams;
        const analysisId = searchParams.get("id");
        const resumeId = searchParams.get("resumeId");

        let analysis;

        if (analysisId) {
            // Get specific analysis by ID
            analysis = await prisma.resumeAnalysis.findUnique({
                where: { id: parseInt(analysisId) },
                include: { resume: true }
            });

            if (!analysis) {
                return new Response(JSON.stringify({ error: "Analysis not found" }), {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                });
            }

            // Verify ownership
            if (analysis.resume.userId !== userId) {
                return new Response(JSON.stringify({ error: "Unauthorized access" }), {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                });
            }
        } else if (resumeId) {
            // Get most recent analysis for a resume
            const resume = await prisma.resume.findUnique({
                where: { id: parseInt(resumeId) }
            });

            if (!resume) {
                return new Response(JSON.stringify({ error: "Resume not found" }), {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                });
            }

            // Verify ownership
            if (resume.userId !== userId) {
                return new Response(JSON.stringify({ error: "Unauthorized access" }), {
                    status: 403,
                    headers: { "Content-Type": "application/json" },
                });
            }

            // Get the most recent analysis for this resume
            analysis = await prisma.resumeAnalysis.findFirst({
                where: { resumeId: parseInt(resumeId) },
                orderBy: { createdAt: 'desc' },
            });

            if (!analysis) {
                return new Response(JSON.stringify({ error: "No analysis found for this resume" }), {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                });
            }
        } else {
            return new Response(JSON.stringify({ error: "Either analysisId or resumeId is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        return NextResponse.json({
            id: analysis.id,
            status: analysis.status,
            resumeId: analysis.resumeId,
            createdAt: analysis.createdAt
        });
    } catch (error) {
        console.error("Analysis status check error:", error);
        return new Response(JSON.stringify({ error: "Failed to check analysis status" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
