'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  UploadIcon, 
  SuccessIcon, 
  Particles, 
  DecorativeSphere, 
  FileIcon, 
  WaveBackground,
  GradientRing 
} from "./animationsofUpload";
import { ToastContainer, toast } from "@/components/ui/ToastContainer";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const handleFileChange = (f: File) => {
    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(f.type)) {
      toast.error('Invalid file type. Please upload a PDF or Word document.');
      return;
    }
    
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (f.size > maxSize) {
      toast.error('File is too large. Maximum size is 5MB.');
      return;
    }

    setFile(f);
    setSuccess(false);
    setUploadProgress(0);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        const next = prev + Math.random() * 15;
        return next > 95 ? 95 : next;
      });
    }, 300);
    
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("userId", "123"); // Replace with actual user ID

      const res = await axios.post("/api/uploadCv", formData);
      console.log("Upload success:", res.data);
      
      // Complete the progress
      setUploadProgress(100);
      setTimeout(() => {
        setSuccess(true);
        setShowParticles(true);
        toast.success('CV uploaded successfully!');
        setTimeout(() => setShowParticles(false), 2000);
      }, 500);
    } catch (err) {
      console.error("Upload failed", err);
      let errorMessage = 'Failed to upload CV. Please try again.';
      
      if (axios.isAxiosError(err)) {
        // Handle specific error status codes
        if (err.response) {
          switch (err.response.status) {
            case 413:
              errorMessage = 'File is too large for the server to process.';
              break;
            case 415:
              errorMessage = 'File format is not supported.';
              break;
            case 401:
              errorMessage = 'Please log in to upload your CV.';
              break;
            case 429:
              errorMessage = 'Too many upload attempts. Please try again later.';
              break;
            default:
              if (err.response.data?.message) {
                errorMessage = err.response.data.message;
              }
          }
        } else if (err.request) {
          errorMessage = 'Network error. Please check your connection.';
        }
      }
      
      toast.error(errorMessage);
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => setUploading(false), 500);
    }
  };

  // Text scramble effect for title
  const [displayText, setDisplayText] = useState("Upload Your CV");
  
  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;
    
    if (success) {
      const originalText = "Success!";
      const scrambleText = "Upload Your CV";
      
      interval = setInterval(() => {
        if (iteration >= scrambleText.length) {
          clearInterval(interval);
          setDisplayText(originalText);
          return;
        }
        
        setDisplayText(prev => {
          const newText = prev
            .split("")
            .map((char, idx) => {
              if (idx < iteration) return originalText[idx];
              return String.fromCharCode(65 + Math.floor(Math.random() * 26));
            })
            .join("");
          return newText;
        });
        
        iteration += 1/3;
      }, 30);
    } else {
      setDisplayText("Upload Your CV");
    }
    
    return () => clearInterval(interval);
  }, [success]);

  return (
    <div className="relative min-h-screen bg-gradient-to-bl from-black via-gray-900 to-purple-950 text-white flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Add ToastContainer */}
      <ToastContainer />
      
      {/* Enhanced Background with Dynamic Animations */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <motion.div
          className="absolute w-[400px] h-[400px] bg-purple-800 opacity-20 blur-3xl rounded-full"
          animate={{ 
            x: [0, 50, -50, 0], 
            y: [0, -50, 50, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] bg-pink-700 opacity-20 blur-3xl rounded-full"
          animate={{ 
            x: [-30, 30, -30], 
            y: [30, -30, 30],
            scale: [1.2, 0.9, 1.2]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "15%", right: "15%" }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] bg-blue-900 opacity-20 blur-3xl rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        
        {/* Add animated decorative elements */}
        <WaveBackground />
        <GradientRing size={400} position={{ top: '-50px', right: '-100px' }} delay={0.2} />
        <GradientRing size={300} position={{ bottom: '-50px', left: '-100px' }} delay={0.5} />
        
        <DecorativeSphere size={30} color="#a855f7" position={{ top: '20%', right: '20%' }} delay={0.3} />
        <DecorativeSphere size={20} color="#ec4899" position={{ top: '30%', left: '25%' }} delay={0.6} />
        <DecorativeSphere size={25} color="#8b5cf6" position={{ bottom: '25%', right: '30%' }} delay={0.9} />
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_80%)]" />
        
        {/* Grid overlay for cyberpunk effect */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzYxNjE2MSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-30" />
      </div>

      {/* Title with scramble effect */}
      <motion.h1
        className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 mb-4 relative"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {displayText.split('').map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="inline-block"
            whileHover={{ 
              y: -5,
              color: "#f0abfc",
              transition: { duration: 0.2 }
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
        <motion.span
          className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.6 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-purple-200 text-lg mb-10 max-w-lg text-center leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Drag and drop your resume file or click to select. We support PDF, DOC, and DOCX formats.
      </motion.p>

      {/* Enhanced Upload Box with Animation */}
      <motion.div
        className={`w-full max-w-2xl h-72 p-6 flex flex-col items-center justify-center text-center cursor-pointer border-3 border-dashed rounded-3xl transition-all backdrop-blur-sm bg-gradient-to-b from-purple-900/10 to-pink-900/10 ${
          dragOver ? "border-pink-500 shadow-lg shadow-pink-500/20" : "border-purple-500/70"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput")?.click()}
        whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(219, 39, 119, 0.2)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <input
          id="fileInput"
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
        />
        
        <AnimatePresence mode="wait">
          {file ? (
            <motion.div
              key="fileSelected"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <FileIcon 
                fileName={file.name} 
                fileSize={(file.size / 1024 / 1024).toFixed(2)} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="uploadPrompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <UploadIcon />
              <motion.p
                className="text-white text-xl font-medium mt-4 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Drop your resume file here
              </motion.p>
              <motion.p
                className="text-purple-300 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Or click to browse files
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Progress bar (visible during upload) */}
      <AnimatePresence>
        {uploading && (
          <motion.div 
            className="w-full max-w-2xl mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex justify-between text-sm text-purple-300 mb-1">
              <span>Uploading...</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${uploadProgress}%` }}
                initial={{ width: "0%" }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ type: "spring", damping: 30, stiffness: 100 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Button with improved animation */}
      <motion.button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`mt-8 px-12 py-4 text-lg rounded-xl font-bold relative overflow-hidden ${
          !file || uploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        whileHover={!uploading && file ? { scale: 1.05 } : {}}
        whileTap={!uploading && file ? { scale: 0.98 } : {}}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
        <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 hover:opacity-100 transition-opacity" />
        {uploading && (
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            style={{ filter: 'brightness(1.2)' }}
          />
        )}
        <span className="relative z-10 flex items-center justify-center">
          {uploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Uploading...</span>
            </>
          ) : "Upload Resume"}
        </span>
      </motion.button>

      {/* Success Animation */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="mt-8 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <SuccessIcon />
            <motion.p
              className="mt-2 text-green-400 text-lg font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Upload successful!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particles for success animation */}
      {showParticles && <Particles count={40} />}
    </div>
  );
}