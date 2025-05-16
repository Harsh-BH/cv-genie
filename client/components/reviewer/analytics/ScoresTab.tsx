"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";
import { CustomTooltip, CHART_ANIMATIONS } from "./ChartComponents";

interface ScoreBreakdown {
  overall: number;
  content: number;
  ats: number;
  formatting: number;
  impact: number;
  skills: number;
  grammar: number;
  clarity: number;
}

interface ScoresTabProps {
  scoreBreakdown: ScoreBreakdown;
}

// Helper function to get score interpretation
function getScoreInterpretation(score: number): { text: string; color: string; icon: JSX.Element } {
  if (score >= 80) {
    return { 
      text: "Excellent", 
      color: "text-green-500",
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
    };
  } else if (score >= 70) {
    return { 
      text: "Good", 
      color: "text-green-400",
      icon: <CheckCircle2 className="h-5 w-5 text-green-400" />
    };
  } else if (score >= 60) {
    return { 
      text: "Above Average", 
      color: "text-blue-400",
      icon: <CheckCircle2 className="h-5 w-5 text-blue-400" />
    };
  } else if (score >= 50) {
    return { 
      text: "Average", 
      color: "text-yellow-400",
      icon: <AlertCircle className="h-5 w-5 text-yellow-400" />
    };
  } else if (score >= 40) {
    return { 
      text: "Below Average", 
      color: "text-orange-400",
      icon: <AlertTriangle className="h-5 w-5 text-orange-400" />
    };
  } else {
    return { 
      text: "Needs Improvement", 
      color: "text-red-500",
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />
    };
  }
}

// Helper function to get bar color based on score
function getBarColor(score: number, isHovered: boolean = false): string {
  const opacity = isHovered ? "cc" : ""; // Add hex opacity for hover state
  if (score >= 80) return `#22c55e${opacity}`; // green-500
  if (score >= 70) return `#4ade80${opacity}`; // green-400
  if (score >= 60) return `#60a5fa${opacity}`; // blue-400
  if (score >= 50) return `#facc15${opacity}`; // yellow-400
  if (score >= 40) return `#fb923c${opacity}`; // orange-400
  return `#ef4444${opacity}`; // red-500
}

const ScoresTab = ({ scoreBreakdown }: ScoresTabProps) => {
  // Transform score breakdown for chart
  const [chartData, setChartData] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const controls = useAnimation();
  const chartRef = useRef<HTMLDivElement>(null);
  const [isChartVisible, setIsChartVisible] = useState(false);

  // Prepare chart data with animation delay for staggered entry
  useEffect(() => {
    const data = [
      { name: "Overall", score: 0, fullScore: scoreBreakdown.overall },
      { name: "Content", score: 0, fullScore: scoreBreakdown.content },
      { name: "ATS", score: 0, fullScore: scoreBreakdown.ats },
      { name: "Formatting", score: 0, fullScore: scoreBreakdown.formatting },
      { name: "Industry", score: 0, fullScore: scoreBreakdown.impact },
      { name: "Skills", score: 0, fullScore: scoreBreakdown.skills },
      { name: "Grammar", score: 0, fullScore: scoreBreakdown.grammar },
      { name: "Clarity", score: 0, fullScore: scoreBreakdown.clarity }
    ];
    
    setChartData(data);
    
    // Animation sequence for bars
    if (isChartVisible) {
      const animateData = async () => {
        await controls.start({ opacity: 1 });
        
        // Animate each bar's height in sequence
        for (let i = 0; i < data.length; i++) {
          setTimeout(() => {
            setChartData(prevData => prevData.map((item, idx) => 
              idx === i ? { ...item, score: item.fullScore } : item
            ));
          }, i * 200);
        }
      };
      
      animateData();
    }
  }, [scoreBreakdown, isChartVisible, controls]);
  
  // Set up intersection observer for chart
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsChartVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (chartRef.current) {
      observer.observe(chartRef.current);
    }
    
    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);
  
  // Descriptions for each score category
  const scoreDescriptions: Record<string, string> = {
    overall: "Comprehensive evaluation of your resume's overall effectiveness",
    content: "Quality of resume content, focus on achievements, and language strength",
    ats: "How well your resume will perform with Applicant Tracking Systems",
    formatting: "Layout structure, consistency, readability, and visual organization",
    impact: "Alignment with industry expectations and target job requirements",
    skills: "Relevance and presentation of your skills and qualifications",
    grammar: "Grammar, spelling, punctuation, and language correctness",
    clarity: "How clear, concise, and easy to read your content is"
  };

  const handleBarMouseOver = (data: any, index: number) => {
    setActiveIndex(index);
  };

  const handleBarMouseLeave = () => {
    setActiveIndex(null);
  };
  
  return (
    <div className="space-y-8">
      <motion.div
        ref={chartRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isChartVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-background/50 border border-muted backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
            <CardDescription>
              Detailed analysis of your resume's performance across key metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  onMouseMove={(e) => {
                    if (e.activeTooltipIndex !== undefined) {
                      handleBarMouseOver(e.activePayload?.[0].payload, e.activeTooltipIndex);
                    }
                  }}
                  onMouseLeave={handleBarMouseLeave}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tickCount={6}
                    tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                    label={{ 
                      value: 'Score (%)', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))' }
                    }}
                  />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ opacity: 0.1 }}
                  />
                  <Bar 
                    dataKey="score" 
                    radius={[4, 4, 0, 0]}
                    animationBegin={0}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={getBarColor(entry.fullScore, index === activeIndex)}
                        stroke={index === activeIndex ? "hsl(var(--ring))" : "none"}
                        strokeWidth={index === activeIndex ? 2 : 0}
                        className="transition-all duration-200"
                      >
                        {index === activeIndex && (
                          <animate 
                            attributeName="opacity"
                            values="0.8;1;0.8"
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                        )}
                      </Cell>
                    ))}
                    <LabelList 
                      dataKey="score" 
                      position="top" 
                      formatter={(value: number) => `${value}%`} 
                      fill="hsl(var(--foreground))"
                      style={{ fontWeight: "bold", fontSize: 12 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(scoreBreakdown).map(([category, score], index) => {
          const { text, color, icon } = getScoreInterpretation(score);
          const description = scoreDescriptions[category] || '';
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span className="capitalize">{category}</span>
                    <motion.span 
                      className={`text-lg ${color}`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      {score}%
                    </motion.span>
                  </CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    >
                      {icon}
                    </motion.div>
                    <div>
                      <p className={`font-medium ${color}`}>{text}</p>
                      <p className="text-sm text-muted-foreground">
                        {score >= 70 
                          ? "Strong point of your resume" 
                          : score >= 50 
                            ? "Acceptable but could be improved" 
                            : "This area needs attention"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoresTab;
