"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ResumeViewerPage() {
  const params = useParams();
  const router = useRouter();
  const resumeId = params?.id;
  
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState<{
    url: string;
    fileName: string;
    fileType: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        if (!resumeId) {
          setError("Resume ID not provided");
          setIsLoading(false);
          return;
        }

        const response = await fetch(`/api/resume/${resumeId}`);
        
        if (!response.ok) {
          let errorText = "Failed to fetch resume";
          try {
            const errorData = await response.json();
            errorText = errorData.error || errorText;
          } catch (e) {
            // If response is not JSON, use status text
            errorText = response.statusText || errorText;
          }
          throw new Error(errorText);
        }

        // Get file information from headers
        const contentType = response.headers.get("Content-Type") || "";
        const contentDisposition = response.headers.get("Content-Disposition") || "";
        
        // Extract filename from Content-Disposition if available
        let fileName = "resume";
        const fileNameMatch = contentDisposition.match(/filename="(.+?)"/);
        if (fileNameMatch && fileNameMatch[1]) {
          fileName = fileNameMatch[1];
        }

        // Create object URL for the blob
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        setResumeData({
          url,
          fileName,
          fileType: contentType,
        });
        
        // Simulate a brief loading time for smoother UX
        setTimeout(() => setIsLoading(false), 500);
      } catch (err: any) {
        console.error("Error fetching resume:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchResume();

    // Cleanup function to revoke object URL
    return () => {
      if (resumeData?.url) {
        URL.revokeObjectURL(resumeData.url);
      }
    };
  }, [resumeId]);

  // Animation variants
  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const renderContent = () => {
    if (error) {
      return (
        <motion.div 
          className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 text-center max-w-2xl mx-auto mt-10"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <svg className="w-16 h-16 text-red-500/80 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-semibold mb-2 text-white">Error Loading Resume</h2>
          <p className="text-white/80">{error}</p>
          <button 
            onClick={() => router.back()}
            className="mt-6 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md text-white transition-colors"
          >
            Go Back
          </button>
        </motion.div>
      );
    }

    if (!resumeData) {
      return null;
    }

    // For PDF files
    if (resumeData.fileType.includes("application/pdf")) {
      return (
        <motion.div 
          className="w-full h-[85vh] bg-white rounded-lg shadow-2xl overflow-hidden"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <object
            data={resumeData.url}
            type="application/pdf"
            className="w-full h-full"
          >
            <p className="p-4">
              Your browser doesn't support embedded PDFs.{" "}
              <a href={resumeData.url} download={resumeData.fileName} className="text-blue-500 underline">
                Download instead
              </a>
            </p>
          </object>
        </motion.div>
      );
    }

    // For Word documents
    if (
      resumeData.fileType.includes("application/msword") ||
      resumeData.fileType.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      return (
        <motion.div 
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 text-center max-w-md mx-auto"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <svg className="w-20 h-20 text-blue-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-xl font-medium mb-2">{resumeData.fileName}</h2>
          <p className="text-white/70 mb-6">This Word document requires Microsoft Word or similar software to view.</p>
          <a
            href={resumeData.url}
            download={resumeData.fileName}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 rounded-md text-white font-medium inline-flex items-center hover:shadow-lg hover:shadow-blue-500/20 transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Document
          </a>
        </motion.div>
      );
    }

    // Default fallback for other file types
    return (
      <motion.div 
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 text-center max-w-md mx-auto"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h2 className="text-xl font-medium mb-2">{resumeData.fileName}</h2>
        <p className="text-white/70 mb-6">This file type cannot be previewed directly.</p>
        <a
          href={resumeData.url}
          download={resumeData.fileName}
          className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-md text-white font-medium inline-flex items-center hover:shadow-lg hover:shadow-purple-500/20 transition-all"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download File
        </a>
      </motion.div>
    );
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 text-white"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold flex items-center"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18H17V16H7V18Z" fill="currentColor" />
              <path d="M17 14H7V12H17V14Z" fill="currentColor" />
              <path d="M7 10H11V8H7V10Z" fill="currentColor" />
              <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V5C21 3.34315 19.6569 2 18 2H6ZM5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5Z" fill="currentColor" />
            </svg>
            Resume Viewer
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center"
          >
            <button 
              onClick={() => router.back()}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md text-sm flex items-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Back
            </button>
            
            {resumeData && (
              <a
                href={resumeData.url}
                download={resumeData.fileName}
                className="bg-gradient-to-r from-purple-600 to-pink-600 ml-3 px-4 py-2 rounded-md text-sm flex items-center hover:shadow-lg hover:shadow-purple-500/20 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
            )}
          </motion.div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="h-[70vh] flex flex-col items-center justify-center">
            <div className="w-16 h-16 mb-6 relative">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-500/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
            </div>
            <h2 className="text-xl font-medium mb-2">Loading Resume...</h2>
            <p className="text-white/70">Please wait while we prepare your document</p>
          </div>
        ) : (
          renderContent()
        )}
      </main>
      
      {/* Footer */}
      <footer className="mt-auto py-6 bg-black/20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center text-white/50 text-sm">
          &copy; {new Date().getFullYear()} Resume Viewer App. All rights reserved.
        </div>
      </footer>
    </motion.div>
  );
}