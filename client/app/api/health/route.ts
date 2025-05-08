import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const startTime = performance.now();
  
  try {
    // Simple query to check database connection
    await prisma.$queryRaw`SELECT NOW()`;
    
    const responseTime = Math.round(performance.now() - startTime);
    
    return NextResponse.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
        services: {
          database: {
            status: 'up',
            responseTime: `${responseTime}ms`
          }
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        services: {
          database: {
            status: 'down',
            error: error instanceof Error ? error.message : 'Unknown database error'
          }
        }
      },
      { status: 503 }
    );
  }
}