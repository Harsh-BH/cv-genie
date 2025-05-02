'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (f: File) => {
    setFile(f);
    setSuccess(false);
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
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("userId", "123"); // Replace with actual user ID

      const res = await axios.post("/api/uploadCv", formData);
      console.log("Upload success:", res.data);
      setSuccess(true);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* 🔮 Enhanced Background with Animations */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-purple-800 opacity-30 blur-3xl rounded-full"
          animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-pink-700 opacity-30 blur-2xl rounded-full"
          animate={{ x: [-30, 30, -30], y: [30, -30, 30] }}
          transition={{ duration: 12, repeat: Infinity }}
          style={{ bottom: "20%", right: "20%" }}
        />
        <motion.div
          className="absolute w-72 h-72 bg-blue-900 opacity-30 blur-2xl rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* 📝 Title */}
      <motion.h1
        className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 mb-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Upload Your CV
      </motion.h1>

      {/* 📄 Description */}
      <motion.p
        className="text-purple-200 text-lg mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Drag and drop your resume here, or click to select a file.
      </motion.p>

      {/* 📂 Upload Box with Animation */}
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

      {/* 🚀 Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="mt-8 px-8 py-3 text-lg rounded-xl transition hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30 font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-40"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {/* ✅ Success */}
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