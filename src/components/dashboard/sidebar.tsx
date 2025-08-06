import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  TrendingUp,
  Home,
  Calendar,
  MessageSquare,
  Target,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Revenue", url: "/revenue", icon: DollarSign },
  { title: "Campaigns", url: "/campaigns", icon: Target },
  { title: "Performance", url: "/performance", icon: Activity },
  { title: "Growth", url: "/growth", icon: TrendingUp },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "glass-nav h-screen transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className={cn(
        "border-b border-sidebar-border",
        collapsed ? "p-2" : "p-4"
      )}>
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed ? (
            <>
              <div className="flex items-center space-x-2">
                <img
                  src="/favicon.png"
                  alt="ADmyBRAND Logo"
                  className="w-8 h-8 rounded-lg shadow"
                />
                <span className="font-semibold text-sidebar-foreground">ADmyBRAND</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCollapsed(!collapsed)}
                className="text-sidebar-foreground sidebar-button-glow"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className="text-sidebar-foreground sidebar-button-glow"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className={cn(
        "flex-1 space-y-2",
        collapsed ? "p-2" : "p-4"
      )}>
        {navigationItems.map((item) => {
          const isActive = item.url === "/" ? location.pathname === "/" : location.pathname.startsWith(item.url);
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.title}
              to={item.url}
              className={cn(
                "flex items-center transition-all duration-200 rounded-lg",
                collapsed 
                  ? "justify-center px-2 py-3" 
                  : "space-x-3 px-3 py-2.5",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground glow-primary" 
                  : "text-sidebar-foreground sidebar-button-glow"
              )}
              title={collapsed ? item.title : undefined}
            >
              <Icon className={cn(
                "transition-colors",
                collapsed ? "w-5 h-5" : "w-5 h-5",
                isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground"
              )} />
              {!collapsed && (
                <span className="font-medium">{item.title}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">BL</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Brandon Lee</p>
              <p className="text-xs text-sidebar-foreground/60">Admin</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}