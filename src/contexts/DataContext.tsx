import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

// Define valid time periods as a union type for better type safety
type ValidTimePeriod = 'This month' | 'Last month' | 'This quarter' | 'Last quarter' | 'This year' | 'Last year';

// Data interfaces
interface ChartData {
  name: string;
  revenue: number;
  users: number;
}

interface PlatformData {
  platform: string;
  clicks: number;
  sales: number;
}

interface DonutData {
  name: string;
  value: number;
  color: string;
}

interface MetricData {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
}

interface FilterState {
  platforms: string[];
  metrics: string[];
  startDate: string;
  endDate: string;
  timePeriod: ValidTimePeriod;
}

interface DataContextType {
  // Filter state
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  
  // Filtered data
  filteredChartData: ChartData[];
  filteredPlatformData: PlatformData[];
  filteredDonutData: DonutData[];
  filteredMetrics: MetricData[];
  
  // Filter actions
  updatePlatformFilters: (platforms: string[]) => void;
  updateMetricFilters: (metrics: string[]) => void;
  updateDateRange: (startDate: string, endDate: string) => void;
  updateTimePeriod: (period: ValidTimePeriod) => void;
  resetFilters: () => void;

  // Global search
  globalSearchTerm: string;
  setGlobalSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

// Raw data for different time periods
const timePeriodData: Record<ValidTimePeriod, {
  chartData: ChartData[];
  platformData: PlatformData[];
  donutData: DonutData[];
  metrics: MetricData[];
}> = {
  'This month': {
    chartData: [
      { name: 'Dec', revenue: 1529320, users: 352 },
    ],
    platformData: [
      { platform: 'Instagram', clicks: 12500, sales: 234 },
      { platform: 'Facebook', clicks: 8900, sales: 187 },
      { platform: 'TikTok', clicks: 15600, sales: 298 },
      { platform: 'YouTube', clicks: 6700, sales: 89 },
    ],
    donutData: [
      { name: 'Direct Sales', value: 58, color: 'hsl(var(--chart-1))' },
      { name: 'Affiliate', value: 23, color: 'hsl(var(--chart-2))' },
      { name: 'Social Media', value: 19, color: 'hsl(var(--chart-3))' },
    ],
    metrics: [
      { title: "Revenue", value: "$1,529,320", change: "+22%", changeType: "positive" as const },
      { title: "Total Meetings", value: "352", change: "+8.2%", changeType: "positive" as const },
      { title: "Avg Per Member", value: "$4,342", change: "+4.1%", changeType: "positive" as const },
      { title: "Growth Rate", value: "24.3%", change: "+2.1%", changeType: "positive" as const },
    ]
  },
  'Last month': {
    chartData: [
      { name: 'Nov', revenue: 892000, users: 321 },
    ],
    platformData: [
      { platform: 'Instagram', clicks: 9800, sales: 187 },
      { platform: 'Facebook', clicks: 7200, sales: 145 },
      { platform: 'TikTok', clicks: 12300, sales: 234 },
      { platform: 'YouTube', clicks: 5400, sales: 67 },
    ],
    donutData: [
      { name: 'Direct Sales', value: 52, color: 'hsl(var(--chart-1))' },
      { name: 'Affiliate', value: 28, color: 'hsl(var(--chart-2))' },
      { name: 'Social Media', value: 20, color: 'hsl(var(--chart-3))' },
    ],
    metrics: [
      { title: "Revenue", value: "$892,000", change: "+18%", changeType: "positive" as const },
      { title: "Total Meetings", value: "321", change: "+6.5%", changeType: "positive" as const },
      { title: "Avg Per Member", value: "$3,987", change: "+3.2%", changeType: "positive" as const },
      { title: "Growth Rate", value: "18.7%", change: "+1.8%", changeType: "positive" as const },
    ]
  },
  'This quarter': {
    chartData: [
      { name: 'Oct', revenue: 678000, users: 298 },
      { name: 'Nov', revenue: 892000, users: 321 },
      { name: 'Dec', revenue: 1529320, users: 352 },
    ],
    platformData: [
      { platform: 'Instagram', clicks: 11500, sales: 210 },
      { platform: 'Facebook', clicks: 8200, sales: 165 },
      { platform: 'TikTok', clicks: 14200, sales: 275 },
      { platform: 'YouTube', clicks: 6100, sales: 78 },
    ],
    donutData: [
      { name: 'Direct Sales', value: 61, color: 'hsl(var(--chart-1))' },
      { name: 'Affiliate', value: 21, color: 'hsl(var(--chart-2))' },
      { name: 'Social Media', value: 18, color: 'hsl(var(--chart-3))' },
    ],
    metrics: [
      { title: "Revenue", value: "$3,099,320", change: "+25%", changeType: "positive" as const },
      { title: "Total Meetings", value: "971", change: "+12.3%", changeType: "positive" as const },
      { title: "Avg Per Member", value: "$4,125", change: "+5.8%", changeType: "positive" as const },
      { title: "Growth Rate", value: "28.9%", change: "+3.2%", changeType: "positive" as const },
    ]
  },
  'Last quarter': {
    chartData: [
      { name: 'Jul', revenue: 356000, users: 203 },
      { name: 'Aug', revenue: 423000, users: 234 },
      { name: 'Sep', revenue: 512000, users: 267 },
    ],
    platformData: [
      { platform: 'Instagram', clicks: 8900, sales: 165 },
      { platform: 'Facebook', clicks: 6500, sales: 125 },
      { platform: 'TikTok', clicks: 10800, sales: 198 },
      { platform: 'YouTube', clicks: 4800, sales: 58 },
    ],
    donutData: [
      { name: 'Direct Sales', value: 49, color: 'hsl(var(--chart-1))' },
      { name: 'Affiliate', value: 31, color: 'hsl(var(--chart-2))' },
      { name: 'Social Media', value: 20, color: 'hsl(var(--chart-3))' },
    ],
    metrics: [
      { title: "Revenue", value: "$1,291,000", change: "+15%", changeType: "positive" as const },
      { title: "Total Meetings", value: "704", change: "+7.8%", changeType: "positive" as const },
      { title: "Avg Per Member", value: "$3,654", change: "+2.9%", changeType: "positive" as const },
      { title: "Growth Rate", value: "16.2%", change: "+1.5%", changeType: "positive" as const },
    ]
  },
  'This year': {
    chartData: [
      { name: 'Jan', revenue: 125000, users: 89 },
      { name: 'Feb', revenue: 145000, users: 123 },
      { name: 'Mar', revenue: 167000, users: 156 },
      { name: 'Apr', revenue: 189000, users: 134 },
      { name: 'May', revenue: 234000, users: 167 },
      { name: 'Jun', revenue: 298000, users: 189 },
      { name: 'Jul', revenue: 356000, users: 203 },
      { name: 'Aug', revenue: 423000, users: 234 },
      { name: 'Sep', revenue: 512000, users: 267 },
      { name: 'Oct', revenue: 678000, users: 298 },
      { name: 'Nov', revenue: 892000, users: 321 },
      { name: 'Dec', revenue: 1529320, users: 352 },
    ],
    platformData: [
      { platform: 'Instagram', clicks: 12500, sales: 234 },
      { platform: 'Facebook', clicks: 8900, sales: 187 },
      { platform: 'TikTok', clicks: 15600, sales: 298 },
      { platform: 'YouTube', clicks: 6700, sales: 89 },
    ],
    donutData: [
      { name: 'Direct Sales', value: 65, color: 'hsl(var(--chart-1))' },
      { name: 'Affiliate', value: 18, color: 'hsl(var(--chart-2))' },
      { name: 'Social Media', value: 17, color: 'hsl(var(--chart-3))' },
    ],
    metrics: [
      { title: "Revenue", value: "$6,220,320", change: "+35%", changeType: "positive" as const },
      { title: "Total Meetings", value: "2,483", change: "+18.7%", changeType: "positive" as const },
      { title: "Avg Per Member", value: "$4,125", change: "+8.9%", changeType: "positive" as const },
      { title: "Growth Rate", value: "42.1%", change: "+5.2%", changeType: "positive" as const },
    ]
  },
  'Last year': {
    chartData: [
      { name: 'Jan', revenue: 89000, users: 67 },
      { name: 'Feb', revenue: 102000, users: 89 },
      { name: 'Mar', revenue: 118000, users: 112 },
      { name: 'Apr', revenue: 134000, users: 98 },
      { name: 'May', revenue: 156000, users: 134 },
      { name: 'Jun', revenue: 178000, users: 145 },
      { name: 'Jul', revenue: 201000, users: 167 },
      { name: 'Aug', revenue: 234000, users: 189 },
      { name: 'Sep', revenue: 267000, users: 201 },
      { name: 'Oct', revenue: 312000, users: 223 },
      { name: 'Nov', revenue: 378000, users: 245 },
      { name: 'Dec', revenue: 456000, users: 267 },
    ],
    platformData: [
      { platform: 'Instagram', clicks: 8900, sales: 165 },
      { platform: 'Facebook', clicks: 6500, sales: 125 },
      { platform: 'TikTok', clicks: 10800, sales: 198 },
      { platform: 'YouTube', clicks: 4800, sales: 58 },
    ],
    donutData: [
      { name: 'Direct Sales', value: 45, color: 'hsl(var(--chart-1))' },
      { name: 'Affiliate', value: 35, color: 'hsl(var(--chart-2))' },
      { name: 'Social Media', value: 20, color: 'hsl(var(--chart-3))' },
    ],
    metrics: [
      { title: "Revenue", value: "$2,456,000", change: "+12%", changeType: "positive" as const },
      { title: "Total Meetings", value: "1,987", change: "+8.9%", changeType: "positive" as const },
      { title: "Avg Per Member", value: "$3,234", change: "+3.1%", changeType: "positive" as const },
      { title: "Growth Rate", value: "15.8%", change: "+2.1%", changeType: "positive" as const },
    ]
  }
};

// Create context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider component
export function DataProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>({
    platforms: ['Instagram', 'Facebook', 'TikTok', 'YouTube'],
    metrics: ['Clicks', 'Sales', 'Conversion Rate', 'Revenue'],
    startDate: '',
    endDate: '',
    timePeriod: 'This year',
  });
  const [globalSearchTerm, setGlobalSearchTerm] = useState("");

