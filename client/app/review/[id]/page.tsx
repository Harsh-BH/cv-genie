"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import CVDisplay from "@/components/reviewer/CVDisplay";
import AnalysisSidebar from "@/components/reviewer/AnalysisSidebar";
import mockReviewerData from "@/constants/reviewerData";

export default function ReviewerPage() {
  const params = useParams();
  const resumeId = params.id as string;
  
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [activeElement, setActiveElement] = useState<{
    id: string;
    bounds: { x: number; y: number; width: number; height: number } | null;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data for the analysis part
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  // Handle feedback item selection
  const handleFeedbackSelect = (
    id: string,
    bounds?: { x: number; y: number; width: number; height: number } | null
  ) => {
    setActiveItemId(id);
    if (bounds) {
      setActiveElement({ id, bounds });
    } else {
      setActiveElement(null);
    }
  };

  // Animation variants for loading screen
  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 text-white">
      {isLoading ? (
        // ...existing code for loading animation...
        <motion.div
          className="h-screen flex flex-col items-center justify-center"
          variants={loadingVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* ...existing loading animation code... */}
          <motion.div variants={itemVariants} className="mb-6">
            <svg
              className="w-16 h-16 text-purple-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18H17V16H7V18Z"
                fill="currentColor"
              />
              <path
                d="M17 14H7V12H17V14Z"
                fill="currentColor"
              />
              <path
                d="M7 10H11V8H7V10Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V5C21 3.34315 19.6569 2 18 2H6ZM5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-2xl mb-2 font-bold">
            Analyzing your CV
          </motion.h1>
          <motion.p variants={itemVariants} className="text-white/70 max-w-md text-center">
            We're reviewing your CV for insights, potential mistakes, and improvement opportunities.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-8 w-64 h-2 bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      ) : (
        <>
          {/* Header */}
          <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
            {/* ...existing header code... */}
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold font-space-grotesk flex items-center"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                  <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                  <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V5C21 3.34315 19.6569 2 18 2H6ZM5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5Z" fill="currentColor" />
                </svg>
                CV Review
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center"
              >
                <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md text-sm flex items-center transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Report
                </button>
                
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 ml-3 px-4 py-2 rounded-md text-sm flex items-center hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Get AI Improvements
                </button>
              </motion.div>
            </div>
          </header>

          {/* Main content */}
          <main className="max-w-7xl mx-auto px-4 py-6">
            <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
              {/* Left side - CV Display */}
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <CVDisplay 
                  resumeId={resumeId} 
                  activeHighlight={activeItemId}
                  activeElement={activeElement}
                />
              </motion.div>
              
              {/* Right side - Analysis */}
              <motion.div 
                className="w-full lg:w-1/3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <AnalysisSidebar 
                  feedback={mockReviewerData} 
                  onFeedbackSelect={handleFeedbackSelect}
                  activeItemId={activeItemId}
                />
              </motion.div>
            </div>
          </main>
          
          {/* Floating help button */}
          <motion.button 
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.button>
        </>
      )}
    </div>
  );
}
