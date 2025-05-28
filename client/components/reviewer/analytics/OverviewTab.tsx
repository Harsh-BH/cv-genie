"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from "framer-motion";
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  ResponsiveContainer, Tooltip as RechartsTooltip, PieChart, Pie, Cell,
  Sector
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { CheckCircleIcon } from "lucide-react";
import { CustomTooltip, CHART_COLORS, CHART_ANIMATIONS, useChartColors } from "./ChartComponents";
import { AnalysisData } from "@/types/analysis";
import { useTheme } from "next-themes";

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

// Animated Radar component with hover effects
const AnimatedRadar = ({ data }: { data: Array<{ subject: string, value: number, fullMark: number }> }) => {
  const [animatedData, setAnimatedData] = useState(data.map(item => ({ ...item, value: 0 })));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { gridColor, axisColor } = useChartColors();
  
  useEffect(() => {
    // Animate the radar fill from center outward
    const timer = setTimeout(() => {
      data.forEach((item, index) => {
        setTimeout(() => {
          setAnimatedData(prev => 
            prev.map((prevItem, i) => 
              i === index ? { ...prevItem, value: item.value } : prevItem
            )
          );
        }, index * 150);
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [data]);
  
  // Custom interactive radar with hover effect
  const handleMouseEnter = (data: any, e: React.MouseEvent<SVGPolygonElement, MouseEvent>) => {
    // Use the activeIndex or payload from the data instead
    if (data && data.activeIndex !== undefined) {
      setHoveredIndex(data.activeIndex);
    }
  };
  
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

   return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart outerRadius={90} data={animatedData} onMouseLeave={handleMouseLeave}>
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <PolarGrid stroke={gridColor} strokeWidth={0.5} />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: axisColor, fontSize: 12 }} 
          tickLine={false}
        />
        <PolarRadiusAxis 
          angle={30} 
          domain={[0, 100]} 
          tick={{ fill: axisColor }}
          stroke={gridColor}
          tickCount={5}
          strokeDasharray="3 3"
        />
        <Radar 
          name="Score" 
          dataKey="value" 
          stroke="hsl(var(--primary))"
          strokeWidth={hoveredIndex !== null ? 3 : 2}
          fill="hsl(var(--primary))" 
          fillOpacity={0.5}
          filter={hoveredIndex !== null ? "url(#glow)" : undefined}
          animationBegin={300}
          animationDuration={1500}
          animationEasing="ease-out"
          onMouseEnter={handleMouseEnter}
        />
        <RechartsTooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

// 1. First, fix the renderActiveShape function to use appropriate text colors in dark mode
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const textColor = isDark ? '#ffffff' : 'hsl(var(--foreground))';
  const subTextColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'hsl(var(--muted-foreground))';
  
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        filter="url(#glow2)"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 6}
        outerRadius={innerRadius - 2}
        fill={fill}
      />
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={textColor}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 15} textAnchor="middle" fill={textColor} fontSize={20} fontWeight="bold">
        {value}
      </text>
      <text x={cx} y={cy + 35} textAnchor="middle" fill={subTextColor}>
        {`(${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

// 2. Update the ImpactDonutChart component to use more visible colors in dark mode
const ImpactDonutChart = ({ score }: { score: number }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          if (prev < score) {
            return Math.min(prev + 2, score);
          }
          clearInterval(interval);
          return prev;
        });
      }, 20);
      
      return () => clearInterval(interval);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [score]);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <defs>
          <linearGradient id="impactGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDark ? "#8b5cf6" : "hsl(var(--primary))"} stopOpacity={1} />
            <stop offset="100%" stopColor={isDark ? "#6d28d9" : "hsl(var(--primary))"} stopOpacity={0.8} />
          </linearGradient>
          <linearGradient id="emptySectionGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDark ? "#4b5563" : "hsl(var(--muted))"} stopOpacity={isDark ? 0.5 : 1} />
            <stop offset="100%" stopColor={isDark ? "#374151" : "hsl(var(--muted))"} stopOpacity={isDark ? 0.3 : 0.8} />
          </linearGradient>
        </defs>
        <Pie
          data={[
            { name: 'Alignment', value: animatedScore },
            { name: 'Gap', value: 100 - animatedScore }
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
          stroke={isDark ? "#1f2937" : "hsl(var(--background))"}
          strokeWidth={2}
        >
          <Cell fill="url(#impactGradient)" />
          <Cell fill="url(#emptySectionGradient)" />
        </Pie>
        <RechartsTooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

// 3. Update the AnimatedPieChart component to ensure slices are visible in dark mode
const AnimatedPieChart = ({ data, innerRadius = 60, outerRadius = 80 }: { 
  data: Array<{ name: string, count: number }>,
  innerRadius?: number,
  outerRadius?: number
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();
  const chartColors = useChartColors();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  useEffect(() => {
    if (data.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % data.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [data]);
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
    setIsAnimating(true);
    
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.5 }
    });
  };
  
  const onPieLeave = () => {
    setIsAnimating(false);
  };
  
  return (
    <motion.div className="w-full h-full" animate={controls}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* Add specific gradients for each category to ensure visibility in dark mode */}
            {Object.keys(chartColors.ISSUE_COLORS).map(key => (
              <linearGradient 
                key={`gradient-${key}`} 
                id={`gradient-${key}`} 
                x1="0" y1="0" x2="0" y2="1"
              >
                <stop 
                  offset="0%" 
                  stopColor={chartColors.ISSUE_COLORS[key as keyof typeof chartColors.ISSUE_COLORS]} 
                  stopOpacity={1} 
                />
                <stop 
                  offset="100%" 
                  stopColor={chartColors.ISSUE_COLORS[key as keyof typeof chartColors.ISSUE_COLORS]} 
                  stopOpacity={0.7} 
                />
              </linearGradient>
            ))}
          </defs>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey="count"
            nameKey="name"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            animationBegin={300}
            animationDuration={1500}
            animationEasing="ease-out"
            stroke={isDark ? "#1f2937" : "#ffffff"}
            strokeWidth={1.5}
          >
            {data.map((entry, index) => {
              const key = entry.name as keyof typeof chartColors.ISSUE_COLORS;
              const fill = key in chartColors.ISSUE_COLORS 
                ? `url(#gradient-${key})` 
                : chartColors.PIE_COLORS[index % chartColors.PIE_COLORS.length];
              
              return <Cell key={`cell-${index}`} fill={fill} />;
            })}
          </Pie>
          <RechartsTooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

const OverviewTab = ({ scoreData, performanceMetrics, issuesByType, scoreBreakdown, isChartVisible, chartRefs }: OverviewTabProps) => {
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Radar Chart showing all score dimensions */}
      <motion.div 
        ref={chartRefs.score}
        className="col-span-1"
        initial={{ opacity: 0, y: 50 }}
        animate={isChartVisible.score ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      >
        <Card className="bg-background/50 border border-muted backdrop-blur-sm h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <motion.div 
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              >📊</motion.div> 
              Performance Radar
            </CardTitle>
            <CardDescription>
              Overall performance across all dimensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <AnimatedRadar data={scoreData} />
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
            <CardTitle className="flex items-center gap-2">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >🎯</motion.div>
              Key Metrics
            </CardTitle>
            <CardDescription>
              Essential metrics for resume performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {performanceMetrics.map((metric, index) => (
              <motion.div 
                key={metric.name} 
                className="space-y-1.5"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.03, 
                  transition: { duration: 0.2 } 
                }}
                onHoverStart={() => setHoveredMetric(index)}
                onHoverEnd={() => setHoveredMetric(null)}
              >
                <div className="flex items-center justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={hoveredMetric === index ? { 
                              rotate: [0, 10, 0, -10, 0],
                              scale: [1, 1.1, 1],
                              transition: { duration: 1, repeat: Infinity, repeatType: "loop" }
                            } : {}}
                          >
                            {metric.icon}
                          </motion.div>
                          <span className="text-sm font-medium">{metric.name}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[200px] text-xs">
                        {metric.description}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Badge 
                    variant={metric.value >= 70 ? "default" : metric.value >= 50 ? "secondary" : "destructive"}
                    className={`ml-2 transition-all duration-300 ${
                      metric.value >= 70 ? "bg-green-500 text-white" : 
                      metric.value >= 50 ? "bg-yellow-500 text-white" : 
                      ""
                    } ${hoveredMetric === index ? 'scale-110' : ''}`}
                  >
                    {metric.value}%
                  </Badge>
                </div>
                <Progress 
                  value={hoveredMetric === index ? 100 : metric.value} 
                  className="h-1.5"
                  indicatorClassName={
                    metric.value >= 70 ? "bg-green-500" : 
                    metric.value >= 50 ? "bg-yellow-500" : 
                    "bg-red-500"
                  }
                />
              </motion.div>
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
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      >
        <Card className="bg-background/50 border border-muted backdrop-blur-sm h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <motion.div 
                animate={{ 
                  y: [0, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              >🎖️</motion.div>
              Industry Alignment
            </CardTitle>
            <CardDescription>
              How well your resume matches industry expectations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex flex-col items-center justify-center">
              <ImpactDonutChart score={scoreBreakdown.impact} />
              <motion.div 
                className="text-center -mt-8"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <motion.div 
                  className="text-4xl font-bold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, delay: 2, repeat: 1 }}
                >
                  {scoreBreakdown.impact}%
                </motion.div>
                <p className="text-sm text-muted-foreground">Industry Alignment</p>
              </motion.div>
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
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      >
        <Card className="bg-background/50 border border-muted backdrop-blur-sm h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 5, repeat: Infinity, repeatDelay: 5 }}
              >⚠️</motion.div>
              Issues by Category
            </CardTitle>
            <CardDescription>
              Distribution of issues found in your resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {issuesByType.length > 0 ? (
                <AnimatedPieChart data={issuesByType} />
              ) : (
                <motion.div 
                  className="flex flex-col h-full items-center justify-center text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1], 
                      rotate: [0, 10, 0, -10, 0] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "loop",
                      repeatDelay: 1
                    }}
                  >
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4" />
                  </motion.div>
                  <p className="font-medium text-lg">No issues detected!</p>
                  <p className="text-sm text-muted-foreground mt-2">Your resume looks good in all categories</p>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OverviewTab;
