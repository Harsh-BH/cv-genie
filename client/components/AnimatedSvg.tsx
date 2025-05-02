import React from 'react';
import { motion } from 'framer-motion';

type AnimatedSvgProps = {
  type: string;
  className?: string;
};

const AnimatedSvg: React.FC<AnimatedSvgProps> = ({ type, className = "" }) => {
  switch (type) {
    case 'cvReading':
      return (
        <div className={`relative ${className}`}>
          <motion.svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Background glow effect */}
            <motion.circle
              cx="200"
              cy="200"
              r="160"
              fill="url(#cvGradient)"
              opacity="0.15"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.15, 0.2, 0.15]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            {/* Document shadow */}
            <motion.rect
              x="75"
              y="57"
              width="240"
              height="300"
              rx="8"
              fill="rgba(0, 0, 0, 0.2)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
            
            {/* Document background */}
            <motion.rect
              x="70"
              y="50"
              width="240"
              height="300"
              rx="8"
              fill="white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            />
            
            {/* Document top decoration */}
            <motion.rect
              x="70"
              y="50"
              width="240"
              height="12"
              rx="8"
              fill="url(#topGradient)"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ transformOrigin: 'center left' }}
            />
            
            {/* CV Photo placeholder */}
            <motion.circle
              cx="110"
              cy="100"
              r="30"
              fill="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            />
            <motion.path
              d="M110 85 Q110 90 110 100 Q110 115 110 115"
              stroke="#94A3B8"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 1.1 }}
            />
            <motion.circle
              cx="110"
              cy="80"
              r="10"
              fill="#94A3B8"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 1.2 }}
            />
            
            {/* CV Name Header */}
            <motion.rect
              x="160"
              y="80"
              width="130"
              height="16"
              rx="2"
              fill="#334155"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 130 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              style={{ transformOrigin: 'center left' }}
            />
            
            {/* CV Subtitle */}
            <motion.rect
              x="160"
              y="105"
              width="100"
              height="10"
              rx="2"
              fill="#64748B"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 100 }}
              transition={{ duration: 0.4, delay: 1.1 }}
              style={{ transformOrigin: 'center left' }}
            />

            {/* Sections with animated appearance */}
            {/* Experience Section */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <rect x="90" y="150" width="80" height="12" rx="2" fill="#3B82F6" />
              
              {/* Section content animated lines */}
              {[0, 1, 2].map((i) => (
                <motion.g key={`exp-${i}`}>
                  <motion.rect
                    x="90"
                    y={175 + i * 30}
                    width="60"
                    height="10"
                    rx="2"
                    fill="#334155"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1.6 + i * 0.1 }}
                  />
                  
                  <motion.rect
                    x="90"
                    y={190 + i * 30}
                    width={Math.random() * 20 + 150}
                    height="6"
                    rx="2"
                    fill="#94A3B8"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: Math.random() * 20 + 150 }}
                    transition={{ duration: 0.5, delay: 1.7 + i * 0.1 }}
                  />
                </motion.g>
              ))}
            </motion.g>
            
            {/* Skills Section */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.0 }}
            >
              <rect x="90" y="270" width="50" height="12" rx="2" fill="#3B82F6" />
              
              {/* Skills bubbles */}
              {[0, 1, 2, 3].map((i) => (
                <motion.rect
                  key={`skill-${i}`}
                  x={90 + (i * 50)}
                  y="290"
                  width="40"
                  height="20"
                  rx="10"
                  fill="rgba(59, 130, 246, 0.2)"
                  stroke="#3B82F6"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    delay: 2.2 + i * 0.1 
                  }}
                />
              ))}
            </motion.g>

            {/* AI scanning effect */}
            <motion.rect
              x="70"
              y="50"
              width="240"
              height="3"
              fill="rgba(99, 102, 241, 0.7)"
              initial={{ opacity: 0 }}
              animate={{ 
                y: [50, 350, 50],
                opacity: [0.8, 0.8, 0.8]
              }}
              transition={{ 
                duration: 4,
                times: [0, 0.5, 1],
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
            
            {/* AI analysis animation */}
            <motion.g>
              {/* Highlight blocks that appear randomly */}
              {[175, 190, 230, 290].map((y, i) => (
                <motion.rect
                  key={`highlight-${i}`}
                  x={90}
                  y={y}
                  width={60 + Math.random() * 100}
                  height={i === 3 ? 20 : 10}
                  rx="2"
                  fill="rgba(99, 102, 241, 0.2)"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    delay: 2 + i * 0.8,
                    repeat: Infinity,
                    repeatDelay: 5
                  }}
                />
              ))}
            </motion.g>
            
            {/* AI analysis indicators */}
            <motion.g>
              {/* Checkmarks that appear */}
              {[1, 2].map((i) => (
                <motion.svg
                  key={`check-${i}`}
                  x={300}
                  y={170 + i * 60}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1.2, 1, 0] 
                  }}
                  transition={{ 
                    duration: 2,
                    delay: 2 + i * 1.2,
                    repeat: Infinity,
                    repeatDelay: 5
                  }}
                >
                  <path
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                    fill="#16A34A"
                  />
                </motion.svg>
              ))}
              
              {/* Improvement suggestion icon */}
              <motion.svg
                x={300}
                y={230}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.2, 1, 0] 
                }}
                transition={{ 
                  duration: 2,
                  delay: 3.5,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              >
                <path
                  d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.g>
            
            {/* AI progress indicator */}
            <motion.g>
              <motion.circle
                cx="330"
                cy="50"
                r="20"
                fill="url(#aiGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.7] }}
                transition={{ delay: 0.5, duration: 1 }}
              />
              
              <motion.circle
                cx="330"
                cy="50"
                r="15"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="80"
                fill="none"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <motion.text
                x="330"
                y="55"
                fontSize="12"
                fill="white"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                AI
              </motion.text>
            </motion.g>
            
            {/* Score indicator that appears at the end */}
            <motion.g>
              <motion.circle
                cx="330"
                cy="330"
                r="30"
                fill="url(#scoreGradient)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 1],
                  scale: [0, 1.1, 1]
                }}
                transition={{ 
                  duration: 1,
                  delay: 4,
                  repeat: Infinity,
                  repeatDelay: 6
                }}
              />
              
              <motion.text
                x="330"
                y="335"
                fontSize="14"
                fontWeight="bold"
                fill="white"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: 4.2,
                  repeat: Infinity,
                  repeatDelay: 6
                }}
              >
                85%
              </motion.text>
              
              <motion.text
                x="330"
                y="350"
                fontSize="8"
                fill="white"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: 4.4,
                  repeat: Infinity,
                  repeatDelay: 6
                }}
              >
                SCORE
              </motion.text>
            </motion.g>
            
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="cvGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C026D3" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>
              
              <linearGradient id="topGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
              
              <radialGradient id="aiGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#4F46E5" />
              </radialGradient>
              
              <radialGradient id="scoreGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#16A34A" />
                <stop offset="100%" stopColor="#059669" />
              </radialGradient>
            </defs>
          </motion.svg>
        </div>
      );
      
    case 'floatingDots':
      return (
        <div className={`absolute ${className}`}>
          <motion.svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.circle
                key={i}
                cx={Math.random() * 200}
                cy={Math.random() * 200}
                r={Math.random() * 5 + 2}
                fill={`rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`}
                initial={{ y: 0 }}
                animate={{ 
                  y: [0, -(Math.random() * 20 + 10), 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 2
                }}
              />
            ))}
          </motion.svg>
        </div>
      );

    case 'wavyLine':
      return (
        <div className={`${className}`}>
          <svg width="100%" height="100" viewBox="0 0 1200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M0 50C200 20 400 80 600 50C800 20 1000 80 1200 50"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(236, 72, 153, 0.5)" />
                <stop offset="50%" stopColor="rgba(167, 139, 250, 0.5)" />
                <stop offset="100%" stopColor="rgba(79, 70, 229, 0.5)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
      
    case 'codingAnimation':
      return (
        <div className={`relative ${className}`}>
          <motion.svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Code editor background */}
            <motion.rect
              x="20"
              y="20"
              width="160"
              height="160"
              rx="8"
              fill="#1E1E3F"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Code editor header */}
            <motion.rect
              x="20"
              y="20"
              width="160"
              height="20"
              rx="8"
              fill="#2D2B55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            
            {/* Header buttons */}
            <motion.circle cx="35" cy="30" r="5" fill="#FF5F56" />
            <motion.circle cx="55" cy="30" r="5" fill="#FFBD2E" />
            <motion.circle cx="75" cy="30" r="5" fill="#27C93F" />
            
            {/* Code lines */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.g key={i}>
                <motion.rect
                  x="35"
                  y={55 + i * 20}
                  width={Math.random() * 40 + 80}
                  height="8"
                  rx="2"
                  fill={
                    i % 3 === 0 
                      ? "rgba(255, 121, 198, 0.7)" 
                      : i % 2 === 0 
                      ? "rgba(80, 250, 123, 0.7)" 
                      : "rgba(189, 147, 249, 0.7)"
                  }
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.15 }}
                />
                <motion.rect
                  x="35"
                  y={55 + i * 20}
                  width={Math.random() * 40 + 80}
                  height="8"
                  rx="2"
                  fill="rgba(255, 255, 255, 0.2)"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ 
                    opacity: 1, 
                    width: Math.random() * 40 + 80,
                    transition: { delay: 1 + i * 0.2, duration: 0.5 }
                  }}
                />
              </motion.g>
            ))}
            
            {/* Cursor */}
            <motion.rect
              x="35"
              y="135"
              width="2"
              height="14"
              fill="#FFFFFF"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.svg>
        </div>
      );

    case 'analyticsAnimation':
      return (
        <div className={`relative ${className}`}>
          <motion.svg
            width="240"
            height="180"
            viewBox="0 0 240 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.rect
              x="20"
              y="20"
              width="200"
              height="140"
              rx="5"
              fill="rgba(30, 41, 59, 0.7)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Graph lines */}
            <motion.path
              d="M40 140 L40 40 L220 40"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            
            {/* Bars */}
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.rect
                key={`bar-${i}`}
                x={50 + (i-1) * 35}
                y={140 - Math.random() * 60 - 20}
                width="20"
                height="0"
                fill={
                  i === 1 ? "rgba(236, 72, 153, 0.8)" :
                  i === 2 ? "rgba(167, 139, 250, 0.8)" :
                  i === 3 ? "rgba(79, 70, 229, 0.8)" :
                  i === 4 ? "rgba(16, 185, 129, 0.8)" :
                  "rgba(245, 158, 11, 0.8)"
                }
                initial={{ height: 0 }}
                animate={{ height: Math.random() * 60 + 20 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5 + i * 0.1,
                  type: "spring"
                }}
              />
            ))}
            
            {/* Data points */}
            <motion.path
              d="M60 100 L95 80 L130 110 L165 60 L200 90"
              stroke="rgba(236, 72, 153, 0.8)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            />
            
            {[60, 95, 130, 165, 200].map((x, i) => {
              const y = [100, 80, 110, 60, 90][i];
              return (
                <motion.circle
                  key={`circle-${i}`}
                  cx={x}
                  cy={y}
                  r="6"
                  fill="rgba(236, 72, 153, 1)"
                  stroke="white"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 1 + i * 0.2,
                    type: "spring",
                    stiffness: 300
                  }}
                />
              );
            })}
          </motion.svg>
        </div>
      );
      
    case 'circularProgress':
      return (
        <div className={`${className}`}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="#E9D5FF"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="#A855F7"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, rotate: -90 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              style={{ 
                rotate: -90,
                transformOrigin: 'center'
              }}
            />
            <motion.text
              x="50"
              y="55"
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              AI
            </motion.text>
          </svg>
        </div>
      );

    default:
      return null;
  }
};

export default AnimatedSvg;
