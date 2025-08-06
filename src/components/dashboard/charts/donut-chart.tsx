import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';

export function SentimentDonutChart() {
  const { filteredDonutData, filters } = useData();
  const total = filteredDonutData.reduce((sum, item) => sum + item.value, 0);
  const primaryValue = filteredDonutData[0]?.value || 0;

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
        <h3 className="text-lg font-semibold text-foreground mb-1">Conversions</h3>
        <p className="text-sm text-muted-foreground">Export source breakdown</p>
      </motion.div>

      <motion.div 
        className="relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredDonutData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                animationDuration={2000}
                animationBegin={0}
                key={`pie-${filters.timePeriod}`}
              >
                {filteredDonutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Center text */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {primaryValue}%
            </motion.div>
            <motion.div 
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              Conversions
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="space-y-3 mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {filteredDonutData.map((item, index) => (
          <motion.div 
            key={index} 
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
          >
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
            <motion.span 
              className="text-sm font-medium text-foreground"
              whileHover={{ scale: 1.1 }}
            >
              {item.value}%
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}