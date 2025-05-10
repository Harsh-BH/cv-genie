import { motion } from 'framer-motion';

interface Props {
  error: string;
  onRetry?: () => void;
  onTriggerAnalysis?: () => void;
}

export default function ErrorMessage({ error, onRetry, onTriggerAnalysis }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-900/20 to-gray-900 text-white flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-red-500/20 border border-red-500/50 rounded-lg p-8 max-w-md mx-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 flex justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </motion.div>
        
        <motion.h2 
          className="text-xl font-bold mb-2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Error
        </motion.h2>
        
        <motion.p 
          className="text-white/80 mb-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {error}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {onRetry && (
            <motion.button 
              onClick={onRetry}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Try Again
            </motion.button>
          )}
          
          {onTriggerAnalysis && (
            <motion.button 
              onClick={onTriggerAnalysis}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Analysis
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
