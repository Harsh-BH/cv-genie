"use client";

import { motion } from "framer-motion";

interface CV {
  id: number;
  name: string;
  lastUpdated: string;
  score: number;
}

interface CVListProps {
  cvs: CV[];
  onCVSelect: (cv: CV) => void;
}

export default function CVList({ cvs, onCVSelect }: CVListProps) {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Your CV Analysis</h2>
        
        <motion.a
          href="/upload"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.9)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Upload New CV
        </motion.a>
      </div>

      {cvs.length === 0 ? (
        <div className="text-center py-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block text-purple-400 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.div>
          <p className="text-gray-400">No CVs analyzed yet. Upload your first CV to get started.</p>
        </div>
      ) : (
        <motion.ul 
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {cvs.map(cv => (
            <motion.li 
              key={cv.id}
              variants={item}
              whileHover={{ scale: 1.01 }}
              onClick={() => onCVSelect(cv)}
              className="p-4 bg-gray-700/40 rounded-lg cursor-pointer border border-gray-700 hover:border-purple-400/30 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-white">{cv.name}</h3>
                  <p className="text-sm text-gray-400">Last updated: {cv.lastUpdated}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Score</p>
                    <p className="font-semibold text-lg text-white">{cv.score}%</p>
                  </div>
                  
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: `conic-gradient(#8b5cf6 ${cv.score * 3.6}deg, rgba(139, 92, 246, 0.1) 0deg)`
                    }}
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    <div className="bg-gray-800 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium">
                      {cv.score}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
