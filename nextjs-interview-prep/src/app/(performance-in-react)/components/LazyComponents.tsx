// components/LazyComponents.tsx
"use client";

import { lazy, Suspense } from "react";

// Lazy load heavy components
const TradingChart = lazy(() => import("./TradingChart"));
const AdvancedAnalytics = lazy(() => import("./AdvancedAnalytics"));
const OrderBook = lazy(() => import("./OrderBook"));

// Loading components
export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
      <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
}

export function AnalyticsSkeleton() {
  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}

export function OrderBookSkeleton() {
  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}

// Tab-based lazy loading
interface LazyTradingDashboardProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function LazyTradingDashboard({
  activeTab,
  onTabChange,
}: LazyTradingDashboardProps) {
  const tabs = [
    {
      id: "chart",
      label: "Chart",
      component: TradingChart,
      skeleton: ChartSkeleton,
    },
    {
      id: "analytics",
      label: "Analytics",
      component: AdvancedAnalytics,
      skeleton: AnalyticsSkeleton,
    },
    {
      id: "orderbook",
      label: "Order Book",
      component: OrderBook,
      skeleton: OrderBookSkeleton,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content with Lazy Loading */}
      <div className="min-h-96">
        {tabs.map((tab) => {
          if (activeTab !== tab.id) return null;

          const Component = tab.component;
          const Skeleton = tab.skeleton;

          return (
            <Suspense key={tab.id} fallback={<Skeleton />}>
              <Component />
            </Suspense>
          );
        })}
      </div>
    </div>
  );
}


