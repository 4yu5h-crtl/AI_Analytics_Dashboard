import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function DataTableSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 space-y-4"
    >
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      
      {/* Table */}
      <div className="space-y-3">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 py-3 border-b border-border">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-20" />
          ))}
        </div>
        
        {/* Table Rows */}
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <motion.div
            key={rowIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: rowIndex * 0.1 }}
            className="grid grid-cols-6 gap-4 py-3"
          >
            {Array.from({ length: 6 }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4 w-full" />
            ))}
          </motion.div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <Skeleton className="h-4 w-32" />
        <div className="flex items-center space-x-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded" />
          ))}
        </div>
      </div>
    </motion.div>
  );
} 