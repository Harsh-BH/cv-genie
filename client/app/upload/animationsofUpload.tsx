'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Upload icon with interactive animations
export const UploadIcon = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-purple-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          rotate: isHovered ? [0, -5, 5, 0] : 0
        }}
        transition={{ 
          delay: 0.2,
          rotate: { duration: 0.3, repeat: isHovered ? 1 : 0 }
        }}
      >
        <motion.path 
          d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" 
          animate={isHovered ? { y: [0, -2, 0] } : {}}
          transition={{ duration: 0.5 }}
        />
        <motion.polyline 
          points="17 8 12 3 7 8" 
          animate={isHovered ? { y: [0, -4, 0] } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        <motion.line 
          x1="12" 
          y1="3" 
          x2="12" 
          y2="15" 
          animate={isHovered ? { 
            pathLength: [1, 0.6, 1],
            y2: [15, 13, 15]
          } : {}}
          transition={{ duration: 0.5 }}
        />
      </motion.svg>
      
      {isHovered && (
        <motion.div 
          className="absolute -inset-4 rounded-full bg-purple-500/10 z-[-1]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      )}
    </motion.div>
  );
};

// Success icon with path drawing animation
export const SuccessIcon = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        rotate: { delay: 0.2, duration: 0.5 }
      }}
      className="relative"
    >
      <motion.svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="64" 
        height="64" 
        viewBox="0 0 24 24"
        className="text-green-400"
      >
        <motion.circle 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ 
            pathLength: 1,
            rotate: isHovered ? 360 : 0
          }}
          transition={{ 
            pathLength: { duration: 0.6 },
            rotate: { duration: 1.5, ease: "easeInOut" }
          }}
        />
        <motion.path 
          d="M8 12l2 2 6-6" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ 
            pathLength: 1,
            scale: isHovered ? [1, 1.1, 1] : 1
          }}
          transition={{ 
            pathLength: { duration: 0.5, delay: 0.2 },
            scale: { duration: 0.4 }
          }}
        />
      </motion.svg>
      
      {isHovered && (
        <motion.div 
          className="absolute -inset-4 rounded-full bg-green-500/20 z-[-1]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      )}
    </motion.div>
  );
};

// Particles animation for success state
export const Particles = ({ count = 30 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 8 + 4;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
            style={{ 
              width: size, 
              height: size, 
              x: "50%",
              y: "50%",
            }}
            initial={{ opacity: 1 }}
            animate={{
              x: `${50 + (Math.random() * 100 - 50)}%`,
              y: `${50 + (Math.random() * 100 - 50)}%`,
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: Math.random() * 1.5 + 1.5,
              delay: Math.random() * 0.2,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
};

// Interactive decorative elements
export const DecorativeSphere = ({ size = 40, color = "#a855f7", delay = 0, position = {} }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="absolute z-0 pointer-events-auto cursor-pointer"
      style={{ ...position }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 0.7,
        x: isHovered ? [0, -5, 5, 0] : 0,
        y: isHovered ? [0, -5, 5, 0] : 0,
      }}
      transition={{ 
        delay,
        duration: 0.6,
        x: { duration: 0.5, repeat: isHovered ? 1 : 0 },
        y: { duration: 0.5, repeat: isHovered ? 1 : 0 }
      }}
    >
      <div 
        className={`rounded-full backdrop-blur-xl`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: `radial-gradient(circle at 30% 30%, ${color}90, ${color}30)`,
          boxShadow: isHovered ? `0 0 15px ${color}90` : `0 0 10px ${color}40`
        }}
      />
    </motion.div>
  );
};

