"use client";

import React, { memo } from "react";

interface CryptoCardProps {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  image: string;
  currency: string;
}

// Without memo - re-renders on every parent update
function CryptoCardBasic({
  name,
  symbol,
  price,
  change24h,
  image,
  currency,
}: CryptoCardProps) {
  console.log(`Rendering ${name} card`); // This will log on every parent re-render

  return (
    <div className="bg-white rounded-lg border hover:shadow-md transition-shadow duration-200 p-4">
      <div className="flex items-center space-x-3 mb-3">
        <img
          src={image}
          alt={name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          <span className="text-sm text-gray-500 uppercase">{symbol}</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-xl font-bold text-gray-900">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
          }).format(price)}
        </div>
        <div
          className={`text-sm font-medium ${
            change24h >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {change24h >= 0 ? "+" : ""}
          {change24h.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}

// With memo - only re-renders when props change
const CryptoCard = memo(function CryptoCard({
  name,
  symbol,
  price,
  change24h,
  image,
  currency,
}: CryptoCardProps) {
  console.log(`Rendering memoized ${name} card`); // Only logs when props change

  return (
    <div className="bg-white rounded-lg border hover:shadow-md transition-shadow duration-200 p-4">
      <div className="flex items-center space-x-3 mb-3">
        <img
          src={image}
          alt={name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          <span className="text-sm text-gray-500 uppercase">{symbol}</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-xl font-bold text-gray-900">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
          }).format(price)}
        </div>
        <div
          className={`text-sm font-medium ${
            change24h >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {change24h >= 0 ? "+" : ""}
          {change24h.toFixed(2)}%
        </div>
      </div>
    </div>
  );
});

export {CryptoCard, CryptoCardBasic};
