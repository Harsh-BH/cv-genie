"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface CVAnalysisModalProps {
  cv: {
    id: number;
    fileName: string;
    updatedAt: string;
    score: number;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CVAnalysisModal({ cv, isOpen, onClose }: CVAnalysisModalProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock analysis data - in real app would come from API
  const analysis = {
    overview: {
      strengths: ["Clear work history", "Well-structured education", "Relevant skills highlighted"],
      weaknesses: ["Missing quantifiable achievements", "Skills section could be more organized"]
    },
    sections: {
      experience: { score: 80, feedback: "Good experience section, but needs more metrics and achievements" },
      education: { score: 90, feedback: "Well-structured education section with relevant details" },
      skills: { score: 75, feedback: "Could better organize technical vs. soft skills" },
      summary: { score: 85, feedback: "Good summary but could be more tailored to specific roles" }
    }
  };
  
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "suggestions", label: "Suggestions" },
    { id: "aiAnalysis", label: "AI Analysis" }
  ];

  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            className="bg-gradient-to-br max-h-[80vh] from-gray-900 to-gray-800 rounded-xl shadow-2xl border border-purple-500/20 w-full max-w-4xl relative z-10 overflow-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900/50 to-gray-900/50 p-6 border-b border-purple-800/30">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">{cv?.fileName}</h2>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              
              <div className="mt-4 flex space-x-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${
                      activeTab === tab.id 
                        ? 'bg-purple-600 text-white' 
                        : 'text-gray-300 hover:bg-purple-800/30'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="flex">
                    <div className="w-2/3 pr-6">
                      <motion.div 
                        className="bg-gray-800/50 rounded-lg p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h3 className="text-lg font-medium text-white mb-4">Score Breakdown</h3>
                        
                        <div className="space-y-4">
                          {Object.entries(analysis.sections).map(([section, data]) => (
                            <div key={section} className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-300 capitalize">{section}</span>
                                <span className="text-white font-medium">{data.score}%</span>
                              </div>
                              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-purple-500"
                                  style={{ width: `${data.score}%` }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${data.score}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                />
                              </div>
                              <p className="text-xs text-gray-400">{data.feedback}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                    
                    <div className="w-1/3">
                      <motion.div 
                        className="bg-gray-800/50 rounded-lg p-6 h-full flex flex-col"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-lg font-medium text-white mb-4">Overall Score</h3>
                        
                        <div className="flex-1 flex items-center justify-center">
                          <div className="relative">
                            <motion.svg 
                              className="w-40 h-40" 
                              viewBox="0 0 100 100"
                              initial={{ rotate: -90 }}
                              animate={{ rotate: 0 }}
                              transition={{ duration: 1, delay: 0.5 }}
                            >
                              <circle 
                                cx="50" 
                                cy="50" 
                                r="45" 
                                fill="none" 
                                stroke="#374151" 
                                strokeWidth="10" 
                              />
                              <motion.circle 
                                cx="50" 
                                cy="50" 
                                r="45" 
                                fill="none" 
                                stroke="#8b5cf6" 
                                strokeWidth="10" 
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 45}`}
                                strokeDashoffset={`${2 * Math.PI * 45 * (1 - cv!.score/100)}`}
                                initial={{ strokeDashoffset: `${2 * Math.PI * 45}` }}
                                animate={{ strokeDashoffset: `${2 * Math.PI * 45 * (1 - cv!.score/100)}` }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                              />
                            </motion.svg>
                            <motion.div 
                              className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.7 }}
                            >
                              {cv?.score || "70"}%
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="grid grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="bg-gray-800/50 rounded-lg p-6">
                      <h3 className="flex items-center text-lg font-medium text-white mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Strengths
                      </h3>
                      <ul className="space-y-2">
                        {analysis.overview.strengths.map((strength, i) => (
                          <motion.li 
                            key={i} 
                            className="text-gray-300 flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                          >
                            <span className="text-green-500 mr-2">•</span> {strength}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-6">
                      <h3 className="flex items-center text-lg font-medium text-white mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Areas for Improvement
                      </h3>
                      <ul className="space-y-2">
                        {analysis.overview.weaknesses.map((weakness, i) => (
                          <motion.li 
                            key={i} 
                            className="text-gray-300 flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                          >
                            <span className="text-amber-500 mr-2">•</span> {weakness}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              )}
              
              {activeTab === "suggestions" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-800/50 rounded-lg p-6"
                >
                  <h3 className="text-lg font-medium text-white mb-4">Improvement Suggestions</h3>
                  <p className="text-gray-300 mb-4">Our AI has analyzed your CV and suggests the following improvements:</p>
                  
                  <div className="space-y-4 mt-6">
                    {["Add quantifiable achievements to your experience section", 
                      "Reorganize skills by proficiency level",
                      "Make your professional summary more targeted",
                      "Add relevant keywords for better ATS performance"].map((suggestion, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-start p-3 bg-gray-700/30 rounded-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="flex-shrink-0 mr-3 mt-1 text-purple-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white">{suggestion}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {activeTab === "aiAnalysis" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-800/50 rounded-lg p-6"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-white">AI Analysis Report</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-4 bg-gray-700/30 rounded-lg border-l-4 border-purple-500"
                    >
                      <h4 className="text-white font-medium mb-2">General Impression</h4>
                      <p className="text-gray-300">Your CV has a clear structure and provides good details about your professional experience. The layout is professional and maintains good readability.</p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-4 bg-gray-700/30 rounded-lg border-l-4 border-blue-500"
                    >
                      <h4 className="text-white font-medium mb-2">Content Analysis</h4>
                      <p className="text-gray-300">While your experience descriptions are informative, they would benefit from more specific metrics and achievements. Consider using the STAR method (Situation, Task, Action, Result) when describing your accomplishments.</p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-4 bg-gray-700/30 rounded-lg border-l-4 border-green-500"
                    >
                      <h4 className="text-white font-medium mb-2">ATS Compatibility</h4>
                      <p className="text-gray-300">Your CV has good keyword optimization for Applicant Tracking Systems. We've identified that it contains 75% of the key terms from job descriptions in your target industry.</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Footer */}
            <div className="border-t border-gray-700 p-4 bg-gray-900/50 flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                Download Report
              </motion.button>
              
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Get AI Suggestions
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit CV
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