  // Filter functions
  const updatePlatformFilters = (platforms: string[]) => {
    setFilters(prev => ({ ...prev, platforms }));
  };

  const updateMetricFilters = (metrics: string[]) => {
    setFilters(prev => ({ ...prev, metrics }));
  };

  const updateDateRange = (startDate: string, endDate: string) => {
    setFilters(prev => ({ ...prev, startDate, endDate }));
  };

  const updateTimePeriod = (period: ValidTimePeriod) => {
    // Validate that the time period exists in our data
    if (period in timePeriodData) {
      setFilters(prev => ({ ...prev, timePeriod: period }));
    } else {
      console.warn(`Invalid time period: ${period}. Falling back to 'This year'.`);
      setFilters(prev => ({ ...prev, timePeriod: 'This year' }));
    }
  };

  const resetFilters = () => {
    setFilters({
      platforms: ['Instagram', 'Facebook', 'TikTok', 'YouTube'],
      metrics: ['Clicks', 'Sales', 'Conversion Rate', 'Revenue'],
      startDate: '',
      endDate: '',
      timePeriod: 'This year',
    });
  };

  // Filtered data calculations
  const filteredChartData = useMemo(() => {
    const periodData = timePeriodData[filters.timePeriod];
    return periodData ? periodData.chartData : timePeriodData['This year'].chartData;
  }, [filters.timePeriod]);

  const filteredPlatformData = useMemo(() => {
    const periodData = timePeriodData[filters.timePeriod];
    const baseData = periodData ? periodData.platformData : timePeriodData['This year'].platformData;
    
    // Apply platform filters
    return baseData.filter(item => 
      filters.platforms.includes(item.platform)
    );
  }, [filters.timePeriod, filters.platforms]);

  const filteredDonutData = useMemo(() => {
    const periodData = timePeriodData[filters.timePeriod];
    return periodData ? periodData.donutData : timePeriodData['This year'].donutData;
  }, [filters.timePeriod]);

  const filteredMetrics = useMemo(() => {
    const periodData = timePeriodData[filters.timePeriod];
    return periodData ? periodData.metrics : timePeriodData['This year'].metrics;
  }, [filters.timePeriod]);

  const value: DataContextType = {
    filters,
    setFilters,
    filteredChartData,
    filteredPlatformData,
    filteredDonutData,
    filteredMetrics,
    updatePlatformFilters,
    updateMetricFilters,
    updateDateRange,
    updateTimePeriod,
    resetFilters,
    globalSearchTerm,
    setGlobalSearchTerm,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

// Hook to use the data context
export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
} 