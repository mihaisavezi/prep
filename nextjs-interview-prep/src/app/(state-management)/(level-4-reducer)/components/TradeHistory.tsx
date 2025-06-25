"use client";

import { useTrading } from "../_contexts/TradingContext";

export default function TradeHistory() {
  const { state } = useTrading();

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-xl font-semibold mb-4">Trade History</h3>

      {state.trades.length === 0 ? (
        <p className="text-gray-500">No trades yet</p>
      ) : (
        <div className="space-y-3">
          {state.trades.map((trade) => (
            <div
              key={trade.id}
              className="flex items-center justify-between p-3 border rounded-md"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      trade.type === "buy"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {trade.type.toUpperCase()}
                  </span>
                  <span className="font-medium">{trade.symbol}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {trade.amount} @ ${trade.price.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  ${(trade.amount * trade.price).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  {trade.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
