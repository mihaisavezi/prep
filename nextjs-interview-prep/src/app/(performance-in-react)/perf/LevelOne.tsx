import { useState } from "react";
import { CryptoCard, CryptoCardBasic as CryptoCardNoMemo } from "../components/CryptoCard";

export default function Level1PerformancePage() {
  const [refreshCount, setRefreshCount] = useState(0);

  const mockCoins = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      price: 45000,
      change24h: 2.5,
      image: "/bitcoin.png",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      price: 3200,
      change24h: -1.2,
      image: "/ethereum.png",
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      price: 0.85,
      change24h: 5.7,
      image: "/cardano.png",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Level 1: React.memo Optimization</h1>
        <button
          onClick={() => setRefreshCount((prev) => prev + 1)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Force Re-render ({refreshCount})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockCoins.map((coin) => (
          <CryptoCard
            key={coin.id}
            id={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.price}
            change24h={coin.change24h}
            image={coin.image}
            currency="usd"
          />
        ))}
      </div>

      <div className="label mt-6">No Memo</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockCoins.map((coin) => (
          <CryptoCardNoMemo
            key={coin.id}
            id={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.price}
            change24h={coin.change24h}
            image={coin.image}
            currency="usd"
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">
          Open DevTools Console and click "Force Re-render" to see the
          difference between memoized and non-memoized components.
        </p>
      </div>
    </div>
  );
}
