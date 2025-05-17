"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import CVDisplay from "@/components/reviewer/CVDisplay";
import AnalysisDisplay from "@/components/reviewer/AnalysisDisplay";
import AnalyticsSection from "@/components/reviewer/AnalyticsSection";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { AnalysisData } from "@/types/analysis";
import ExternalResources from "@/components/reviewer/ExternalResources";
import ResourcesSidebar from "@/components/reviewer/ResourcesSidebar";
import { ResourceCategory } from "@/lib/data/resource-links";

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
  
  // Resource sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarCategory, setSidebarCategory] = useState<ResourceCategory | 'all'>('all');

  // Function to open sidebar with a specific category
  const openResourceSidebar = (category: ResourceCategory | 'all' = 'all') => {
    setSidebarCategory(category);
    setIsSidebarOpen(true);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-900/20 to-gray-900 text-white pb-20">
      {/* Resources Sidebar */}
      <ResourcesSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        initialCategory={sidebarCategory}
      />
      
      {/* Header */}
      <motion.header 
        className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
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
            className="flex items-center gap-2"
          >
            <button 
              onClick={() => openResourceSidebar()}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm flex items-center transition-colors"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Resources
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
        
        {/* Down arrow animation to guide users to analytics */}
        <motion.div 
          className="flex justify-center my-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1.5
          }}
        >
          <motion.div
            animate={{ 
              y: [0, 8, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="flex flex-col items-center"
          >
            <p className="text-white/60 text-sm mb-2">Scroll for detailed analytics</p>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white/70"
            >
              <path 
                d="M12 5V19M12 19L5 12M12 19L19 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
        
        {/* Divider */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-900 px-4 text-sm text-white/60">ANALYTICS SECTION</span>
          </div>
        </div>
        
        {/* Analytics Section */}
        {analysisData && (
          <section className="bg-black/20 rounded-xl p-6 backdrop-blur-sm border border-white/5 shadow-xl mb-16">
            <AnalyticsSection analysis={analysisData} />
          </section>
        )}
        
        {/* Resources Section */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-900 px-4 text-sm text-white/60">RESOURCES</span>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Resume Resources</h2>
            <button 
              onClick={() => openResourceSidebar()}
              className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
            >
              View All Resources
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Resource Category Quick Access */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <CategoryCard 
              title="ATS Optimization" 
              description="Tools to help your resume pass Applicant Tracking Systems"
              icon="🎯"
              onClick={() => openResourceSidebar('ats-optimization')}
            />
            <CategoryCard 
              title="Resume Templates" 
              description="Professional templates to improve your resume layout"
              icon="📝"
              onClick={() => openResourceSidebar('template')}
            />
            <CategoryCard 
              title="Industry Specific" 
              description="Resources tailored to your industry or field"
              icon="🏢"
              onClick={() => openResourceSidebar('industry-specific')}
            />
          </div>
          
          {/* Preview of resources */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/40 rounded-xl p-6">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Featured Resources</h3>
              <button 
                onClick={() => openResourceSidebar()}
                className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
              >
                Explore All 
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Show 3 featured resources - one premium, one ATS, one writing guide */}
              <ResourcePreviewCard
                title="JobScan"
                description="Match your resume against job descriptions for ATS optimization"
                category="ATS Optimization"
                isPremium={true}
                onClick={() => openResourceSidebar('ats-optimization')}
              />
              <ResourcePreviewCard
                title="Harvard Resume Guide"
                description="Comprehensive resume writing guides and examples"
                category="Writing Guide"
                isPremium={false}
                onClick={() => openResourceSidebar('writing-guide')}
              />
              <ResourcePreviewCard
                title="Canva Resume Builder"
                description="Design-focused resume builder with customizable templates"
                category="Resume Builder"
                isPremium={false}
                onClick={() => openResourceSidebar('resume-builder')}
              />
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => openResourceSidebar()}
                className="inline-flex items-center px-6 py-3 bg-purple-700 hover:bg-purple-600 rounded-lg text-white transition-colors shadow-lg hover:shadow-purple-700/30"
              >
                Explore All Resources
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function CategoryCard({ 
  title, 
  description, 
  icon, 
  onClick 
}: { 
  title: string; 
  description: string; 
  icon: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      className="bg-gray-800/60 hover:bg-gray-800 border border-gray-700/40 rounded-lg p-4 cursor-pointer transition-all relative overflow-hidden group"
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-medium text-white group-hover:text-purple-300 transition-colors">{title}</h3>
      <p className="mt-1 text-sm text-gray-300">{description}</p>
      <div className="mt-3 text-purple-400 text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        Explore Resources
        <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
      
      {/* Decorative glowing corner */}
      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

function ResourcePreviewCard({ 
  title, 
  description, 
  category,
  isPremium,
  onClick
}: {
  title: string;
  description: string;
  category: string;
  isPremium?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div 
      onClick={onClick}
      className="p-4 bg-gray-800/40 hover:bg-gray-800/70 border border-gray-700/40 rounded-lg cursor-pointer group"
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs px-2 py-0.5 bg-purple-900/60 rounded-full text-purple-100">
          {category}
        </span>
        {isPremium && (
          <span className="text-xs px-2 py-0.5 bg-amber-800/80 rounded-full text-amber-100">
            Premium
          </span>
        )}
      </div>
      
      <h4 className="font-medium text-white group-hover:text-purple-300 transition-colors">{title}</h4>
      <p className="mt-1 text-sm text-gray-300">{description}</p>
      
      <div className="mt-2 text-purple-400 text-xs flex items-center group-hover:text-purple-300">
        View Details
        <svg className="ml-1 w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  );
}
