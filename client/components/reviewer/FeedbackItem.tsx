"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FeedbackItemProps {
  feedback: {
    id: string;
    type: "mistake" | "improvement" | "insight";
    title: string;
    description: string;
    elementId?: string;
    bounds?: { x: number; y: number; width: number; height: number } | null;
    severity?: "low" | "medium" | "high";
  };
  isActive: boolean;
  onActivate: (id: string, bounds?: { x: number; y: number; width: number; height: number } | null) => void;
}

export default function FeedbackItem({ feedback, isActive, onActivate }: FeedbackItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const typeColorMap = {
    mistake: "border-red-500/70 bg-red-500/10",
    improvement: "border-blue-500/70 bg-blue-500/10",
    insight: "border-green-500/70 bg-green-500/10"
  };
  
  const iconMap = {
    mistake: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    improvement: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
      </svg>
    ),
    insight: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  };
  
  const severityBadge = feedback.severity && (
    <span className={`
      text-xs px-2 py-1 rounded 
      ${feedback.severity === 'high' ? 'bg-red-500/20 text-red-300' : ''} 
      ${feedback.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-300' : ''} 
      ${feedback.severity === 'low' ? 'bg-green-500/20 text-green-300' : ''}
    `}>
      {feedback.severity.charAt(0).toUpperCase() + feedback.severity.slice(1)}
    </span>
  );

  const handleClick = () => {
    setIsOpen(!isOpen);
    onActivate(feedback.id, feedback.bounds || null);
  };

  return (
    <motion.div 
      layoutId={`feedback-${feedback.id}`}
      onClick={handleClick}
      className={`
        mb-4 rounded-lg border p-4 cursor-pointer transition-all 
        ${typeColorMap[feedback.type]} 
        ${isActive ? 'ring-2 ring-purple-500/70 shadow-lg shadow-purple-500/20' : ''}
      `}
      whileHover={{ y: -2 }}
      animate={{ scale: isActive ? 1.02 : 1 }}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          {iconMap[feedback.type]}
          <h3 className="font-semibold text-white ml-2">{feedback.title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          {severityBadge}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden mt-2"
      >
        <p className="text-white/80 text-sm">{feedback.description}</p>
        
        {feedback.bounds && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onActivate(feedback.id, feedback.bounds);
            }}
            className="mt-3 text-sm flex items-center px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-white/90 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            Locate on CV
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
