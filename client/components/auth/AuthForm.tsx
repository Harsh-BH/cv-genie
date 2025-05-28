"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface AuthFormProps {
  type: "login" | "signup";
}

// Helper function to set cookie with expiration
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();

  // Handle profile image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setProfileImage(file);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (type === "login") {
        // Handle login - uses JSON body
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email) {
          toast.error("Please enter your email address");
          return;
        }

        if (!password) {
          toast.error("Please enter your password");
          return;
        }

        // For debugging
        console.log("Attempting login with email:", email);
        
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          // Important: include credentials to ensure cookies are sent/received
          credentials: 'include'
        });

        const data = await response.json();
        console.log("Login response:", data);

        if (!response.ok) {
          // More specific error messages based on response status
          if (response.status === 401) {
            toast.error("Invalid email or password");
          } else if (response.status === 403) {
            toast.error("Your account is not verified. Please check your email.");
          } else {
            toast.error(data.error || "Login failed");
          }
          throw new Error(data.error || "Login failed");
        }

        // No need to manually set the auth_token cookie
        // The server has already set it as an HTTP-only cookie
        
        // Store user data in localStorage (if needed)
        if (data.data && data.data.user) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
        } else {
          console.warn("User data not found in response");
        }

        toast.success("Logged in successfully!");
        router.push("/");
      }else {
        // Handle signup - uses FormData for file upload
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        
        // More detailed validation with specific error messages
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        const name = formData.get("name") as string;
        
        // Email validation
        if (!email) {
          toast.error("Please enter your email address");
          return;
        }
        
        // Simple email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          toast.error("Please enter a valid email address");
          return;
        }
        
        // Password validation
        if (!password) {
          toast.error("Please enter a password");
          return;
        }
        
        // Password strength check (optional)
        if (password.length < 8) {
          toast.error("Password must be at least 8 characters long");
          return;
        }
        
        // Confirm password validation
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        
        // Remove confirmPassword from formData as our API doesn't need it
        formData.delete("confirmPassword");
        
        // Add profile image if selected
        if (profileImage) {
          formData.set("profileImage", profileImage);
        }

        const response = await fetch("/api/auth/signup", {
          method: "POST",
          body: formData, // FormData is automatically set with the correct Content-Type
        });

        const data = await response.json();

        if (!response.ok) {
          // More specific error messages based on common signup issues
          if (response.status === 400 && data.error === "User already exists") {
            toast.error("An account with this email already exists");
          } else if (response.status === 400) {
            toast.error(data.error || "Please check your information");
          } else {
            toast.error(data.error || "Failed to create account");
          }
          throw new Error(data.error || "Signup failed");
        }

        // Success message for signup
        toast.success("Account created successfully! Please login with your credentials.");
        router.push("/login");
      }
    }catch (error: any) {
      console.error("Authentication error:", error);
      
      // Display more helpful error messages
      if (error.message) {
        // Error messages that were already formatted by the toast calls above
        // No need to display again
      } else {
        // For unexpected errors
        toast.error(
          type === "login"
            ? "Unable to sign in. Please check your network connection."
            : "Unable to create account. Please try again later."
        );
      }
    } finally {
      setIsLoading(false);
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
          <>
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
            
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                disabled={isLoading}
                className="border-primary/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary transition-all duration-300"
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="profileImage" className="text-gray-700 dark:text-gray-300">Profile Image (optional)</Label>
              <Input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isLoading}
                className="border-primary/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary transition-all duration-300"
              />
              {previewUrl && (
                <div className="mt-2 flex justify-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30">
                    <Image 
                      src={previewUrl} 
                      alt="Profile preview" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </>
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
