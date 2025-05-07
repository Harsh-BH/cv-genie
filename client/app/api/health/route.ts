import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  // Track the start time manually
  const startTime = Date.now();
  
  try {
    // Check database connection by performing a simple query
    const result = await prisma.$queryRaw`SELECT 1`;
    
    // Calculate response time
    const responseTime = Date.now() - startTime;
    
    // Return success response with database status
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: "up",
          responseTime: `${responseTime}ms`
        }
      }
    });
  } catch (error: any) {
    console.error("Database health check failed:", error);
    
    // Return error response with details
    return NextResponse.json({
      status: "error",
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: "down",
          error: error.message,
          details: process.env.NODE_ENV === "development" ? error.stack : undefined
        }
      }
    }, { status: 503 }); // Service Unavailable
  }
}