"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../../styles/response-formatting.css'; // Add this import

// Define a type for particle properties
type Particle = {
  width: number;
  height: number;
  left: string;
  top: string;
  opacity: number;
  xMovement: number;
  yMovement: number;
  duration: number;
};

export default function ReviewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State for background animation
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // State for particles to fix hydration issues
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Add page transition and setup
  useEffect(() => {
    // Generate particle properties once on client-side
    const newParticles = Array(15).fill(0).map(() => ({
      width: Math.random() * 50 + 10,
      height: Math.random() * 50 + 10,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.1,
      xMovement: Math.random() * 30 * (Math.random() > 0.5 ? 1 : -1),
      yMovement: Math.random() * 30 * (Math.random() > 0.5 ? 1 : -1),
      duration: Math.random() * 10 + 10,
    }));
    setParticles(newParticles);
    
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
        
        {/* Glass particles effect - using consistent values from state */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
              opacity: particle.opacity,
            }}
            animate={{
              y: [0, particle.yMovement],
              x: [0, particle.xMovement],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: particle.duration,
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
