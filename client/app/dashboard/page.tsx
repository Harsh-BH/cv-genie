"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import UserProfile from "@/components/dashboard/UserProfile";
import CVList from "@/components/dashboard/CVList";
import CVAnalysisModal from "@/components/dashboard/CVAnalysisModal";
import type { AnalysisData } from "@/components/dashboard/CVAnalysisModal";
import AnimatedInsight from "@/components/reviewer/AnimatedInsight";
import AnalyticsGraphs from "@/components/dashboard/AnalyticsGraphs";


interface CV {
  id: number;
  fileName: string;
  updatedAt: string;
  score: number;
}

// Using AnalysisData interface imported from CVAnalysisModal component

export default function DashboardPage() {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [selectedCV, setSelectedCV] = useState<CV | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingCVs, setIsLoadingCVs] = useState<boolean>(true);

  // Fetch all CVs when component mounts
  useEffect(() => {
    fetchCVs();
  }, []);

  // Fetch analysis when a CV is selected
  useEffect(() => {
    if (selectedCV) {
      fetchAnalysisData(selectedCV.id);
    } else {
      // Clear analysis data when no CV is selected
      setAnalysisData(null);
    }
  }, [selectedCV]);

  // Function to fetch all CVs
  const fetchCVs = async () => {
    try {
      setIsLoadingCVs(true);
      
      const response = await fetch("/api/getMyCvs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include"
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch CVs: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status === 200) {
        console.log("CVs fetched successfully:", data.resumes);
        setCvs(data.resumes);
      } else {
        throw new Error(data.message || "Failed to fetch CVs");
      }
    } catch (err) {
      console.error("Error fetching CVs:", err);
      setError(err instanceof Error ? err.message : "An error occurred while fetching your CVs");
    } finally {
      setIsLoadingCVs(false);
    }
  };

  const handleCVDelete = async (cv: CV) => {
    try {
      setError(null);
      
      const response = await fetch(`/api/deleteCV/${cv.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to delete CV: ${response.statusText}`);
      }
      
      const responseData = await response.json();
      
      if (responseData.success) {
        // Remove the deleted CV from the list
        setCvs(prevCvs => prevCvs.filter(item => item.id !== cv.id));
        
        // If the deleted CV is currently selected, deselect it
        if (selectedCV && selectedCV.id === cv.id) {
          setSelectedCV(null);
          setAnalysisData(null);
        }
      } else {
        throw new Error(responseData.error || "Failed to delete CV");
      }
    } catch (err) {
      console.error("Error deleting CV:", err);
      setError(err instanceof Error ? err.message : "An error occurred while deleting your CV");
    }
  };

  // Function to fetch analysis data for a specific CV
  const fetchAnalysisData = async (resumeId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/resumeAnalysis?resumeId=${resumeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch analysis: ${response.statusText}`);
      }
      
      const responseData = await response.json();
      
      if (responseData.status === "success" && responseData.data) {
        console.log("Analysis data received:", responseData.data);
        setAnalysisData(responseData.data);
      } else if (responseData.status === "not_found") {
        console.log("No analysis found for this CV.");
        setError("No analysis found for this CV. Please try creating an analysis first.");
      } else {
        throw new Error(responseData.message || "Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching analysis:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle CV selection
  const handleCVSelect = (cv: CV) => {
    setSelectedCV(cv);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedCV(null);
    setAnalysisData(null);
    setIsLoading(false);
    setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[980px] overflow-hidden lg:min-h-screen flex lg:justify-center lg:items-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
    >
      <div className="container mx-auto px-4 py-8 relative lg:top-0 top-20">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white lg:mt-20">Dashboard</h1>
          <p className="text-gray-300 mb-8">Welcome to your CV analysis hub</p>
        </motion.div>

        {/* Analytics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-10"
        >
          
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - User profile */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <UserProfile  />
            
            <motion.div 
              className="mt-6 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <AnimatedInsight />
            </motion.div>
          </motion.div>

          {/* Right column - CV List */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            {isLoadingCVs ? (
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 flex justify-center items-center py-20">
                <motion.div 
                  className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="ml-4 text-white/70">Loading your CVs...</p>
              </div>
            ) : (
              <CVList 
                cvs={cvs} 
                onCVSelect={handleCVSelect} 
                onCVDelete={handleCVDelete} 
              />
            )}
          </motion.div>
        </div>
        
        {/* Modal for CV Analysis */}
        <CVAnalysisModal 
          cv={selectedCV} 
          isOpen={!!selectedCV}
          onClose={handleCloseModal}
          analysisData={analysisData}
          isLoading={isLoading}
        />

<h2 className="text-2xl font-semibold text-white mb-4">Your CV Analytics</h2>
<AnalyticsGraphs />
        
        {/* Error Toast */}
        {error && (
          <motion.div 
            className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {error}
            <button 
              className="ml-4 font-bold"
              onClick={() => setError(null)}
            >
              ×
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
