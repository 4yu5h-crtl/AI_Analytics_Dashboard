import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function LineChartSkeleton() {
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
      
      {/* Chart Area */}
      <div className="h-64 relative">
        {/* Y-axis */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-8" />
          ))}
        </div>
        
        {/* Chart Lines */}
        <div className="absolute left-12 right-0 top-0 bottom-0">
          <div className="h-full flex items-end justify-between px-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: Math.random() * 100 + 20 }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="w-8 bg-gradient-to-t from-primary/20 to-primary/40 rounded-t"
              />
            ))}
          </div>
        </div>
        
        {/* X-axis */}
        <div className="absolute bottom-0 left-12 right-0 flex justify-between px-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-8" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function BarChartSkeleton() {
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
      
      {/* Chart Area */}
      <div className="h-48 relative">
        <div className="h-full flex items-end justify-between px-4 space-x-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: Math.random() * 80 + 20 }}
              transition={{ duration: 1, delay: i * 0.15 }}
              className="flex-1 bg-gradient-to-t from-chart-1/20 to-chart-1/40 rounded-t"
            />
          ))}
        </div>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-16" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function DonutChartSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 space-y-4"
    >
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
      
      {/* Chart Area */}
      <div className="h-48 relative flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-32 h-32 rounded-full border-8 border-muted relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="h-8 w-16" />
          </div>
        </motion.div>
      </div>
      
      {/* Legend */}
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-8" />
          </div>
        ))}
      </div>
    </motion.div>
  );
} 