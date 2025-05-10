import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatModelResponse, ensureValidScore } from '@/lib/utils/response-formatter';
import { AnalysisData } from '@/types/analysis';

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      when: "beforeChildren"
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } // Smooth spring-like motion
  },
};

const tabVariants = {
  inactive: { color: "var(--text-secondary)", borderColor: "transparent" },
  active: { 
    color: "var(--text-primary)", 
    borderColor: "var(--accent-color)",
    transition: { duration: 0.3 }
  },
};

// New fade-in animation for content
const contentFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    }
  }
};

interface Props {
  analysis: AnalysisData;
  onFeedbackSelect?: (id: string) => void;
}

export default function AnalysisDisplay({ analysis, onFeedbackSelect }: Props) {
  const [activeTab, setActiveTab] = useState('overview');
  const [formattedContent, setFormattedContent] = useState<Record<string, string>>({});
  
  // Format all content on initial load and when analysis changes
  useEffect(() => {
    const formatAllContent = () => {
      setFormattedContent({
        executiveSummary: formatModelResponse(analysis.executiveSummary || ''),
        overview: formatModelResponse(analysis.overview || ''),
        contentQuality: formatModelResponse(analysis.contentQuality || ''),
        atsCompatibility: formatModelResponse(analysis.atsCompatibility || ''),
        formattingReview: formatModelResponse(analysis.formattingReview || ''),
        skillsAnalysis: formatModelResponse(analysis.skillsAnalysis || ''),
        industryFit: formatModelResponse(analysis.industryFit || ''),
        careerTrajectory: formatModelResponse(analysis.careerTrajectory || ''),
        improvementSuggestions: formatModelResponse(analysis.improvementSuggestions || '')
      });
    };
    
    formatAllContent();
  }, [analysis]);

  // Ensure all scores are valid numbers
  const scoreBreakdown = {
    overall: ensureValidScore(analysis.scoreBreakdown?.overall) * 10,
    content: ensureValidScore(analysis.scoreBreakdown?.content) * 10,
    ats: ensureValidScore(analysis.scoreBreakdown?.ats) * 10,
    formatting: ensureValidScore(analysis.scoreBreakdown?.formatting) * 10,
    impact: ensureValidScore(analysis.scoreBreakdown?.impact) * 10,
    skills: ensureValidScore(analysis.scoreBreakdown?.skills) * 10
  };

  // Color mapping based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 70) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };
  
  // Determine score label
  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Satisfactory';
    if (score >= 50) return 'Average';
    if (score >= 40) return 'Needs Work';
    if (score >= 30) return 'Poor';
    return 'Critical';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-gradient-to-b from-gray-900/80 to-gray-900/40 backdrop-blur-md rounded-xl border border-gray-700/40 shadow-xl overflow-hidden"
    >
      {/* Score overview */}
      <motion.div 
        className="p-6 border-b border-gray-700/40 bg-gradient-to-r from-purple-900/30 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <motion.h2 
            className="text-xl font-bold text-white flex items-center gap-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <svg className="w-5 h-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Resume Analysis
          </motion.h2>
          
          <motion.div 
            className="flex items-center gap-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <span className="text-white/60 text-sm">Overall:</span>
            <motion.div
              className="relative"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100, damping: 10 }}
            >
              <div className={`text-2xl font-bold ${getScoreColor(scoreBreakdown.overall)}`}>
                {Math.round(scoreBreakdown.overall)}%
              </div>
              <motion.div 
                className="text-xs absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                {getScoreLabel(scoreBreakdown.overall)}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Score breakdown */}
        <motion.div 
          className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ScoreItem 
            title="Content" 
            score={scoreBreakdown.content} 
            variants={itemVariants}
            onClick={() => setActiveTab('content')}
          />
          <ScoreItem 
            title="ATS" 
            score={scoreBreakdown.ats} 
            variants={itemVariants}
            onClick={() => setActiveTab('ats')}
          />
          <ScoreItem 
            title="Format" 
            score={scoreBreakdown.formatting} 
            variants={itemVariants}
            onClick={() => setActiveTab('formatting')}
          />
          <ScoreItem 
            title="Skills" 
            score={scoreBreakdown.skills} 
            variants={itemVariants}
            onClick={() => setActiveTab('skills')}
          />
          <ScoreItem 
            title="Industry" 
            score={scoreBreakdown.impact} 
            variants={itemVariants}
            onClick={() => setActiveTab('industry')}
          />
          <ScoreItem 
            title="Overall" 
            score={scoreBreakdown.overall} 
            variants={itemVariants}
            highlight
            onClick={() => setActiveTab('overview')}
          />
        </motion.div>
      </motion.div>
      
      {/* Tab Navigation with slider effect */}
      <motion.div 
        className="relative flex border-b border-gray-700/40 overflow-x-auto no-scrollbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Tab 
          id="overview" 
          label="Overview" 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        />
        <Tab 
          id="content" 
          label="Content" 
          active={activeTab === 'content'} 
          onClick={() => setActiveTab('content')}
        />
        <Tab 
          id="ats" 
          label="ATS" 
          active={activeTab === 'ats'} 
          onClick={() => setActiveTab('ats')}
        />
        <Tab 
          id="formatting" 
          label="Formatting" 
          active={activeTab === 'formatting'} 
          onClick={() => setActiveTab('formatting')}
        />
        <Tab 
          id="skills" 
          label="Skills" 
          active={activeTab === 'skills'} 
          onClick={() => setActiveTab('skills')}
        />
        <Tab 
          id="industry" 
          label="Industry" 
          active={activeTab === 'industry'} 
          onClick={() => setActiveTab('industry')}
        />
        <Tab 
          id="suggestions" 
          label="Suggestions" 
          active={activeTab === 'suggestions'} 
          onClick={() => setActiveTab('suggestions')}
        />
        
        {/* Animated active tab indicator */}
        <motion.div
          className="absolute bottom-0 h-0.5 bg-purple-500"
          layoutId="activeTabIndicator"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            width: `calc(100% / 7)`, // Approximately 1/7 of the width for 7 tabs
            left: `calc(${['overview', 'content', 'ats', 'formatting', 'skills', 'industry', 'suggestions'].indexOf(activeTab)} * (100% / 7))`
          }}
        />
      </motion.div>

      {/* Tab Content with enhanced animations */}
      <div className="p-6 max-h-[calc(100vh-24rem)] overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="min-h-[300px]"
          >
            {activeTab === 'overview' && (
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="prose prose-invert max-w-none">
                  <motion.h3 
                    className="text-lg font-semibold text-purple-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Executive Summary
                  </motion.h3>
                  <motion.div 
                    variants={contentFadeIn}
                    dangerouslySetInnerHTML={{ __html: formattedContent.executiveSummary }}
                  />
                  
                  <motion.h3 
                    className="text-lg font-semibold text-purple-300 mt-6"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Detailed Overview
                  </motion.h3>
                  <motion.div 
                    variants={contentFadeIn}
                    dangerouslySetInnerHTML={{ __html: formattedContent.overview }}
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Other tab content sections with similar animations */}
            {activeTab === 'content' && (
              <TabContent
                title="Content Quality"
                content={formattedContent.contentQuality}
                score={scoreBreakdown.content}
                scoreColor={getScoreColor(scoreBreakdown.content)}
                scoreLabel={getScoreLabel(scoreBreakdown.content)}
              />
            )}

            {activeTab === 'ats' && (
              <TabContent
                title="ATS Compatibility"
                content={formattedContent.atsCompatibility}
                score={scoreBreakdown.ats}
                scoreColor={getScoreColor(scoreBreakdown.ats)}
                scoreLabel={getScoreLabel(scoreBreakdown.ats)}
              />
            )}

            {activeTab === 'formatting' && (
              <TabContent
                title="Formatting Review"
                content={formattedContent.formattingReview}
                score={scoreBreakdown.formatting}
                scoreColor={getScoreColor(scoreBreakdown.formatting)}
                scoreLabel={getScoreLabel(scoreBreakdown.formatting)}
              />
            )}

            {activeTab === 'skills' && (
              <TabContent
                title="Skills Analysis"
                content={formattedContent.skillsAnalysis}
                score={scoreBreakdown.skills}
                scoreColor={getScoreColor(scoreBreakdown.skills)}
                scoreLabel={getScoreLabel(scoreBreakdown.skills)}
              />
            )}

            {activeTab === 'industry' && (
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <TabContent
                  title="Industry Fit"
                  content={formattedContent.industryFit}
                  score={scoreBreakdown.impact}
                  scoreColor={getScoreColor(scoreBreakdown.impact)}
                  scoreLabel={getScoreLabel(scoreBreakdown.impact)}
                  hideScore={false}
                />
                
                <motion.div variants={itemVariants} className="mt-6 prose prose-invert max-w-none">
                  <motion.h3 
                    className="text-lg font-semibold text-purple-300 mt-6"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Career Trajectory
                  </motion.h3>
                  <motion.div 
                    variants={contentFadeIn}
                    dangerouslySetInnerHTML={{ __html: formattedContent.careerTrajectory }}
                  />
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'suggestions' && (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h3 
                  className="text-lg font-semibold text-purple-300 mb-4"
                  variants={itemVariants}
                >
                  Improvement Suggestions
                </motion.h3>
                <motion.div 
                  className="prose prose-invert max-w-none mb-6"
                  variants={itemVariants}
                >
                  <div dangerouslySetInnerHTML={{ __html: formattedContent.improvementSuggestions }} />
                </motion.div>
                
                {analysis.positionedSuggestions && analysis.positionedSuggestions.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <h3 className="text-lg font-semibold text-purple-300 mb-4">Specific Issues</h3>
                    <div className="space-y-4">
                      {analysis.positionedSuggestions.map((suggestion, index) => (
                        <SuggestionItem 
                          key={suggestion.id} 
                          suggestion={suggestion}
                          index={index}
                          onSelect={onFeedbackSelect}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TabContent({ 
  title, 
  content, 
  score, 
  scoreColor, 
  scoreLabel,
  hideScore = false
}: { 
  title: string; 
  content: string; 
  score: number; 
  scoreColor: string; 
  scoreLabel: string;
  hideScore?: boolean;
}) {
  return (
    <motion.div 
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex justify-between items-center"
        variants={itemVariants}
      >
        <h3 className="text-lg font-semibold text-purple-300">{title}</h3>
        {!hideScore && (
          <div className="flex flex-col items-end">
            <span className={`text-xl font-bold ${scoreColor}`}>
              {Math.round(score)}%
            </span>
            <span className="text-xs text-gray-400">{scoreLabel}</span>
          </div>
        )}
      </motion.div>
      
      <motion.div
        className="prose prose-invert max-w-none"
        variants={contentFadeIn}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </motion.div>
  );
}

// Score item component with enhanced animations
function ScoreItem({ title, score, variants, highlight = false, onClick }: { 
  title: string; 
  score: number; 
  variants: any;
  highlight?: boolean;
  onClick?: () => void;
}) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 70) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <motion.div 
      variants={variants}
      onClick={onClick}
      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 
        ${highlight ? 'bg-purple-900/40 border border-purple-500/40' : 'bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700/40'}`}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)" }}
      whileTap={{ scale: 0.98 }}
    >
      <p className="text-xs text-gray-400">{title}</p>
      <motion.div 
        className={`text-xl font-bold ${getScoreColor(score)}`}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {Math.round(score)}%
      </motion.div>
    </motion.div>
  );
}

// Tab component with enhanced animations
function Tab({ id, label, active, onClick }: { id: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-6 py-3 text-sm font-medium whitespace-nowrap relative
        ${active ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
      variants={tabVariants}
      animate={active ? "active" : "inactive"}
      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.button>
  );
}

// Animated suggestion item component
function SuggestionItem({ 
  suggestion, 
  index,
  onSelect 
}: { 
  suggestion: any; 
  index: number;
  onSelect?: (id: string) => void;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { delay: index * 0.1 }
      }}
      whileHover={{ scale: 1.01, backgroundColor: "rgba(124, 58, 237, 0.1)" }}
      className={`p-4 rounded-lg border ${getSeverityBorder(suggestion.severity)}`}
      onClick={() => onSelect?.(suggestion.id)}
    >
      <div className="flex items-start justify-between">
        <h4 className="font-medium">{suggestion.issue}</h4>
        <span className={`text-xs px-2 py-1 rounded-full ${getSeverityBg(suggestion.severity)}`}>
          {suggestion.severity}
        </span>
      </div>
      
      {suggestion.position?.sectionTitle && (
        <div className="mt-1 text-sm text-gray-400">
          <span>In section: </span>
          <span className="font-medium text-gray-300">{suggestion.position.sectionTitle}</span>
        </div>
      )}
      
      {suggestion.position?.textSnippet && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="mt-2 p-2 bg-gray-800/60 rounded text-sm font-mono"
        >
          "{suggestion.position.textSnippet}"
        </motion.div>
      )}
      
      <div className="mt-3 text-sm">
        <p className="text-gray-300">{suggestion.reasoning}</p>
      </div>
      
      {suggestion.exampleFix && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="mt-3 text-sm"
        >
          <p className="font-medium text-green-400">Suggested fix:</p>
          <p className="text-green-300">{suggestion.exampleFix}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

// Helper functions for styling based on severity
function getSeverityBorder(severity: string) {
  switch (severity) {
    case 'critical': return 'border-red-500/40 bg-red-900/10';
    case 'high': return 'border-orange-500/40 bg-orange-900/10';
    case 'medium': return 'border-yellow-500/40 bg-yellow-900/10';
    case 'low': return 'border-blue-500/40 bg-blue-900/10';
    default: return 'border-gray-500/40 bg-gray-900/10';
  }
}

function getSeverityBg(severity: string) {
  switch (severity) {
    case 'critical': return 'bg-red-900/60 text-red-200';
    case 'high': return 'bg-orange-900/60 text-orange-200';
    case 'medium': return 'bg-yellow-900/60 text-yellow-200';
    case 'low': return 'bg-blue-900/60 text-blue-200';
    default: return 'bg-gray-700 text-gray-200';
  }
}
