"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  PieChart, Pie, Cell
} from "recharts";
import ScrollDetection from "@/components/shared/ScrollDetection";
import { AnalysisData } from "@/types/analysis";

interface AnalyticsSectionProps {
  analysis: AnalysisData;
}

const AnalyticsSection = ({ analysis }: AnalyticsSectionProps) => {
  // Initialize state to track whether charts are loaded
  const [chartsVisible, setChartsVisible] = useState(false);

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

  // If no issues found, add dummy data to show something
  if (issuesByType.length === 0) {
    issuesByType.push({ name: 'No Issues', count: 0 });
  }

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

  // Show charts after a delay
  useEffect(() => {
    // Set a timeout to show charts after component mounts
    const timer = setTimeout(() => {
      setChartsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-10">
      {/* Add ScrollDetection to debug scroll issues */}
      <ScrollDetection />
      
      <motion.h2 
        className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Resume Performance Analytics
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Charts remain the same but with increased spacing/height */}
        {/* Score Overview Chart */}
        <motion.div
          className="min-h-[400px] bg-black/30 border border-white/10 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: chartsVisible ? 1 : 0, y: chartsVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* ...existing chart code... */}
          <div className="p-5 border-b border-white/10">
            <h3 className="text-xl font-bold text-white">Score Breakdown</h3>
            <p className="text-gray-300 text-sm mt-1">How your resume scores across different categories</p>
          </div>
          <div className="p-4 h-[320px]">
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
                  isAnimationActive={chartsVisible}
                />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Other charts... */}
        {/* ...existing chart code with same height increases... */}

        {/* Issues Found Chart */}
        <motion.div
          className="min-h-[400px] bg-black/30 border border-white/10 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: chartsVisible ? 1 : 0, y: chartsVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="p-5 border-b border-white/10">
            <h3 className="text-xl font-bold text-white">Issues Identified</h3>
            <p className="text-gray-300 text-sm mt-1">Number of issues found by category</p>
          </div>
          <div className="p-4 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={issuesByType} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis type="number" tick={{ fill: 'white' }} />
                <YAxis dataKey="name" type="category" tick={{ fill: 'white' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                />
                <Bar 
                  dataKey="count" 
                  name="Issues" 
                  fill="#ff5500" 
                  radius={[0, 4, 4, 0]} 
                  isAnimationActive={chartsVisible}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Section Analysis Chart */}
        <motion.div
          className="min-h-[400px] bg-black/30 border border-white/10 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: chartsVisible ? 1 : 0, y: chartsVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="p-5 border-b border-white/10">
            <h3 className="text-xl font-bold text-white">Section Strength</h3>
            <p className="text-gray-300 text-sm mt-1">Performance of different resume sections</p>
          </div>
          <div className="p-4 h-[320px]">
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
                  isAnimationActive={chartsVisible}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Impact Assessment Chart */}
        <motion.div
          className="min-h-[400px] bg-black/30 border border-white/10 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: chartsVisible ? 1 : 0, y: chartsVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="p-5 border-b border-white/10">
            <h3 className="text-xl font-bold text-white">Impact Assessment</h3>
            <p className="text-gray-300 text-sm mt-1">Potential improvement after implementing suggestions</p>
          </div>
          <div className="p-4 h-[320px]">
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
                  isAnimationActive={chartsVisible}
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
        </motion.div>
      </div>
      
      {/* Add plenty of space at the bottom */}
      <div className="h-96 flex items-center justify-center">
        <p className="text-white/50 text-center">
          Review complete! You can implement the suggestions to improve your resume.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsSection;
