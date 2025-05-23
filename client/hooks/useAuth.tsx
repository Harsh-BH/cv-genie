"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Update the User interface to match what's in the database
interface User {
  id: number;
  email: string;
  name?: string;
  avatar?: string; // Change from profileImage to avatar to match Prisma schema
  profileImage?: string; // Keep for backward compatibility
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (formData: FormData) => Promise<void>;
  logout: () => void;
  updateProfile: (formData: FormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing user session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Session verification error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      const data = await response.json();
      
      // Set user data in state
      setUser(data.data.user);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (formData: FormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Signup failed');
      }

      // Redirect to login after successful signup
      router.push('/login');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Call logout API to clear the auth_token cookie
    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      setUser(null);
      router.push('/login');
    }).catch(error => {
      console.error("Logout error:", error);
    });
  };

  const updateProfile = async (formData: FormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/updateProfile', {
        method: 'PUT',
        credentials: 'include', // Include cookies in the request
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Profile update failed');
      }

      const data = await response.json();
      
      // Update user in state
      setUser(data.data);
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export interface AuthHookReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  checkAuth: () => Promise<boolean>;
  authFetch: <T>(url: string, options?: RequestInit) => Promise<T>;
  logout: () => Promise<void>;
}

export function useAuth(): AuthHookReturn {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if the user is authenticated - simplified version
  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include', // Include the auth_token cookie
        cache: 'no-store', // Don't cache the verification request
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        // Just treat any non-OK response as not authenticated
        setIsAuthenticated(false);
        return false;
      }
      
      // If we get here, the token is valid
      setIsAuthenticated(true);
      setError(null);
      return true;
    } catch (err) {
      console.error('Auth verification error:', err);
      setIsAuthenticated(false);
      setError(err instanceof Error ? err.message : 'Authentication error');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // First, define the type for authFetch separately for clarity
  type AuthFetchFunction = <T>(url: string, options?: RequestInit) => Promise<T>;

  // Then use it in your useCallback
  const authFetch = useCallback<AuthFetchFunction>(async (url, options = {}) => {
    try {
      // Create a new headers object that TypeScript can understand
      const headers = new Headers(options.headers || {});
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }

      // Create the fetch options with the proper headers
      const fetchOptions: RequestInit = {
        ...options,
        credentials: 'include',
        headers: headers,
      };
      
      const response = await fetch(url, fetchOptions);
      
      // Rest of your function remains the same
      if (response.status === 401) {
        setIsAuthenticated(false);
        await checkAuth();
        router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        throw new Error('Authentication required');
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }
      
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
      throw err;
    }
  }, [router, checkAuth]);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setIsAuthenticated(false);
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
      setError(err instanceof Error ? err.message : 'Logout failed');
    }
  }, [router]);

  // Check authentication status on hook mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    isAuthenticated,
    isLoading,
    error,
    checkAuth,
    authFetch,
    logout
  };
}
