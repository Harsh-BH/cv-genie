"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useSearchParams } from "next/navigation";
import CVDisplay from "@/components/reviewer/CVDisplay";
import AnalysisDisplay from "@/components/reviewer/AnalysisDisplay";
import AnalyticsSection from "@/components/reviewer/AnalyticsSection";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { AnalysisData } from "@/types/analysis";

export default function ReviewerPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const resumeId = params.id as string;
  const isNewUpload = searchParams.get('newUpload') === 'true';
  
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
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
  const [analysisProgress, setAnalysisProgress] = useState(10);

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
  }, [pollingInterval]);

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
      return;
    }
    
    try {
      analysisTriggeredRef.current = true;
      setIsLoading(true);
      setAnalysisStatus('pending');
      setAnalysisProgress(15);
      setError(null);
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
  }, [resumeId, startPolling]);

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
    if (analysisTriggeredRef.current) return;
    
    try {
      setIsLoading(true);
      
      // First check if there's already an in-progress analysis
      const statusResponse = await fetch(`/api/analysis-status?resumeId=${resumeId}`);
      
      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        
        if (statusData.status === 'processing' || statusData.status === 'pending') {
          analysisTriggeredRef.current = true;
          setAnalysisId(statusData.id);
          setAnalysisStatus(statusData.status);
          setAnalysisProgress(40);
          
          // Start polling for status updates
          startPolling(statusData.id);
          return;
        }
      }
      
      // Try to get completed analysis results
      const response = await fetch(`/api/review/${resumeId}`);
      
      if (response.ok) {
        const data = await response.json();
        setAnalysisData(data.analysis);
        setIsLoading(false);
      } else if (response.status === 404) {
        // If this is a new upload, trigger analysis automatically
        if (isNewUpload) {
          if (!analysisTriggeredRef.current) {
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
  }, [checkInitialStatus, pollingInterval]);

  // Handle feedback item selection
  const handleFeedbackSelect = (id: string) => {
    setActiveItemId(id);
  };

  // Find the positioned suggestion based on activeItemId
  const getActiveSuggestion = () => {
    if (!activeItemId || !analysisData) return null;
    
    return analysisData.positionedSuggestions.find(suggestion => 
      suggestion.id === activeItemId
    );
  };

  if (isLoading) {
    return (
      <LoadingScreen
        status={analysisStatus}
        progress={analysisProgress}
        message={
          analysisStatus === 'pending' ? "Starting analysis of your resume..." :
          analysisStatus === 'processing' ? "Our AI is analyzing your resume. This may take 30-60 seconds..." :
          analysisProgress === 100 ? "Analysis complete! Loading your results..." :
          "Preparing your resume review..."
        }
      />
    );
  }

  if (error) {
    return (
      <ErrorMessage
        error={error}
        onRetry={() => window.location.reload()}
        onTriggerAnalysis={triggerAnalysis}
      />
    );
  }

  // Add explicit styles to ensure scrolling works
  const pageStyle = {
    minHeight: '150vh', // Ensure we have enough content to scroll
    overflowY: 'auto',  // Explicitly allow vertical scrolling
    overflowX: 'hidden' // Hide horizontal scrolling
  };

  return (
    <div 
      className="bg-gradient-to-b from-gray-950 via-purple-900/20 to-gray-900 text-white"
      style={pageStyle}
    >
      {/* Header */}
      <motion.header 
        className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
          </motion.div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* CV and Analysis Section */}
        <section>
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Left side - CV Display */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CVDisplay 
                  resumeId={resumeId}
                  activeHighlight={activeItemId}
                  activeElement={activeElement}
                  activeSuggestion={getActiveSuggestion()}
                />
              </motion.div>
            </div>
            
            {/* Right side - Analysis */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {analysisData && (
                  <AnalysisDisplay
                    analysis={analysisData}
                    onFeedbackSelect={handleFeedbackSelect}
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        </section>
        
        {/* Divider with more margin to ensure scrolling */}
        <div className="relative my-24">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-900 px-4 text-sm text-white/60">ANALYTICS SECTION</span>
          </div>
        </div>
        
        {/* Analytics Section */}
        {analysisData && (
          <>
            <section className="bg-black/20 rounded-xl p-6 backdrop-blur-sm border border-white/5 shadow-xl mb-20">
              <AnalyticsSection analysis={analysisData} />
            </section>
            
            {/* Add spacer at the bottom to ensure we have enough content for scrolling */}
            <div className="h-screen"></div>
          </>
        )}
      </main>
    </div>
  );
}
