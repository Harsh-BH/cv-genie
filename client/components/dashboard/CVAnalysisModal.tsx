"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../../styles/cv-analysis-modal.css"; 

interface CV {
  id: number;
  fileName: string;
  updatedAt: string;
  score: number;
}

export type AnalysisData = {
  executiveSummary: string;
  overview: string;
  contentQuality: string;
  atsCompatibility: string;
  industryFit: string;
  formattingReview: string;
  skillsAnalysis: string;
  careerTrajectory: string;
  improvementSuggestions: string;
  overallScore: number;
  contentScore: number;
  atsOptimizationScore: number;
  industryAlignmentScore: number;
  formattingScore: number;
  skillsScore: number;
  status: string;
  aiGeneratedImprovements?: {
    summary: string[];
    experience: any[];
    skills: string[];
    education: any[];
    projects: any[];
  };
  positionedSuggestions?: any[];
}

interface CVAnalysisModalProps {
  cv: CV | null;
  isOpen: boolean;
  onClose: () => void;
  analysisData: AnalysisData | null;
  isLoading: boolean;
}

export default function CVAnalysisModal({ cv, isOpen, onClose, analysisData, isLoading }: CVAnalysisModalProps) {

  const formatText = (text: string) => {
    if (!text) return [];
    
    // First, replace markdown code blocks with proper HTML
    let processedText = text.replace(/```([\s\S]*?)```/g, (match, codeContent) => {
      return `<pre><code>${codeContent.trim()}</code></pre>`;
    });
    
    // Handle headers with # notation
    processedText = processedText.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>');
    processedText = processedText.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>');
    processedText = processedText.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');
    
    // Handle bold text
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle list items
    processedText = processedText.replace(/^-\s+(.*)$/gm, '<li>$1</li>');
    
    // Wrap list items in ul tags
    processedText = processedText.replace(/<li>[\s\S]*?<\/li>(\s*<li>[\s\S]*?<\/li>)*/g, (match) => {
      return `<ul>${match}</ul>`;
    });
    
    // Replace newlines with proper paragraph tags
    const paragraphs = processedText
      .split(/\n\s*\n/)
      .filter(p => p.trim() !== '')
      .map(p => {
        // Don't wrap content that's already wrapped in HTML tags
        if (p.startsWith('<') && p.endsWith('>')) {
          return p;
        }
        
        // Don't wrap list items in paragraphs
        if (p.includes('<li>')) {
          return p;
        }
        
        // Don't wrap headings in paragraphs
        if (p.includes('<h1>') || p.includes('<h2>') || p.includes('<h3>')) {
          return p;
        }
        
        // Convert single newlines to <br> within paragraphs
        const content = p.replace(/\n/g, '<br>');
        
        return `<p>${content}</p>`;
      });
    
    return [{ 
      type: 'formatted-html', 
      content: paragraphs.join('\n') 
    }];
  };

  // Extract strengths and weaknesses from overview
  const extractStrengthsAndWeaknesses = () => {
    if (!analysisData?.overview) return { strengths: [], weaknesses: [] };
    
    const overview = analysisData.overview;
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    
    // Simple regex-based extraction (could be improved)
    const strengthsMatch = overview.match(/strengths[:\s]+([\s\S]*?)(?=weaknesses|\n\s*\n|$)/i);
    const weaknessesMatch = overview.match(/weaknesses[:\s]+([\s\S]*?)(?=strengths|\n\s*\n|$)/i);
    
    if (strengthsMatch && strengthsMatch[1]) {
      strengths.push(...strengthsMatch[1].split(/[-•*]\s*/).filter(item => item.trim().length > 0));
    }
    
    if (weaknessesMatch && weaknessesMatch[1]) {
      weaknesses.push(...weaknessesMatch[1].split(/[-•*]\s*/).filter(item => item.trim().length > 0));
    }
    
    // Fallback if regex doesn't match
    if (strengths.length === 0) strengths.push("Clear structure", "Professional format");
    if (weaknesses.length === 0) weaknesses.push("Consider adding more achievements", "Quantify your impact");
    
    return { strengths, weaknesses };
  };

  // Function to safely get and format scores
  const getFormattedScore = (score: number | null | undefined) => {
    if (score === null || score === undefined) return 0;
    
    // If score is already between 0-100, return it directly
    if (score >= 0 && score <= 100) return Math.round(score);
    
    // If score is a decimal (0-1 range), convert to percentage
    if (score >= 0 && score <= 1) return Math.round(score * 100);
    
    // Default fallback
    return 0;
  };

  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 cv-analysis-modal custom-scroll">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            className="cv-analysis-modal-content max-h-[80vh] rounded-xl shadow-2xl w-full max-w-4xl relative z-10 overflow-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="modal-header p-6 flex justify-between">
              <div className="flex flex-col gap-0 mt-auto">
                
                <h2 className="text-4xl font-bold text-gradient mt-auto">{cv?.fileName}</h2>
                <p className="text-sm font-base text-gray-400">Short Summary</p>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 absolute top-2 right-2 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              
              <div className="flex items-center justify-end">
                
                {/* Circular percentage component */}
                <div className="flex flex-col items-center relative right-10 bg-white/10 shadow-2xl shadow-black/50 py-4 px-8 rounded-xl">
                  <div className="text-right mr-3">
                    <p className="text-sm text-white font-semibold">Overall Score:</p>
                  </div>
                  
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: `conic-gradient(#8b3cf6 ${getFormattedScore(analysisData?.overallScore) * 3.6}deg, rgba(200, 100 ,240, 0.1) 0deg)`
                    }}
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    <div className="bg-gray-900 w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium text-white">
                      {getFormattedScore(analysisData?.overallScore)+"%"}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20">
                <motion.div 
                  className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full pulse-animation"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="mt-4 text-modal-text-muted">Analyzing your CV...</p>
              </div>
            )}
            
            {/* Content */}
            {!isLoading && analysisData && (
              <div className="p-6">
                <div className="space-y-6">
                  {/* Executive Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="analysis-section executive-summary glassmorphism rounded-lg p-6"
                  >
                    <h3 className="text-lg font-medium text-modal-text-primary mb-3">Executive Summary</h3>
                    <div className="text-modal-text-secondary analysis-content custom-scroll">
                      {formatText(analysisData.executiveSummary).map((item, i) => {
                        if (item.type === 'formatted-html') {
                          return (
                            <div 
                              key={i} 
                              className="formatted-analysis"
                              dangerouslySetInnerHTML={{ __html: item.content }} 
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                  </motion.div>
                  
                  {/* Strengths and Weaknesses */}
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="analysis-section strengths-section glassmorphism rounded-lg p-6">
                      <h3 className="flex items-center text-lg font-medium text-modal-text-primary mb-4">
                        <div className="section-icon icon-success">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Strengths
                      </h3>
                      <ul className="space-y-2">
                        {extractStrengthsAndWeaknesses().strengths.map((strength, i) => (
                          <motion.li 
                            key={i} 
                            className="text-modal-text-secondary flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                            <span className="text-modal-success mr-2">•</span> {strength}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="analysis-section weaknesses-section glassmorphism rounded-lg p-6">
                      <h3 className="flex items-center text-lg font-medium text-modal-text-primary mb-4">
                        <div className="section-icon icon-warning">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Areas for Improvement
                      </h3>
                      <ul className="space-y-2">
                        {extractStrengthsAndWeaknesses().weaknesses.map((weakness, i) => (
                          <motion.li 
                            key={i} 
                            className="text-modal-text-secondary flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                            <span className="text-modal-warning mr-2">•</span> {weakness}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
                
                {/* Footer with detailed review link */}
                <div className="border-t border-gray-700/50 p-4 mt-6 bg-gray-900/30 flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 flex items-center"
                    onClick={onClose}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    Close
                  </motion.button>
                  
                  <Link href={`/review/${cv?.id}`} passHref>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      View Detailed Analysis
                    </motion.a>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}