import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resourceLinks, categoryLabels, ResourceCategory, ResourceLink } from '@/lib/data/resource-links';

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

// Animation variants for the items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 }
  }
};

export default function ResourcesDisplay() {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResources, setFilteredResources] = useState<ResourceLink[]>(resourceLinks);
  const [showPremium, setShowPremium] = useState(true);

  // Filter resources when search query, category, or premium filter changes
  useEffect(() => {
    let filtered = resourceLinks;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) || 
        resource.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by premium status
    if (!showPremium) {
      filtered = filtered.filter(resource => !resource.isPremium);
    }
    
    setFilteredResources(filtered);
  }, [selectedCategory, searchQuery, showPremium]);

  // Get unique categories for the filter
  const categories = Object.keys(categoryLabels) as ResourceCategory[];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-white">Resume Improvement Resources</h1>
        <p className="text-gray-300 mb-8">
          External tools and resources to help you improve your resume and advance your career.
        </p>
      </motion.div>

      {/* Filter and Search */}
      <motion.div 
        className="mb-8 p-6 bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-700/40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          {/* Search Box */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              className="w-full py-2.5 pl-10 pr-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <div className="w-full md:w-auto">
            <select 
              className="w-full md:w-auto bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 px-4 py-2.5"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ResourceCategory | 'all')}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {categoryLabels[category]}
                </option>
              ))}
            </select>
          </div>
          
          {/* Premium Toggle */}
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={showPremium}
                onChange={() => setShowPremium(!showPremium)}
              />
              <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-300">
                Include Premium
              </span>
            </label>
          </div>
        </div>
        
        {/* Result count */}
        <div className="mt-4 text-sm text-gray-400">
          Found {filteredResources.length} resources
          {selectedCategory !== 'all' && ` in ${categoryLabels[selectedCategory as ResourceCategory]}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      </motion.div>

      {/* Resource Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredResources.map((resource) => (
            <motion.div
              key={`${resource.category}-${resource.title}`}
              variants={itemVariants}
              exit="exit"
              layout
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/40 rounded-xl p-5 shadow-lg hover:shadow-purple-900/20 transition-all relative overflow-hidden group"
            >
              {/* Category Badge */}
              <div className="absolute top-4 right-4 px-2 py-1 bg-gray-700/80 rounded-full text-xs text-gray-300">
                {categoryLabels[resource.category]}
              </div>
              
              {/* Premium Badge */}
              {resource.isPremium && (
                <div className="absolute top-4 left-4 px-2 py-1 bg-amber-700/80 rounded-full text-xs text-amber-100">
                  Premium
                </div>
              )}
              
              <h3 className="text-lg font-semibold text-white mt-4">{resource.title}</h3>
              <p className="mt-2 text-gray-300 text-sm">{resource.description}</p>
              
              {/* Visit button */}
              <div className="mt-4">
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-purple-600/70 hover:bg-purple-700 border border-purple-800 rounded-lg text-white text-sm transition-colors duration-150"
                >
                  Visit Resource
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/0 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {/* No results message */}
      {filteredResources.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-800 mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-200 mb-2">No matching resources</h3>
          <p className="text-gray-400">
            Try adjusting your filters or search query to find more resources.
          </p>
        </motion.div>
      )}
    </div>
  );
}
