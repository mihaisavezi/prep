"use client";

import { usePortfolio } from "../_contexts/PortfolioContext";

export default function PortfolioSummary() {
  const { getTotalValue, getTotalGainLoss } = usePortfolio();

  const totalValue = getTotalValue();
  const gainLoss = getTotalGainLoss();
  const isPositive = gainLoss >= 0;

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-4">Portfolio Summary</h2>
      <div className="space-y-3">
        <div>
          <span className="text-gray-600">Total Value:</span>
          <span className="ml-2 text-2xl font-bold">
            ${totalValue.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-gray-600">Total Gain/Loss:</span>
          <span
            className={`ml-2 text-xl font-semibold ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "+" : ""}${gainLoss.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
