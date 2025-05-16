import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resourceLinks, categoryLabels, ResourceCategory, ResourceLink } from '@/lib/data/resource-links';

interface ResourcesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: ResourceCategory | 'all';
}

export default function ResourcesSidebar({ isOpen, onClose, initialCategory = 'all' }: ResourcesSidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResources, setFilteredResources] = useState<ResourceLink[]>(resourceLinks);
  const [showPremium, setShowPremium] = useState(true);

  // Reset category when sidebar opens with an initialCategory
  useEffect(() => {
    if (isOpen && initialCategory !== 'all') {
      setSelectedCategory(initialCategory);
    }
  }, [isOpen, initialCategory]);

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

  const sidebarVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: { 
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  // Get unique categories for the filter
  const categories = Object.keys(categoryLabels) as ResourceCategory[];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div 
            className="fixed right-0 top-0 bottom-0 w-full md:w-[450px] lg:w-[600px] bg-gray-900 text-white z-50 shadow-2xl flex flex-col"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="p-6 bg-gray-800 border-b border-gray-700/50 flex justify-between items-center">
              <h2 className="text-xl font-bold">Resume Resources</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Search and filters */}
            <div className="p-4 border-b border-gray-700/50 bg-gray-800/50">
              {/* Search Box */}
              <div className="relative mb-3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  className="w-full py-2 pl-10 pr-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {/* Category filter pills */}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedCategory === 'all' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  All
                </button>
                
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedCategory === category 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {categoryLabels[category]}
                  </button>
                ))}
              </div>
              
              {/* Premium toggle */}
              <div className="mt-3 flex items-center">
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
                
                <div className="ml-auto text-sm text-gray-400">
                  {filteredResources.length} resources
                </div>
              </div>
            </div>
            
            {/* Resource list */}
            <div className="flex-grow overflow-y-auto">
              <div className="p-4 space-y-3">
                {filteredResources.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-gray-800 mb-3">
                      <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-400">No resources match your filters</p>
                    <button 
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="mt-2 text-purple-400 text-sm hover:text-purple-300"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  <>
                    {filteredResources.map((resource, idx) => (
                      <ResourceCard key={`${resource.category}-${resource.title}-${idx}`} resource={resource} />
                    ))}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Resource card component
function ResourceCard({ resource }: { resource: ResourceLink }) {
  return (
    <motion.a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all relative group"
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-medium text-white">{resource.title}</h3>
        
        {/* Premium badge */}
        {resource.isPremium && (
          <span className="text-xs px-2 py-0.5 bg-amber-800/80 rounded-full text-amber-100">
            Premium
          </span>
        )}
      </div>
      
      {/* Category */}
      <div className="mb-2">
        <span className="text-xs px-2 py-0.5 bg-purple-900/60 rounded-full text-purple-100">
          {categoryLabels[resource.category]}
        </span>
      </div>
      
      <p className="text-sm text-gray-300 mb-3">{resource.description}</p>
      
      <div className="text-purple-400 text-xs flex items-center transition-colors duration-200 group-hover:text-purple-300">
        Visit Resource
        <svg className="ml-1 w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </motion.a>
  );
}
