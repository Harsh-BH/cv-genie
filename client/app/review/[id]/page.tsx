"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useParams, useSearchParams } from "next/navigation";
import CVDisplay from "@/components/reviewer/CVDisplay";
import AnalysisSidebar from "@/components/reviewer/AnalysisSidebar";
import { AnalysisData, SidebarFeedback } from "@/types/analysis";

// Mapping function to convert API data to sidebar format
function mapApiDataToSidebarFormat(analysisData: AnalysisData): SidebarFeedback {
  // Extract insights (positive aspects)
  const insights = [
    {
      id: "exec-summary",
      title: "Executive Summary",
      description: formatStructuredContent(analysisData.executiveSummary),
      category: "overall"
    },
    {
      id: "content-strength",
      title: "Content Strengths",
      description: extractAndFormatPositiveFeedback(analysisData.overview),
      category: "content"
    },
    {
      id: "industry-alignment",
      title: "Industry Alignment",
      description: extractAndFormatPositiveFeedback(analysisData.industryFit),
      category: "industry"
    }
  ];
  
  // Map positioned suggestions (primarily mistakes) to sidebar format
  const mistakes = analysisData.positionedSuggestions
    .filter(sugg => sugg.severity === 'critical' || sugg.severity === 'high')
    .map(sugg => ({
      id: sugg.id,
      title: sugg.issue,
      description: formatStructuredContent(sugg.reasoning),
      category: sugg.category,
      severity: sugg.severity,
      position: sugg.position,
      section: sugg.position.sectionTitle || '',
      textSnippet: sugg.position.textSnippet || ''
    }));
    
  // Map improvement suggestions to sidebar format
  const improvements = [
    // Add AI generated improvements
    ...(analysisData.aiGeneratedImprovements?.summary ? [{
      id: "ai-summary",
      title: "Improved Professional Summary",
      description: formatStructuredContent(analysisData.aiGeneratedImprovements.summary),
      category: "content",
      type: "replacement"
    }] : []),
    
    ...((analysisData.aiGeneratedImprovements?.bulletPoints || []).map((bullet, idx) => ({
      id: `ai-bullet-${idx}`,
      title: "Enhanced Bullet Point",
      description: formatStructuredContent(bullet),
      category: "content",
      type: "replacement"
    }))),
    
    ...((analysisData.aiGeneratedImprovements?.achievements || []).map((achievement, idx) => ({
      id: `ai-achievement-${idx}`,
      title: "Achievement to Add",
      description: formatStructuredContent(achievement),
      category: "content",
      type: "addition"
    }))),
    
    // Add medium/low severity positioned suggestions as improvements
    ...(analysisData.positionedSuggestions
      .filter(sugg => sugg.severity === 'medium' || sugg.severity === 'low')
      .map(sugg => ({
        id: sugg.id,
        title: sugg.suggestion,
        description: formatStructuredContent(sugg.exampleFix || sugg.reasoning),
        category: sugg.category,
        severity: sugg.severity,
        position: sugg.position,
        type: "suggestion"
      })))
  ];
  
  // Calculate overall score (0-100)
  const score = Math.round(analysisData.scoreBreakdown.overall * 10);
  
  return {
    insights,
    mistakes,
    improvements,
    score
  };
}

/**
 * Format structured content from AI responses for better display
 */
