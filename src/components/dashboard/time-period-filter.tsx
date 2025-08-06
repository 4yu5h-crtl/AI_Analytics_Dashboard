import React, { useCallback } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';

export const timePeriods = [
  "This month",
  "Last month", 
  "This quarter",
  "Last quarter",
  "This year",
  "Last year"
] as const;

export type TimePeriod = typeof timePeriods[number];

interface TimePeriodFilterProps {
  currentPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

export const TimePeriodFilter: React.FC<TimePeriodFilterProps> = React.memo(({
  currentPeriod,
  onPeriodChange
}) => {
  const handlePeriodChange = useCallback((period: TimePeriod) => {
    onPeriodChange(period);
  }, [onPeriodChange]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Calendar className="w-4 h-4" />
          <span>{currentPeriod}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {timePeriods.map((period) => (
          <DropdownMenuItem
            key={period}
            onClick={() => handlePeriodChange(period)}
            className={`cursor-pointer ${
              period === currentPeriod ? 'bg-primary/10 text-primary' : ''
            }`}
          >
            <motion.div
              className="flex items-center justify-between w-full"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.1 }}
            >
              <span>{period}</span>
              {period === currentPeriod && (
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

TimePeriodFilter.displayName = 'TimePeriodFilter'; 