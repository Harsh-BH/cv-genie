"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import "../../styles/cv-analysis-modal.css"; 

interface CV {
  id: number;
  fileName: string;
  updatedAt: string;
  score: number;
}

interface AnalysisData {
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
  const [activeTab, setActiveTab] = useState("overview");
  
  // Reset tab when opening a new CV
  useEffect(() => {
    if (isOpen) {
      setActiveTab("overview");
    }
  }, [isOpen, cv?.id]);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "suggestions", label: "Suggestions" },
    { id: "aiAnalysis", label: "AI Analysis" }
  ];

  // Enhanced text formatting function
const formatText = (text: string) => {
  if (!text) return ["No data available"];
  
  // First split by newlines
  const paragraphs = text.split('\n').filter(line => line.trim() !== '');
  
  // Process each paragraph to handle formatting
  return paragraphs.map(paragraph => {
    // Handle headings
    if (/^#+\s/.test(paragraph)) {
      const level = paragraph.match(/^(#+)\s/)?.[1].length || 1;
      const content = paragraph.replace(/^#+\s/, '');
      return { 
        type: 'heading', 
        level, 
        content 
      };
    }
    
    // Handle lists
    if (/^[-*•]\s/.test(paragraph)) {
      return { 
        type: 'list-item', 
        content: paragraph.replace(/^[-*•]\s/, '') 
      };
    }
    
    // Handle bold text within paragraphs
    if (/\*\*.*\*\*/.test(paragraph)) {
      return {
        type: 'formatted-paragraph',
        content: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      };
    }
    
    // Regular paragraph
    return { 
      type: 'paragraph', 
      content: paragraph 
    };
  });
};

  // Extract strengths and weaknesses from overview
  const extractStrengthsAndWeaknesses = () => {
    if (!analysisData?.overview) return { strengths: [], weaknesses: [] };
    
    const overview = analysisData.overview;
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    
    // Simple regex-based extraction (could be improved)
    const strengthsMatch = overview.match(/strengths[:\s]+(.*?)(?=weaknesses|\n\s*\n|$)/si);
    const weaknessesMatch = overview.match(/weaknesses[:\s]+(.*?)(?=strengths|\n\s*\n|$)/si);
    
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

  // Get section scores and feedback from analysis
  const getSectionAnalysis = () => {
    if (!analysisData) return {};
    
    return {
      experience: { 
        score: getFormattedScore(analysisData.contentScore), 
        feedback: analysisData.contentQuality || "No specific feedback available" 
      },
      skills: { 
        score: getFormattedScore(analysisData.skillsScore), 
        feedback: analysisData.skillsAnalysis || "No specific feedback available" 
      },
      ats: { 
        score: getFormattedScore(analysisData.atsOptimizationScore), 
        feedback: analysisData.atsCompatibility || "No specific feedback available" 
      },
      formatting: { 
        score: getFormattedScore(analysisData.formattingScore), 
        feedback: analysisData.formattingReview || "No specific feedback available" 
      }
    };
  };

  // Extract improvement suggestions
  const getImprovementSuggestions = () => {
    if (!analysisData?.improvementSuggestions) return [];
    
    // Try to parse bullet points or separate by newlines
    const suggestions = analysisData.improvementSuggestions
      .split(/[-•*]\s*|\n/)
      .filter(item => item.trim().length > 5)
      .map(item => item.trim());
    
    // If we couldn't extract meaningful suggestions, use positioned suggestions or default
    if (suggestions.length < 2 && analysisData.positionedSuggestions && analysisData.positionedSuggestions.length > 0) {
      return analysisData.positionedSuggestions.map(s => s.suggestion || s.text);
    }
    
    return suggestions.length > 0 ? suggestions : [
      "Add quantifiable achievements to your experience section",
      "Include relevant keywords for your target industry",
      "Ensure consistent formatting throughout your document"
    ];
  };

  if (!isOpen) return null;
  
  return (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 cv-analysis-modal">
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
          <div className="modal-header p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gradient">{cv?.fileName}</h2>
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
                  className={`px-4 py-2 text-sm font-medium rounded-lg tab-button ${
                    activeTab === tab.id 
                      ? 'active bg-purple-600 text-white' 
                      : 'text-gray-300 hover:bg-purple-800/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
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
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Executive Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="analysis-section executive-summary glassmorphism rounded-lg p-6"
                >
                  <h3 className="text-lg font-medium text-modal-text-primary mb-3">Executive Summary</h3>
                  <div className="text-modal-text-secondary analysis-content">
                    {formatText(analysisData.executiveSummary).map((item, i) => {
                      if (item.type === 'heading') {
                        const HeadingTag = `h${Math.min(item.level + 3, 6)}` as keyof JSX.IntrinsicElements;
                        return <HeadingTag key={i} className="font-bold text-modal-text-primary mt-4 mb-2">{item.content}</HeadingTag>
                      }
                      
                      if (item.type === 'list-item') {
                        return (
                          <div key={i} className="flex items-start ml-4 my-1">
                            <span className="text-modal-info mr-2 mt-1">•</span>
                            <p>{item.content}</p>
                          </div>
                        );
                      }
                      
                      if (item.type === 'formatted-paragraph') {
                        return <p key={i} dangerouslySetInnerHTML={{ __html: item.content }} />;
                      }
                      
                      return <p key={i}>{item.content}</p>;
                    })}
                  </div>
                </motion.div>
                
                {/* Score sections */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-2/3">
                    <motion.div 
                      className="analysis-section glassmorphism rounded-lg p-6 h-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-lg font-medium text-modal-text-primary mb-4">Score Breakdown</h3>
                      
                      <div className="space-y-4">
                        {Object.entries(getSectionAnalysis()).map(([section, data]) => (
                          <div key={section} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-modal-text-secondary capitalize">{section}</span>
                              <span className="text-modal-text-primary font-medium">{data.score}%</span>
                            </div>
                            <div className="h-2 score-bar-bg">
                              <motion.div 
                                className="h-full score-bar"
                                style={{ 
                                  width: `${data.score}%`,
                                  background: `linear-gradient(90deg, 
                                    ${data.score > 80 ? 'var(--modal-success)' : 
                                      data.score > 60 ? 'var(--modal-info)' : 
                                      data.score > 40 ? 'var(--modal-warning)' : 
                                      'var(--modal-danger)'}
                                    , rgba(139, 92, 246, 0.7))`
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${data.score}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                            </div>
                            <p className="text-xs text-modal-text-muted">
                              {typeof data.feedback === 'string' ? data.feedback : 'No feedback available'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="w-full md:w-1/3">
                    <motion.div 
                      className="analysis-section glassmorphism rounded-lg p-6 h-full flex flex-col"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-lg font-medium text-modal-text-primary mb-4">Overall Score</h3>
                      
                      <div className="flex-1 flex items-center justify-center">
                        <div className="relative">
                          <motion.svg 
                            className="w-40 h-40 score-circle" 
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
                              stroke="rgba(55, 65, 81, 0.5)" 
                              strokeWidth="10" 
                            />
                            <motion.circle 
                              cx="50" 
                              cy="50" 
                              r="45" 
                              fill="none" 
                              stroke="var(--modal-accent)" 
                              strokeWidth="10" 
                              strokeLinecap="round"
                              strokeDasharray={`${2 * Math.PI * 45}`}
                              strokeDashoffset={`${2 * Math.PI * 45 * (1 - getFormattedScore(analysisData.overallScore)/100)}`}
                              initial={{ strokeDashoffset: `${2 * Math.PI * 45}` }}
                              animate={{ strokeDashoffset: `${2 * Math.PI * 45 * (1 - getFormattedScore(analysisData.overallScore)/100)}` }}
                              transition={{ duration: 1.5, delay: 0.5 }}
                            />
                          </motion.svg>
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-center text-modal-text-primary text-3xl font-bold"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                          >
                            {getFormattedScore(analysisData.overallScore)}%
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
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
            )}
            
            {/* Suggestions Tab */}
            {activeTab === "suggestions" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="analysis-section glassmorphism rounded-lg p-6"
              >
                <h3 className="text-lg font-medium text-modal-text-primary mb-4">Improvement Suggestions</h3>
                <p className="text-modal-text-secondary mb-4">Our AI has analyzed your CV and suggests the following improvements:</p>
                
                <div className="space-y-4 mt-6">
                  {getImprovementSuggestions().map((suggestion, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-start p-4 suggestion-item rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="section-icon icon-info">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-modal-text-primary">{suggestion}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Footer */}
            <div className="border-t border-gray-700/50 p-4 mt-6 bg-gray-900/30 flex justify-between">
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
          </div>
          )}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
}
