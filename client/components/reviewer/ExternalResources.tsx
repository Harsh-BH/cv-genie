import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { resourceLinks, ResourceCategory, categoryLabels } from '@/lib/data/resource-links';

interface ExternalResourcesProps {
  category?: ResourceCategory;
  limit?: number;
}

export default function ExternalResources({ category, limit = 6 }: ExternalResourcesProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Filter resources by category if provided
  const filteredResources = category 
    ? resourceLinks.filter(r => r.category === category) 
    : resourceLinks;
  
  // Get a sample of resources to display
  const resourcesToShow = expanded 
    ? filteredResources.slice(0, limit * 2) 
    : filteredResources.slice(0, limit);

  // Get resources count by category for the category selector
  const categoryCount = Object.entries(categoryLabels).reduce((acc, [key, label]) => {
    const count = resourceLinks.filter(r => r.category === key).length;
    return { ...acc, [key]: count };
  }, {} as Record<string, number>);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/40 rounded-xl p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">External Resources</h3>
        <Link href="/resources" className="text-purple-400 hover:text-purple-300 text-sm flex items-center">
          View All Resources
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {resourcesToShow.map((resource) => (
          <motion.a
            key={`${resource.category}-${resource.title}`}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 bg-gray-800/60 rounded-lg hover:bg-gray-800/90 transition-all border border-gray-700/40 flex flex-col h-full"
            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(124, 58, 237, 0.15)" }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs px-2 py-0.5 bg-purple-900/60 rounded-full text-purple-100">
                {categoryLabels[resource.category]}
              </span>
              {resource.isPremium && (
                <span className="text-xs px-2 py-0.5 bg-amber-800/80 rounded-full text-amber-100">
                  Premium
                </span>
              )}
            </div>
            <h4 className="font-medium text-white group-hover:text-purple-300 transition-colors">
              {resource.title}
            </h4>
            <p className="mt-1 text-sm text-gray-300 flex-grow">{resource.description}</p>
            <div className="mt-2 text-purple-400 text-xs flex items-center group-hover:text-purple-300">
              Visit Resource
              <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Show more/less button */}
      {filteredResources.length > limit && (
        <div className="text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center px-4 py-2 text-sm bg-purple-700/30 hover:bg-purple-700/50 rounded-lg text-white transition-colors"
          >
            {expanded ? 'Show less' : 'Show more'}
            <svg 
              className={`ml-1 w-4 h-4 transform transition-transform ${expanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </motion.div>
  );
}
