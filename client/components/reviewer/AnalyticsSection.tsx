"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  PieChart, Pie, Cell
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalysisData } from "@/types/analysis";

interface AnalyticsSectionProps {
  analysis: AnalysisData;
}

const AnalyticsSection = ({ analysis }: AnalyticsSectionProps) => {
  // Score breakdown for radar chart
  const scoreData = [
    { subject: 'Overall', value: analysis.overallScore || 0, fullMark: 100 },
    { subject: 'Content', value: analysis.contentScore || 0, fullMark: 100 },
    { subject: 'Format', value: analysis.formatScore || 0, fullMark: 100 },
    { subject: 'Grammar', value: analysis.grammarScore || 0, fullMark: 100 },
    { subject: 'Clarity', value: analysis.clarityScore || 0, fullMark: 100 },
  ];

  // Data for issues found chart
  const issuesByType = [
    { name: 'Grammar', count: analysis.issues?.grammar?.length || 0 },
    { name: 'Format', count: analysis.issues?.format?.length || 0 },
    { name: 'Content', count: analysis.issues?.content?.length || 0 },
    { name: 'ATS', count: analysis.issues?.ats?.length || 0 },
  ].filter(issue => issue.count > 0);

  // Section strength analysis
  const sectionAnalysis = [
    { name: 'Header', score: analysis.sectionScores?.header || 0 },
    { name: 'Summary', score: analysis.sectionScores?.summary || 0 },
    { name: 'Experience', score: analysis.sectionScores?.experience || 0 },
    { name: 'Education', score: analysis.sectionScores?.education || 0 },
    { name: 'Skills', score: analysis.sectionScores?.skills || 0 },
  ];

  // Impact assessment pie chart
  const impactData = [
    { name: 'Current', value: analysis.currentImpactScore || 60 },
    { name: 'Potential Improvement', value: analysis.potentialImprovement || 40 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F'];

  // Intersection observer hooks for animations
  const [isScoreChartVisible, setIsScoreChartVisible] = useState(false);
  const [isIssuesChartVisible, setIsIssuesChartVisible] = useState(false);
  const [isSectionChartVisible, setIsSectionChartVisible] = useState(false);
  const [isImpactChartVisible, setIsImpactChartVisible] = useState(false);

  const scoreChartRef = useRef<HTMLDivElement>(null);
  const issuesChartRef = useRef<HTMLDivElement>(null);
  const sectionChartRef = useRef<HTMLDivElement>(null);
  const impactChartRef = useRef<HTMLDivElement>(null);




  console.log("This file is working")

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-10% 0px'
    };

    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.target === scoreChartRef.current && entry.isIntersecting) {
          setIsScoreChartVisible(true);
        }
        if (entry.target === issuesChartRef.current && entry.isIntersecting) {
          setIsIssuesChartVisible(true);
        }
        if (entry.target === sectionChartRef.current && entry.isIntersecting) {
          setIsSectionChartVisible(true);
        }
        if (entry.target === impactChartRef.current && entry.isIntersecting) {
          setIsImpactChartVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    if (scoreChartRef.current) observer.observe(scoreChartRef.current);
    if (issuesChartRef.current) observer.observe(issuesChartRef.current);
    if (sectionChartRef.current) observer.observe(sectionChartRef.current);
    if (impactChartRef.current) observer.observe(impactChartRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="mt-12 space-y-12">
      <motion.h2 
        className="text-2xl font-bold text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Resume Performance Analytics
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Score Overview Chart */}
        <motion.div 
          ref={scoreChartRef}
          className="col-span-1"
          initial={{ opacity: 0, y: 50 }}
          animate={isScoreChartVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-black/30 border border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Score Breakdown</CardTitle>
              <CardDescription className="text-gray-300">
                How your resume scores across different categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={scoreData}>
                    <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'white' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'white' }} />
                    <Radar 
                      name="Score" 
                      dataKey="value" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.6} 
                    />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Issues Found Chart */}
        <motion.div 
          ref={issuesChartRef}
          className="col-span-1"
          initial={{ opacity: 0, y: 50 }}
          animate={isIssuesChartVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-black/30 border border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Issues Identified</CardTitle>
              <CardDescription className="text-gray-300">
                Number of issues found by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={issuesByType}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis dataKey="name" tick={{ fill: 'white' }} />
                    <YAxis tick={{ fill: 'white' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} 
                      cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                    />
                    <Bar 
                      dataKey="count" 
                      name="Issues" 
                      fill="#ff5500" 
                      radius={[4, 4, 0, 0]} 
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Section Analysis Chart */}
        <motion.div 
          ref={sectionChartRef}
          className="col-span-1"
          initial={{ opacity: 0, y: 50 }}
          animate={isSectionChartVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-black/30 border border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Section Strength</CardTitle>
              <CardDescription className="text-gray-300">
                Performance of different resume sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={sectionAnalysis}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis 
                      type="number" 
                      domain={[0, 100]} 
                      tick={{ fill: 'white' }} 
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tick={{ fill: 'white' }} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} 
                      cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                    />
                    <Bar 
                      dataKey="score" 
                      fill="#4c1d95" 
                      radius={[0, 4, 4, 0]} 
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Impact Assessment Chart */}
        <motion.div 
          ref={impactChartRef}
          className="col-span-1"
          initial={{ opacity: 0, y: 50 }}
          animate={isImpactChartVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-black/30 border border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Impact Assessment</CardTitle>
              <CardDescription className="text-gray-300">
                Potential improvement after implementing suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={impactData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      animationDuration={1500}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {impactData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
