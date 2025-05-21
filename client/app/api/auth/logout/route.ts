import { NextResponse } from "next/server";

// Remove the unused req parameter if it exists
export async function POST() {
  try {
    // Create a response
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully"
    });
    
    // Clear the auth_token cookie
    response.cookies.delete('auth_token');
    
    // Also clear the isLoggedIn cookie used for client-side state
    response.cookies.delete('isLoggedIn');
    
    return response;
  } catch (error: unknown) {
    console.error("Logout error:", error);
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: process.env.NODE_ENV === 'development' ? 
        (error instanceof Error ? error.message : String(error)) : 
        undefined
    }, { status: 500 });
  }
}