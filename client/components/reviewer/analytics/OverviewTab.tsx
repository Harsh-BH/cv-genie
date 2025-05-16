"use client";

import { useRef } from 'react';
import { motion } from "framer-motion";
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  ResponsiveContainer, Tooltip as RechartsTooltip, PieChart, Pie, Cell
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { CheckCircleIcon } from "lucide-react";
import { CustomTooltip, CHART_COLORS } from "./ChartComponents";
import { AnalysisData } from "@/types/analysis";

interface OverviewTabProps {
  scoreData: Array<{ subject: string, value: number, fullMark: number }>;
  performanceMetrics: Array<{ 
    name: string;
    value: number;
    icon: React.ReactNode;
    description: string;
  }>;
  issuesByType: Array<{ name: string, count: number }>;
  scoreBreakdown: { 
    impact: number; 
    [key: string]: number;
  };
  isChartVisible: {
    score: boolean;
    issues: boolean;
    [key: string]: boolean;
  };
  chartRefs: {
    score: React.RefObject<HTMLDivElement>;
    issues: React.RefObject<HTMLDivElement>;
    [key: string]: React.RefObject<HTMLDivElement>;
  };
}

const OverviewTab = ({ scoreData, performanceMetrics, issuesByType, scoreBreakdown, isChartVisible, chartRefs }: OverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Radar Chart showing all score dimensions */}
      <motion.div 
        ref={chartRefs.score}
        className="col-span-1"
        initial={{ opacity: 0, y: 50 }}
        animate={isChartVisible.score ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card className="bg-background/50 border border-muted backdrop-blur-sm h-full">
          <CardHeader>
            <CardTitle>Performance Radar</CardTitle>
            <CardDescription>
              Overall performance across all dimensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={scoreData}>
                  <PolarGrid stroke="hsl(var(--muted))" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} 
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: 'hsl(var(--foreground))' }} 
                  />
                  <Radar 
                    name="Score" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.3} 
                    animationBegin={300}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <RechartsTooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Performance metrics */}
      <motion.div
        className="col-span-1"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <Card className="bg-background/50 border border-muted backdrop-blur-sm h-full">
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
            <CardDescription>
              Essential metrics for resume performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {performanceMetrics.map((metric, index) => (
              <div key={metric.name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2">
                          {metric.icon}
                          <span className="text-sm font-medium">{metric.name}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[200px] text-xs">
                        {metric.description}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Badge 
                    variant={metric.value >= 70 ? "success" : metric.value >= 50 ? "warning" : "destructive"}
                    className="ml-2"
                  >
                    {metric.value}%
                  </Badge>
                </div>
                <Progress 
                  value={metric.value} 
                  className="h-1.5"
                  indicatorClassName={
                    metric.value >= 70 ? "bg-green-500" : 
                    metric.value >= 50 ? "bg-yellow-500" : 
                    "bg-red-500"
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Industry Alignment Donut */}
      <motion.div
        className="col-span-1"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <Card className="bg-background/50 border border-muted backdrop-blur-sm h-full">
          <CardHeader>
            <CardTitle>Industry Alignment</CardTitle>
            <CardDescription>
              How well your resume matches industry expectations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Alignment', value: scoreBreakdown.impact },
                      { name: 'Gap', value: 100 - scoreBreakdown.impact }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={0}
                    dataKey="value"
                    animationBegin={300}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    <Cell fill="hsl(var(--primary))" stroke="hsl(var(--background))" />
                    <Cell fill="hsl(var(--muted))" stroke="hsl(var(--background))" />
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center -mt-8">
                <div className="text-4xl font-bold">{scoreBreakdown.impact}%</div>
                <p className="text-sm text-muted-foreground">Industry Alignment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Issues by Category */}
      <motion.div
        ref={chartRefs.issues}
        className="col-span-1"
        initial={{ opacity: 0, y: 50 }}
        animate={isChartVisible.issues ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <Card className="bg-background/50 border border-muted backdrop-blur-sm h-full">
          <CardHeader>
            <CardTitle>Issues by Category</CardTitle>
            <CardDescription>
              Distribution of issues found in your resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {issuesByType.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={issuesByType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      animationBegin={300}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    >
                      {issuesByType.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={CHART_COLORS.ISSUE_COLORS[entry.name as keyof typeof CHART_COLORS.ISSUE_COLORS] || 
                              CHART_COLORS.PIE_COLORS[index % CHART_COLORS.PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col h-full items-center justify-center text-center">
                  <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4" />
                  <p className="font-medium text-lg">No issues detected!</p>
                  <p className="text-sm text-muted-foreground mt-2">Your resume looks good in all categories</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OverviewTab;
