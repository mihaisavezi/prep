"use client"

import { useState } from "react";
import LazyTradingDashboard from "../components/LazyComponents";

export default function Level3PerformancePage() {
  const [activeTab, setActiveTab] = useState("chart");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          Level 3: Code Splitting & Lazy Loading
        </h1>
        <p className="text-gray-600">
          Components are loaded only when needed. Check Network tab to see
          dynamic imports.
        </p>
      </div>

      <LazyTradingDashboard activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Performance Benefits:</strong>
          <br />
          • Smaller initial bundle size
          <br />
          • Components load on-demand
          <br />
          • Better Time to Interactive (TTI)
          <br />• Improved Core Web Vitals
        </p>
      </div>
    </div>
  );
}