function formatStructuredContent(text: string): string {
  if (!text) return '';
  
  // Replace markdown headers with styled HTML
  let formattedText = text
    .replace(/^## (.*$)/gm, '<h3 class="text-lg font-semibold text-purple-300 mt-3 mb-2">$1</h3>')
    .replace(/^# (.*$)/gm, '<h2 class="text-xl font-bold text-purple-200 mt-4 mb-2">$1</h2>');
  
  // Convert bullet points to styled list items
  formattedText = formattedText
    .replace(/^\* (.*$)/gm, '<li class="ml-5 pl-2 my-1.5 list-disc">$1</li>')
    .replace(/^• (.*$)/gm, '<li class="ml-5 pl-2 my-1.5 list-disc">$1</li>')
    .replace(/^- (.*$)/gm, '<li class="ml-5 pl-2 my-1.5 list-disc">$1</li>');
  
  // Wrap adjacent list items with ul tags
  const lines = formattedText.split('\n');
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const isListItem = lines[i].includes('<li');
    
    if (isListItem && !inList) {
      lines[i] = '<ul class="my-2">' + lines[i];
      inList = true;
    } else if (!isListItem && inList) {
      lines[i-1] = lines[i-1] + '</ul>';
      inList = false;
    }
  }
  
  if (inList) {
    lines.push('</ul>');
  }
  
  // Convert links to clickable links
  formattedText = lines.join('\n')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 underline" target="_blank">$1</a>');
  
  // Convert paragraphs to styled paragraphs with spacing
  formattedText = formattedText
    .replace(/^(?!<[hl]|<li|<ul|<\/ul>)(.+)$/gm, '<p class="my-2">$1</p>');
    
  return formattedText;
}

/**
 * Helper function to extract and format positive feedback from analysis text
 */
function extractAndFormatPositiveFeedback(text: string): string {
  if (!text) return '';
  
  // Look for structured strengths section
  const strengthsMatch = text?.match(/## Strengths[\s\S]*?(## |$)/i) || 
                         text?.match(/## Strong[\s\S]*?(## |$)/i) ||
                         text?.match(/## Positives[\s\S]*?(## |$)/i);
  
  if (strengthsMatch) {
    // Remove the next section header if captured
    let content = strengthsMatch[0].replace(/## [^\n]*$/, '').trim();
    return formatStructuredContent(content);
  }
  
  // If no structured section found, try to find bullet points of strengths
  const bulletMatch = text?.match(/(strengths|positives|strong points)[^\n]*\n(\s*[-•*][^\n]*\n)+/i);
  if (bulletMatch) {
    return formatStructuredContent("## Strengths\n" + bulletMatch[0]);
  }
  
  // If no clear positive section, return first paragraph
  const firstParagraph = text?.split('\n\n')[0] || '';
  return `<p class="my-2">${firstParagraph.trim()}</p>`;
}

export default function ReviewerPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const resumeId = params.id as string;
  const isNewUpload = searchParams.get('newUpload') === 'true';
  
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [sidebarData, setSidebarData] = useState<SidebarFeedback | null>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [activeElement, setActiveElement] = useState<{
    id: string;
    bounds: { x: number; y: number; width: number; height: number } | null;
  } | null>(null);
  
  // Analysis state tracking
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<string | null>(null);
  const [analysisId, setAnalysisId] = useState<number | null>(null);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(10); // Initial progress value

  // Add a ref to track if analysis has already been triggered
  const analysisTriggeredRef = useRef(false);

  // Function to check analysis status
  const checkAnalysisStatus = useCallback(async (id: number) => {
    if (!id) return;
    
    try {
      const response = await fetch(`/api/analysis-status?id=${id}`);
      
      if (!response.ok) {
        throw new Error(`Status check failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      setAnalysisStatus(data.status);
      
      // Update progress based on status
      if (data.status === 'processing') {
        // Incrementally increase progress while processing
        setAnalysisProgress(prev => Math.min(prev + 5, 70));
      } else if (data.status === 'completed') {
        setAnalysisProgress(90);
        
        // If completed, clear polling and fetch the results
        if (pollingInterval) {
          clearInterval(pollingInterval);
          setPollingInterval(null);
        }
        
        // Fetch the analysis results
        fetchAnalysisResults();
      } else if (data.status === 'failed') {
        // Handle failure
        if (pollingInterval) {
          clearInterval(pollingInterval);
          setPollingInterval(null);
        }
        throw new Error("Analysis failed. Please try again.");
      }
    } catch (err) {
      console.error("Error checking analysis status:", err);
      setError(`Analysis status check error: ${(err as Error).message}`);
      setIsLoading(false);
      
      // Clear polling on error
      if (pollingInterval) {
        clearInterval(pollingInterval);
        setPollingInterval(null);
      }
    }
  }, [pollingInterval]); // Only depend on pollingInterval

  // Start polling for analysis status
  const startPolling = useCallback((id: number) => {
    // Clear any existing polling
    if (pollingInterval) {
      clearInterval(pollingInterval);
    }
    
    // Check status immediately
    checkAnalysisStatus(id);
    
    // Set up polling interval (every 5 seconds)
    const interval = setInterval(() => {
      checkAnalysisStatus(id);
    }, 5000);
    
    setPollingInterval(interval);
    
  }, [checkAnalysisStatus, pollingInterval]);

  // Function to trigger analysis
  const triggerAnalysis = useCallback(async () => {
    // Prevent multiple triggers
    if (analysisTriggeredRef.current) {
      console.log("Analysis already triggered, skipping");
      return;
    }
    
    try {
      analysisTriggeredRef.current = true;
      setIsLoading(true);
      setAnalysisStatus('pending');
      setAnalysisProgress(15);
      setError(null);
      
      console.log("Triggering analysis for resume:", resumeId);
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeId: parseInt(resumeId) })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start analysis');
      }
      
      const data = await response.json();
      
      setAnalysisId(data.analysisId);
      setAnalysisStatus(data.status);
      setAnalysisProgress(25);
      
      // Start polling for status updates
      startPolling(data.analysisId);
      
    } catch (err) {
      console.error("Error triggering analysis:", err);
      setError(`Failed to start analysis: ${(err as Error).message}`);
      setIsLoading(false);
      // Reset the flag on error so user can try again
      analysisTriggeredRef.current = false;
    }
  }, [resumeId]); // Only depend on resumeId

  // Function to fetch analysis results
  const fetchAnalysisResults = useCallback(async () => {
    try {
      setAnalysisProgress(95); // Almost done
      
      const response = await fetch(`/api/review/${resumeId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch analysis results: ${response.status}`);
      }
      
      const data = await response.json();
      
      setAnalysisData(data.analysis);
      
      // Convert API data to sidebar format
      const formattedData = mapApiDataToSidebarFormat(data.analysis);
      setSidebarData(formattedData);
      
      // Complete loading
      setAnalysisProgress(100);
      setTimeout(() => setIsLoading(false), 500); // Small delay to show 100%
      
    } catch (err) {
      console.error("Error fetching analysis results:", err);
      setError(`Failed to fetch results: ${(err as Error).message}`);
      setIsLoading(false);
    }
  }, [resumeId]);

  // Initial check for analysis status
  const checkInitialStatus = useCallback(async () => {
    // Prevent multiple executions
    if (analysisTriggeredRef.current) return;
    
    try {
      setIsLoading(true);
      
      // First check if there's already an in-progress analysis
      const statusResponse = await fetch(`/api/analysis-status?resumeId=${resumeId}`);
      
      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        
        if (statusData.status === 'processing' || statusData.status === 'pending') {
          // Analysis is already in progress
          console.log("Found in-progress analysis:", statusData.id);
          analysisTriggeredRef.current = true;
          setAnalysisId(statusData.id);
          setAnalysisStatus(statusData.status);
          setAnalysisProgress(40); // Assume it's somewhat in progress
          
          // Start polling for status updates
          startPolling(statusData.id);
          return;
        }
      }
      
      // Try to get completed analysis results
      const response = await fetch(`/api/review/${resumeId}`);
      
      if (response.ok) {
        // Analysis exists and is complete
        const data = await response.json();
        setAnalysisData(data.analysis);
        
        // Convert API data to sidebar format
        const formattedData = mapApiDataToSidebarFormat(data.analysis);
        setSidebarData(formattedData);
        
        setIsLoading(false);
      } else if (response.status === 404) {
        // Analysis doesn't exist yet
        
        // If this is a new upload, trigger analysis automatically
        if (isNewUpload) {
          // Only trigger if we haven't already
          if (!analysisTriggeredRef.current) {
            console.log("New upload - triggering analysis");
            await triggerAnalysis();
          }
        } else {
          // Otherwise, show error that analysis needs to be started
          setError("This resume hasn't been analyzed yet. Please start analysis.");
          setIsLoading(false);
        }
      } else {
        throw new Error(`Error checking status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error checking initial status:", err);
      setError(`Initial status check failed: ${(err as Error).message}`);
      setIsLoading(false);
    }
  }, [resumeId, isNewUpload, triggerAnalysis, startPolling]);

  // Run initial check on component mount
  useEffect(() => {
    checkInitialStatus();
    
    // Cleanup polling on unmount
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [checkInitialStatus]);

  // Handle feedback item selection
  const handleFeedbackSelect = (
    id: string,
    bounds?: { x: number; y: number; width: number; height: number } | null
  ) => {
    setActiveItemId(id);
    if (bounds) {
      setActiveElement({ id, bounds });
    } else {
      setActiveElement(null);
    }
  };

  // Find the positioned suggestion based on activeItemId
  const getActiveSuggestion = () => {
    if (!activeItemId || !analysisData) return null;
    
    return analysisData.positionedSuggestions.find(suggestion => 
      suggestion.id === activeItemId
    );
  };

  // Animation variants for loading screen
  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Handle applying a fix to the resume
  const handleApplyFix = async (fixedContent: string, sectionId: number) => {
    try {
      // Implement API call to update the resume section
      const response = await fetch(`/api/resume/sections/${sectionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: fixedContent })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update resume');
      }
      
      // Refresh the page or state to show updated content
      window.location.reload();
    } catch (err) {
      console.error('Error applying fix:', err);
      // Show error notification
    }
  };

  // Get dynamic loading message based on analysis status
  const getLoadingMessage = () => {
    if (analysisStatus === 'pending') {
      return "Starting analysis of your resume...";
    } else if (analysisStatus === 'processing') {
      return "Our AI is analyzing your resume. This may take 30-60 seconds...";
    } else if (analysisProgress === 100) {
      return "Analysis complete! Loading your results...";
    }
    return "Preparing your resume review...";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-900/20 to-gray-900 text-white">
      {isLoading ? (
        <motion.div
          className="h-screen flex flex-col items-center justify-center"
          variants={loadingVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <svg
              className="w-16 h-16 text-purple-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18H17V16H7V18Z"
                fill="currentColor"
              />
              <path
                d="M17 14H7V12H17V14Z"
                fill="currentColor"
              />
              <path
                d="M7 10H11V8H7V10Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V5C21 3.34315 19.6569 2 18 2H6ZM5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-2xl mb-2 font-bold">
            {analysisStatus === 'completed' ? 'Analysis Complete!' : 'Analyzing your CV'}
          </motion.h1>
          <motion.p variants={itemVariants} className="text-white/70 max-w-md text-center">
            {getLoadingMessage()}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-8 w-64 h-2 bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: "0%" }}
              animate={{ width: `${analysisProgress}%` }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      ) : error ? (
        <div className="h-screen flex flex-col items-center justify-center">
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 max-w-md">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p className="text-white/80">{error}</p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => window.location.reload()}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors"
              >
                Try Again
              </button>
              
              <button 
                onClick={triggerAnalysis}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors"
              >
                Start Analysis
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
            {/* ...existing header code... */}
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold font-space-grotesk flex items-center"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                  <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                  <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V5C21 3.34315 19.6569 2 18 2H6ZM5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5Z" fill="currentColor" />
                </svg>
                CV Review
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center"
              >
                <button 
                  onClick={() => {
                    // Create and download PDF report
                    alert('PDF report generation not implemented yet');
                  }}
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md text-sm flex items-center transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Report
                </button>
                
                {analysisData?.aiGeneratedImprovements && (
                  <button 
                    onClick={() => {
                      // Open modal with AI improvements
                      alert('AI Improvements modal not implemented yet');
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 ml-3 px-4 py-2 rounded-md text-sm flex items-center hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Get AI Improvements
                  </button>
                )}
              </motion.div>
            </div>
          </header>

          {/* Main content */}
          <main className="max-w-7xl mx-auto px-4 py-6">
            <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
              {/* Left side - CV Display */}
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <CVDisplay 
                  resumeId={resumeId}
                  activeHighlight={activeItemId}
                  activeElement={activeElement}
                  activeSuggestion={getActiveSuggestion()}
                  onApplyFix={handleApplyFix}
                />
              </motion.div>
              
              {/* Right side - Analysis */}
              <motion.div 
                className="w-full lg:w-1/3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {sidebarData && (
                  <AnalysisSidebar 
                    feedback={sidebarData} 
                    onFeedbackSelect={handleFeedbackSelect}
                    activeItemId={activeItemId}
                    renderHtml={true} // Add this prop to enable HTML rendering
                  />
                )}
              </motion.div>
            </div>
          </main>
          
          {/* Floating help button */}
          <motion.button 
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.button>
        </>
      )}
    </div>
  );
}
