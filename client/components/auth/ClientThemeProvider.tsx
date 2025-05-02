"use client";

import { useEffect, useState } from "react";

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same structure as the children
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return <>{children}</>;
}
