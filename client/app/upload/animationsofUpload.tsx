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