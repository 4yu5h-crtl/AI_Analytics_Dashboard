import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';

export function PlatformBarChart() {
  const { filteredPlatformData, filters } = useData();

  return (
    <motion.div 
      className="chart-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
    >
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-foreground mb-1">Platform Performance</h3>
        <p className="text-sm text-muted-foreground">Clicks and sales by platform</p>
      </motion.div>

      <motion.div 
        className="h-80"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredPlatformData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="platform" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Bar 
              dataKey="clicks" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
              animationDuration={2000}
              animationBegin={0}
              key={`clicks-${filters.timePeriod}`}
            />
            <Bar 
              dataKey="sales" 
              fill="hsl(var(--secondary))" 
              radius={[4, 4, 0, 0]}
              animationDuration={2000}
              animationBegin={500}
              key={`sales-${filters.timePeriod}`}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div 
        className="flex justify-center space-x-6 mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-3 h-3 bg-primary rounded-full" />
          <span className="text-sm text-muted-foreground">Clicks</span>
        </motion.div>
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-3 h-3 bg-secondary rounded-full" />
          <span className="text-sm text-muted-foreground">Sales</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 