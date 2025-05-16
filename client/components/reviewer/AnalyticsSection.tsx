"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, AlertCircleIcon, Award, TrendingUpIcon, FileText, Briefcase, Code, MessageSquare } from "lucide-react";
import { AnalysisData } from "@/types/analysis";
import { CHART_ANIMATIONS } from "./analytics/ChartComponents";

// Import the tab components
import OverviewTab from "./analytics/OverviewTab";
import ScoresTab from "./analytics/ScoresTab";
// Other tab imports will go here...

interface AnalyticsSectionProps {
  analysis: AnalysisData;
}

const AnalyticsSection = ({ analysis }: AnalyticsSectionProps) => {
  // Parse score data from API response
  const scoreBreakdown = {
    overall: analysis.overallScore || 0,
    content: analysis.contentScore || 0,
    ats: analysis.atsOptimizationScore || 0,
    formatting: analysis.formattingScore || 0,
    impact: analysis.industryAlignmentScore || 0,
    skills: analysis.skillsScore || 0,
    grammar: analysis.grammarScore || 0,
    clarity: analysis.clarityScore || 0,
  };
  
  // Radar chart data with animation targets
  const scoreData = [
    { subject: 'Overall', value: scoreBreakdown.overall, fullMark: 100 },
    { subject: 'Content', value: scoreBreakdown.content, fullMark: 100 },
    { subject: 'Formatting', value: scoreBreakdown.formatting, fullMark: 100 },
    { subject: 'ATS', value: scoreBreakdown.ats, fullMark: 100 },
    { subject: 'Skills', value: scoreBreakdown.skills, fullMark: 100 },
    { subject: 'Industry', value: scoreBreakdown.impact, fullMark: 100 },
  ];

  // Issues data
  const issuesByType = [
    { name: 'Grammar', count: analysis.issues?.grammar?.length || 0 },
    { name: 'Format', count: analysis.issues?.format?.length || 0 },
    { name: 'Content', count: analysis.issues?.content?.length || 0 },
    { name: 'ATS', count: analysis.issues?.ats?.length || 0 },
  ].filter(issue => issue.count > 0);

  // Section strength analysis
  const sectionAnalysis = [
    { name: 'Summary', score: analysis.sectionScores?.summary || 0 },
    { name: 'Experience', score: analysis.sectionScores?.experience || 0 },
    { name: 'Education', score: analysis.sectionScores?.education || 0 },
    { name: 'Skills', score: analysis.sectionScores?.skills || 0 },
    { name: 'Header', score: analysis.sectionScores?.header || 0 },
  ].sort((a, b) => b.score - a.score); // Sort by highest score

  // Resume performance metrics with animated icons
  const performanceMetrics = [
    { 
      name: 'ATS Compatibility', 
      value: scoreBreakdown.ats,
      icon: <FileText className="h-4 w-4 text-blue-500" />,
      description: 'How well your resume works with applicant tracking systems'
    },
    { 
      name: 'Industry Alignment', 
      value: scoreBreakdown.impact,
      icon: <Briefcase className="h-4 w-4 text-violet-500" />,
      description: 'How well your resume matches industry expectations'
    },
    { 
      name: 'Skills Relevance', 
      value: scoreBreakdown.skills,
      icon: <Code className="h-4 w-4 text-green-500" />,
      description: 'How relevant your skills are to the target roles'
    },
    { 
      name: 'Content Quality', 
      value: scoreBreakdown.content,
      icon: <MessageSquare className="h-4 w-4 text-yellow-500" />,
      description: 'The overall quality of your resume content'
    },
    { 
      name: 'Formatting', 
      value: scoreBreakdown.formatting,
      icon: <FileText className="h-4 w-4 text-orange-500" />,
      description: 'How well your resume is structured and formatted'
    },
  ];

  // Impact assessment data
  const currentScore = analysis.currentImpactScore || 60;
  const potentialScore = analysis.potentialImprovement || 40;
  const totalScore = currentScore + potentialScore;
  const improvementPercentage = Math.round((potentialScore / totalScore) * 100);
  
  // Animation states for charts
  const [isChartVisible, setIsChartVisible] = useState({
    score: false,
    issues: false,
    sections: false,
    impact: false,
    ats: false,
    skills: false
  });

  // Animated tab state
  const [activeTab, setActiveTab] = useState('overview');
  const controls = useAnimation();

  // Refs for scroll animation
  const chartRefs = {
    score: useRef<HTMLDivElement>(null),
    issues: useRef<HTMLDivElement>(null),
    sections: useRef<HTMLDivElement>(null),
    impact: useRef<HTMLDivElement>(null),
    ats: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null)
  };

  // Set up intersection observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-10% 0px'
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        // For each chart ref, check if it's intersecting and update visibility state
        Object.keys(chartRefs).forEach(key => {
          const typedKey = key as keyof typeof chartRefs;
          if (entry.target === chartRefs[typedKey].current && entry.isIntersecting) {
            setIsChartVisible(prev => ({ ...prev, [key]: true }));
          }
        });
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe all chart refs
    Object.values(chartRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Animate tab change
  useEffect(() => {
    const animateTabChange = async () => {
      await controls.start({ opacity: 0, y: 20, transition: { duration: 0.2 } });
      await controls.start({ opacity: 1, y: 0, transition: { duration: 0.4 } });
    };
    
    animateTabChange();
  }, [activeTab, controls]);

  return (
    <div className="space-y-12">
      <motion.h2 
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      >
        Resume Performance Analytics
      </motion.h2>
      
      {/* Performance Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
          <Card className="bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <motion.div 
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                >
                  <Target className="h-4 w-4 text-primary" />
                </motion.div>
                Overall Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <motion.div 
                  className="text-3xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {scoreBreakdown.overall}%
                </motion.div>
                <Badge variant={scoreBreakdown.overall >= 70 ? "success" : scoreBreakdown.overall >= 50 ? "warning" : "destructive"}>
                  {scoreBreakdown.overall >= 70 ? "Good" : scoreBreakdown.overall >= 50 ? "Average" : "Needs Work"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
          <Card className="bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                >
                  <AlertCircleIcon className="h-4 w-4 text-destructive" />
                </motion.div>
                Issues Found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <motion.div 
                  className="text-3xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {Object.values(analysis.issues || {}).reduce((acc, issues) => acc + (issues?.length || 0), 0)}
                </motion.div>
                <Badge variant="outline" className="border-destructive text-destructive">
                  To Fix
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Strongest section */}
        <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
          <Card className="bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <motion.div
                  animate={{ 
                    y: [0, -3, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Award className="h-4 w-4 text-primary" />
                </motion.div>
                Strongest Section
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <motion.div 
                  className="text-xl font-bold truncate pr-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  {sectionAnalysis.length > 0 ? sectionAnalysis[0].name : 'None'}
                </motion.div>
                <Badge variant="outline" className="text-primary border-primary">
                  {sectionAnalysis.length > 0 ? sectionAnalysis[0].score : 0}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
          <Card className="bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <motion.div
                  animate={{ 
                    rotate: [0, 15, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5 }}
                >
                  <TrendingUpIcon className="h-4 w-4 text-green-500" />
                </motion.div>
                ATS Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <motion.div 
                  className="text-3xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                  {scoreBreakdown.ats}%
                </motion.div>
                <Badge variant={scoreBreakdown.ats >= 70 ? "success" : scoreBreakdown.ats >= 50 ? "warning" : "destructive"}>
                  {scoreBreakdown.ats >= 70 ? "Strong" : scoreBreakdown.ats >= 50 ? "Moderate" : "Weak"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Tab Navigation */}
      <Tabs 
        defaultValue="overview" 
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8">
          {['overview', 'scores', 'sections', 'ats', 'skills', 'improvement'].map((tab, index) => (
            <motion.div
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TabsTrigger 
                value={tab}
                className="relative overflow-hidden"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </TabsTrigger>
            </motion.div>
          ))}
        </TabsList>
        
        {/* Tab Content with Animation */}
        <motion.div animate={controls}>
          {/* Overview Tab */}
          <TabsContent value="overview">
            <OverviewTab 
              scoreData={scoreData}
              performanceMetrics={performanceMetrics}
              issuesByType={issuesByType}
              scoreBreakdown={scoreBreakdown}
              isChartVisible={isChartVisible}
              chartRefs={chartRefs}
            />
          </TabsContent>
          
          {/* Score Details Tab */}
          <TabsContent value="scores">
            <ScoresTab scoreBreakdown={scoreBreakdown} />
          </TabsContent>
          
          {/* Add other tab content here */}
          <TabsContent value="sections">
            <motion.div 
              className="text-center text-muted-foreground p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Section Analysis will be added here
            </motion.div>
          </TabsContent>
          
          <TabsContent value="ats">
            <motion.div 
              className="text-center text-muted-foreground p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              ATS Compatibility will be added here
            </motion.div>
          </TabsContent>
          
          <TabsContent value="skills">
            <motion.div 
              className="text-center text-muted-foreground p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Skills Analysis will be added here
            </motion.div>
          </TabsContent>
          
          <TabsContent value="improvement">
            <motion.div 
              className="text-center text-muted-foreground p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Improvement Plan will be added here
            </motion.div>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  );
};

export default AnalyticsSection;
