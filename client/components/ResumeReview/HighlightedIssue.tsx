import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type IssueSeverity = 'critical' | 'high' | 'medium' | 'low';

type IssuePosition = {
  sectionId?: number;
  sectionTitle?: string;
  paragraphIndex?: number;
  bulletIndex?: number;
  lineIndex?: number;
  textSnippet?: string;
  startPos?: number;
  endPos?: number;
};

type PositionedSuggestion = {
  id: string;
  issue: string;
  suggestion: string;
  reasoning: string;
  severity: IssueSeverity;
  position: IssuePosition;
  category: string;
  exampleFix?: string;
};

interface HighlightedIssueProps {
  issue: PositionedSuggestion;
  onApplyFix?: (issue: PositionedSuggestion) => void;
}

const severityColors = {
  critical: 'text-red-500 bg-red-100 border-red-500',
  high: 'text-orange-500 bg-orange-100 border-orange-500',
  medium: 'text-yellow-500 bg-yellow-100 border-yellow-500',
  low: 'text-blue-500 bg-blue-100 border-blue-500'
};

// Update severityBadgeVariants to use only valid Badge variants
const severityBadgeVariants: Record<IssueSeverity, "default" | "outline" | "destructive" | "secondary"> = {
  critical: 'destructive',
  high: 'destructive',     // Changed from 'orange'
  medium: 'secondary',     // Changed from 'yellow' 
  low: 'default'
};

export const HighlightedIssue: React.FC<HighlightedIssueProps> = ({ issue, onApplyFix }) => {
  const { textSnippet, sectionTitle } = issue.position;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`cursor-pointer px-1 border-b-2 border-dashed ${severityColors[issue.severity]} hover:opacity-80`}
          >
            {textSnippet}
          </span>
        </TooltipTrigger>
        <TooltipContent 
          className="max-w-md bg-white text-gray-800 shadow-lg rounded-md"
        >
          <div className="flex flex-col gap-2 p-2">
            <div className="flex flex-row flex-wrap gap-2 items-center">
              <Badge variant={severityBadgeVariants[issue.severity]}>
                {issue.severity.toUpperCase()}
              </Badge>
              <Badge variant="outline">{issue.category}</Badge>
              {sectionTitle && <Badge variant="secondary">{sectionTitle}</Badge>}
            </div>
            
            <p className="font-bold">{issue.issue}</p>
            <p>{issue.suggestion}</p>
            
            <p className="text-sm italic">
              {issue.reasoning}
            </p>
            
            {issue.exampleFix && (
              <div className="bg-gray-100 p-2 rounded-md w-full">
                <p className="text-sm font-medium">
                  Suggested fix:
                </p>
                <p>{issue.exampleFix}</p>
              </div>
            )}
            
            {onApplyFix && issue.exampleFix && (
              <Button 
                size="sm" 
                variant="default"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onApplyFix(issue);
                }}
              >
                Apply Fix
              </Button>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HighlightedIssue;
