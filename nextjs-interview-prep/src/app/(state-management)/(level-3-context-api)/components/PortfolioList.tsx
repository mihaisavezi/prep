"use client";

import { usePortfolio } from '../_contexts/PortfolioContext';

export default function PortfolioList() {
  const { portfolio, removeFromPortfolio } = usePortfolio();

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-4">Your Holdings</h2>
      <div className="space-y-3">
        {portfolio.map((item) => {
          const gainLoss = item.amount * (item.currentPrice - item.purchasePrice);
          const isPositive = gainLoss >= 0;
          
          return (
            <div key={item.id} className="flex items-center justify-between p-3 border rounded-md">
              <div>
                <h3 className="font-semibold">{item.name} ({item.symbol})</h3>
                <p className="text-sm text-gray-600">
                  {item.amount} @ ${item.currentPrice.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  ${(item.amount * item.currentPrice).toLocaleString()}
                </div>
                <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}${gainLoss.toLocaleString()}
                </div>
                <button
                  onClick={() => removeFromPortfolio(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