// Animated File Icon Component
export const FileIcon = ({ fileName, fileSize }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine file type for icon
  const getFileExtension = (name) => {
    return name.split('.').pop().toLowerCase();
  };
  
  const extension = getFileExtension(fileName);
  let fileColor = "#a855f7"; // Default purple
  
  // Set color based on file type
  if (['pdf'].includes(extension)) {
    fileColor = "#ef4444"; // Red for PDFs
  } else if (['doc', 'docx'].includes(extension)) {
    fileColor = "#3b82f6"; // Blue for Word docs
  }
  
  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <motion.svg 
        width="80" 
        height="80" 
        viewBox="0 0 36 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        animate={{ 
          rotate: isHovered ? [-2, 2, -2, 0] : 0 
        }}
        transition={{
          duration: 0.4,
          repeat: isHovered ? 1 : 0
        }}
      >
        <motion.path 
          d="M36 13L23 0H4C1.8 0 0 1.8 0 4V44C0 46.2 1.8 48 4 48H32C34.2 48 36 46.2 36 44V13Z" 
          fill={fileColor}
          fillOpacity="0.2"
          whileHover={{ fillOpacity: 0.3 }}
        />
        <motion.path 
          d="M23 0L36 13H26C24.3 13 23 11.7 23 10V0Z" 
          fill={fileColor}
          fillOpacity="0.4"
          whileHover={{ fillOpacity: 0.5 }}
        />
        <foreignObject x="6" y="20" width="24" height="18">
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-xs font-mono font-bold" style={{color: fileColor}}>
              {extension.toUpperCase()}
            </p>
          </div>
        </foreignObject>
      </motion.svg>
      
      <motion.div 
        className="mt-2 text-center"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm text-white font-medium truncate max-w-[100px]">{fileName.length > 15 ? fileName.substring(0, 12) + '...' : fileName}</p>
        <p className="text-xs text-purple-300">{fileSize} MB</p>
      </motion.div>
      
      {isHovered && (
        <motion.div 
          className="absolute -inset-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 z-[-1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
};

// Animated progress bar for upload
export const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
      <motion.div 
        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />
    </div>
  );
};

// Wave animation background effect
export const WaveBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-[-1]">
      <svg 
        className="absolute bottom-0 left-0 w-full" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320"
      >
        <motion.path 
          fill="rgba(168, 85, 247, 0.05)" 
          fillOpacity="1"
          d="M0,224L48,192C96,160,192,96,288,96C384,96,480,160,576,181.3C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          animate={{
            d: [
              "M0,224L48,192C96,160,192,96,288,96C384,96,480,160,576,181.3C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,224C672,224,768,192,864,192C960,192,1056,224,1152,229.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,224L48,192C96,160,192,96,288,96C384,96,480,160,576,181.3C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut"
          }}
        />
        <motion.path 
          fill="rgba(219, 39, 119, 0.05)" 
          fillOpacity="1"
          d="M0,64L48,96C96,128,192,192,288,202.7C384,213,480,171,576,160C672,149,768,171,864,165.3C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          animate={{
            d: [
              "M0,64L48,96C96,128,192,192,288,202.7C384,213,480,171,576,160C672,149,768,171,864,165.3C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,128L48,133.3C96,139,192,149,288,138.7C384,128,480,96,576,90.7C672,85,768,107,864,122.7C960,139,1056,149,1152,138.7C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,64L48,96C96,128,192,192,288,202.7C384,213,480,171,576,160C672,149,768,171,864,165.3C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </svg>
    </div>
  );
};

// Animated gradient ring with hover effects
export const GradientRing = ({ size = 300, position = {}, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="absolute rounded-full pointer-events-auto cursor-pointer overflow-hidden"
      style={{ 
        width: size, 
        height: size,
        ...position
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.3, scale: 1 }}
      transition={{ delay, duration: 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from ${isHovered ? '90deg' : '0deg'}, #a855f7, #ec4899, #8b5cf6, #a855f7)`,
          filter: "blur(15px)"
        }}
        animate={{ 
          rotate: [0, 360],
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ 
          rotate: { repeat: Infinity, duration: 8, ease: "linear" },
          scale: { duration: 0.5 }
        }}
      />
    </motion.div>
  );
};

// Animated Loading Spinner with customizable colors
export const LoadingSpinner = ({ size = 48, primaryColor = "#a855f7", secondaryColor = "#ec4899" }) => {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div 
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            stroke={secondaryColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0.2 }}
            animate={{ pathLength: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            stroke={primaryColor}
            strokeWidth="2.5"
            strokeDasharray="15 30"
            strokeLinecap="round"
            fill="none"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

// Processing Document Animation
export const ProcessingDocumentAnimation = ({ size = 80 }) => {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Document base */}
        <motion.rect 
          x="30" 
          y="15" 
          width="60" 
          height="80" 
          rx="3"
          fill="#f3f4f6" 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Document lines */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.rect 
            key={i}
            x="40" 
            y={30 + i * 10} 
            width={40 - (i % 3) * 10}
            height="4" 
            rx="1"
            fill="#d1d5db"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
          />
        ))}
        
        {/* Processing circle */}
        <motion.circle
          cx="60"
          cy="95"
          r="15"
          stroke="#a855f7"
          strokeWidth="3"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
        
        <motion.path
          d="M53 95L58 100L68 90"
          stroke="#a855f7"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        />
        
        {/* Processing gear */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ originX: 0.5, originY: 0.5, translateX: 90, translateY: 35 }}
        >
          <circle cx="0" cy="0" r="12" fill="#a855f7" fillOpacity="0.2" />
          <path
            d="M0 -7V7M-7 0H7M-5 -5L5 5M-5 5L5 -5"
            stroke="#a855f7"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
};

