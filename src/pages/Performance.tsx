import { Activity, TrendingUp, Target, BarChart3, Zap, Clock, Users, DollarSign } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { AnalyticsLineChart } from "@/components/dashboard/charts/line-chart";
import { PlatformBarChart } from "@/components/dashboard/charts/platform-bar-chart";

export default function Performance() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Performance</h1>
          <p className="text-muted-foreground">Monitor your performance metrics and KPIs</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Conversion Rate"
          value="3.2%"
          change="+0.8%"
          changeType="positive"
          icon={Target}
        />
        <MetricCard
          title="Avg Session Time"
          value="4m 32s"
          change="+12%"
          changeType="positive"
          icon={Clock}
        />
        <MetricCard
          title="Bounce Rate"
          value="23.4%"
          change="-2.1%"
          changeType="positive"
          icon={Zap}
        />
        <MetricCard
          title="Page Load Time"
          value="1.2s"
          change="-15%"
          changeType="positive"
          icon={Activity}
        />
      </div>
      
      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsLineChart />
        <PlatformBarChart />
      </div>
      
      {/* Performance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="chart-container">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-1">Performance by Device</h3>
              <p className="text-sm text-muted-foreground">Performance metrics across devices</p>
            </div>
            <div className="space-y-4">
              {[
                { device: 'Desktop', sessions: 45600, conversion: 4.2, bounce: 18.5, color: 'hsl(var(--chart-1))' },
                { device: 'Mobile', sessions: 89200, conversion: 2.8, bounce: 28.3, color: 'hsl(var(--chart-2))' },
                { device: 'Tablet', sessions: 23400, conversion: 3.1, bounce: 22.1, color: 'hsl(var(--chart-3))' },
              ].map((item, index) => (
                <div key={index} className="p-4 bg-card rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-foreground">{item.device}</span>
                    <span className="text-sm text-muted-foreground">{item.sessions.toLocaleString()} sessions</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Conversion:</span>
                      <span className="ml-2 text-green-600 font-medium">{item.conversion}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Bounce Rate:</span>
                      <span className="ml-2 text-red-600 font-medium">{item.bounce}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="chart-container">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-1">Performance Trends</h3>
              <p className="text-sm text-muted-foreground">Monthly performance overview</p>
            </div>
            <div className="space-y-4">
              {[
                { metric: 'Conversion Rate', current: 3.2, previous: 2.8, change: '+14.3%' },
                { metric: 'Session Duration', current: 272, previous: 245, change: '+11.0%' },
                { metric: 'Bounce Rate', current: 23.4, previous: 25.5, change: '-8.2%' },
                { metric: 'Page Load Time', current: 1.2, previous: 1.4, change: '-14.3%' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div>
                    <div className="font-medium text-foreground">{item.metric}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.current}{item.metric.includes('Rate') || item.metric.includes('Time') ? '' : 's'}
                    </div>
                  </div>
                  <div className="text-green-600 font-medium">{item.change}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 