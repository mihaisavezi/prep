"use client";

import { useMarketData } from "../_hooks/useMarketData";
import { useMarketStore } from "../_stores/marketStore";
import MarketStatsWidget from "../components/MarketStatsWidget";
import WatchlistWidget from "../components/WatchlistWidget";


export default function MarketDashboardPage() {
  useMarketData(); // Initialize market data fetching

  const { isLoading, error, currency, setCurrency } = useMarketStore();
  console.log("🚀 ~ MarketDashboardPage ~ useMarketStore();:", useMarketStore())

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-96 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Market Dashboard</h1>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="gbp">GBP</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <WatchlistWidget />
        </div>
        <div>
          <MarketStatsWidget />
        </div>
      </div>
    </div>
  );
}
