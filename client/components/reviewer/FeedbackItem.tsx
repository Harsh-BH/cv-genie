"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FeedbackItemProps {
  feedback: {
    id: string;
    title: string;
    description: string;
    category: string;
    type?: "insight" | "mistake" | "improvement";
    severity?: string;
    position?: any;
    textSnippet?: string;
  };
  isActive: boolean;
  onActivate: (id: string, bounds?: { x: number; y: number; width: number; height: number } | null) => void;
}

export default function FeedbackItem({ feedback, isActive, onActivate }: FeedbackItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleClick = () => {
    setIsExpanded(!isExpanded);
    onActivate(feedback.id);
  };
  
  // Determine icon and color based on feedback type
  let icon;
  let bgColor;
  let bgColorHover;
  
  switch (feedback.type) {
    case "insight":
      icon = (
        <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      bgColor = "bg-blue-500/10";
      bgColorHover = "hover:bg-blue-500/20";
      break;
    case "mistake":
      icon = (
        <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
      bgColor = "bg-red-500/10";
      bgColorHover = "hover:bg-red-500/20";
      break;
    case "improvement":
      icon = (
        <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      bgColor = "bg-green-500/10";
      bgColorHover = "hover:bg-green-500/20";
      break;
    default:
      icon = (
        <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
      bgColor = "bg-purple-500/10";
      bgColorHover = "hover:bg-purple-500/20";
  }
  
  // Severity badge
  let severityBadge = null;
  if (feedback.severity) {
    const severityColors = {
      critical: "bg-red-500 text-white",
      high: "bg-orange-500 text-white",
      medium: "bg-yellow-500 text-black",
      low: "bg-blue-500 text-white"
    };
    
    const color = severityColors[feedback.severity as keyof typeof severityColors] || "bg-gray-500";
    
    severityBadge = (
      <span className={`text-xs px-1.5 py-0.5 rounded-full ${color}`}>
        {feedback.severity}
      </span>
    );
  }

  return (
    <motion.div
      layout
      className={`mb-3 rounded-lg border transition-colors ${
        isActive ? "border-white/20 " + bgColor : "border-white/10"
      } ${bgColorHover}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={handleClick}
        className="w-full text-left px-4 py-3"
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">{icon}</div>
          <div className="ml-3 flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-medium text-white">{feedback.title}</h3>
              {severityBadge}
            </div>
            
            {/* Show section and snippet for mistakes */}
            {feedback.type === "mistake" && feedback.position && (
              <div className="mb-1 text-xs text-white/60">
                <span className="font-semibold">{feedback.position.sectionTitle}</span>
                {feedback.textSnippet && (
                  <span className="ml-2 italic">"{feedback.textSnippet}"</span>
                )}
              </div>
            )}
            
            <motion.div
              className="text-xs text-white/70"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded && (
                <p className="pt-2">
                  {feedback.description}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
