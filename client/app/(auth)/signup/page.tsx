import { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import ClientThemeProvider from "@/components/auth/ClientThemeProvider";
import { AuthRedirectGuard } from "@/components/auth/AuthGuard";

export const metadata: Metadata = {
  title: "Sign Up - CV Genie",
  description: "Create a new CV Genie account",
};

export default function SignUpPage() {
  return (
    <ClientThemeProvider>
      <AuthRedirectGuard>
        <AuthForm type="signup" />
      </AuthRedirectGuard>
    </ClientThemeProvider>
  );
}