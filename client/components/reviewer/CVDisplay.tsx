"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CVDisplayProps {
  resumeId: string;
  activeHighlight: string | null;
  activeElement: {
    id: string;
    bounds: { x: number; y: number; width: number; height: number } | null;
  } | null;
}

export default function CVDisplay({ resumeId, activeHighlight, activeElement }: CVDisplayProps) {
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [isImage, setIsImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch resume directly from API
  useEffect(() => {
    async function fetchResume() {
      if (!resumeId) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/resume/${resumeId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch resume');
        }
        
        // Check content type
        const contentType = response.headers.get('Content-Type') || '';
        setIsImage(contentType.startsWith('image/'));
        
        // Get file data as blob
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setCvUrl(url);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching resume:', err);
        setError(err.message || 'Failed to load CV');
      } finally {
        setLoading(false);
      }
    }

    fetchResume();

    // Clean up blob URL on unmount
    return () => {
      if (cvUrl) {
        URL.revokeObjectURL(cvUrl);
      }
    };
  }, [resumeId]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white/5 backdrop-blur-lg rounded-xl"
      >
        <div className="flex flex-col items-center justify-center h-full">
          <svg className="animate-spin h-10 w-10 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-white/80 text-sm">Loading your CV...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white/5 backdrop-blur-lg rounded-xl"
      >
        <div className="bg-red-500/20 border border-red-500/50 text-white p-6 rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">Error Loading CV</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white/5 backdrop-blur-lg rounded-xl"
    >
      <div className="relative w-full h-full">
        {/* PDF/Image viewer container */}
        <div className="w-full h-full overflow-auto p-6">
          <div className="relative mx-auto bg-white rounded-lg shadow-2xl" style={{ maxWidth: "700px" }}>
            {cvUrl && isImage ? (
              // For image files
              <div className="relative">
                <Image
                  src={cvUrl}
                  alt="CV Document"
                  width={700}
                  height={900}
                  className="w-full h-auto object-contain"
                  style={{ transform: `scale(${scale})` }}
                />
                
                {/* Highlight overlay for images */}
                {activeElement && activeElement.bounds && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bg-yellow-300/30 border-2 border-yellow-400 rounded-md pointer-events-none"
                    style={{
                      left: activeElement.bounds.x,
                      top: activeElement.bounds.y,
                      width: activeElement.bounds.width,
                      height: activeElement.bounds.height
                    }}
                  />
                )}
              </div>
            ) : (
              // For PDF files
              <iframe
                src={cvUrl || ''}
                className="w-full h-[80vh]"
                title="CV Preview"
                style={{ transform: `scale(${scale})`, transformOrigin: 'center top' }}
              />
            )}
          </div>
        </div>
        
        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md rounded-full p-2 flex space-x-2">
          <button
            onClick={() => setScale(scale + 0.1)}
            className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          <button
            onClick={() => setScale(1)}
            className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
            </svg>
          </button>
          <button
            onClick={() => setScale(Math.max(0.5, scale - 0.1))}
            className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}