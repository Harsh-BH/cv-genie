/**
 * Authentication utility functions for client-side use with HTTP-only cookies
 */

// Validate if the user has a valid session by calling the verify endpoint
export async function validateSession(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/verify', {
      method: 'GET',
      credentials: 'include', // Important to include cookies
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.authenticated === true;
  } catch (error) {
    console.error('Session validation error:', error);
    return false;
  }
}

// This function isn't strictly necessary with HTTP-only cookies, 
// but included for API completeness
export async function refreshAuthToken(): Promise<boolean> {
  try {
    // You would need to implement a refresh token endpoint
    // For now, we'll just re-verify the current token
    return await validateSession();
  } catch (error) {
    console.error('Token refresh error:', error);
    return false;
  }
}

// Helper function to wrap authenticated API calls
export async function withAuth<T>(apiCall: () => Promise<T>): Promise<T> {
  // First check if the session is valid
  const isValid = await validateSession();
  
  // If not valid, try refreshing once before giving up
  if (!isValid) {
    const refreshed = await refreshAuthToken();
    if (!refreshed) {
      throw new Error('Authentication required');
    }
  }
  
  // Proceed with the API call
  try {
    return await apiCall();
  } catch (error: any) {
    // Check if it's an auth error and handle accordingly
    if (error.message?.toLowerCase().includes('unauthorized') || 
        error.message?.toLowerCase().includes('unauthenticated') ||
        error.status === 401) {
      throw new Error('Authentication required');
    }
    throw error;
  }
}

/**
 * Check if we're in a browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}
