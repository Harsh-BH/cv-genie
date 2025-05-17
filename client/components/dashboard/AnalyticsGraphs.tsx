"use client";

import React, { useState, useEffect } from "react";
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
} from "recharts";

// Mock data for analytics (will be replaced with actual API data)
const MOCK_MONTHLY_SCORES = [
  { month: "Jan", score: 72 },
  { month: "Feb", score: 76 },
  { month: "Mar", score: 78 },
  { month: "Apr", score: 75 },
  { month: "May", score: 82 },
  { month: "Jun", score: 87 },
  { month: "Jul", score: 88 },
];

const MOCK_CATEGORY_SCORES = [
  { name: "Format", score: 85, fullMark: 100 },
  { name: "Content", score: 78, fullMark: 100 },
  { name: "Skills", score: 92, fullMark: 100 },
  { name: "Experience", score: 84, fullMark: 100 },
  { name: "Education", score: 88, fullMark: 100 },
];

const MOCK_SKILL_GAPS = [
  { name: "Technical Skills", value: 30 },
  { name: "Soft Skills", value: 15 },
  { name: "Domain Knowledge", value: 25 },
  { name: "Certifications", value: 20 },
  { name: "Languages", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

interface AnalyticsGraphsProps {
  userId?: string;
  className?: string;
}

export default function AnalyticsGraphs({ userId, className = "" }: AnalyticsGraphsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState(MOCK_MONTHLY_SCORES);
  const [categoryData, setCategoryData] = useState(MOCK_CATEGORY_SCORES);
  const [skillGapData, setSkillGapData] = useState(MOCK_SKILL_GAPS);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
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
        </div>
      );
    }
    return null;
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
            Skill Gaps
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
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
                      {isLoading ? (
                        <div className="h-64 flex items-center justify-center">
                          <motion.div 
                            className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={monthlyData.slice(0, Math.floor(monthlyData.length * animationProgress))}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="month" stroke="#888" />
                            <YAxis stroke="#888" domain={[50, 100]} />
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
                      {isLoading ? (
                        <div className="h-64 flex items-center justify-center">
                          <motion.div 
                            className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
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
                                88%
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
                                animate={{ strokeDashoffset: 283 * (1 - 0.88) }}
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
                            Excellent CV performance
                          </motion.p>
                        </div>
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
                  {isLoading ? (
                    <div className="h-[400px] flex items-center justify-center">
                      <motion.div 
                        className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="month" stroke="#888" />
                        <YAxis stroke="#888" domain={[50, 100]} />
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
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories">
              <Card>
                <CardHeader>
                  <CardTitle>CV Section Performance</CardTitle>
                  <CardDescription>
                    See how different parts of your CV are performing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-[400px] flex items-center justify-center">
                      <motion.div 
                        className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={400}>
                      <RadialBarChart 
                        cx="50%" 
                        cy="50%" 
                        innerRadius="15%" 
                        outerRadius="80%" 
                        barSize={20} 
                        data={categoryData}
                        startAngle={180}
                        endAngle={-180}
                      >
                        <RadialBar
                          minAngle={15}
                          background
                          clockWise={true}
                          dataKey="score"
                          cornerRadius={8}
                          animationBegin={400}
                          animationDuration={1500}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={COLORS[index % COLORS.length]} 
                              fillOpacity={animationProgress > (index / categoryData.length) ? 0.8 : 0.3}
                            />
                          ))}
                        </RadialBar>
                        <Legend
                          iconType="circle"
                          layout="vertical"
                          verticalAlign="middle"
                          align="right"
                          wrapperStyle={{ paddingLeft: "10px" }}
                        />
                        <Tooltip />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skill Gaps Tab */}
            <TabsContent value="gaps">
              <Card>
                <CardHeader>
                  <CardTitle>Identified Skill Gaps</CardTitle>
                  <CardDescription>
                    Areas that need improvement in your CV
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-[400px] flex items-center justify-center">
                      <motion.div 
                        className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          data={skillGapData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          animationBegin={500}
                          animationDuration={1500}
                        >
                          {skillGapData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={COLORS[index % COLORS.length]} 
                              opacity={animationProgress > (index / skillGapData.length) ? 1 : 0.4}
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name) => [`${value}%`, name]} 
                          contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.375rem' }}
                          itemStyle={{ color: '#e5e7eb' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
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
