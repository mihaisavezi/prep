// components/MarketStatsWidget.tsx
"use client";

import { useMarketStats } from "../_stores/marketStore";

export default function MarketStatsWidget() {
  const { totalMarketCap, topGainers, topLosers, currency } = useMarketStats();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-xl font-semibold mb-4">Market Overview</h3>
        <div className="text-3xl font-bold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
            notation: "compact",
          }).format(totalMarketCap)}
        </div>
        <p className="text-gray-600">Total Market Cap</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h4 className="font-semibold mb-3 text-green-600">Top Gainers</h4>
        <div className="space-y-2">
          {topGainers.map((coin) => (
            <div key={coin.id} className="flex justify-between items-center">
              <span className="text-sm">{coin.symbol.toUpperCase()}</span>
              <span className="text-sm text-green-600 font-medium">
                +{coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h4 className="font-semibold mb-3 text-red-600">Top Losers</h4>
        <div className="space-y-2">
          {topLosers.map((coin) => (
            <div key={coin.id} className="flex justify-between items-center">
              <span className="text-sm">{coin.symbol.toUpperCase()}</span>
              <span className="text-sm text-red-600 font-medium">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
