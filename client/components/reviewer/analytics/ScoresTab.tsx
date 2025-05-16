"use client";

import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";

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
function getBarColor(score: number): string {
  if (score >= 80) return "#22c55e"; // green-500
  if (score >= 70) return "#4ade80"; // green-400
  if (score >= 60) return "#60a5fa"; // blue-400
  if (score >= 50) return "#facc15"; // yellow-400
  if (score >= 40) return "#fb923c"; // orange-400
  return "#ef4444"; // red-500
}

const ScoresTab = ({ scoreBreakdown }: ScoresTabProps) => {
  // Transform score breakdown for chart
  const chartData = [
    { name: "Overall", score: scoreBreakdown.overall },
    { name: "Content", score: scoreBreakdown.content },
    { name: "ATS", score: scoreBreakdown.ats },
    { name: "Formatting", score: scoreBreakdown.formatting },
    { name: "Industry", score: scoreBreakdown.impact },
    { name: "Skills", score: scoreBreakdown.skills },
    { name: "Grammar", score: scoreBreakdown.grammar },
    { name: "Clarity", score: scoreBreakdown.clarity }
  ];
  
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
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
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
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tickCount={6}
                    label={{ 
                      value: 'Score (%)', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' }
                    }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Score']}
                    labelStyle={{ fontWeight: 'bold' }}
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar 
                    dataKey="score" 
                    radius={[4, 4, 0, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                    ))}
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
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span className="capitalize">{category}</span>
                    <span className={`text-lg ${color}`}>{score}%</span>
                  </CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    {icon}
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
