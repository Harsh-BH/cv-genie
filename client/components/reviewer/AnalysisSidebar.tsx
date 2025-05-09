import { useState } from "react";
import { motion } from "framer-motion";
import { SidebarFeedback } from "@/types/analysis";

type AnalysisSidebarProps = {
  feedback: SidebarFeedback;
  onFeedbackSelect: (id: string, bounds?: any) => void;
  activeItemId: string | null;
  renderHtml?: boolean;
};

const AnalysisSidebar = ({ 
  feedback, 
  onFeedbackSelect, 
  activeItemId,
  renderHtml = false 
}: AnalysisSidebarProps) => {
  const [activeTab, setActiveTab] = useState<'insights' | 'mistakes' | 'improvements'>('insights');
  const score = feedback.score;
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 80) return "text-green-500";
    if (score >= 70) return "text-yellow-400";
    if (score >= 60) return "text-yellow-500";
    if (score >= 50) return "text-orange-400";
    return "text-red-500";
  };
  
  const getScoreText = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    if (score >= 50) return "Needs Work";
    return "Poor";
  };
  
  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'critical':
        return <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-300">Critical</span>;
      case 'high':
        return <span className="px-2 py-0.5 text-xs rounded-full bg-orange-500/20 text-orange-300">High</span>;
      case 'medium':
        return <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-500/20 text-yellow-300">Medium</span>;
      case 'low':
        return <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-300">Low</span>;
      default:
        return null;
    }
  };
  
  const renderContent = (content: string) => {
    if (renderHtml) {
      return (
        <div
          className="prose prose-sm prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
    
    return <p className="text-white/70">{content}</p>;
  };
  
  return (
    <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl h-full overflow-hidden flex flex-col">
      {/* Score Header */}
      <div className="p-5 border-b border-white/10 text-center">
        <div className="text-xs uppercase tracking-wider text-white/50 mb-1">Resume Score</div>
        <div className={`text-5xl font-bold ${getScoreColor(score)}`}>{score}</div>
        <div className={`text-sm mt-1 ${getScoreColor(score)}`}>{getScoreText(score)}</div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-white/10">
        <button 
          onClick={() => setActiveTab('insights')}
          className={`flex-1 py-3 text-sm font-medium ${activeTab === 'insights' 
            ? 'text-purple-400 border-b-2 border-purple-500' 
            : 'text-white/50 hover:text-white/80'}`}
        >
          Insights
        </button>
        <button 
          onClick={() => setActiveTab('mistakes')}
          className={`flex-1 py-3 text-sm font-medium ${activeTab === 'mistakes' 
            ? 'text-purple-400 border-b-2 border-purple-500' 
            : 'text-white/50 hover:text-white/80'}`}
        >
          Issues
          {feedback.mistakes.length > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-red-500/20">
              {feedback.mistakes.length}
            </span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('improvements')}
          className={`flex-1 py-3 text-sm font-medium ${activeTab === 'improvements' 
            ? 'text-purple-400 border-b-2 border-purple-500' 
            : 'text-white/50 hover:text-white/80'}`}
        >
          Improvements
          {feedback.improvements.length > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-green-500/20">
              {feedback.improvements.length}
            </span>
          )}
        </button>
      </div>
      
      {/* Content Area */}
      <div className="overflow-y-auto flex-grow">
        {activeTab === 'insights' && (
          <div className="p-4">
            {feedback.insights.map(insight => (
              <div 
                key={insight.id}
                className={`mb-6 p-4 rounded-lg transition-all ${
                  activeItemId === insight.id 
                    ? 'bg-white/10 shadow-lg' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
                onClick={() => onFeedbackSelect(insight.id)}
              >
                <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
                {renderContent(insight.description)}
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'mistakes' && (
          <div className="p-4">
            {feedback.mistakes.length === 0 ? (
              <div className="text-center py-8 text-white/50">
                <svg className="mx-auto h-12 w-12 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-2">No critical issues detected!</p>
              </div>
            ) : (
              feedback.mistakes.map(mistake => (
                <div 
                  key={mistake.id}
                  className={`mb-5 p-4 rounded-lg transition-all ${
                    activeItemId === mistake.id 
                      ? 'bg-white/10 shadow-lg border border-red-500/30' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => onFeedbackSelect(mistake.id, mistake.position)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-semibold">{mistake.title}</h3>
                    {mistake.severity && getSeverityBadge(mistake.severity)}
                  </div>
                  
                  {mistake.section && (
                    <div className="mb-2 text-xs text-white/50">
                      In section: <span className="text-white/80">{mistake.section}</span>
                    </div>
                  )}
                  
                  {mistake.textSnippet && (
                    <div className="mb-3 text-sm bg-black/30 p-2 rounded border-l-2 border-red-500/50 italic text-white/70">
                      "{mistake.textSnippet}"
                    </div>
                  )}
                  
                  {renderContent(mistake.description)}
                </div>
              ))
            )}
          </div>
        )}
        
        {activeTab === 'improvements' && (
          <div className="p-4">
            {feedback.improvements.length === 0 ? (
              <div className="text-center py-8 text-white/50">
                <svg className="mx-auto h-12 w-12 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <p className="mt-2">No improvements generated yet</p>
              </div>
            ) : (
              feedback.improvements.map(improvement => (
                <div 
                  key={improvement.id}
                  className={`mb-5 p-4 rounded-lg transition-all ${
                    activeItemId === improvement.id 
                      ? 'bg-white/10 shadow-lg border border-purple-500/30' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => onFeedbackSelect(improvement.id, improvement.position)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-semibold flex items-center">
                      {improvement.type === "replacement" && (
                        <svg className="h-4 w-4 mr-1 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      )}
                      {improvement.type === "addition" && (
                        <svg className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      )}
                      {improvement.title}
                    </h3>
                    {improvement.severity && getSeverityBadge(improvement.severity)}
                  </div>
                  
                  {renderContent(improvement.description)}
                  
                  {improvement.type === "replacement" && (
                    <button className="mt-3 py-1.5 px-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-md text-sm flex items-center transition">
                      <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Apply Change
                    </button>
                  )}
                  
                  {improvement.type === "addition" && (
                    <button className="mt-3 py-1.5 px-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-md text-sm flex items-center transition">
                      <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Content
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisSidebar;
