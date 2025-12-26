import { motion } from "motion/react";

export function SearchFilterSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-12">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Skeleton */}
        <div className="flex-1 relative">
          <motion.div 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="w-full h-12 pl-12 pr-4 bg-gray-200 dark:bg-gray-700 rounded-xl"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
        </div>

        {/* Category Filter Skeleton */}
        <div className="flex items-center gap-2 relative">
          <motion.div 
            className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.div 
            className="w-32 h-12 pl-4 pr-10 bg-gray-200 dark:bg-gray-700 rounded-xl"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
        </div>
      </div>

      {/* Results Count Skeleton */}
      <div className="mt-4">
        <motion.div 
          className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>
    </div>
  );
}