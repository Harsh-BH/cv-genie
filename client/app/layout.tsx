import type { Metadata } from "next";
import { Inter, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css"; // Import globals.css directly
import "../styles/fonts.css";
import "../styles/custom.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from '@/lib/auth'; // This will now correctly import from auth.tsx

// Load fonts
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  title: "CV Genie - Your AI Resume Assistant",
  description: "Create the perfect resume with AI-powered CV Genie to land your dream job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
