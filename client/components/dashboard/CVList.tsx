"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

interface CV {
  id: number;
  fileName: string;
  updatedAt: string;
  score: number;
}

interface CVListProps {
  cvs: CV[];
  onCVSelect: (cv: CV) => void;
  onCVDelete?: (cv: CV) => void;
}

export default function CVList({ cvs, onCVSelect, onCVDelete }: CVListProps) {
  const [cvToDelete, setCvToDelete] = useState<CV | null>(null);
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formatted = date.toLocaleString();
    return formatted;
  }

  // Format the score as a whole number percentage
  const formatScore = (score: number | null | undefined) => {
    if (score === null || score === undefined) return 70;
    
    // If score is already between 0-100, return it directly
    if (score >= 0 && score <= 100) return Math.round(score);
    
    // If score is a decimal (0-1 range), convert to percentage
    if (score >= 0 && score <= 1) return Math.round(score * 100);
    
    // Default fallback
    return 70;
  };
  
  // Handle delete button click
  const handleDeleteClick = (cv: CV, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    setCvToDelete(cv);
  };
  
  // Handle confirm delete
  const confirmDelete = () => {
    if (cvToDelete && onCVDelete) {
      onCVDelete(cvToDelete);
      setCvToDelete(null);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Your CV Analysis</h2>
        
        <motion.a
          href="/upload"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.9)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Upload New CV
        </motion.a>
      </div>

      {cvs.length === 0 ? (
        <div className="text-center py-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block text-purple-400 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.div>
          <p className="text-gray-400">No CVs analyzed yet. Upload your first CV to get started.</p>
        </div>
      ) : (
        <motion.ul 
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {cvs.map(cv => {
            // Get properly formatted score
            const scoreValue = formatScore(cv.score);
            
            return (
              <motion.li 
                key={cv.id}
                variants={item}
                whileHover={{ scale: 1.01 }}
                onClick={() => onCVSelect(cv)}
                className="p-4 bg-gray-700/40 rounded-lg cursor-pointer border border-gray-700 hover:border-purple-400/30 transition-colors relative group"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-white">{cv.fileName}</h3>
                    <p className="text-sm text-gray-400">Last updated: {formatDate(cv.updatedAt)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Score</p>
                      <p className="font-semibold text-lg text-white">{scoreValue}%</p>
                    </div>
                    
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: `conic-gradient(#8b5cf6 ${scoreValue * 3.6}deg, rgba(139, 92, 246, 0.1) 0deg)`
                      }}
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    >
                      <div className="bg-gray-800 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium">
                        {scoreValue}
                      </div>
                    </motion.div>
                    
                    {/* Delete button */}
                    {onCVDelete && (
                      <motion.button
                        onClick={(e) => handleDeleteClick(cv, e)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="ml-2 p-2 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete CV"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      )}
      
      {/* Delete confirmation modal */}
      <AnimatePresence mode='wait'>
        {cvToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className=" fixed top-0 left-0 rounded-xl inset-0 bg-black/40 backdrop-blur-xs transition z-50 flex items-center justify-center"
            onClick={() => setCvToDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black rounded-xl border-1 border-white/40 shadow-2xl shadow-black/60 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className='w-[100%] h-[100%] rounded-xl bg-white/10 p-6'>
              <h3 className="text-xl font-bold text-white mb-4">Delete CV</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete <span className="text-purple-400 font-semibold">{cvToDelete.fileName}</span>? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                  onClick={() => setCvToDelete(null)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  onClick={confirmDelete}
                >
                  Delete
                </motion.button>
              </div>
              </div>
            </motion.div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}