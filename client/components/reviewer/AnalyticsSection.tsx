"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, AlertCircleIcon, Award, TrendingUpIcon, FileText, Briefcase, Code, MessageSquare } from "lucide-react";
import { AnalysisData } from "@/types/analysis";

// Import the tab components
import OverviewTab from "./analytics/OverviewTab";
import ScoresTab from "./analytics/ScoresTab";
// Other tab imports will go here...

interface AnalyticsSectionProps {
  analysis: AnalysisData;
}

const AnalyticsSection = ({ analysis }: AnalyticsSectionProps) => {
  // Parse score data from API response

  console.log("Analysis Data:", analysis);
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
  
  // Radar chart data
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

  // Resume performance metrics
  const performanceMetrics = [
    { 
      name: 'ATS Compatibility', 
      value: scoreBreakdown.ats,
      icon: <FileText className="h-4 w-4" />,
      description: 'How well your resume works with applicant tracking systems'
    },
    { 
      name: 'Industry Alignment', 
      value: scoreBreakdown.impact,
      icon: <Briefcase className="h-4 w-4" />,
      description: 'How well your resume matches industry expectations'
    },
    { 
      name: 'Skills Relevance', 
      value: scoreBreakdown.skills,
      icon: <Code className="h-4 w-4" />,
      description: 'How relevant your skills are to the target roles'
    },
    { 
      name: 'Content Quality', 
      value: scoreBreakdown.content,
      icon: <MessageSquare className="h-4 w-4" />,
      description: 'The overall quality of your resume content'
    },
    { 
      name: 'Formatting', 
      value: scoreBreakdown.formatting,
      icon: <FileText className="h-4 w-4" />,
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
        <Card className="bg-background/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" /> Overall Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{scoreBreakdown.overall}%</div>
              <Badge variant={scoreBreakdown.overall >= 70 ? "success" : scoreBreakdown.overall >= 50 ? "warning" : "destructive"}>
                {scoreBreakdown.overall >= 70 ? "Good" : scoreBreakdown.overall >= 50 ? "Average" : "Needs Work"}
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-background/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircleIcon className="h-4 w-4 text-destructive" /> Issues Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">
                {Object.values(analysis.issues || {}).reduce((acc, issues) => acc + (issues?.length || 0), 0)}
              </div>
              <Badge variant="outline" className="border-destructive text-destructive">
                To Fix
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        {/* Strongest section */}
        <Card className="bg-background/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" /> Strongest Section
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-xl font-bold truncate pr-2">
                {sectionAnalysis.length > 0 ? sectionAnalysis[0].name : 'None'}
              </div>
              <Badge variant="outline" className="text-primary border-primary">
                {sectionAnalysis.length > 0 ? sectionAnalysis[0].score : 0}%
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-background/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUpIcon className="h-4 w-4 text-green-500" /> ATS Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{scoreBreakdown.ats}%</div>
              <Badge variant={scoreBreakdown.ats >= 70 ? "success" : scoreBreakdown.ats >= 50 ? "warning" : "destructive"}>
                {scoreBreakdown.ats >= 70 ? "Strong" : scoreBreakdown.ats >= 50 ? "Moderate" : "Weak"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tab Navigation */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="scores">Score Details</TabsTrigger>
          <TabsTrigger value="sections">Section Analysis</TabsTrigger>
          <TabsTrigger value="ats">ATS Compatibility</TabsTrigger>
          <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
          <TabsTrigger value="improvement">Improvement Plan</TabsTrigger>
        </TabsList>
        
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
          <div className="text-center text-muted-foreground p-8">Section Analysis will be added here</div>
        </TabsContent>
        
        <TabsContent value="ats">
          <div className="text-center text-muted-foreground p-8">ATS Compatibility will be added here</div>
        </TabsContent>
        
        <TabsContent value="skills">
          <div className="text-center text-muted-foreground p-8">Skills Analysis will be added here</div>
        </TabsContent>
        
        <TabsContent value="improvement">
          <div className="text-center text-muted-foreground p-8">Improvement Plan will be added here</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsSection;
