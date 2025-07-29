"use client";

import { useState, memo } from "react";

const CryptoCard = memo(function CryptoCard({ crypto, isSelected, onSelect }) {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={() => onSelect(crypto.id)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{crypto.name}</h3>
          <p className="text-sm text-gray-600">{crypto.symbol.toUpperCase()}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">${crypto.current_price.toLocaleString()}</p>
          <p
            className={`text-sm ${
              crypto.price_change_percentage_24h >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {crypto.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
});

export default function BasicCryptoList({ initialData }) {
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [cryptoData, setCryptoData] = useState(initialData);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cryptoData.map((crypto) => (
          <CryptoCard
            key={crypto.id}
            crypto={crypto}
            isSelected={selectedCrypto === crypto.id}
            onSelect={setSelectedCrypto}
          />
        ))}
      </div>

      {selectedCrypto && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p>
            Selected: {cryptoData.find((c) => c.id === selectedCrypto)?.name}
          </p>
        </div>
      )}
    </div>
  );
}
