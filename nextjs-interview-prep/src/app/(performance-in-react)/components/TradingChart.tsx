"use client";

import { useEffect, useState } from "react";

export default function TradingChart() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading a heavy charting library
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Loading Chart Library...</h3>
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Trading Chart</h3>
      <div className="h-64 bg-gradient-to-r from-blue-50 to-green-50 rounded flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-2">📈</div>
          <p className="text-gray-600">Heavy Chart Component Loaded!</p>
          <p className="text-sm text-gray-500">
            This would contain a complex trading chart
          </p>
        </div>
      </div>
    </div>
  );
}
