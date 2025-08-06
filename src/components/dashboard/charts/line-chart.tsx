import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';

export const AnalyticsLineChart: React.FC = React.memo(() => {
  const { filteredChartData, filters } = useData();

  // Memoized chart configuration
  const chartConfig = useMemo(() => ({
    height: 320,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
    strokeWidth: 3,
    animationDuration: 2000
  }), []);

  // Memoized tooltip style
  const tooltipStyle = useMemo(() => ({
    backgroundColor: 'hsl(var(--background))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }), []);

  // Memoized animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: { scale: 1.01 }
  }), []);

  const headerVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, delay: 0.2 }
    }
  }), []);

  const chartVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 }
    }
  }), []);

  const legendVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.4 }
    }
  }), []);

  // Memoized legend items
  const legendItems = useMemo(() => [
    { color: 'bg-primary', label: 'Revenue' },
    { color: 'bg-secondary', label: 'Users' }
  ], []);

  return (
    <motion.div 
      className="chart-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.div 
        className="mb-6"
        variants={headerVariants}
      >
        <h3 className="text-lg font-semibold text-foreground mb-1">Revenue & Users</h3>
        <p className="text-sm text-muted-foreground">Monthly trends and growth</p>
      </motion.div>

      <motion.div 
        className="h-80"
        variants={chartVariants}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredChartData} margin={chartConfig.margin}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--primary))" 
              strokeWidth={chartConfig.strokeWidth}
              dot={{ 
                fill: 'hsl(var(--primary))', 
                strokeWidth: 2, 
                stroke: 'hsl(var(--background))' 
              }}
              animationDuration={chartConfig.animationDuration}
              animationBegin={0}
              key={`revenue-${filters.timePeriod}`}
            />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="hsl(var(--secondary))" 
              strokeWidth={chartConfig.strokeWidth}
              dot={{ 
                fill: 'hsl(var(--secondary))', 
                strokeWidth: 2, 
                stroke: 'hsl(var(--background))' 
              }}
              animationDuration={chartConfig.animationDuration}
              animationBegin={500}
              key={`users-${filters.timePeriod}`}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div 
        className="flex justify-center space-x-6 mt-4"
        variants={legendVariants}
      >
        {legendItems.map((item, index) => (
          <motion.div 
            key={item.label}
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
          >
            <div className={`w-3 h-3 ${item.color} rounded-full`} />
            <span className="text-sm text-muted-foreground">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
});

AnalyticsLineChart.displayName = 'AnalyticsLineChart';