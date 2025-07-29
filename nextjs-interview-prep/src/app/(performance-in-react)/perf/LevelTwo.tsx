"use client"
// app/performance-demo/level2/page.tsx

import { useState } from "react";
import PortfolioCalculator from "../components/PortfolioCalculator";
import PerformanceComparison from "../components/PerformanceComparison";

export default function Level2PerformancePage() {
  const [holdings, setHoldings] = useState([
    {
      id: "1",
      symbol: "BTC",
      amount: 0.5,
      purchasePrice: 40000,
      currentPrice: 45000,
    },
    {
      id: "2",
      symbol: "ETH",
      amount: 2,
      purchasePrice: 2800,
      currentPrice: 3200,
    },
    {
      id: "3",
      symbol: "ADA",
      amount: 1000,
      purchasePrice: 0.8,
      currentPrice: 0.85,
    },
    {
      id: "4",
      symbol: "DOT",
      amount: 100,
      purchasePrice: 25,
      currentPrice: 28,
    },
  ]);

  const [currency, setCurrency] = useState("USD");
  const [updateCount, setUpdateCount] = useState(0);

  const updatePrices = () => {
    setHoldings((prev) =>
      prev.map((holding) => ({
        ...holding,
        currentPrice: holding.currentPrice * (0.95 + Math.random() * 0.1), // ±5% price change
      }))
    );
    setUpdateCount((prev) => prev + 1);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Level 2: useMemo & useCallback</h1>
          <div className="flex space-x-2">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <button
              onClick={updatePrices}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Update Prices ({updateCount})
            </button>
          </div>
        </div>

        <PortfolioCalculator holdings={holdings} currency={currency} />

        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            Open DevTools Console to see when expensive calculations run. Notice
            how changing currency doesn't recalculate portfolio metrics, and
            sorting doesn't recalculate the base metrics.
          </p>
        </div>
      </div>
      <PerformanceComparison />
    </>
  );
}
