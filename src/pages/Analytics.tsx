import { BarChart3, TrendingUp, Users, Target, DollarSign, Activity } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { AnalyticsLineChart } from "@/components/dashboard/charts/line-chart";
import { PlatformBarChart } from "@/components/dashboard/charts/platform-bar-chart";
import { SentimentDonutChart } from "@/components/dashboard/charts/donut-chart";

export default function Analytics() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive analytics and insights</p>
        </div>
      </div>

      {/* Analytics Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Views"
          value="2.4M"
          change="+15.3%"
          changeType="positive"
          icon={Activity}
        />
        <MetricCard
          title="Engagement Rate"
          value="8.7%"
          change="+2.1%"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Conversion Rate"
          value="3.2%"
          change="+0.8%"
          changeType="positive"
          icon={Target}
        />
        <MetricCard
          title="Avg Session"
          value="4m 32s"
          change="+12%"
          changeType="positive"
          icon={Users}
        />
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsLineChart />
        <PlatformBarChart />
      </div>
      
      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="chart-container">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-1">Traffic Sources</h3>
              <p className="text-sm text-muted-foreground">Where your visitors come from</p>
            </div>
            <div className="space-y-4">
              {[
                { source: 'Organic Search', percentage: 45, color: 'hsl(var(--chart-1))' },
                { source: 'Direct Traffic', percentage: 28, color: 'hsl(var(--chart-2))' },
                { source: 'Social Media', percentage: 18, color: 'hsl(var(--chart-3))' },
                { source: 'Referral', percentage: 9, color: 'hsl(var(--chart-4))' },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{item.source}</span>
                    <span className="text-sm text-muted-foreground">{item.percentage}%</span>
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
        
        <div>
          <SentimentDonutChart />
        </div>
      </div>
    </div>
  );
} 