'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Enhanced SVG variants
  const svgVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 2,
        ease: "easeInOut",
      }
    }
  };

  // Enhanced text variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Floating animation for elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  // Enhanced dark gradient animation
  const gradientAnimation = {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  };

  // Animated glow effect
  const glowAnimation = {
    boxShadow: [
      '0 0 10px rgba(111, 76, 255, 0.3)',
      '0 0 20px rgba(111, 76, 255, 0.5)',
      '0 0 10px rgba(111, 76, 255, 0.3)'
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Cosmic dust animation
  const cosmicDustAnimation = {
    opacity: [0.1, 0.5, 0.1],
    scale: [1, 1.2, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const titleChars = "CV Genie".split("");
  
  return (
    <motion.div 
      className="min-h-screen overflow-hidden relative"
      style={{
        background: 'linear-gradient(to bottom, #0f172a, #1e1b4b, #0f172a)',
        backgroundSize: '400% 400%'
      }}
      animate={gradientAnimation}
    >
      {/* Enhanced animated cosmic background */}
      <div className="fixed inset-0 z-0">
        {/* Glowing gradient orbs */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 255)}, 0.2) 0%, rgba(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 150)}, 0) 70%)`,
              filter: 'blur(50px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1], 
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Cosmic dust particles */}
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 3px rgba(255, 255, 255, 0.8)',
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* SVG constellation patterns */}
        <svg className="fixed inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          
          {/* Dynamic constellation lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.path
              key={`constellation-${i}`}
              d={`M ${Math.random() * 100} ${Math.random() * 100} Q ${Math.random() * 100} ${Math.random() * 100}, ${Math.random() * 100} ${Math.random() * 100}`}
              stroke="url(#constellationGradient)"
              strokeWidth="0.2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 10,
              }}
            />
          ))}
          
          {/* Constellation points */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.circle
              key={`star-${i}`}
              cx={Math.random() * 100}
              cy={Math.random() * 100}
              r={Math.random() * 0.5 + 0.2}
              fill="#ffffff"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: Math.random() * 8 + 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10">
        {/* Hero Section with enhanced animations */}
        <section className="py-20 px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Animated title with letter-by-letter reveal */}
            <motion.div 
              className="flex mb-8 flex-wrap justify-center relative" 
              initial="hidden" 
              animate={isLoaded ? "visible" : "hidden"}
            >
              {/* Glowing background orb for title */}
              <motion.div 
                className="absolute inset-0 rounded-full -z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(111, 76, 255, 0.3) 0%, rgba(66, 51, 122, 0) 70%)',
                  filter: 'blur(40px)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {titleChars.map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-indigo-600 drop-shadow-[0_0_10px_rgba(132,90,223,0.7)]"
                  style={{
                    textShadow: '0 0 20px rgba(132,90,223,0.5)',
                    display: 'inline-block',
                    transformOrigin: 'center',
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -5, 5, 0],
                    color: '#ffffff',
                    transition: { duration: 0.3 }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-3xl text-indigo-200 font-light mb-12 max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              style={{
                textShadow: '0 0 10px rgba(132,90,223,0.3)',
              }}
            >
              Your intelligent resume builder powered by AI
            </motion.p>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1.2
              }}
              whileHover={{ scale: 1.1 }}
              className="relative"
            >
              {/* Add glowing effect around the SVG */}
              <motion.div
                className="absolute inset-0 rounded-full -z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(111, 76, 255, 0.4) 0%, rgba(66, 51, 122, 0) 70%)',
                  filter: 'blur(30px)',
                }}
                animate={glowAnimation}
              />
              
              {/* More complex animated SVG with glowing effects */}
              <svg className="w-72 h-72" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                  
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* Animated pulsing background circle */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="rgba(111, 76, 255, 0.1)"
                  animate={{
                    r: [90, 95, 90],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Animated outer circle */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  fill="transparent"
                  variants={svgVariants}
                  initial="hidden"
                  animate="visible"
                  filter="url(#glow)"
                />
                
                {/* Animated orbit circles */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="65"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  fill="transparent"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: '100px 100px' }}
                />
                
                <motion.circle
                  cx="100"
                  cy="100"
                  r="50"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  fill="transparent"
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: '100px 100px' }}
                />
                
                {/* Orbiting particles */}
                <motion.circle
                  cx="165"
                  cy="100"
                  r="3"
                  fill="#a855f7"
                  filter="url(#glow)"
                  animate={{ 
                    cx: [165, 165, 165],
                    cy: [100, 100, 100],
                  }}
                  transition={{
                    duration: 120,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ transformOrigin: '100px 100px' }}
                />
                
                <motion.circle
                  cx="100"
                  cy="35"
                  r="4"
                  fill="#6366f1"
                  filter="url(#glow)"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: '100px 100px' }}
                />
                
                {/* Document icon with enhanced animation */}
                <motion.path
                  d="M70 60 L130 60 L130 140 L70 140 Z"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  fill="rgba(111, 76, 255, 0.05)"
                  filter="url(#glow)"
                  variants={svgVariants}
                  initial="hidden"
                  animate="visible"
                />
                
                {/* Document lines with enhanced animation */}
                <motion.path
                  d="M85 80 L115 80"
                  stroke="#fff"
                  strokeWidth="2"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 2, duration: 0.5 }}
                />
                
                <motion.path
                  d="M85 100 L115 100"
                  stroke="#fff"
                  strokeWidth="2"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                />
                
                <motion.path
                  d="M85 120 L115 120"
                  stroke="#fff"
                  strokeWidth="2"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 2.4, duration: 0.5 }}
                />
                
                {/* Animated sparkles */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={100 + Math.cos(Math.PI * 2 * i / 8) * 90}
                    cy={100 + Math.sin(Math.PI * 2 * i / 8) * 90}
                    r={Math.random() * 1.5 + 0.5}
                    fill="#ffffff"
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </svg>
            </motion.div>
            
            {/* Animated "Scroll Down" indicator with enhanced glow */}
            <motion.div 
              className="mt-16"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <motion.div
                className="p-3 rounded-full"
                animate={{ 
                  boxShadow: [
                    '0 0 0 rgba(111, 76, 255, 0)',
                    '0 0 20px rgba(111, 76, 255, 0.5)',
                    '0 0 0 rgba(111, 76, 255, 0)'
                  ]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <motion.path 
                    d="M12 5L12 19M12 19L5 12M12 19L19 12" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    variants={svgVariants}
                    initial="hidden"
                    animate="visible"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section with enhanced glassy effect */}
        <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto my-16 relative">
          <motion.div 
            className="absolute inset-0 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
            style={{
              boxShadow: "inset 0 0 40px rgba(111, 76, 255, 0.1)"
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
          
          <div className="relative p-8">
            <motion.h2 
              className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textShadow: '0 0 10px rgba(132,90,223,0.3)' }}
            >
              What CV Genie Can Do For You
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        variants={svgVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      />
                    </svg>
                  ),
                  title: "Smart Templates",
                  description: "Choose from various AI-optimized templates that highlight your skills perfectly."
                },
                {
                  icon: (
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                        variants={svgVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      />
                    </svg>
                  ),
                  title: "AI Enhancement",
                  description: "Get smart suggestions to improve your resume content and stand out to employers."
                },
                {
                  icon: (
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        variants={svgVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      />
                    </svg>
                  ),
                  title: "ATS-Friendly",
                  description: "Ensure your resume passes through Applicant Tracking Systems with our optimized formatting."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative backdrop-blur-xl bg-white/10 rounded-xl p-8 flex flex-col items-center text-center border border-white/10 overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    transition: { duration: 0.2 } 
                  }}
                >
                  {/* Glass highlight effect */}
                  <motion.div 
                    className="absolute -inset-1 bg-gradient-to-tr from-transparent via-white/10 to-transparent blur-sm"
                    animate={{
                      background: [
                        'linear-gradient(to top right, transparent, rgba(255,255,255,0.05), transparent)',
                        'linear-gradient(to top right, transparent, rgba(255,255,255,0.1), transparent)',
                        'linear-gradient(to top right, transparent, rgba(255,255,255,0.05), transparent)'
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    animate={floatingAnimation}
                    className="relative"
                  >
                    <motion.div 
                      className="absolute -inset-4 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(111, 76, 255, 0.3) 0%, rgba(66, 51, 122, 0) 70%)',
                        filter: 'blur(10px)',
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    {feature.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-bold mt-4 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    style={{ textShadow: '0 0 10px rgba(132,90,223,0.3)' }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-indigo-100/90"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {feature.description}
                  </motion.p>
                  
                  {/* Animated corner accents */}
                  <svg className="absolute top-0 right-0 w-20 h-20 opacity-30" viewBox="0 0 100 100">
                    <motion.path
                      d="M 0,0 L 100,0 L 100,100"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                    />
                  </svg>
                  
                  <svg className="absolute bottom-0 left-0 w-20 h-20 opacity-30" viewBox="0 0 100 100">
                    <motion.path
                      d="M 100,100 L 0,100 L 0,0"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                    />
                  </svg>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section with enhanced glass morphism */}
        <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto my-16 relative">
          <motion.div 
            className="absolute inset-0 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
            style={{
              boxShadow: "inset 0 0 40px rgba(111, 76, 255, 0.1)"
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
          
          <div className="relative p-8">
            <motion.h2 
              className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textShadow: '0 0 10px rgba(132,90,223,0.3)' }}
            >
              How CV Genie Works
            </motion.h2>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative h-80 w-80 mx-auto">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(111, 76, 255, 0.2) 0%, rgba(66, 51, 122, 0) 70%)',
                      filter: 'blur(30px)',
                    }}
                    animate={cosmicDustAnimation}
                  />
                  
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                      <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                      
                      <filter id="neonGlow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    
                    {/* Enhanced process flow with glow */}
                    <motion.path
                      d="M 10,100 C 30,60 70,20 100,50 C 130,80 170,60 190,100"
                      fill="transparent"
                      stroke="url(#pathGradient)"
                      strokeWidth="4"
                      filter="url(#neonGlow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5 }}
                    />
                    
                    {/* Animated particles flowing along the path */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.circle
                        key={`flow-${i}`}
                        r="3"
                        fill="#a855f7"
                        filter="url(#neonGlow)"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          offsetDistance: ['0%', '100%']
                        }}
                        style={{
                          offsetPath: "path('M 10,100 C 30,60 70,20 100,50 C 130,80 170,60 190,100')",
                          offsetRotate: "auto"
                        }}
                        transition={{
                          duration: 4,
                          delay: i * 0.8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                    
                    {/* Process step glowing circles */}
                    <motion.circle 
                      cx="10" 
                      cy="100" 
                      r="8" 
                      fill="#ffffff"
                      filter="url(#neonGlow)"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0 }}
                      whileHover={{ scale: 1.5 }}
                    />
                    
                    <motion.circle 
                      cx="100" 
                      cy="50" 
                      r="8" 
                      fill="#ffffff"
                      filter="url(#neonGlow)"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      whileHover={{ scale: 1.5 }}
                    />
                    
                    <motion.circle 
                      cx="190" 
                      cy="100" 
                      r="8" 
                      fill="#ffffff"
                      filter="url(#neonGlow)"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1 }}
                      whileHover={{ scale: 1.5 }}
                    />
                    
                    {/* Additional cosmic dust particles */}
                    {Array.from({ length: 30 }).map((_, i) => (
                      <motion.circle
                        key={`dust-${i}`}
                        cx={Math.random() * 180 + 10}
                        cy={Math.random() * 180 + 10}
                        r={Math.random() * 2 + 1}
                        fill="#ffffff"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.7, 0], scale: [0, 1, 0] }}
                        transition={{
                          duration: Math.random() * 2 + 1,
                          repeat: Infinity,
                          delay: Math.random() * 2
                        }}
                      />
                    ))}
                  </svg>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ol className="space-y-8">
                  <motion.li 
                    className="flex gap-4"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <motion.div 
                      className="backdrop-blur-md bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 border border-white/20"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      animate={{ 
                        boxShadow: [
                          '0 0 0 0 rgba(111, 76, 255, 0)', 
                          '0 0 0 10px rgba(111, 76, 255, 0.2)', 
                          '0 0 0 0 rgba(111, 76, 255, 0)'
                        ] 
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      1
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-100 to-purple-200">Input Your Information</h3>
                      <p className="text-indigo-100/80">Enter your work experience, education, and skills into our user-friendly form.</p>
                    </div>
                  </motion.li>
                  
                  <motion.li 
                    className="flex gap-4"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <motion.div 
                      className="backdrop-blur-md bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 border border-white/20"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      animate={{ 
                        boxShadow: [
                          '0 0 0 0 rgba(111, 76, 255, 0)', 
                          '0 0 0 10px rgba(111, 76, 255, 0.2)', 
                          '0 0 0 0 rgba(111, 76, 255, 0)'
                        ] 
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    >
                      2
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-100 to-purple-200">AI Enhancement</h3>
                      <p className="text-indigo-100/80">Our AI suggests improvements and optimizes your content for maximum impact.</p>
                    </div>
                  </motion.li>
                  
                  <motion.li 
                    className="flex gap-4"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <motion.div 
                      className="backdrop-blur-md bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 border border-white/20"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      animate={{ 
                        boxShadow: [
                          '0 0 0 0 rgba(111, 76, 255, 0)', 
                          '0 0 0 10px rgba(111, 76, 255, 0.2)', 
                          '0 0 0 0 rgba(111, 76, 255, 0)'
                        ] 
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                    >
                      3
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-100 to-purple-200">Generate & Download</h3>
                      <p className="text-indigo-100/80">Choose a template, review your polished resume, and download it for immediate use.</p>
                    </div>
                  </motion.li>
                </ol>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* About the Maker Section with enhanced glass morphism */}
        <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto mb-16 relative">
          <motion.div 
            className="absolute inset-0 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
            style={{
              boxShadow: "inset 0 0 40px rgba(111, 76, 255, 0.1)"
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
          
          <div className="relative p-8">
            <motion.h2 
              className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textShadow: '0 0 10px rgba(132,90,223,0.3)' }}
            >
              About the Maker
            </motion.h2>
            
            <div className="flex flex-col md:flex-row items-center gap-16">
              <motion.div 
                className="flex-1 flex justify-center"
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.div 
                  className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-white/30"
                  animate={floatingAnimation}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  {/* Glowing background for the avatar */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(111, 76, 255, 0.4) 0%, rgba(66, 51, 122, 0.2) 50%, rgba(0, 0, 0, 0) 70%)',
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.4, 0.6, 0.4]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 to-purple-600/40 flex items-center justify-center text-white text-xl font-bold backdrop-blur-sm">
                    <motion.span 
                      animate={{ 
                        textShadow: ['0 0 5px #ffffff', '0 0 15px #ffffff', '0 0 5px #ffffff'] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity 
                      }}
                    >
                      Photo
                    </motion.span>
                  </div>
                  
                  {/* Abstract animated shapes around the photo */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                        <stop offset="100%" stopColor="rgba(111, 76, 255, 0.4)" />
                      </linearGradient>
                    </defs>
                    
                    {/* Animated circles */}
                    {[...Array(8)].map((_, i) => (
                      <motion.circle
                        key={i}
                        cx="50"
                        cy="50"
                        r={40 + i*3}
                        fill="none"
                        stroke="url(#circleGradient)"
                        strokeWidth="0.5"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ 
                          scale: [0.8, 1.2, 0.8], 
                          opacity: [0.1, 0.3, 0.1],
                          rotate: [0, 180, 360] 
                        }}
                        transition={{
                          duration: 8 + i,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeInOut"
                        }}
                        style={{ transformOrigin: '50px 50px' }}
                      />
                    ))}
                    
                    {/* Cosmic dust particles */}
                    {[...Array(15)].map((_, i) => (
                      <motion.circle 
                        key={`dust-maker-${i}`}
                        cx={50 + Math.cos(Math.PI * 2 * i / 15) * (Math.random() * 20 + 30)}
                        cy={50 + Math.sin(Math.PI * 2 * i / 15) * (Math.random() * 20 + 30)}
                        r={Math.random() * 1 + 0.5}
                        fill="#ffffff"
                        animate={{
                          opacity: [0, 0.8, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          duration: Math.random() * 2 + 1,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </svg>
                  
                  {/* Uncomment and update when you have an image */}
                  {/* <Image 
                    src="/path/to/maker-photo.jpg" 
                    alt="Creator of CV Genie" 
                    fill
                    className="object-cover" 
                  /> */}
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.h3 
                  className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-purple-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{ textShadow: '0 0 10px rgba(132,90,223,0.3)' }}
                >
                  Hello, I'm Harsh!
                </motion.h3>
                
                <motion.p 
                  className="text-lg text-indigo-100/90 mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  I created CV Genie to solve a problem I faced myself - creating an impressive resume that truly highlights one's skills and experiences.
                </motion.p>
                
                <motion.p 
                  className="text-lg text-indigo-100/90 mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  With a background in software engineering and AI, I built CV Genie to combine beautiful design with intelligent content optimization.
                </motion.p>
                
                <div className="flex gap-4">
                  <motion.a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative backdrop-blur-md bg-black/30 text-white p-3 rounded-full border border-white/10"
                    whileHover={{ 
                      scale: 1.2,
                      boxShadow: '0 0 15px rgba(111, 76, 255, 0.5)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Glow effect */}
                    <motion.div 
                      className="absolute inset-0 -z-10 rounded-full"
                      animate={{
                        boxShadow: [
                          '0 0 0px rgba(111, 76, 255, 0)',
                          '0 0 10px rgba(111, 76, 255, 0.5)',
                          '0 0 0px rgba(111, 76, 255, 0)'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                  
                  <motion.a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative backdrop-blur-md bg-blue-600/30 text-white p-3 rounded-full border border-white/10"
                    whileHover={{ 
                      scale: 1.2,
                      boxShadow: '0 0 15px rgba(111, 76, 255, 0.5)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Glow effect */}
                    <motion.div 
                      className="absolute inset-0 -z-10 rounded-full"
                      animate={{
                        boxShadow: [
                          '0 0 0px rgba(111, 76, 255, 0)',
                          '0 0 10px rgba(111, 76, 255, 0.5)',
                          '0 0 0px rgba(111, 76, 255, 0)'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.7
                      }}
                    />
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </motion.a>
                  
                  <motion.a
                    href="mailto:youremail@example.com"
                    className="relative backdrop-blur-md bg-red-500/30 text-white p-3 rounded-full border border-white/10"
                    whileHover={{ 
                      scale: 1.2,
                      boxShadow: '0 0 15px rgba(111, 76, 255, 0.5)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Glow effect */}
                    <motion.div 
                      className="absolute inset-0 -z-10 rounded-full"
                      animate={{
                        boxShadow: [
                          '0 0 0px rgba(111, 76, 255, 0)',
                          '0 0 10px rgba(111, 76, 255, 0.5)',
                          '0 0 0px rgba(111, 76, 255, 0)'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.4
                      }}
                    />
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
