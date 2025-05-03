'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadIcon,
  SuccessIcon,
  Particles,
  DecorativeSphere,
  FileIcon,
  ProgressBar,
  EnhancedWaveBackground,
  LoadingSpinner,
  ProcessingDocumentAnimation,
  AnimatedChecklist,
  EnhancedFileIcon,
  Confetti,
  PulsingDots,
  FloatingDocument,
  ParticlesGrid,
  ServerProcessingAnimation,
  GradientRing
} from './animationsofUpload';
import { withAuth, validateSession } from '../../utils/authUtils';

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'processing' | 'success'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState('');

  // Check authentication status when component mounts
  useEffect(() => {
    async function checkAuth() {
      try {
        console.log("Checking session validity...");
        const isValid = await validateSession();
        
        if (!isValid) {
          console.log("Authentication required, preparing to redirect...");
          setAuthError('Authentication required. Please log in.');
          
          // Short delay before redirect to show the message
          setTimeout(() => {
            window.location.href = '/login?redirect=/upload';
          }, 2000);
        } else {
          console.log("Authentication valid");
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthError('Error checking authentication status.');
      } finally {
        setIsCheckingAuth(false);
      }
    }
    
    checkAuth();
  }, []);

  // Progress simulation for processing stage
  useEffect(() => {
    if (uploadState === 'processing') {
      // Simulate processing time
      const timeout = setTimeout(() => {
        setUploadState('success');
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [uploadState]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      setFileSize(+(file.size / (1024 * 1024)).toFixed(2)); // Convert to MB
      handleUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSize(+(file.size / (1024 * 1024)).toFixed(2)); // Convert to MB
      handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    setUploadState('uploading');
    setUploadProgress(0);
    setUploadError('');
    
    try {
      // Create FormData object with the file
      const formData = new FormData();
      formData.append('resume', file);
      
      // Create a mock progress update since fetch doesn't provide progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 90 ? 90 : newProgress; // Cap at 90% until actual completion
        });
      }, 300);
      
      // Use our withAuth helper to handle authentication
      const data = await withAuth(async () => {
        const response = await fetch('/api/uploadCv', {
          method: 'POST',
          body: formData,
          credentials: 'include', // This ensures cookies are sent with the request
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }
        
        return await response.json();
      });
      
      clearInterval(progressInterval);
      
      // Set progress to 100% when upload is complete
      setUploadProgress(100);
      
      // Transition to processing state after a short delay
      setTimeout(() => {
        setUploadState('processing');
      }, 500);
      
    } catch (error: any) {
      clearInterval(progressInterval);
      console.error('Error uploading file:', error);
      setUploadError(error instanceof Error ? error.message : 'Unknown error');
      resetUpload();
      
      // If it's an authentication error, show a message and redirect
      if (error instanceof Error && 
          (error.message.includes('Authentication required') || 
           error.message.includes('Unauthorized'))) {
        alert('Your session has expired. You will be redirected to log in again.');
        window.location.href = '/login?redirect=/upload';
      } else {
        // For other errors, just show an alert
        alert(`Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

  const resetUpload = () => {
    setUploadState('idle');
    setUploadProgress(0);
    setFileName('');
    setFileSize(0);
    setUploadError('');
  };

  // Requirements for upload checklist
  const uploadRequirements = [
    { text: "PDF file format", fulfilled: fileName.endsWith('.pdf') },
    { text: "File size under 5MB", fulfilled: fileSize > 0 && fileSize < 5 },
    { text: "Contains resume content", fulfilled: uploadState === 'success' },
    { text: "Text is extractable", fulfilled: uploadState === 'success' }
  ];

  return (
    <div className="relative min-h-screen w-full bg-gray-900 text-white flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Show loading indicator while checking authentication */}
      {isCheckingAuth ? (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-gray-900/80 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <LoadingSpinner size={48} />
            <p className="mt-4 text-xl">Verifying your session...</p>
          </div>
        </div>
      ) : authError ? (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-gray-900/80 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-xl border border-red-500/30 max-w-md text-center">
            <p className="text-red-400 text-lg mb-3">{authError}</p>
            <p className="text-gray-300 mb-5">Redirecting to login page...</p>
            <div className="flex justify-center">
              <LoadingSpinner size={32} />
            </div>
          </div>
        </div>
      ) : null}
      
      {/* Animated background elements */}
      <ParticlesGrid columns={20} rows={20} />
      <EnhancedWaveBackground />

      {/* Decorative elements */}
      <GradientRing size={500} position={{ top: '-15%', right: '-10%' }} delay={0.2} />
      <GradientRing size={400} position={{ bottom: '-10%', left: '-10%' }} delay={0.3} />
      <DecorativeSphere size={60} color="#8b5cf6" position={{ top: '15%', right: '15%' }} delay={0.4} />
      <DecorativeSphere size={40} color="#ec4899" position={{ bottom: '20%', right: '25%' }} delay={0.5} />
      <DecorativeSphere size={50} color="#3b82f6" position={{ top: '25%', left: '15%' }} delay={0.6} />

      {/* Main content container */}
      <motion.div 
        className="relative z-10 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {uploadState === 'idle' ? 'Upload Your Resume' : 
             uploadState === 'success' ? 'Upload Successful!' :
             'Processing Your Resume'}
          </motion.h1>
          <motion.p 
            className="mt-4 text-lg text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {uploadState === 'idle' ? 'Drag & drop your resume file or click to browse' : 
             uploadState === 'uploading' ? 'Uploading your file...' : 
             uploadState === 'processing' ? 'Analyzing your resume content...' :
             'Your resume has been successfully uploaded!'}
          </motion.p>
        </div>

        {/* Upload container with different states */}
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* Left side - Upload area or status */}
          <motion.div 
            className="flex-1 w-full max-w-xl"
            layout
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {uploadState === 'idle' ? (
              <div 
                className={`relative h-64 w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-all ease-in-out duration-300 ${
                  dragActive ? 'border-purple-400 bg-purple-500/10' : 'border-gray-600 hover:border-purple-500/50 hover:bg-gray-800/30'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  id="resume-upload" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
                
                <label 
                  htmlFor="resume-upload"
                  className="w-full h-full absolute inset-0 cursor-pointer z-10"
                > 
                  <span className="sr-only">Upload resume</span>
                </label>
                
                <div className="pointer-events-none flex flex-col items-center justify-center gap-4">
                  <UploadIcon />
                  <div className="text-center">
                    <p className="text-gray-300 mb-2">Drop your resume file here or<br/>
                      <span className="text-purple-400">click to browse</span>
                    </p>
                    <p className="text-gray-500 text-sm">Supports PDF, DOC, DOCX (Max 5MB)</p>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div 
                className="bg-gray-800/60 backdrop-blur-sm w-full p-8 rounded-xl border border-purple-500/20 shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col items-center">
                  {uploadState === 'uploading' && (
                    <>
                      <div className="mb-6 relative">
                        <LoadingSpinner size={64} />
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                        >
                          <p className="text-xl font-bold">{Math.round(uploadProgress)}%</p>
                        </motion.div>
                      </div>
                      <div className="w-full max-w-md mb-6">
                        <ProgressBar progress={uploadProgress} />
                      </div>
                      {fileName && (
                        <div className="flex items-center gap-4 mt-4">
                          <EnhancedFileIcon fileName={fileName} fileSize={fileSize} />
                        </div>
                      )}
                    </>
                  )}

                  {uploadState === 'processing' && (
                    <div className="flex flex-col items-center gap-6">
                      <ProcessingDocumentAnimation size={120} />
                      <div className="flex items-center gap-2 text-purple-300">
                        <span>Processing</span>
                        <PulsingDots />
                      </div>
                      <div className="mt-2">
                        <ServerProcessingAnimation />
                      </div>
                    </div>
                  )}

                  {uploadState === 'success' && (
                    <>
                      <div className="mb-6 relative">
                        <SuccessIcon />
                        <Particles />
                        <Confetti count={30} />
                      </div>
                      <motion.div 
                        className="flex flex-col items-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="text-xl font-semibold text-green-400">Resume Uploaded Successfully</p>
                        {fileName && (
                          <div className="flex items-center gap-4 mt-2">
                            <EnhancedFileIcon fileName={fileName} fileSize={fileSize} />
                          </div>
                        )}
                        <motion.button
                          className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={resetUpload}
                        >
                          Upload Another File
                        </motion.button>
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right side - Info and file display */}
          <motion.div 
            className="flex-1 w-full max-w-md"
            layout
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {uploadState === 'idle' && (
                  <motion.div
                    key="requirements"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6"
                  >
                    <AnimatedChecklist items={uploadRequirements} />
                    
                    <div className="flex justify-center">
                      <FloatingDocument size={140} />
                    </div>
                  </motion.div>
                )}
                
                {uploadState !== 'idle' && (
                  <motion.div
                    key="upload-info"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
                      <h3 className="text-lg font-medium mb-4 text-purple-300">Resume Processing</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full flex-shrink-0 ${uploadProgress > 0 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                          <div className="flex-1">
                            <p className="font-medium">File Upload</p>
                            <p className="text-sm text-gray-400">Transferring your file to our servers</p>
                          </div>
                          {uploadProgress === 100 && <span className="text-green-500">✓</span>}
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full flex-shrink-0 ${uploadState === 'processing' || uploadState === 'success' ? 'bg-purple-500' : 'bg-gray-600'}`}></div>
                          <div className="flex-1">
                            <p className="font-medium">Content Extraction</p>
                            <p className="text-sm text-gray-400">Reading and parsing your resume data</p>
                          </div>
                          {uploadState === 'success' && <span className="text-green-500">✓</span>}
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full flex-shrink-0 ${uploadState === 'success' ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                          <div className="flex-1">
                            <p className="font-medium">Analysis Complete</p>
                            <p className="text-sm text-gray-400">Your resume is ready for review</p>
                          </div>
                          {uploadState === 'success' && <span className="text-green-500">✓</span>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        
        {/* Additional information and tips */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {['PDF format preferred', 'Max file size: 5MB', 'Personal info will be protected'].map((tip, i) => (
            <motion.div 
              key={i} 
              className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700"
              whileHover={{ scale: 1.02, borderColor: 'rgba(168, 85, 247, 0.4)' }}
            >
              <p className="text-center text-gray-300 text-sm">{tip}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}