import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { DataProvider } from "@/contexts/DataContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { PageTransition } from "@/components/ui/page-transition";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import Dashboard from "@/pages/Dashboard";
import Analytics from "@/pages/Analytics";
import Revenue from "@/pages/Revenue";
import Campaigns from "@/pages/Campaigns";
import Performance from "@/pages/Performance";
import Growth from "@/pages/Growth";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <ErrorBoundary>
          <DataProvider>
            <LoadingProvider>
              <TooltipProvider>
                <BrowserRouter>
                  <div className="min-h-screen bg-background">
                    <LoadingOverlay />
                    <Toaster />
                    <div className="flex h-screen">
                      <ErrorBoundary>
                        <DashboardSidebar />
                      </ErrorBoundary>
                      
                      <div className="flex-1 flex flex-col overflow-hidden">
                        <ErrorBoundary>
                          <DashboardHeader />
                        </ErrorBoundary>
                        
                        <main className="flex-1 overflow-auto p-6">
                          <ErrorBoundary>
                            <PageTransition>
                              <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/analytics" element={<Analytics />} />
                                <Route path="/revenue" element={<Revenue />} />
                                <Route path="/campaigns" element={<Campaigns />} />
                                <Route path="/performance" element={<Performance />} />
                                <Route path="/growth" element={<Growth />} />
                                
                                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                                <Route path="*" element={<NotFound />} />
                              </Routes>
                            </PageTransition>
                          </ErrorBoundary>
                        </main>
                      </div>
                    </div>
                  </div>
                </BrowserRouter>
              </TooltipProvider>
            </LoadingProvider>
          </DataProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
