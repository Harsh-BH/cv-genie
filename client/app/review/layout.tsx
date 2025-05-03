"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function ReviewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Add page transition and setup
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900"
    >
      {children}
    </motion.div>
  );
}
