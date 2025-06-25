"use client"

import { useMarketStats, useWatchlist } from "../_stores/marketStore"

export default function WatchlistWidget() {
  const { coins, addCoin, removeCoin } = useWatchlist();
  const { currency } = useMarketStats();

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-xl font-semibold mb-4">My Watchlist</h3>

      <div className="space-y-3">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="flex items-center justify-between p-3 border rounded-md"
          >
            <div className="flex items-center space-x-3">
              <div>
                <h4 className="font-semibold">{coin.name}</h4>
                <p className="text-sm text-gray-600">
                  {coin.symbol.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currency,
                  notation: "compact",
                }).format(coin.current_price)}
              </div>
              <div
                className={`text-sm ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <button
                onClick={() => removeCoin(coin.id)}
                className="text-red-500 hover:text-red-700 text-xs mt-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Add coin to watchlist..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              const value = (e.target as HTMLInputElement).value.toLowerCase();
              if (value) {
                addCoin(value);
                (e.target as HTMLInputElement).value = "";
              }
            }
          }}
        />
      </div>
    </div>
  );
}
  
