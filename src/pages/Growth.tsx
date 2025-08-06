import { TrendingUp, Users, DollarSign, Target, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { AnalyticsLineChart } from "@/components/dashboard/charts/line-chart";
import { PlatformBarChart } from "@/components/dashboard/charts/platform-bar-chart";

export default function Growth() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Growth</h1>
          <p className="text-muted-foreground">Track your growth metrics and trends</p>
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Growth Rate"
          value="24.3%"
          change="+2.1%"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="User Growth"
          value="+352"
          change="+12%"
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Revenue Growth"
          value="+22%"
          change="+4.1%"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Market Share"
          value="8.7%"
          change="+1.2%"
          changeType="positive"
          icon={Target}
        />
      </div>
      
      {/* Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsLineChart />
        <PlatformBarChart />
      </div>
      
      {/* Growth Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="chart-container">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-1">Growth by Channel</h3>
              <p className="text-sm text-muted-foreground">Growth performance across channels</p>
            </div>
            <div className="space-y-4">
              {[
                { channel: 'Organic Search', growth: 34, users: 45600, color: 'hsl(var(--chart-1))' },
                { channel: 'Social Media', growth: 28, users: 34200, color: 'hsl(var(--chart-2))' },
                { channel: 'Direct Traffic', growth: 22, users: 28900, color: 'hsl(var(--chart-3))' },
                { channel: 'Referral', growth: 16, users: 23400, color: 'hsl(var(--chart-4))' },
              ].map((item, index) => (
                <div key={index} className="p-4 bg-card rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-foreground">{item.channel}</span>
                    <div className="flex items-center space-x-2">
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-medium">+{item.growth}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item.users.toLocaleString()} users</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="chart-container">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-1">Growth Trends</h3>
              <p className="text-sm text-muted-foreground">Monthly growth overview</p>
            </div>
            <div className="space-y-4">
              {[
                { month: 'Jan', growth: 12, users: 12500, trend: 'up' },
                { month: 'Feb', growth: 18, users: 14500, trend: 'up' },
                { month: 'Mar', growth: 22, users: 16700, trend: 'up' },
                { month: 'Apr', growth: 19, users: 18900, trend: 'down' },
                { month: 'May', growth: 24, users: 23400, trend: 'up' },
                { month: 'Jun', growth: 28, users: 29800, trend: 'up' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div>
                    <div className="font-medium text-foreground">{item.month}</div>
                    <div className="text-sm text-muted-foreground">{item.users.toLocaleString()} users</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      +{item.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 