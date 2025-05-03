"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login(email, password);
      toast.success("Logged in successfully!");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Failed to login");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="w-full max-w-md space-y-6 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 p-6 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)]"
    >
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Welcome back
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Enter your credentials to access your account
        </p>
      </motion.div>

      <form onSubmit={onSubmit} className="space-y-4">
        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isSubmitting}
            required
            className="border-primary/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary transition-all duration-300"
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            disabled={isSubmitting}
            required
            className="border-primary/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary transition-all duration-300"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : "Sign in"}
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Don't have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline transition-all duration-200 hover:text-primary/80">
              Sign up
            </Link>
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
}
