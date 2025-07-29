// hooks/usePerformanceMonitoring.ts
"use client";

import { useEffect, useState } from "react";

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  componentCount: number;
  lastUpdate: Date;
}

export function usePerformanceMonitoring(componentName: string) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    const startTime = performance.now();
    let componentCount = 0;

    // Count DOM nodes (approximation of component count)
    const countNodes = () => {
      componentCount = document.querySelectorAll("*").length;
    };

    // Measure memory usage (if available)
    const getMemoryUsage = () => {
      if ("memory" in performance) {
        return (performance as any).memory.usedJSHeapSize / 1024 / 1024; // MB
      }
      return 0;
    };

    const measurePerformance = () => {
      const endTime = performance.now();
      countNodes();

      setMetrics({
        renderTime: endTime - startTime,
        memoryUsage: getMemoryUsage(),
        componentCount,
        lastUpdate: new Date(),
      });
    };

    // Measure after component mounts
    const timer = setTimeout(measurePerformance, 100);

    return () => clearTimeout(timer);
  }, [componentName]);

  return metrics;
}
