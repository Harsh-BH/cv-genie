
"use client"
import Link from "next/link";
import { Metadata } from "next";
import { AnimatedBackground } from "@/components/auth/AnimatedBackground";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";



function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-yellow-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-blue-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      )}
    </button>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Animated background */}
      <AnimatedBackground />
      
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 z-10">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col items-center">
            <div className="flex w-full items-center justify-between">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="bg-blue-600 rounded-full p-2 transition-all duration-300 group-hover:scale-110">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="text-white"
                  >
                    <path 
                      d="M12 2L2 7L12 12L22 7L12 2Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M2 17L12 22L22 17" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M2 12L12 17L22 12" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">CV Genie</span>
              </Link>
              
              <ThemeToggle />
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent my-4" />
          </div>
          {children}
        </div>
      </div>
      
      <div className="relative hidden w-0 flex-1 lg:block z-10">
        <div className="absolute inset-0 flex items-center justify-center">
          <MinimalistCVIllustration />
        </div>
      </div>
    </div>
  );
}

function MinimalistCVIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-1000">
      <div className="absolute w-full h-full opacity-20 bg-gradient-to-r from-gray-500/20 via-transparent to-gray-500/20" />
      
      <div className="relative w-80 h-96 flex items-center justify-center transform-gpu">
        {/* CV Paper with enhanced 3D animations */}
        <svg
          viewBox="0 0 300 420"
          width="300"
          height="420"
          className="drop-shadow-xl cv-container"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>
            {`
              @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
              }
              
              @keyframes slideIn {
                0% { transform: translateY(10px); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
              }
              
              @keyframes scanLine {
                0% { transform: translateY(120px); opacity: 0.7; }
                50% { opacity: 1; }
                100% { transform: translateY(320px); opacity: 0.7; }
              }
              
              @keyframes pulse {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
              }
              
              @keyframes drawCheck {
                0% { stroke-dashoffset: 100; }
                100% { stroke-dashoffset: 0; }
              }
              
              @keyframes analyzeData {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(5px); }
                75% { transform: translateX(-5px); }
              }
              
              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
              
              @keyframes rotate3d {
                0% { transform: rotate3d(0, 1, 0, 0deg); }
                25% { transform: rotate3d(0, 1, 0, 3deg); }
                75% { transform: rotate3d(0, 1, 0, -3deg); }
                100% { transform: rotate3d(0, 1, 0, 0deg); }
              }
              
              @keyframes shadowPulse {
                0%, 100% { filter: drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.2)); }
                50% { filter: drop-shadow(0px 16px 16px rgba(0, 0, 0, 0.3)); }
              }
              
              @keyframes progressBar {
                0% { width: 0; }
                100% { width: 100%; }
              }
              
              @keyframes bubble {
                0% { transform: scale(0); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: scale(1.5); opacity: 0; }
              }
              
              @keyframes dataSpin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              
              .cv-container {
                animation: shadowPulse 5s ease-in-out infinite, 
                           rotate3d 10s ease-in-out infinite;
                transform-origin: center center;
                transform-style: preserve-3d;
              }
              
              .cv-paper {
                animation: fadeIn 0.8s ease-out forwards;
                filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.2));
              }
              
              .cv-paper-shadow {
                animation: shadowPulse 5s ease-in-out infinite;
              }
              
              .cv-header {
                animation: slideIn 0.8s ease-out 0.3s forwards;
                opacity: 0;
              }
              
              .cv-name {
                animation: slideIn 0.8s ease-out 0.5s forwards;
                opacity: 0;
              }
              
              .cv-title {
                animation: slideIn 0.8s ease-out 0.7s forwards;
                opacity: 0;
              }
              
              .cv-section {
                animation: slideIn 0.8s ease-out 0.9s forwards;
                opacity: 0;
              }
              
              .cv-content {
                animation: slideIn 0.8s ease-out 1.1s forwards;
                opacity: 0;
              }
              
              .cv-skills {
                animation: slideIn 0.8s ease-out 1.3s forwards, 
                           float 3s ease-in-out 2s infinite;
                opacity: 0;
              }
              
              .scan-line {
                animation: scanLine 3s ease-in-out 2s infinite;
                opacity: 0;
              }
              
              .analyzing-dots {
                animation: pulse 1.5s ease-in-out 2.5s infinite;
              }
              
              .analysis-data {
                animation: analyzeData 0.8s ease-in-out 3s infinite;
                transform-origin: center center;
              }
              
              .data-circle {
                animation: dataSpin 6s linear infinite;
                transform-origin: center center;
              }
              
              .progress-track {
                stroke-dasharray: 150;
                stroke-dashoffset: 150;
                animation: drawCheck 3s ease-in-out 3.5s forwards;
              }
              
              .progress-fill {
                stroke-dasharray: 150;
                stroke-dashoffset: 150;
                animation: drawCheck 2s ease-in-out 3.5s forwards;
              }
              
              .result-circle {
                animation: fadeIn 1s ease-out 4s forwards, 
                           float 3s ease-in-out 5s infinite;
                opacity: 0;
              }
              
              .check-mark {
                stroke-dasharray: 100;
                stroke-dashoffset: 100;
                animation: drawCheck 1s ease-in-out 4.5s forwards;
              }
              
              .analysis-bubble {
                animation: bubble 2.5s ease-in-out infinite;
                transform-origin: center center;
              }
              
              :root.dark .cv-paper {
                fill: #242424;
              }
              
              :root.dark .cv-header {
                fill: #333333;
                stroke: #444444;
              }
              
              :root.dark .cv-name, 
              :root.dark .cv-section {
                fill: #999999;
              }
              
              :root.dark .cv-title,
              :root.dark .cv-content {
                fill: #555555;
              }
              
              :root.dark .cv-skills {
                fill: #333333;
                stroke: #444444;
              }
              
              :root.dark .result-circle {
                fill: rgba(255,255,255,0.1);
              }
              
              :root.dark .check-mark {
                stroke: #cccccc;
              }
            `}
          </style>

          {/* 3D perspective container */}
          <defs>
            <filter id="shadow1" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="10" stdDeviation="10" floodOpacity="0.3"/>
            </filter>
            <filter id="shadow2" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="4" dy="6" stdDeviation="4" floodOpacity="0.2"/>
            </filter>
            <linearGradient id="paperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" className="dark:!text-gray-800"/>
              <stop offset="100%" stopColor="#f5f5f5" className="dark:!text-gray-900"/>
            </linearGradient>
          </defs>
          
          {/* CV Paper shadow for 3D effect */}
          <rect 
            x="25" 
            y="25" 
            width="260" 
            height="380" 
            rx="10" 
            fill="black" 
            opacity="0.1" 
            className="cv-paper-shadow"
            filter="url(#shadow1)"
          />
          
          {/* CV Paper background with gradient for 3D effect */}
          <rect 
            x="20" 
            y="20" 
            width="260" 
            height="380" 
            rx="10" 
            fill="url(#paperGradient)" 
            className="cv-paper"
            filter="url(#shadow2)"
          />
          
          {/* CV Paper fold line for 3D effect */}
          <line 
            x1="150" 
            y1="20" 
            x2="150" 
            y2="400" 
            stroke="#e0e0e0" 
            strokeWidth="1" 
            strokeDasharray="2,2" 
            opacity="0.5" 
            className="cv-paper"
          />
          
          {/* CV Top Header */}
          <rect 
            x="40" 
            y="40" 
            width="220" 
            height="60" 
            rx="4" 
            fill="#f5f5f5"
            stroke="#e0e0e0"
            strokeWidth="1"
            className="cv-header"
          />
          
          {/* CV Name */}
          <rect 
            x="50" 
            y="50" 
            width="140" 
            height="16" 
            rx="2" 
            fill="#666666"
            className="cv-name"
          />
          
          {/* CV Title */}
          <rect 
            x="50" 
            y="74" 
            width="100" 
            height="10" 
            rx="2" 
            fill="#999999"
            className="cv-title"
          />
          
          {/* CV Profile Image */}
          <circle 
            cx="240" 
            cy="70" 
            r="20" 
            fill="#e0e0e0" 
            stroke="#cccccc" 
            className="cv-header"
          />
          
          {/* CV Section 1 */}
          <rect 
            x="40" 
            y="120" 
            width="220" 
            height="10" 
            rx="2" 
            fill="#444444"
            className="cv-section"
          />
          
          {/* CV Content lines */}
          <rect 
            x="40" 
            y="145" 
            width="220" 
            height="8" 
            rx="2" 
            fill="#e0e0e0"
            className="cv-content"
          />
          
          <rect 
            x="40" 
            y="165" 
            width="180" 
            height="8" 
            rx="2" 
            fill="#e0e0e0"
            className="cv-content"
          />
          
          {/* CV Section 2 */}
          <rect 
            x="40" 
            y="195" 
            width="220" 
            height="10" 
            rx="2" 
            fill="#444444"
            className="cv-section"
          />
          
          {/* CV Skills section with 3D effect */}
          <rect 
            x="40" 
            y="220" 
            width="40" 
            height="20" 
            rx="10" 
            fill="#e0e0e0"
            stroke="#cccccc"
            className="cv-skills"
          />
          
          <rect 
            x="90" 
            y="220" 
            width="60" 
            height="20" 
            rx="10" 
            fill="#e0e0e0"
            stroke="#cccccc"
            className="cv-skills"
          />
          
          <rect 
            x="160" 
            y="220" 
            width="50" 
            height="20" 
            rx="10" 
            fill="#e0e0e0"
            stroke="#cccccc"
            className="cv-skills"
          />
          
          {/* CV Final section */}
          <rect 
            x="40" 
            y="260" 
            width="220" 
            height="10" 
            rx="2" 
            fill="#444444"
            className="cv-section"
          />
          
          <rect 
            x="40" 
            y="285" 
            width="220" 
            height="8" 
            rx="2" 
            fill="#e0e0e0"
            className="cv-content"
          />
          
          <rect 
            x="40" 
            y="305" 
            width="180" 
            height="8" 
            rx="2" 
            fill="#e0e0e0"
            className="cv-content"
          />
          
          <rect 
            x="40" 
            y="325" 
            width="160" 
            height="8" 
            rx="2" 
            fill="#e0e0e0"
            className="cv-content"
          />
          
          {/* Scanning line animation with glow effect */}
          <rect 
            x="40" 
            y="0" 
            width="220" 
            height="3" 
            fill="rgba(0,0,0,0.5)" 
            className="scan-line"
          />
          <rect 
            x="40" 
            y="0" 
            width="220" 
            height="1" 
            fill="rgba(255,255,255,0.8)" 
            className="scan-line"
          />
          
          {/* Progress bar animation */}
          <rect
            x="60"
            y="240"
            width="180"
            height="4"
            rx="2"
            fill="#f0f0f0"
            stroke="#cccccc"
            strokeWidth="0.5"
            className="cv-content"
          />
          <circle
            cx="60"
            cy="242"
            r="3"
            fill="#555555"
            className="progress-track"
          />
          <circle
            cx="240"
            cy="242"
            r="3"
            fill="#555555"
            className="progress-track"
          />
          <path
            d="M60 242 L240 242"
            stroke="#e0e0e0"
            strokeWidth="4"
            strokeLinecap="round"
            className="progress-track"
          />
          <path
            d="M60 242 L240 242"
            stroke="#555555"
            strokeWidth="4"
            strokeLinecap="round"
            className="progress-fill"
          />
          
          {/* Analyzing animation dots */}
          <g className="analyzing-dots">
            <circle cx="150" cy="180" r="3" fill="#333333" />
            <circle cx="160" cy="180" r="3" fill="#333333" />
            <circle cx="170" cy="180" r="3" fill="#333333" />
          </g>
          
          {/* Analysis data box with 3D rotation */}
          <g className="analysis-data">
            <rect x="200" y="140" width="40" height="30" rx="4" fill="#f0f0f0" stroke="#cccccc" />
            <line x1="205" y1="150" x2="235" y2="150" stroke="#999999" strokeWidth="2" />
            <line x1="205" y1="160" x2="225" y2="160" stroke="#999999" strokeWidth="2" />
          </g>
          
          {/* Analysis data circles with rotation */}
          <g className="data-circle">
            <circle cx="100" cy="140" r="15" fill="none" stroke="#999999" strokeWidth="1" strokeDasharray="2,2" />
            <circle cx="100" cy="140" r="8" fill="none" stroke="#555555" strokeWidth="1" />
            <circle cx="100" cy="140" r="3" fill="#555555" />
            <line x1="97" y1="137" x2="103" y2="143" stroke="#555555" strokeWidth="1" />
            <line x1="97" y1="143" x2="103" y2="137" stroke="#555555" strokeWidth="1" />
          </g>
          
          {/* Analysis bubbles */}
          <circle cx="80" cy="160" r="4" fill="#333333" opacity="0.2" className="analysis-bubble" />
          <circle cx="120" cy="200" r="3" fill="#333333" opacity="0.2" className="analysis-bubble" style={{ animationDelay: '0.5s' }} />
          <circle cx="200" cy="180" r="5" fill="#333333" opacity="0.2" className="analysis-bubble" style={{ animationDelay: '1s' }} />
          
          {/* 3D Success result circle with shadow */}
          <circle 
            cx="223" 
            cy="353" 
            r="30" 
            fill="rgba(0,0,0,0.1)" 
          />
          <circle 
            cx="220" 
            cy="350" 
            r="30" 
            fill="rgba(0,0,0,0.1)" 
            className="result-circle"
          />
          
          {/* Check mark with 3D effect */}
          <path 
            d="M205 350L215 360L235 340" 
            stroke="#333333" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="check-mark"
          />
          <path 
            d="M205 352L215 362L235 342" 
            stroke="#555555" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            opacity="0.3"
            className="check-mark"
          />
        </svg>
        
        {/* "CV Genie" text with 3D shadow */}
        <div className="absolute bottom-10 w-full text-center">
          <div className="inline-block">
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-200 drop-shadow-md">
              CV Genie
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
