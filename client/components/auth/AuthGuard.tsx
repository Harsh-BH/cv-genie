"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function AuthRedirectGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const res = await fetch("/api/auth/verify", {
          credentials: "include",
        });
        
        const data = await res.json();
        
        if (data.authenticated) {
          // User is logged in, redirect to dashboard
          router.push("/dashboard");
        } else {
          // User is not logged in, show the auth page
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        // In case of an error, show the auth page
        setIsLoading(false);
      }
    }

    checkAuthStatus();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}