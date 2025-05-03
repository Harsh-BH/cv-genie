import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Create a response
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
    
    // Clear the auth cookie
    response.cookies.delete('auth_token');
    
    return response;
  } catch (err: any) {
    console.error("Logout error:", err);
    return NextResponse.json({ 
      error: "Internal Server Error" 
    }, { status: 500 });
  }
}
