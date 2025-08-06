import { useEffect, useState } from "react";
import { DollarSign, Users, TrendingUp, Target } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { AnalyticsLineChart } from "@/components/dashboard/charts/line-chart";
import { PlatformBarChart } from "@/components/dashboard/charts/platform-bar-chart";
import { SentimentDonutChart } from "@/components/dashboard/charts/donut-chart";
import { DataTable } from "@/components/dashboard/data-table";
import { useData } from "@/contexts/DataContext";
import { useLoading } from "@/contexts/LoadingContext";
import { motion, AnimatePresence } from "framer-motion";
import { MetricCardsSkeleton } from "@/components/dashboard/skeletons/metric-card-skeleton";
import { LineChartSkeleton, BarChartSkeleton, DonutChartSkeleton } from "@/components/dashboard/skeletons/chart-skeleton";
import { DataTableSkeleton } from "@/components/dashboard/skeletons/data-table-skeleton";
import { useReducedMotion, getAnimationSettings } from "@/hooks/useReducedMotion";

// Define metric icons mapping for better maintainability
const metricIcons = [DollarSign, Target, Users, TrendingUp];

export default function Dashboard() {
  const { filteredMetrics, filters } = useData();
  const { setIsLoading, setLoadingMessage } = useLoading();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const animationSettings = getAnimationSettings(prefersReducedMotion);

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Loading dashboard data...");
    const timer = setTimeout(() => {
      setIsDataLoaded(true);
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [setIsLoading, setLoadingMessage]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animationSettings.staggerChildren,
        delayChildren: animationSettings.delayChildren
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animationSettings.duration,
        ease: animationSettings.ease
      }
    }
  };

  // Guard against empty or undefined metrics
  const hasValidMetrics = filteredMetrics && filteredMetrics.length >= 4;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <AnimatePresence mode="wait">
        {!isDataLoaded ? (
          <motion.div
            key="skeleton"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-6"
          >
            {/* Metrics Grid Skeleton */}
            <motion.div variants={itemVariants}>
              <MetricCardsSkeleton />
            </motion.div>
            {/* Charts Grid Skeleton */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <LineChartSkeleton />
                  <BarChartSkeleton />
                </div>
                <div className="space-y-6">
                  <DonutChartSkeleton />
                </div>
              </div>
            </motion.div>
            {/* Data Table Skeleton */}
            <motion.div variants={itemVariants}>
              <DataTableSkeleton />
            </motion.div>
          </motion.div>
        ) : (
          <>
            {/* Animate metrics, charts, and table on time period change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={filters.timePeriod + "-metrics"}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {/* Metrics Grid */}
                <motion.div variants={itemVariants}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {hasValidMetrics ? (
                      filteredMetrics.slice(0, 4).map((metric, index) => {
                        const Icon = metricIcons[index];
                        return (
                          <MetricCard
                            key={metric.title}
                            title={metric.title}
                            value={metric.value}
                            change={metric.change}
                            changeType={metric.changeType}
                            icon={Icon}
                          />
                        );
                      })
                    ) : (
                      // Fallback skeleton if metrics are not available
                      <MetricCardsSkeleton />
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={filters.timePeriod + "-charts"}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {/* Charts Grid */}
                <motion.div variants={itemVariants}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <AnalyticsLineChart />
                      <PlatformBarChart />
                    </div>
                    <div className="space-y-6">
                      <SentimentDonutChart />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={filters.timePeriod + "-table"}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {/* Data Table */}
                <motion.div variants={itemVariants}>
                  <div className="grid grid-cols-1">
                    <DataTable />
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}