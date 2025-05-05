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
            // Use the avatar from the API if available
            <Image 
              src={user.avatar} 
              alt={user.name}
              fill
              className="object-cover"
            />
          ) : (
            // Fall back to SVG avatar if no avatar is provided
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
          onClick={() => setShowResetPassword(!showResetPassword)}
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
          <motion.div 
            className="mt-4 p-4 bg-gray-700/50 rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <p className="text-sm text-gray-300 mb-2">Enter your email to reset your password</p>
            <input 
              type="email" 
              defaultValue={user.email}
              className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white mb-2"
            />
            <motion.button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Reset Link
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
