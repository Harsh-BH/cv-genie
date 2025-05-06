"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => 
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch user data');
    return res.json();
  });

// Updated interface to match backend response
interface UserData {
  user: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    avatar?: string; // Optional avatar field
  };
}

// SVG Avatar component that renders user initials
const AvatarSvg = ({ name }: { name: string }) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <defs>
        <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="50" fill="url(#avatarGradient)" />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dy="0.35em"
        fill="#ffffff"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="40"
        fontWeight="bold"
      >
        {initials}
      </text>
    </svg>
  );
};

export default function UserProfile() {
  const [showResetPassword, setShowResetPassword] = useState(false);
  const { data, error, isLoading } = useSWR<UserData>('/api/auth/me', fetcher);
  
  // New state variables for password reset
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  // Handle password reset
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setResetError("Email is required");
      return;
    }
    
    if (!newPassword) {
      setResetError("New password is required");
      return;
    }
    
    if (newPassword.length < 6) {
      setResetError("Password must be at least 6 characters");
      return;
    }
    
    setResetLoading(true);
    setResetError("");
    setResetSuccess("");
    
    try {
      const response = await fetch('/api/auth/forgetpswd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to reset password");
      }
      
      setResetSuccess("Password updated successfully!");
      setNewPassword("");
      setTimeout(() => setShowResetPassword(false), 3000);
    } catch (err: any) {
      setResetError(err.message || "Something went wrong");
    } finally {
      setResetLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 flex justify-center items-center h-48">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-purple-700/30 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-purple-700/30 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-purple-700/30 rounded"></div>
              <div className="h-4 bg-purple-700/30 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-red-500/20 text-center">
        <p className="text-red-400">Failed to load user profile</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-1 bg-red-600/30 hover:bg-red-600/50 rounded text-white text-sm"
        >
          Try again
        </button>
      </div>
    );
  }

  // If data is available, use it
  const user = data?.user;
  
  if (!user) {
    return (
      <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-yellow-500/20 text-center">
        <p className="text-yellow-400">No user data found</p>
      </div>
    );
  }

  // Set email from user data when it's available and reset form is displayed
  if (user && showResetPassword && !email) {
    setEmail(user.email);
  }

  return (
    <motion.div 
      className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20"
      whileHover={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
    >
      <div className="flex items-center space-x-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-16 h-16 overflow-hidden rounded-full border-2 border-purple-400"
        >
          {user.avatar ? (
            <Image 
              src={user.avatar} 
              alt={user.name}
              fill
              className="object-cover"
            />
          ) : (
            <AvatarSvg name={user.name} />
          )}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent" />
        </motion.div>
        
        <div>
          <motion.h2 
            className="text-xl font-semibold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {user.name}
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {user.email}
          </motion.p>
          <motion.p 
            className="text-gray-400 text-xs mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </motion.p>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <motion.div 
          className="flex items-center text-gray-300 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          <span>Premium Account</span>
        </motion.div>
        
        <motion.button 
          onClick={() => {
            setShowResetPassword(!showResetPassword);
            setResetError("");
            setResetSuccess("");
            
            // Initialize email with user's email when opening the form
            if (!showResetPassword && user) {
              setEmail(user.email);
            }
          }}
          className="flex w-full items-center justify-between text-sm text-gray-300 hover:text-white transition-colors"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Forgot Password
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
        
        {showResetPassword && (
          <motion.form 
            onSubmit={handlePasswordReset}
            className="mt-4 p-4 bg-gray-700/50 rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <p className="text-sm text-gray-300 mb-2">Enter your email to reset your password</p>
            
            {resetError && (
              <div className="mb-3 text-red-400 text-sm bg-red-500/20 p-2 rounded">
                {resetError}
              </div>
            )}
            
            {resetSuccess && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-3 text-green-400 text-sm bg-green-500/20 p-2 rounded"
              >
                {resetSuccess}
              </motion.div>
            )}
            
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white mb-2"
              disabled={resetLoading}
              required
            />
            
            <input 
              type="password"
              placeholder="New Password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white mb-2"
              disabled={resetLoading}
              required
              minLength={6}
            />
            
            <motion.button 
              type="submit"
              className={`w-full ${resetLoading 
                ? 'bg-purple-600/50' 
                : 'bg-purple-600 hover:bg-purple-700'
              } text-white py-2 rounded text-sm flex items-center justify-center`}
              whileHover={!resetLoading ? { scale: 1.02 } : {}}
              whileTap={!resetLoading ? { scale: 0.98 } : {}}
              disabled={resetLoading}
            >
              {resetLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : "Update Password"}
            </motion.button>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
}
