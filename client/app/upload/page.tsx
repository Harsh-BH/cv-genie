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
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!validTypes.includes(f.type)) {
      toast.error('Invalid file type. Please upload a PDF or Word document.');
      return;
    }
    const maxSize = 5 * 1024 * 1024; // 5MB
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
  
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to upload your CV');
      return;
    }
  
    setUploading(true);
    setUploadProgress(0);
  
    const formData = new FormData();
    formData.append("resume", file);
  
    try {
      const response = await axios.post("/api/uploadCv", formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: any) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress > 95 ? 95 : progress); // Cap at 95% until server confirms
          }
        },
      });
  
      if (response.data.success) {
        setUploadProgress(100);
        setTimeout(() => {
          setSuccess(true);
          setShowParticles(true);
          toast.success('CV uploaded successfully!');
          setTimeout(() => setShowParticles(false), 2000);
        }, 500);
      } else {
        throw new Error(response.data.error || 'Failed to upload CV.');
      }
  
    } catch (err) {
      let errorMessage = 'Failed to upload CV. Please try again.';
      if (axios.isAxiosError(err)) {
        if (err.response) {
          switch (err.response.status) {
            case 400:
              errorMessage = err.response.data.error || 'Invalid request';
              break;
            case 401:
              errorMessage = 'Please log in to upload your CV';
              break;
            case 413:
              errorMessage = 'File is too large for the server to process';
              break;
            case 415:
              errorMessage = 'File format is not supported';
              break;
            case 429:
              errorMessage = 'Too many upload attempts. Please try again later';
              break;
            default:
              errorMessage = err.response.data?.error || 'Server error occurred';
          }
        } else if (err.request) {
          errorMessage = 'Network error. Please check your connection';
        }
      }
      toast.error(errorMessage);
      setUploadProgress(0);
    } finally {
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

        iteration += 1 / 3;
      }, 30);
    } else {
      setDisplayText("Upload Your CV");
    }

    return () => clearInterval(interval);
  }, [success]);

  return (
    <div className="relative min-h-screen bg-gradient-to-bl from-black via-gray-900 to-purple-950 text-white flex flex-col items-center justify-center px-4 overflow-hidden">
      <ToastContainer />
      <WaveBackground />
      <DecorativeSphere />
      <GradientRing />
      <AnimatePresence>{showParticles && <Particles />}</AnimatePresence>
      <motion.h1
        className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 mb-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {displayText}
      </motion.h1>
      <motion.p
        className="text-purple-200 text-lg mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Drag and drop your resume here, or click to select a file.
      </motion.p>
      <motion.div
        className={`w-full max-w-2xl h-64 p-6 flex items-center justify-center text-center cursor-pointer border-4 border-dashed rounded-3xl transition-all ${
          dragOver ? "border-pink-500 bg-pink-900/10" : "border-purple-500"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput")?.click()}
        whileHover={{ scale: 1.02 }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <input
          id="fileInput"
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
        />
        <motion.p
          className="text-white text-xl font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {file ? `Selected: ${file.name}` : "Click or drag file here"}
        </motion.p>
      </motion.div>
      <div className="w-full max-w-2xl mt-4">
        <div className="h-2 rounded bg-gray-800 overflow-hidden">
          <motion.div
            className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${uploadProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="mt-8 px-8 py-3 text-lg rounded-xl transition hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30 font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-40"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {success && (
        <motion.p
          className="mt-4 text-green-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Upload successful!
        </motion.p>
      )}
    </div>
  );
}