// components/CurrencyDemo.tsx
"use client";

import { useState } from "react";
import CurrencySelector from "./CurrencySelector";
import PriceDisplay from "./PriceDisplay";

export default function CurrencyDemo() {
  const [currency, setCurrency] = useState("usd");
  const mockPrices = [
    { name: "Bitcoin", price: 45000 },
    { name: "Ethereum", price: 3200 },
    { name: "Cardano", price: 0.85 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Select Currency:</h2>
        <CurrencySelector currency={currency} onCurrencyChange={setCurrency} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockPrices.map((crypto) => (
          <div key={crypto.name} className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-2">{crypto.name}</h3>
            <PriceDisplay price={crypto.price} currency={currency} />
          </div>
        ))}
      </div>
    </div>
  );
}
