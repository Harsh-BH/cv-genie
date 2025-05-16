"use client";

import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

// Custom tooltip for all chart types
export const CustomTooltip = ({ active, payload, label, bgColor = 'hsl(224, 71%, 4%)', textColor = 'white' }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border bg-background p-3 shadow-md" 
           style={{ backgroundColor: bgColor }}>
        <div className="text-sm font-medium text-foreground" style={{ color: textColor }}>
          {label || payload[0].name}
        </div>
        <div className="text-sm font-semibold" style={{ color: textColor }}>
          {payload[0].value}
          {payload[0].dataKey === 'score' || payload[0].name === 'score' ? '/100' : ''}
        </div>
      </div>
    );
  }
  return null;
};

// Score indicator component with color coding
export const ScoreIndicator = ({ score, label, description }: { score: number, label: string, description?: string }) => {
  let color = 'bg-red-500';
  
  if (score >= 80) color = 'bg-green-500';
  else if (score >= 60) color = 'bg-yellow-500';
  else if (score >= 40) color = 'bg-orange-500';

  return (
    <div className="flex flex-col space-y-1.5">
      <div className="flex items-center justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
                {description && <InfoIcon className="h-3.5 w-3.5 text-muted-foreground opacity-70" />}
              </div>
            </TooltipTrigger>
            {description && (
              <TooltipContent side="top" className="max-w-[200px] text-xs">
                {description}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        <span className="text-sm font-medium">{score}%</span>
      </div>
      <Progress value={score} className="h-1.5" indicatorClassName={`${color}`} />
    </div>
  );
};

// Chart colors for use in all components
export const CHART_COLORS = {
  PIE_COLORS: ['hsl(220, 70%, 50%)', 'hsl(150, 60%, 50%)', 'hsl(30, 80%, 50%)', 'hsl(280, 60%, 50%)', 'hsl(100, 70%, 50%)'],
  SECTION_COLORS: {
    Header: 'hsl(262, 83%, 58%)',
    Summary: 'hsl(262, 70%, 50%)',
    Experience: 'hsl(250, 70%, 60%)',
    Education: 'hsl(240, 60%, 63%)',
    Skills: 'hsl(225, 70%, 60%)'
  },
  ISSUE_COLORS: {
    Grammar: 'hsl(346, 84%, 61%)',
    Format: 'hsl(15, 100%, 55%)', 
    Content: 'hsl(30, 100%, 60%)', 
    ATS: 'hsl(220, 70%, 50%)'
  }
};
