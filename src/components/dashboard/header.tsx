import React, { useState, useCallback, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useData } from "@/contexts/DataContext";
import { useLoading } from "@/contexts/LoadingContext";
import { motion } from "framer-motion";
import { NotificationSystem, Notification } from "./notification-system";
import { TimePeriodFilter, TimePeriod } from "./time-period-filter";
import { ExportActions } from "./export-actions";
import { ExportData } from "./export-utils";

export function DashboardHeader() {
  const { filters, updateTimePeriod, filteredChartData, filteredPlatformData, filteredMetrics, globalSearchTerm, setGlobalSearchTerm } = useData();
  const { setIsLoading, setLoadingMessage } = useLoading();

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "New user registered", message: "Sarah Johnson joined the platform", time: "2 min ago", read: false },
    { id: 2, title: "Revenue milestone", message: "You've reached $50k this month", time: "1 hour ago", read: false },
    { id: 3, title: "Campaign completed", message: "Instagram campaign finished successfully", time: "3 hours ago", read: true },
  ]);

  // Memoized export data
  const exportData: ExportData = useMemo(() => ({
    timePeriod: filters.timePeriod,
    metrics: filteredMetrics.map(metric => ({
      title: metric.title,
      value: metric.value,
      change: metric.change,
      changeType: metric.changeType
    })),
    chartData: filteredChartData.map(item => ({
      month: item.name,
      revenue: item.revenue,
      users: item.users
    })),
    platformData: filteredPlatformData.map(item => ({
      platform: item.platform,
      clicks: item.clicks,
      sales: item.sales
    }))
  }), [filters.timePeriod, filteredMetrics, filteredChartData, filteredPlatformData]);

  // Callback handlers
  const handlePeriodChange = useCallback((period: TimePeriod) => {
    updateTimePeriod(period);
  }, [updateTimePeriod]);

  const handleNotificationClick = useCallback((id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  const handleExportStart = useCallback(() => {
    setIsLoading(true);
    setLoadingMessage("Preparing export...");
  }, [setIsLoading, setLoadingMessage]);

  const handleExportComplete = useCallback(() => {
    setIsLoading(false);
    setLoadingMessage("");
  }, [setIsLoading, setLoadingMessage]);

  const handleExportError = useCallback((error: string) => {
    setIsLoading(false);
    setLoadingMessage("");
    console.error('Export error:', error);
    // You could add a toast notification here
  }, [setIsLoading, setLoadingMessage]);

  return (
    <motion.header 
      className="glass-nav border-b border-border/40 backdrop-blur-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search Section */}
        <motion.div 
          className="flex items-center space-x-4 flex-1 max-w-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search analytics, reports, users..."
              className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
              value={globalSearchTerm}
              onChange={e => setGlobalSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Controls Section */}
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Time Period Filter */}
          <TimePeriodFilter
            currentPeriod={filters.timePeriod}
            onPeriodChange={handlePeriodChange}
          />

          {/* Export Actions */}
          <ExportActions
            exportData={exportData}
            onExportStart={handleExportStart}
            onExportComplete={handleExportComplete}
            onExportError={handleExportError}
          />

          {/* Notification System */}
          <NotificationSystem
            notifications={notifications}
            onNotificationClick={handleNotificationClick}
            onMarkAllAsRead={handleMarkAllAsRead}
          />

          {/* Theme Toggle */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThemeToggle />
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
}