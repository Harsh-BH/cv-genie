'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast = ({ id, message, type, duration = 5000, onClose }: ToastProps) => {
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) return 0;
        return prev - (100 / (duration / 100));
      });
    }, 100);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration, id, onClose]);
  
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-gradient-to-r from-green-500 to-green-600',
          icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ),
          progressColor: 'bg-green-300'
        };
      case 'error':
        return {
          bgColor: 'bg-gradient-to-r from-red-500 to-red-600',
          icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ),
          progressColor: 'bg-red-300'
        };
      case 'warning':
        return {
          bgColor: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
          icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          ),
          progressColor: 'bg-yellow-300'
        };
      default:
        return {
          bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
          icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          ),
          progressColor: 'bg-blue-300'
        };
    }
  };
  
  const { bgColor, icon, progressColor } = getToastStyles();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`flex items-center p-4 mb-3 rounded-lg shadow-lg backdrop-blur-sm ${bgColor} min-w-[300px] max-w-md relative overflow-hidden`}
    >
      <div className="mr-3">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-white font-medium">{message}</p>
      </div>
      <button 
        onClick={() => onClose(id)} 
        className="ml-3 text-white opacity-70 hover:opacity-100 transition-opacity"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/10">
        <div 
          className={`h-full ${progressColor}`} 
          style={{ width: `${progress}%` }} 
        />
      </div>
    </motion.div>
  );
};
