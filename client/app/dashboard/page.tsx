"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import UserProfile from "@/components/dashboard/UserProfile";
import CVList from "@/components/dashboard/CVList";
import CVAnalysisModal from "@/components/dashboard/CVAnalysisModal";
import AnimatedInsight from "@/components/reviewer/AnimatedInsight";

// Mock user data (replace with actual auth)
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
//   avatarUrl: "https://media.licdn.com/dms/image/v2/D4D03AQHpOc-f0f3SYg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1712610875428?e=1751500800&v=beta&t=lIwnpWlTy4AgCoivXY58QD2V59mu-ZZcf9e9cs28t-w"
};

// Mock CV data (replace with actual API calls)
const cvs = [
  { id: 1, name: "Software Engineer CV", lastUpdated: "2023-08-15", score: 85 },
  { id: 2, name: "Product Manager Resume", lastUpdated: "2023-09-02", score: 78 },
  { id: 3, name: "UX Designer Portfolio", lastUpdated: "2023-10-10", score: 92 }
];

export default function DashboardPage() {
  const [selectedCV, setSelectedCV] = useState<null | typeof cvs[0]>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
    >
      <div className="container mx-auto px-4 py-8 relative top-20">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-300 mb-8">Welcome to your CV analysis hub</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - User profile */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <UserProfile user={user} />
            
            <motion.div 
              className="mt-6 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <AnimatedInsight />
            </motion.div>
          </motion.div>

          {/* Right column - CV List */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <CVList cvs={cvs} onCVSelect={setSelectedCV} />
          </motion.div>
        </div>
        
        {/* Modal for CV Analysis */}
        <CVAnalysisModal 
          cv={selectedCV} 
          isOpen={!!selectedCV}
          onClose={() => setSelectedCV(null)} 
        />
      </div>
    </motion.div>
  );
}
