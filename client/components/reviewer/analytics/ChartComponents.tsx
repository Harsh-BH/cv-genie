"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

// Custom tooltip for all chart types with animation
export const CustomTooltip = ({ active, payload, label, bgColor = 'hsl(224, 71%, 4%)', textColor = 'white' }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="rounded-md border bg-background p-3 shadow-md backdrop-blur-sm" 
        style={{ backgroundColor: bgColor }}
      >
        <div className="text-sm font-medium text-foreground" style={{ color: textColor }}>
          {label || payload[0].name}
        </div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
          className="h-0.5 bg-gray-400/50 my-1.5"
        />
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm font-semibold flex items-center gap-2"
          style={{ color: textColor }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            {payload[0].value}
            {payload[0].dataKey === 'score' || payload[0].name === 'score' ? '/100' : ''}
          </motion.span>
          {payload[0].dataKey === 'score' && (
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: `${payload[0].value/3}px` }}
              className="h-1 bg-primary rounded-full"
            />
          )}
        </motion.div>
      </motion.div>
    );
  }
  return null;
};

// Score indicator component with color coding and animations
export const ScoreIndicator = ({ score, label, description }: { score: number, label: string, description?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  let color = 'bg-red-500';
  
  if (score >= 80) color = 'bg-green-500';
  else if (score >= 60) color = 'bg-yellow-500';
  else if (score >= 40) color = 'bg-orange-500';

  return (
    <motion.div 
      className="flex flex-col space-y-1.5"
      whileHover={{ scale: 1.01 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
                {description && <InfoIcon className="h-3.5 w-3.5 text-muted-foreground opacity-70" />}
              </div>
            </TooltipTrigger>
            {description && (
              <TooltipContent side="top" className="max-w-[200px] text-xs">
                {description}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        <motion.span 
          className="text-sm font-medium"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        >
          {score}%
        </motion.span>
      </div>
      <Progress value={score} className="h-1.5" indicatorClassName={`${color}`} />
    </motion.div>
  );
};

// Animation configurations for charts
export const CHART_ANIMATIONS = {
  barEnter: {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: "spring", stiffness: 200, damping: 20 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  },
  pulseEffect: {
    animate: { 
      scale: [1, 1.03, 1],
      opacity: [1, 0.85, 1]
    },
    transition: { 
      duration: 2, 
      repeat: Infinity,
      repeatType: "reverse" 
    }
  }
};

// Chart colors for use in all components
export const CHART_COLORS = {
  PIE_COLORS: ['hsl(220, 70%, 50%)', 'hsl(150, 60%, 50%)', 'hsl(30, 80%, 50%)', 'hsl(280, 60%, 50%)', 'hsl(100, 70%, 50%)'],
  SECTION_COLORS: {
    Header: 'hsl(262, 83%, 58%)',
    Summary: 'hsl(262, 70%, 50%)',
    Experience: 'hsl(250, 70%, 60%)',
    Education: 'hsl(240, 60%, 63%)',
    Skills: 'hsl(225, 70%, 60%)'
  },
  ISSUE_COLORS: {
    Grammar: 'hsl(346, 84%, 61%)',
    Format: 'hsl(15, 100%, 55%)', 
    Content: 'hsl(30, 100%, 60%)', 
    ATS: 'hsl(220, 70%, 50%)'
  },
  HOVER_COLORS: {
    Grammar: 'hsl(346, 84%, 70%)',
    Format: 'hsl(15, 100%, 65%)', 
    Content: 'hsl(30, 100%, 70%)', 
    ATS: 'hsl(220, 70%, 60%)'
  }
};

// Custom animated chart components
export const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useRef<NodeJS.Timeout | null>(null);
  
  useState(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const startTime = Date.now();
    
    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setDisplayValue(Math.floor(progress * end));
      
      if (progress === 1) {
        clearInterval(timer);
      }
    }, 20);
    
    return () => clearInterval(timer);
  });
  
  return <span>{displayValue}</span>;
};
