"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import Link from "next/link";

interface AuthFormProps {
  type: "login" | "signup";
}

export function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      // This is where you would integrate with your auth system
      console.log({ email, password, type });
      
      Toaster({
        title: type === "login" ? "Logged in!" : "Account created!",
        description: "You have successfully authenticated.",
      });
      
      router.push("/dashboard");
    } catch (error) {
      Toaster({
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

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

  const buttonVariants = {
    hover: { 
      scale: 1.03,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
    },
    tap: { scale: 0.98 }
  };

  const socialButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    },
    hover: { 
      y: -3, 
      transition: { 
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="space-y-6 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 p-6 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)]"
    >
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {type === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {type === "login"
            ? "Enter your credentials to access your account"
            : "Enter your information to create an account"}
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
            disabled={isLoading}
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
            autoComplete={type === "login" ? "current-password" : "new-password"}
            disabled={isLoading}
            required
            className="border-primary/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary transition-all duration-300"
          />
        </motion.div>

        {type === "signup" && (
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
              required
              className="border-primary/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary transition-all duration-300"
            />
          </motion.div>
        )}
        
        <motion.div variants={itemVariants}>
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="mt-2"
          >
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {type === "login" ? "Signing in..." : "Creating account..."}
                </div>
              ) : type === "login" ? "Sign in" : "Create account"}
            </Button>
          </motion.div>
        </motion.div>
      </form>

      <motion.div variants={itemVariants} className="text-center text-sm text-gray-600 dark:text-gray-400">
        {type === "login" ? (
          <p>
            Don't have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline transition-all duration-200 hover:text-primary/80">
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline transition-all duration-200 hover:text-primary/80">
              Sign in
            </Link>
          </p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-gray-900 px-2 text-gray-600 dark:text-gray-400 rounded-md">
            Or continue with
          </span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
        <motion.div variants={socialButtonVariants} whileHover="hover">
          <Button 
            variant="outline" 
            type="button" 
            disabled={isLoading}
            className="w-full border-primary/20 hover:border-primary/50 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300"
          >
            <svg className="mr-2 h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.84 9.49.5.09.68-.22.68-.485 0-.236-.008-.866-.013-1.7-2.782.603-3.37-1.34-3.37-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.07-.608.07-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.53 2.34 1.09 2.91.833.09-.647.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.09.39-1.984 1.03-2.683-.103-.253-.447-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.296 2.747-1.027 2.747-1.027.55 1.377.202 2.394.1 2.647.64.7 1.03 1.592 1.03 2.683 0 3.842-2.34 4.687-4.566 4.935.36.308.678.92.678 1.852 0 1.336-.013 2.415-.013 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </Button>
        </motion.div>
        
        <motion.div variants={socialButtonVariants} whileHover="hover">
          <Button 
            variant="outline" 
            type="button" 
            disabled={isLoading}
            className="w-full border-primary/20 hover:border-primary/50 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300"
          >
            <svg className="mr-2 h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"/>
            </svg>
            Google
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Floating decorative elements */}
      <motion.div 
        className="absolute -top-10 -right-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute -bottom-10 -left-10 w-24 h-24 bg-primary/10 rounded-full blur-xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.div>
  );
}
