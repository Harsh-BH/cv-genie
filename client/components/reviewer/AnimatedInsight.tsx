"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// List of engaging insights to cycle through
const insights = [
  "Your CV has a strong experience section!",
  "Adding more quantifiable achievements would help",
  "Consider reorganizing your skills section",
  "Your education section is well structured",
  "Remember to tailor your CV for each application"
];

export default function AnimatedInsight() {
  const [currentInsight, setCurrentInsight] = useState(0);

  // Cycle through insights every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-16">
      <div className="absolute left-0 top-0 h-full flex items-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        </motion.div>
      </div>
      
      <div className="ml-12 relative h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentInsight}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-white/90 font-medium h-full flex items-center"
          >
            {insights[currentInsight]}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
