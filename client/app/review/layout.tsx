"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../../styles/response-formatting.css'; // Add this import

export default function ReviewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State for background animation
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Add page transition and setup
  useEffect(() => {
   
    
    // Track mouse position for parallax/lighting effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate background gradient position based on mouse
  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(79, 70, 229, 0.15) 0%, transparent 60%)`,
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 relative "
      >
        {/* Dynamic gradient that follows mouse */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 transition-all duration-300 ease-out"
          style={gradientStyle}
        />
        
        {/* Glass particles effect */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 50 + 10,
              height: Math.random() * 50 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [0, Math.random() * 30 * (Math.random() > 0.5 ? 1 : -1)],
              x: [0, Math.random() * 30 * (Math.random() > 0.5 ? 1 : -1)],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: Math.random() * 10 + 10,
            }}
          />
        ))}
        
        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
