"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  const [showResetPassword, setShowResetPassword] = useState(false);

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
          <Image 
            src={user.avatarUrl} 
            alt={user.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent" />
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
