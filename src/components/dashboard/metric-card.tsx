import React, { useEffect, useState, useCallback, useMemo } from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
}

export const MetricCard: React.FC<MetricCardProps> = React.memo(({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon 
}) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [displayChange, setDisplayChange] = useState("0%");

  // Memoized numeric values
  const numericValue = useMemo(() => parseFloat(value.replace(/[^0-9.]/g, "")), [value]);
  const numericChange = useMemo(() => parseFloat(change.replace(/[^0-9.]/g, "")), [change]);

  // Memoized format function
  const formatValue = useCallback((num: number, originalValue: string) => {
    if (originalValue.includes("$")) {
      return `$${num.toLocaleString()}`;
    }
    return num.toLocaleString();
  }, []);

  // Value animation effect
  useEffect(() => {
    const startValue = 0;
    const duration = 2000;
    const steps = 60;
    const increment = (numericValue - startValue) / steps;
    let currentValue = startValue;
    
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= numericValue) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(formatValue(currentValue, value));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericValue, value, formatValue]);

  // Change animation effect
  useEffect(() => {
    const startChange = 0;
    const duration = 1500;
    const steps = 30;
    const increment = (numericChange - startChange) / steps;
    let currentChange = startChange;
    
    const timer = setInterval(() => {
      currentChange += increment;
      if (currentChange >= numericChange) {
        setDisplayChange(change);
        clearInterval(timer);
      } else {
        setDisplayChange(`${currentChange > 0 ? "+" : ""}${currentChange.toFixed(1)}%`);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericChange, change]);

  // Memoized animation variants
  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: { 
      scale: 1.02,
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  }), []);

  const iconVariants = useMemo(() => ({
    hover: { rotate: 360 },
    tap: { scale: 0.9 }
  }), []);

  const changeIconVariants = useMemo(() => ({
    positive: { rotate: 0 },
    negative: { rotate: 180 }
  }), []);

  // Memoized change color
  const changeColor = useMemo(() => 
    changeType === "positive" ? "text-green-600" : "text-red-600", 
    [changeType]
  );

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      className="glass-card p-6 space-y-4 cursor-pointer group relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.h3 
          className="text-sm font-medium text-muted-foreground"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <motion.div
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
          className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
        >
          <Icon className="w-4 h-4 text-primary" />
        </motion.div>
      </div>
      
      {/* Value */}
      <div className="space-y-2">
        <motion.div 
          className="text-2xl font-bold text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {displayValue}
        </motion.div>
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div
            className={`flex items-center space-x-1 text-sm font-medium ${changeColor}`}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              variants={changeIconVariants}
              animate={changeType}
              transition={{ duration: 0.3 }}
            >
              {changeType === "positive" ? "↗" : "↘"}
            </motion.div>
            <span>{displayChange}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
});

MetricCard.displayName = 'MetricCard';