// Animated Checklist for upload requirements
export const AnimatedChecklist = ({ items }) => {
  return (
    <motion.div
      className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-white font-medium text-sm mb-2">Upload Requirements</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-center gap-2 text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <motion.div
              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                item.fulfilled ? 'bg-green-500/20' : 'bg-gray-500/20'
              }`}
              whileHover={{ scale: 1.2 }}
            >
              {item.fulfilled ? (
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-green-400"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                >
                  <motion.path d="M20 6L9 17l-5-5" />
                </motion.svg>
              ) : (
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <motion.circle 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeDasharray="1 3" 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </motion.svg>
              )}
            </motion.div>
            <span className={item.fulfilled ? 'text-white' : 'text-gray-400'}>
              {item.text}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

// Enhanced File Icon with more detailed file type SVGs
export const EnhancedFileIcon = ({ fileName, fileSize }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get file extension
  const getFileExtension = (name) => {
    return name.split('.').pop().toLowerCase();
  };
  
  const extension = getFileExtension(fileName);
  
  // File type configurations
  const fileTypes = {
    pdf: {
      color: "#ef4444",
      icon: (
        <g>
          <path d="M8 24V16H22V24" stroke="currentColor" strokeWidth="2" />
          <path d="M12 12V20M16 16H8" stroke="currentColor" strokeWidth="2" />
        </g>
      )
    },
    doc: {
      color: "#3b82f6",
      icon: (
        <g>
          <path d="M8 12H22M8 16H22M8 20H16" stroke="currentColor" strokeWidth="2" />
        </g>
      )
    },
    docx: {
      color: "#3b82f6",
      icon: (
        <g>
          <path d="M8 12H22M8 16H22M8 20H16" stroke="currentColor" strokeWidth="2" />
        </g>
      )
    },
    jpg: {
      color: "#8b5cf6",
      icon: (
        <g>
          <circle cx="15" cy="13" r="3" stroke="currentColor" strokeWidth="2" />
          <path d="M8 22L12 17L15 19L20 14" stroke="currentColor" strokeWidth="2" />
        </g>
      )
    },
    png: {
      color: "#8b5cf6",
      icon: (
        <g>
          <circle cx="15" cy="13" r="3" stroke="currentColor" strokeWidth="2" />
          <path d="M8 22L12 17L15 19L20 14" stroke="currentColor" strokeWidth="2" />
        </g>
      )
    },
    default: {
      color: "#a855f7",
      icon: (
        <g>
          <path d="M10 12H22M10 16H22M10 20H18" stroke="currentColor" strokeWidth="2" />
        </g>
      )
    }
  };
  
  const fileConfig = fileTypes[extension] || fileTypes.default;
  
  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div 
        className="file-icon-container"
        animate={{ 
          rotate: isHovered ? [-2, 2, -2, 0] : 0 
        }}
        transition={{
          duration: 0.4,
          repeat: isHovered ? 1 : 0
        }}
      >
        <svg width="90" height="110" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M36 13L23 0H4C1.8 0 0 1.8 0 4V44C0 46.2 1.8 48 4 48H32C34.2 48 36 46.2 36 44V13Z" 
            fill={fileConfig.color}
            fillOpacity="0.2"
            whileHover={{ fillOpacity: 0.3 }}
          />
          <motion.path 
            d="M23 0L36 13H26C24.3 13 23 11.7 23 10V0Z" 
            fill={fileConfig.color}
            fillOpacity="0.4"
            whileHover={{ fillOpacity: 0.5 }}
          />
          
          {/* Animated file type icon */}
          <motion.g 
            className="text-purple-600"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            style={{ color: fileConfig.color }}
          >
            {fileConfig.icon}
          </motion.g>
          
          {/* Extension text */}
          <foreignObject x="12" y="32" width="12" height="8">
            <div className="flex items-center justify-center h-full">
              <motion.p 
                className="text-[8px] font-mono font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{color: fileConfig.color}}
              >
                {extension.toUpperCase()}
              </motion.p>
            </div>
          </foreignObject>
        </svg>
      </motion.div>
      
      <motion.div 
        className="mt-2 text-center"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm text-white font-medium truncate max-w-[100px]">
          {fileName.length > 15 ? fileName.substring(0, 12) + '...' : fileName}
        </p>
        <p className="text-xs text-purple-300">{fileSize} MB</p>
      </motion.div>
      
      {/* Enhanced hover effect with glow */}
      {isHovered && (
        <motion.div 
          className="absolute -inset-4 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 z-[-1]"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            background: ['linear-gradient(90deg, rgba(168,85,247,0.1) 0%, rgba(236,73,153,0.1) 50%, rgba(168,85,247,0.1) 100%)'],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </motion.div>
  );
};

// Animated Confetti component for success celebration
export const Confetti = ({ count = 50 }) => {
  const colors = ['#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const isSquare = Math.random() > 0.5;
        
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ 
              width: size, 
              height: size,
              borderRadius: isSquare ? '2px' : '50%',
              background: color,
              top: '-20px',
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 1, y: 0, rotate: 0 }}
            animate={{
              y: `${Math.random() * 100 + 100}vh`,
              x: `${(Math.random() - 0.5) * 200}px`,
              rotate: Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1),
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              delay: Math.random() * 0.5,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
            }}
          />
        );
      })}
    </div>
  );
};

// Animated pulsing dots for waiting states
export const PulsingDots = ({ count = 3, color = "#a855f7" }) => {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ 
            width: '8px', 
            height: '8px',
            backgroundColor: color
          }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// 3D Floating Document animation
export const FloatingDocument = ({ size = 100 }) => {
  return (
    <motion.div
      className="relative"
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 1, 0, -1, 0],
      }}
      transition={{ 
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Document shadow */}
        <motion.ellipse 
          cx="50" 
          cy="85" 
          rx="25" 
          ry="5" 
          fill="rgba(0,0,0,0.2)"
          animate={{ 
            opacity: [0.2, 0.1, 0.2],
            scaleX: [1, 0.9, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Back document */}
        <motion.rect 
          x="27" 
          y="15" 
          width="50" 
          height="65" 
          rx="3" 
          fill="#a855f7" 
          fillOpacity="0.2"
          animate={{
            y: [15, 12, 15],
            rotate: [0, -0.5, 0],
          }}
          style={{ transformOrigin: "center" }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Front document */}
        <motion.rect 
          x="30" 
          y="20" 
          width="50" 
          height="65" 
          rx="3" 
          fill="#f3f4f6"
          animate={{
            y: [20, 15, 20],
            rotate: [0, 1, 0],
          }}
          style={{ transformOrigin: "center" }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Document lines */}
        <motion.g
          animate={{
            y: [0, -5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <rect 
              key={i}
              x="38" 
              y={30 + i * 10} 
              width={35 - (i % 3) * 5}
              height="3" 
              rx="1.5"
              fill="#d1d5db"
            />
          ))}
        </motion.g>
        
        {/* Scanning effect */}
        <motion.rect
          x="30"
          y="20"
          width="50"
          height="65"
          fill="url(#scanGradient)"
          fillOpacity="0.3"
          animate={{
            y: [20, 85, 20]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
        
        {/* Define gradient */}
        <defs>
          <linearGradient id="scanGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="0.5" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

// Enhanced Wave Background with multiple layers
export const EnhancedWaveBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-[-1]">
      {/* First wave layer */}
      <svg 
        className="absolute bottom-0 left-0 w-full" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <motion.path 
          fill="rgba(168, 85, 247, 0.05)" 
          fillOpacity="1"
          d="M0,224L48,192C96,160,192,96,288,96C384,96,480,160,576,181.3C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          animate={{
            d: [
              "M0,224L48,192C96,160,192,96,288,96C384,96,480,160,576,181.3C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,224C672,224,768,192,864,192C960,192,1056,224,1152,229.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,224L48,192C96,160,192,96,288,96C384,96,480,160,576,181.3C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut"
          }}
        />
      </svg>

      {/* Second wave layer */}
      <svg 
        className="absolute bottom-0 left-0 w-full" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <motion.path 
          fill="rgba(219, 39, 119, 0.05)" 
          fillOpacity="1"
          d="M0,64L48,96C96,128,192,192,288,202.7C384,213,480,171,576,160C672,149,768,171,864,165.3C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          animate={{
            d: [
              "M0,64L48,96C96,128,192,192,288,202.7C384,213,480,171,576,160C672,149,768,171,864,165.3C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,128L48,133.3C96,139,192,149,288,138.7C384,128,480,96,576,90.7C672,85,768,107,864,122.7C960,139,1056,149,1152,138.7C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,64L48,96C96,128,192,192,288,202.7C384,213,480,171,576,160C672,149,768,171,864,165.3C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </svg>

      {/* Third wave layer - smallest and fastest */}
      <svg 
        className="absolute bottom-0 left-0 w-full" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <motion.path 
          fill="rgba(139, 92, 246, 0.05)" 
          fillOpacity="1"
          d="M0,160L40,165.3C80,171,160,181,240,181.3C320,181,400,171,480,149.3C560,128,640,96,720,90.7C800,85,880,107,960,128C1040,149,1120,171,1200,170.7C1280,171,1360,149,1400,138.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          animate={{
            d: [
              "M0,160L40,165.3C80,171,160,181,240,181.3C320,181,400,171,480,149.3C560,128,640,96,720,90.7C800,85,880,107,960,128C1040,149,1120,171,1200,170.7C1280,171,1360,149,1400,138.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z",
              "M0,160L40,170.7C80,181,160,203,240,208C320,213,400,203,480,181.3C560,160,640,128,720,138.7C800,149,880,203,960,208C1040,213,1120,171,1200,144C1280,117,1360,107,1400,101.3L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z",
              "M0,160L40,165.3C80,171,160,181,240,181.3C320,181,400,171,480,149.3C560,128,640,96,720,90.7C800,85,880,107,960,128C1040,149,1120,171,1200,170.7C1280,171,1360,149,1400,138.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            ]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </svg>
    </div>
  );
};

// Animated particles grid background
export const ParticlesGrid = ({ columns = 10, rows = 10 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden z-[-1]">
      <div className="relative h-full w-full">
        {Array.from({ length: columns * rows }).map((_, i) => {
          const col = i % columns;
          const row = Math.floor(i / columns);
          const xPos = `${(col / (columns - 1)) * 100}%`;
          const yPos = `${(row / (rows - 1)) * 100}%`;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-500"
              style={{
                width: "4px",
                height: "4px",
                left: xPos,
                top: yPos,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// Server processing animation 
export const ServerProcessingAnimation = ({ size = 64 }) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Server */}
        <motion.rect
          x="12"
          y="10"
          width="40"
          height="44"
          rx="3"
          fill="#1f2937"
          animate={{ y: [10, 12, 10] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Server lines */}
        <motion.g 
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="16" y="16" width="32" height="2" rx="1" fill="#4b5563" />
          <rect x="16" y="22" width="32" height="2" rx="1" fill="#4b5563" />
          <rect x="16" y="28" width="20" height="2" rx="1" fill="#4b5563" />
        </motion.g>
        
        {/* Lights */}
        <motion.circle
          cx="20"
          cy="40"
          r="3"
          fill="#10b981"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.circle
          cx="30"
          cy="40"
          r="3"
          fill="#a855f7"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        
        {/* Data transfer animation */}
        <motion.path
          d="M52 20C55.3137 20 58 22.6863 58 26C58 29.3137 55.3137 32 52 32"
          stroke="#a855f7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="10"
          animate={{ 
            strokeDashoffset: [0, 20],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ 
            strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.path
          d="M52 36C55.3137 36 58 33.3137 58 30C58 26.6863 55.3137 24 52 24"
          stroke="#ec4899"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="10"
          animate={{ 
            strokeDashoffset: [0, -20],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ 
            strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }}
        />
        
        {/* Processing circles */}
        <motion.circle
          cx="52"
          cy="20"
          r="4"
          stroke="#a855f7"
          strokeWidth="2"
          fill="none"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.circle
          cx="52"
          cy="40"
          r="4"
          stroke="#ec4899"
          strokeWidth="2"
          fill="none"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>
    </motion.div>
  );
};