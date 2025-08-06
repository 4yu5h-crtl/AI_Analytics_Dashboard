import { DollarSign, TrendingUp, TrendingDown, Target, BarChart3 } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { AnalyticsLineChart } from "@/components/dashboard/charts/line-chart";
import { PlatformBarChart } from "@/components/dashboard/charts/platform-bar-chart";

export default function Revenue() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Revenue</h1>
          <p className="text-muted-foreground">Track your revenue performance and growth</p>
        </div>
      </div>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$1,529,320"
          change="+22%"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Monthly Growth"
          value="+18.5%"
          change="+2.3%"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Avg Order Value"
          value="$342"
          change="+8.1%"
          changeType="positive"
          icon={Target}
        />
        <MetricCard
          title="Revenue per User"
          value="$4,342"
          change="+4.1%"
          changeType="positive"
          icon={BarChart3}
        />
      </div>
      
      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsLineChart />
        <PlatformBarChart />
      </div>
      
      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="chart-container">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-1">Revenue by Platform</h3>
              <p className="text-sm text-muted-foreground">Revenue distribution across platforms</p>
            </div>
            <div className="space-y-4">
              {[
                { platform: 'TikTok', revenue: 456000, percentage: 30, color: 'hsl(var(--chart-1))' },
                { platform: 'Instagram', revenue: 342000, percentage: 22, color: 'hsl(var(--chart-2))' },
                { platform: 'Facebook', revenue: 298000, percentage: 19, color: 'hsl(var(--chart-3))' },
                { platform: 'YouTube', revenue: 234000, percentage: 15, color: 'hsl(var(--chart-4))' },
                { platform: 'Other', revenue: 199320, percentage: 14, color: 'hsl(var(--chart-5))' },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{item.platform}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">${item.revenue.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                    </div>
                  </div>
                   <div className="progress-bar w-full" style={{ background: 'hsl(var(--muted-foreground) / 0.10)' }}>
                     <div 
                       className="progress-fill"
                       style={{ 
                         width: `${item.percentage}%`,
                         background: 'hsl(var(--primary))'
                       }}
                     ></div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="chart-container">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-1">Revenue Trends</h3>
              <p className="text-sm text-muted-foreground">Monthly performance</p>
            </div>
            <div className="space-y-4">
              {[
                { month: 'Jan', revenue: 125000, growth: '+12%' },
                { month: 'Feb', revenue: 145000, growth: '+16%' },
                { month: 'Mar', revenue: 167000, growth: '+15%' },
                { month: 'Apr', revenue: 189000, growth: '+13%' },
                { month: 'May', revenue: 234000, growth: '+24%' },
                { month: 'Jun', revenue: 298000, growth: '+27%' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div>
                    <div className="font-medium text-foreground">{item.month}</div>
                    <div className="text-sm text-muted-foreground">${item.revenue.toLocaleString()}</div>
                  </div>
                  <div className="text-green-600 font-medium">{item.growth}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 