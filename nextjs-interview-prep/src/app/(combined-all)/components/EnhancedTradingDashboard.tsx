// components/EnhancedTradingDashboard.tsx
"use client";

import React, { useState, useMemo } from "react";
import { useTrading } from "../contexts/TradingContext";

export default function EnhancedTradingDashboard() {
  const { sortedMarketData, selectCrypto, state, addToPortfolio } =
    useTrading();
  const [amount, setAmount] = useState(0);

  // Memoized portfolio value calculation
  const portfolioValue = useMemo(() => {
    return state.portfolio.holdings.reduce((total, holding) => {
      const crypto = sortedMarketData.find((c) => c.id === holding.id);
      return total + (crypto ? crypto.current_price * holding.amount : 0);
    }, 0);
  }, [state.portfolio.holdings, sortedMarketData]);

  const handleAddToPortfolio = () => {
    if (amount > 0 && state.selectedCrypto) {
      const crypto = sortedMarketData.find(
        (c) => c.id === state.selectedCrypto
      );
      if (crypto) {
        addToPortfolio(crypto, amount);
        setAmount(0);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Market Data</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <ul className="space-y-2">
            {sortedMarketData.map((crypto) => (
              <li
                key={crypto.id}
                className={`p-4 border rounded cursor-pointer transition-colors ${
                  state.selectedCrypto === crypto.id
                    ? "bg-blue-100 border-blue-300"
                    : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => selectCrypto(crypto.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold block">{crypto.name}</span>
                    <span className="text-sm text-gray-600">
                      ({crypto.symbol.toUpperCase()})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block font-medium">
                      ${crypto.current_price.toLocaleString()}
                    </span>
                    <span
                      className={`text-sm ${
                        crypto.price_change_percentage_24h >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {crypto.price_change_percentage_24h >= 0 ? "+" : ""}
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-1 p-4 border rounded bg-white">
          <h3 className="text-xl font-semibold mb-4">Portfolio</h3>

          <div className="mb-4 p-3 bg-gray-50 rounded">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Value:</span>
              <span className="font-bold">
                ${portfolioValue.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-gray-600">Balance:</span>
              <span className="font-medium">
                ${state.portfolio.balance.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block mb-2 text-sm font-medium">
              Amount to Add
            </label>
            <input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter amount"
            />
          </div>

          <button
            onClick={handleAddToPortfolio}
            disabled={!state.selectedCrypto || amount <= 0}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add to Portfolio
          </button>

          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">Current Holdings</h4>
            {state.portfolio.holdings.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No holdings yet. Select a cryptocurrency above and add to your
                portfolio.
              </p>
            ) : (
              <ul className="space-y-2">
                {state.portfolio.holdings.map((holding) => {
                  const crypto = sortedMarketData.find(
                    (c) => c.id === holding.id
                  );
                  const currentValue = crypto
                    ? crypto.current_price * holding.amount
                    : 0;
                  const gainLoss =
                    currentValue - holding.purchasePrice * holding.amount;

                  return (
                    <li
                      key={holding.id}
                      className="border p-3 rounded bg-white"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-semibold">
                            {holding.symbol.toUpperCase()}
                          </span>
                          <div className="text-sm text-gray-600">
                            {holding.amount} @ $
                            {holding.purchasePrice.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            ${currentValue.toLocaleString()}
                          </div>
                          <div
                            className={`text-xs ${
                              gainLoss >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {gainLoss >= 0 ? "+" : ""}${gainLoss.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
