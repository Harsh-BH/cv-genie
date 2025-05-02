import { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import ClientThemeProvider from "@/components/auth/ClientThemeProvider";

export const metadata: Metadata = {
  title: "Login - CV Genie",
  description: "Login to your CV Genie account",
};

export default function LoginPage() {
  return (
    <ClientThemeProvider>
      <AuthForm type="login" />
    </ClientThemeProvider>
  );
}
