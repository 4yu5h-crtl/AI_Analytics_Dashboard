import { useEffect, useRef, useCallback } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage?: number;
  componentName: string;
}

export const usePerformance = (componentName: string) => {
  const renderStartTime = useRef<number>(0);
  const renderCount = useRef<number>(0);

  const startRender = useCallback(() => {
    renderStartTime.current = performance.now();
  }, []);

  const endRender = useCallback(() => {
    const renderTime = performance.now() - renderStartTime.current;
    renderCount.current += 1;

    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      const metrics: PerformanceMetrics = {
        renderTime,
        componentName,
        memoryUsage: (performance as any).memory?.usedJSHeapSize
      };

      console.log(`Performance - ${componentName}:`, {
        renderTime: `${renderTime.toFixed(2)}ms`,
        renderCount: renderCount.current,
        memoryUsage: metrics.memoryUsage ? `${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB` : 'N/A'
      });
    }

    return renderTime;
  }, [componentName]);

  // Monitor component mount/unmount
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Component mounted: ${componentName}`);
    }

    return () => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Component unmounted: ${componentName} (rendered ${renderCount.current} times)`);
      }
    };
  }, [componentName]);

  return {
    startRender,
    endRender,
    renderCount: renderCount.current
  };
};

// Hook for measuring expensive operations
export const useMeasureOperation = (operationName: string) => {
  const measureOperation = useCallback(async <T>(
    operation: () => Promise<T> | T
  ): Promise<T> => {
    const startTime = performance.now();
    
    try {
      const result = await operation();
      const duration = performance.now() - startTime;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`Operation - ${operationName}: ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      console.error(`Operation failed - ${operationName}: ${duration.toFixed(2)}ms`, error);
      throw error;
    }
  }, [operationName]);

  return measureOperation;
}; 