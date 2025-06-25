// components/PortfolioCalculator.tsx
"use client";

import { useState, useMemo, useCallback, memo } from "react";

interface Holding {
  id: string;
  symbol: string;
  amount: number;
  purchasePrice: number;
  currentPrice: number;
}

interface PortfolioCalculatorProps {
  holdings: Holding[];
  currency: string;
}

// Expensive calculation function
const calculatePortfolioMetrics = (holdings: Holding[]) => {
  console.log("Calculating portfolio metrics..."); // This should only log when holdings change

  // Simulate expensive calculation
  const start = performance.now();

  const totalValue = holdings.reduce(
    (sum, holding) => sum + holding.amount * holding.currentPrice,
    0
  );

  const totalInvested = holdings.reduce(
    (sum, holding) => sum + holding.amount * holding.purchasePrice,
    0
  );

  const totalGainLoss = totalValue - totalInvested;
  const totalGainLossPercent =
    totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

  const topPerformer = holdings.reduce((best, holding) => {
    const gainPercent =
      ((holding.currentPrice - holding.purchasePrice) / holding.purchasePrice) *
      100;
    const bestGainPercent = best
      ? ((best.currentPrice - best.purchasePrice) / best.purchasePrice) * 100
      : -Infinity;
    return gainPercent > bestGainPercent ? holding : best;
  }, null as Holding | null);

  // Simulate more expensive work
  for (let i = 0; i < 100000; i++) {
    Math.random();
  }

  const end = performance.now();
  console.log(`Portfolio calculation took ${end - start} milliseconds`);

  return {
    totalValue,
    totalInvested,
    totalGainLoss,
    totalGainLossPercent,
    topPerformer,
  };
};

const PortfolioCalculator = memo(function PortfolioCalculator({
  holdings,
  currency,
}: PortfolioCalculatorProps) {
  const [sortBy, setSortBy] = useState<"value" | "gain" | "symbol">("value");

  // Memoize expensive calculation
  const portfolioMetrics = useMemo(() => {
    return calculatePortfolioMetrics(holdings);
  }, [holdings]); // Only recalculate when holdings change

  // Memoize sorted holdings
  const sortedHoldings = useMemo(() => {
    console.log("Sorting holdings...");

    return [...holdings].sort((a, b) => {
      switch (sortBy) {
        case "value":
          return b.amount * b.currentPrice - a.amount * a.currentPrice;
        case "gain":
          const aGain =
            ((a.currentPrice - a.purchasePrice) / a.purchasePrice) * 100;
          const bGain =
            ((b.currentPrice - b.purchasePrice) / b.purchasePrice) * 100;
          return bGain - aGain;
        case "symbol":
          return a.symbol.localeCompare(b.symbol);
        default:
          return 0;
      }
    });
  }, [holdings, sortBy]); // Recalculate when holdings or sortBy changes

  // Memoize callback functions
  const handleSortChange = useCallback(
    (newSortBy: "value" | "gain" | "symbol") => {
      console.log("Sort changed to:", newSortBy);
      setSortBy(newSortBy);
    },
    []
  ); // No dependencies, function never changes

  const formatCurrency = useCallback(
    (amount: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(amount);
    },
    [currency]
  ); // Only recreate when currency changes

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-6">Portfolio Calculator</h2>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600">Total Value</h3>
          <p className="text-2xl font-bold text-blue-900">
            {formatCurrency(portfolioMetrics.totalValue)}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600">Total Invested</h3>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(portfolioMetrics.totalInvested)}
          </p>
        </div>
        <div
          className={`p-4 rounded-lg ${
            portfolioMetrics.totalGainLoss >= 0 ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <h3
            className={`text-sm font-medium ${
              portfolioMetrics.totalGainLoss >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            Total Gain/Loss
          </h3>
          <p
            className={`text-2xl font-bold ${
              portfolioMetrics.totalGainLoss >= 0
                ? "text-green-900"
                : "text-red-900"
            }`}
          >
            {portfolioMetrics.totalGainLoss >= 0 ? "+" : ""}
            {formatCurrency(portfolioMetrics.totalGainLoss)}
          </p>
          <p
            className={`text-sm ${
              portfolioMetrics.totalGainLoss >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {portfolioMetrics.totalGainLossPercent >= 0 ? "+" : ""}
            {portfolioMetrics.totalGainLossPercent.toFixed(2)}%
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-600">Top Performer</h3>
          <p className="text-lg font-bold text-yellow-900">
            {portfolioMetrics.topPerformer?.symbol || "N/A"}
          </p>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => handleSortChange("value")}
          className={`px-3 py-1 rounded text-sm ${
            sortBy === "value"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Sort by Value
        </button>
        <button
          onClick={() => handleSortChange("gain")}
          className={`px-3 py-1 rounded text-sm ${
            sortBy === "gain"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Sort by Gain
        </button>
        <button
          onClick={() => handleSortChange("symbol")}
          className={`px-3 py-1 rounded text-sm ${
            sortBy === "symbol"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Sort by Symbol
        </button>
      </div>

      {/* Holdings List */}
      <div className="space-y-2">
        {sortedHoldings.map((holding) => {
          const currentValue = holding.amount * holding.currentPrice;
          const investedValue = holding.amount * holding.purchasePrice;
          const gainLoss = currentValue - investedValue;
          const gainLossPercent = (gainLoss / investedValue) * 100;

          return (
            <div
              key={holding.id}
              className="flex items-center justify-between p-3 border rounded-md"
            >
              <div>
                <h4 className="font-semibold">{holding.symbol}</h4>
                <p className="text-sm text-gray-600">{holding.amount} coins</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatCurrency(currentValue)}</p>
                <p
                  className={`text-sm ${
                    gainLoss >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {gainLoss >= 0 ? "+" : ""}
                  {formatCurrency(gainLoss)} ({gainLossPercent.toFixed(2)}%)
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default PortfolioCalculator;
