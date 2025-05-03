"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeedbackItem from "./FeedbackItem";
import AnimatedInsight from "./AnimatedInsight";

interface AnalysisSidebarProps {
  feedback: {
    insights: Array<any>;
    mistakes: Array<any>;
    improvements: Array<any>;
    score: number;
  };
  onFeedbackSelect: (id: string, bounds?: { x: number; y: number; width: number; height: number } | null) => void;
  activeItemId: string | null;
}

export default function AnalysisSidebar({ feedback, onFeedbackSelect, activeItemId }: AnalysisSidebarProps) {
  const [activeTab, setActiveTab] = useState("insights");
  const { insights, mistakes, improvements, score } = feedback;
  
  // Badge count for each tab
  const tabCounts = {
    insights: insights.length,
    mistakes: mistakes.length,
    improvements: improvements.length
  };
  
  const tabItems = {
    insights,
    mistakes,
    improvements
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full bg-black/30 backdrop-blur-lg rounded-xl border border-white/10 flex flex-col overflow-hidden"
    >
      {/* Header with score */}
      <div className="p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">CV Analysis</h2>
          <div className="flex items-center">
            <div className="text-white/70 mr-2 text-sm">Score:</div>
            <div className="relative bg-white/10 rounded-full w-20 h-6">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                {score}%
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 -mx-2">
          <AnimatedInsight />
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="flex border-b border-white/10">
        {["insights", "mistakes", "improvements"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-2 text-sm font-medium relative transition-colors
              ${activeTab === tab ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
          >
            <span className="capitalize">{tab}</span>
            <span className="ml-1 inline-block px-1.5 py-0.5 text-xs rounded-full bg-white/10">
              {tabCounts[tab as keyof typeof tabCounts]}
            </span>
            
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                initial={false}
                animate={{}}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content with scrolling */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {tabItems[activeTab as keyof typeof tabItems].map((item) => (
              <FeedbackItem
                key={item.id}
                feedback={{
                  ...item,
                  type: activeTab.slice(0, -1) as "insight" | "mistake" | "improvement"
                }}
                isActive={activeItemId === item.id}
                onActivate={onFeedbackSelect}
              />
            ))}
            
            {tabItems[activeTab as keyof typeof tabItems].length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-center text-white/50">
                <svg className="w-16 h-16 mb-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>No {activeTab} found for this CV</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
