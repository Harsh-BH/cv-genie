"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { format } from "date-fns";

// Define color schemes for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"];

interface ResumeScores {
  overall: number | null;
  content: number | null;
  atsOptimization: number | null;
  industryAlignment: number | null;
  formatting: number | null;
  skills: number | null;
  grammar: number | null;
  clarity: number | null;
}

interface ResumeData {
  id: number;
  fileName: string;
  updatedAt: string;
  score: number | null;
  scores?: ResumeScores;
  analysisStatus?: string | null;
  analysisDate?: string | null;
}

interface AnalyticsGraphsProps {
  userId?: string;
  className?: string;
}

export default function AnalyticsGraphs({ userId, className = "" }: AnalyticsGraphsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [monthlyData, setMonthlyData] = useState<Array<{month: string, score: number}>>([]);
  const [categoryData, setCategoryData] = useState<Array<{name: string, score: number, fullMark: number}>>([]);
  const [skillGapData, setSkillGapData] = useState<Array<{name: string, value: number}>>([]);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const [currentScoreBreakdown, setCurrentScoreBreakdown] = useState<ResumeScores | null>(null);
  
  // Add state to force chart re-renders when tab changes
  const [chartKey, setChartKey] = useState(0);
  
  // Track window resize to handle responsive charts properly
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Add a key for each individual chart
  const [trendChartKey, setTrendChartKey] = useState(0);
  const [progressChartKey, setProgressChartKey] = useState(0);
  const [categoriesChartKey, setCategoriesChartKey] = useState(0);
  const [gapsChartKey, setGapsChartKey] = useState(0);
  
  // Add refs for chart containers
  const trendChartRef = useRef<HTMLDivElement>(null);
  const progressChartRef = useRef<HTMLDivElement>(null);
  const categoriesChartRef = useRef<HTMLDivElement>(null);
  const gapsChartRef = useRef<HTMLDivElement>(null);
  
  // Add delayed render state
  const [chartsReady, setChartsReady] = useState(false);

  // Fetch CV data from API
  useEffect(() => {
    const fetchCVs = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/getMyCvs');
        const data = await response.json();
        
        if (data.status === 200) {
          setResumes(data.resumes);
          
          // Process the CV data for charts
          processDataForCharts(data.resumes);
        } else {
          setError(data.message || 'Failed to fetch CV data');
        }
      } catch (err) {
        console.error('Error fetching CV data:', err);
        setError('An error occurred while fetching your CV data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCVs();
  }, []);

  // Process the CV data into chart-friendly formats
  const processDataForCharts = (cvData: ResumeData[]) => {
    if (!cvData.length) return;
    
    // Sort by date (newest first)
    const sortedCVs = [...cvData].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    
    // Set current score and breakdown from most recent CV
    const mostRecentCV = sortedCVs[0];
    setCurrentScore(mostRecentCV.score);
    setCurrentScoreBreakdown(mostRecentCV.scores || null);
    
    // Format data for monthly/progress chart (reverse to show oldest to newest)
    const chartData = sortedCVs.slice()
      .reverse()
      .filter(cv => cv.score !== null)
      .map(cv => ({
        month: format(new Date(cv.updatedAt), 'MMM dd'),
        score: cv.score as number,
        name: cv.fileName
      }));
    
    setMonthlyData(chartData);
    
    // Create category data from the most recent CV's score breakdown
    if (mostRecentCV.scores) {
      const scores = mostRecentCV.scores;
      
      // Format category scores for radar chart
      const newCategoryData = [
        { name: "Content", score: scores.content || 0, fullMark: 100 },
        { name: "ATS", score: scores.atsOptimization || 0, fullMark: 100 },
        { name: "Industry Fit", score: scores.industryAlignment || 0, fullMark: 100 },
        { name: "Formatting", score: scores.formatting || 0, fullMark: 100 },
        { name: "Skills", score: scores.skills || 0, fullMark: 100 },
        { name: "Grammar", score: scores.grammar || 0, fullMark: 100 },
        { name: "Clarity", score: scores.clarity || 0, fullMark: 100 }
      ];
      setCategoryData(newCategoryData);
      
      // Generate skill gaps based on the weakest areas in the scores
      // Convert scores into an array of { name, value } sorted by lowest scores first
      const scoreEntries = [
        { name: "Content", value: 100 - (scores.content || 0) },
        { name: "ATS Optimization", value: 100 - (scores.atsOptimization || 0) },
        { name: "Industry Alignment", value: 100 - (scores.industryAlignment || 0) },
        { name: "Formatting", value: 100 - (scores.formatting || 0) },
        { name: "Skills", value: 100 - (scores.skills || 0) },
        { name: "Grammar", value: 100 - (scores.grammar || 0) },
        { name: "Clarity", value: 100 - (scores.clarity || 0) }
      ];
      
      // Filter out areas with high scores (small gaps)
      // Sort by largest gaps (lowest scores) first
      const gapData = scoreEntries
        .filter(item => item.value > 10) // Only show areas with at least a 10% gap
        .sort((a, b) => b.value - a.value) // Sort by largest gaps first
        .slice(0, 5); // Take only the top 5 gaps
      
      setSkillGapData(gapData);
    }
  };

  // When active tab changes, update the chart key to force re-render
  useEffect(() => {
    // Force chart re-render when tab changes
    setChartKey(prev => prev + 1);
    
    // Also trigger animation progress reset and restart
    setAnimationProgress(0);
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeTab]);
  
  // Add window resize handler to ensure charts render properly
  useEffect(() => {
    const handleResize = () => {
      // Debounce resize events
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        setChartKey(prev => prev + 1);
      }, 200);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  // Progress animation for charts
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setAnimationProgress(1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // More aggressive tab change handling
  useEffect(() => {
    // First reset everything
    setChartsReady(false);
    setAnimationProgress(0);
    
    // Force all charts to re-render with new keys
    setTrendChartKey(prev => prev + 1);
    setProgressChartKey(prev => prev + 1);
    setCategoriesChartKey(prev => prev + 1);
    setGapsChartKey(prev => prev + 1);
    
    // Delay chart rendering to ensure DOM is ready
    const renderTimer = setTimeout(() => {
      setChartsReady(true);
    }, 100);
    
    // Start animation after charts are rendered
    const animationTimer = setTimeout(() => {
      setAnimationProgress(1);
    }, 300);
    
    return () => {
      clearTimeout(renderTimer);
      clearTimeout(animationTimer);
    };
  }, [activeTab]);
  
  // Force chart re-render when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      // Hide charts during resize
      setChartsReady(false);
      
      resizeTimeoutRef.current = setTimeout(() => {
        // Update all chart keys
        setTrendChartKey(prev => prev + 1);
        setProgressChartKey(prev => prev + 1);
        setCategoriesChartKey(prev => prev + 1);
        setGapsChartKey(prev => prev + 1);
        
        // Show charts after a small delay
        setTimeout(() => {
          setChartsReady(true);
        }, 50);
      }, 150);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);
  
  // Reset animation when loading state changes
  useEffect(() => {
    if (!isLoading) {
      setChartsReady(true);
      const timer = setTimeout(() => {
        setAnimationProgress(1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-2 rounded-md text-sm shadow-lg border border-gray-700">
          <p className="font-medium">{label}</p>
          <p className="text-blue-300">{`Score: ${payload[0].value}`}</p>
          {payload[0].payload.name && (
            <p className="text-gray-300">{`${payload[0].payload.name}`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for skill gaps
  const GapTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-2 rounded-md text-sm shadow-lg border border-gray-700">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-blue-300">{`Gap: ${payload[0].value}%`}</p>
          <p className="text-gray-300 text-xs mt-1">Lower gap is better</p>
        </div>
      );
    }
    return null;
  };

  // Helper function to display error or loading state
  const renderLoadingOrError = () => {
    if (error) {
      return (
        <div className="h-64 flex items-center justify-center">
          <div className="text-red-400 text-center">
            <p className="mb-2">⚠️ {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-sm px-3 py-1 bg-red-900/30 rounded-md hover:bg-red-900/50 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
    
    if (isLoading) {
      return (
        <div className="h-64 flex items-center justify-center">
          <motion.div 
            className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      );
    }
    
    return null;
  };

  // Create a chart wrapper component to handle visibility
  const ChartWrapper = ({ 
    isVisible, 
    chartKey, 
    ref, 
    children, 
    height 
  }: { 
    isVisible: boolean; 
    chartKey: number; 
    ref: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    height: number | string;
  }) => {
    return (
      <div 
        ref={ref} 
        className={`w-full transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          height: typeof height === 'number' ? `${height}px` : height,
          position: 'relative'
        }}
        key={`chart-wrapper-${chartKey}`}
      >
        {isVisible && children}
      </div>
    );
  };

  return (
    <motion.div
      className={`w-full ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview" className="text-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="progress" className="text-sm">
            CV Progress
          </TabsTrigger>
          <TabsTrigger value="categories" className="text-sm">
            Categories
          </TabsTrigger>
          <TabsTrigger value="gaps" className="text-sm">
            Improvement Areas
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={`tab-content-${activeTab}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-0">
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                <motion.div variants={itemVariants}>
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">CV Score Trend</CardTitle>
                      <CardDescription>Your CV score improvement over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {renderLoadingOrError() || (
                        monthlyData.length === 0 ? (
                          <div className="h-64 flex items-center justify-center">
                            <p className="text-gray-400">No CV data available yet</p>
                          </div>
                        ) : (
                          <ChartWrapper 
                            isVisible={chartsReady && activeTab === "overview"} 
                            chartKey={trendChartKey}
                            ref={trendChartRef}
                            height={250}
                          >
                            <ResponsiveContainer width="100%" height="100%" key={`trend-chart-${trendChartKey}`}>
                              <LineChart 
                                data={monthlyData.slice(0, Math.floor(monthlyData.length * animationProgress))}
                                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                <XAxis dataKey="month" stroke="#888" />
                                <YAxis stroke="#888" domain={[0, 100]} />
                                <Tooltip content={<CustomTooltip />} />
                                <Line
                                  type="monotone"
                                  dataKey="score"
                                  stroke="#8884d8"
                                  strokeWidth={3}
                                  dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }}
                                  activeDot={{ r: 8, stroke: '#8884d8', strokeWidth: 2 }}
                                  isAnimationActive={true}
                                  animationDuration={2000}
                                  animationEasing="ease-in-out"
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </ChartWrapper>
                        )
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Current CV Status</CardTitle>
                      <CardDescription>Overall rating of your current CV</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {renderLoadingOrError() || (
                        currentScore === null ? (
                          <div className="h-64 flex items-center justify-center">
                            <p className="text-gray-400">No score available for your CV</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-[250px]">
                            <motion.div
                              className="relative w-48 h-48"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                  className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.7 }}
                                >
                                  {currentScore}%
                                </motion.div>
                              </div>
                              <svg className="w-full h-full" viewBox="0 0 100 100">
                                <motion.circle
                                  cx="50"
                                  cy="50"
                                  r="45"
                                  fill="transparent"
                                  stroke="#3b3b3b"
                                  strokeWidth="8"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 1, delay: 0.3 }}
                                />
                                <motion.circle
                                  cx="50"
                                  cy="50"
                                  r="45"
                                  fill="transparent"
                                  stroke="url(#gradient)"
                                  strokeWidth="8"
                                  strokeLinecap="round"
                                  strokeDasharray="283"
                                  initial={{ strokeDashoffset: 283 }}
                                  animate={{ strokeDashoffset: 283 * (1 - currentScore/100) }}
                                  transition={{ duration: 1.5, delay: 0.4 }}
                                />
                                <defs>
                                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </motion.div>
                            <motion.p
                              className="mt-4 text-gray-400"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.9 }}
                            >
                              {currentScore >= 90 ? "Excellent" : 
                               currentScore >= 75 ? "Very Good" :
                               currentScore >= 60 ? "Good" :
                               currentScore >= 40 ? "Average" : "Needs Improvement"}
                            </motion.p>
                          </div>
                        )
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>CV Progress Over Time</CardTitle>
                  <CardDescription>
                    View how your CV score has improved with each revision
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderLoadingOrError() || (
                    monthlyData.length === 0 ? (
                      <div className="h-[400px] flex items-center justify-center">
                        <p className="text-gray-400">No CV data available yet</p>
                      </div>
                    ) : (
                      <ChartWrapper 
                        isVisible={chartsReady && activeTab === "progress"} 
                        chartKey={progressChartKey}
                        ref={progressChartRef}
                        height={400}
                      >
                        <ResponsiveContainer width="100%" height="100%" key={`progress-chart-${progressChartKey}`}>
                          <BarChart 
                            data={monthlyData}
                            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="month" stroke="#888" />
                            <YAxis stroke="#888" domain={[0, 100]} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar
                              dataKey="score"
                              name="CV Score"
                              fill="url(#colorGradient)"
                              radius={[8, 8, 0, 0]}
                              animationDuration={2000}
                              animationBegin={300}
                            >
                              {monthlyData.map((entry, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fillOpacity={animationProgress > (index / monthlyData.length) ? 1 : 0.3}
                                />
                              ))}
                            </Bar>
                            <defs>
                              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.5}/>
                              </linearGradient>
                            </defs>
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartWrapper>
                    )
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Categories Tab - Using real data from API */}
            <TabsContent value="categories">
              <Card>
                <CardHeader>
                  <CardTitle>CV Section Performance</CardTitle>
                  <CardDescription>
                    See how different parts of your CV are performing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderLoadingOrError() || (
                    <div>
                      {!currentScoreBreakdown ? (
                        <div className="h-[400px] flex items-center justify-center">
                          <p className="text-gray-400">No detailed score breakdown available yet</p>
                        </div>
                      ) : (
                        <ChartWrapper 
                          isVisible={chartsReady && activeTab === "categories"} 
                          chartKey={categoriesChartKey}
                          ref={categoriesChartRef}
                          height={400}
                        >
                          <ResponsiveContainer width="100%" height="100%" key={`categories-chart-${categoriesChartKey}`}>
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={categoryData}>
                              <PolarGrid />
                              <PolarAngleAxis dataKey="name" />
                              <PolarRadiusAxis domain={[0, 100]} />
                              <Radar
                                name="CV Score Breakdown"
                                dataKey="score"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.6}
                              />
                              <Tooltip />
                              <Legend />
                            </RadarChart>
                          </ResponsiveContainer>
                        </ChartWrapper>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skill Gaps Tab - Now using data derived from actual scores */}
            <TabsContent value="gaps">
              <Card>
                <CardHeader>
                  <CardTitle>Areas for Improvement</CardTitle>
                  <CardDescription>
                    Sections of your CV that need the most attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderLoadingOrError() || (
                    <div>
                      {!currentScoreBreakdown || skillGapData.length === 0 ? (
                        <div className="h-[400px] flex items-center justify-center">
                          <p className="text-gray-400">No improvement areas identified yet</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-400 mb-4">
                            The chart below shows areas with room for improvement, based on your CV analysis scores.
                            Higher values indicate larger gaps that need more attention.
                          </p>
                          <ChartWrapper 
                            isVisible={chartsReady && activeTab === "gaps"} 
                            chartKey={gapsChartKey}
                            ref={gapsChartRef}
                            height={400}
                          >
                            <ResponsiveContainer width="100%" height="100%" key={`gaps-chart-${gapsChartKey}`}>
                              <BarChart
                                data={skillGapData}
                                layout="vertical"
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                <XAxis type="number" domain={[0, 100]} />
                                <YAxis dataKey="name" type="category" width={100} />
                                <Tooltip content={<GapTooltip />} />
                                <Legend />
                                <Bar
                                  dataKey="value"
                                  name="Improvement Needed"
                                  animationDuration={1500}
                                  animationBegin={300}
                                >
                                  {skillGapData.map((entry, index) => (
                                    <Cell 
                                      key={`cell-${index}`} 
                                      fill={COLORS[index % COLORS.length]} 
                                      fillOpacity={animationProgress > (index / skillGapData.length) ? 1 : 0.3}
                                    />
                                  ))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </ChartWrapper>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
}
