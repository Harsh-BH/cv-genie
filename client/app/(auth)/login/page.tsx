import { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import ClientThemeProvider from "@/components/auth/ClientThemeProvider";
import { AuthRedirectGuard } from "@/components/auth/AuthGuard";

export const metadata: Metadata = {
  title: "Login - CV Genie",
  description: "Login to your CV Genie account",
};

export default function LoginPage() {
  return (
    <ClientThemeProvider>
      <AuthRedirectGuard>
        <AuthForm type="login" />
      </AuthRedirectGuard>
    </ClientThemeProvider>
  );
}