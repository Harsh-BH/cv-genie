"use client";

import { useState, useEffect } from 'react';

interface ScrollDetectionProps {
  showDebugInfo?: boolean;
}

const ScrollDetection = ({ showDebugInfo = true }: ScrollDetectionProps) => {
  const [scrollInfo, setScrollInfo] = useState({
    scrollY: 0,
    innerHeight: 0,
    documentHeight: 0,
    scrollPercent: 0,
    hasScroll: false,
  });

  useEffect(() => {
    // Function to update scroll info
    const updateScrollInfo = () => {
      const documentHeight = Math.max(
        document.body.scrollHeight, 
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      const innerHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const scrollPercent = Math.round((scrollY / (documentHeight - innerHeight)) * 100);
      const hasScroll = documentHeight > innerHeight;
      
      setScrollInfo({
        scrollY,
        innerHeight,
        documentHeight,
        scrollPercent: isNaN(scrollPercent) ? 0 : scrollPercent,
        hasScroll
      });
    };

    // Initialize
    updateScrollInfo();
    
    // Add event listeners for scroll and resize
    window.addEventListener('scroll', updateScrollInfo);
    window.addEventListener('resize', updateScrollInfo);
    
    // Attempt to force overflow if needed
    if (!scrollInfo.hasScroll) {
      document.body.style.minHeight = '200vh';
    }
    
    return () => {
      window.removeEventListener('scroll', updateScrollInfo);
      window.removeEventListener('resize', updateScrollInfo);
    };
  }, []);

  if (!showDebugInfo) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50 font-mono">
      <p>Scroll Y: {scrollInfo.scrollY}px</p>
      <p>Window: {scrollInfo.innerHeight}px</p>
      <p>Document: {scrollInfo.documentHeight}px</p>
      <p>Scroll %: {scrollInfo.scrollPercent}%</p>
      <p>Has Scroll: {scrollInfo.hasScroll ? '✅' : '❌'}</p>
      
      {!scrollInfo.hasScroll && (
        <button 
          className="mt-2 bg-red-600 p-2 rounded w-full"
          onClick={() => {
            document.body.style.minHeight = '200vh';
            document.body.style.overflow = 'auto';
          }}
        >
          Force Scrollable
        </button>
      )}
    </div>
  );
};

export default ScrollDetection;
