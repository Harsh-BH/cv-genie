import { motion } from 'framer-motion';

// Animation variants for loading screen
const loadingVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

interface Props {
  status?: string | null;
  progress: number;
  message: string;
}

export default function LoadingScreen({ status, progress, message }: Props) {
  // Animate the progress steps
  const steps = [
    { label: "Extracting", done: progress >= 30 },
    { label: "Analyzing", done: progress >= 60 },
    { label: "Generating", done: progress >= 90 },
    { label: "Finishing", done: progress >= 100 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-900/20 to-gray-900 text-white">
      <motion.div
        className="h-screen flex flex-col items-center justify-center"
        variants={loadingVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div 
          variants={itemVariants} 
          className="mb-6 relative"
        >
          <svg
            className="w-16 h-16 text-purple-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 18H17V16H7V18Z"
              fill="currentColor"
            />
            <path
              d="M17 14H7V12H17V14Z"
              fill="currentColor"
            />
            <path
              d="M7 10H11V8H7V10Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V5C21 3.34315 19.6569 2 18 2H6ZM5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5Z"
              fill="currentColor"
            />
          </svg>
          
          {/* Animated spinner around the icon */}
          <motion.div 
            className="absolute inset-0 rounded-full border-t-2 border-purple-500"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            style={{ width: '100%', height: '100%' }}
          />
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-2xl mb-2 font-bold">
          {status === 'completed' ? 'Analysis Complete!' : 'Analyzing your CV'}
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-white/70 max-w-md text-center">
          {message}
        </motion.p>
        
        {/* Progress steps */}
        <motion.div 
          variants={itemVariants}
          className="mt-6 flex items-center gap-2 sm:gap-4"
        >
          {steps.map((step, index) => (
            <div key={step.label} className="flex items-center">
              {index > 0 && (
                <div className="w-8 sm:w-12 h-0.5 bg-gray-700 mx-1 sm:mx-2">
                  <motion.div 
                    className="h-full bg-purple-500" 
                    initial={{ width: 0 }}
                    animate={{ width: step.done ? '100%' : '0%' }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  />
                </div>
              )}
              <div className="flex flex-col items-center">
                <motion.div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    step.done ? 'bg-purple-500' : 'bg-gray-700'
                  }`}
                  animate={step.done ? { scale: [1, 1.3, 1], backgroundColor: ['#6b21a8', '#a855f7', '#6b21a8'] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {step.done ? (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  )}
                </motion.div>
                <span className="text-xs mt-1 text-gray-400">{step.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="mt-8 w-64 h-2 bg-white/10 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
