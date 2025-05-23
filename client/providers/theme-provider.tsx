"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// Props will be inferred from NextThemesProvider
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}