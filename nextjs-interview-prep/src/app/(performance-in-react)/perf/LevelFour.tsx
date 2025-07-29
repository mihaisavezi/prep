"use client";

import { useState, useMemo } from 'react';
import VirtualCryptoList from '../components/VirtualCryptoList';

export default function Level4PerformancePage() {
  const [itemCount, setItemCount] = useState(1000);
  const [currency, setCurrency] = useState('USD');
  const [sortBy, setSortBy] = useState<'rank' | 'price' | 'change'>('rank');
  
  // Generate large dataset
  const cryptoData = useMemo(() => {
    console.log(`Generating ${itemCount} crypto items...`);
    return generateLargeCryptoDataset(itemCount);
  }, [itemCount]);
  
  // Sort data
  const sortedData = useMemo(() => {
    console.log(`Sorting ${cryptoData.length} items by ${sortBy}...`);
    return [...cryptoData].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.current_price - a.current_price;
        case 'change':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        default:
          return a.rank - b.rank;
      }
    });
  }, [cryptoData, sortBy]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Level 4: Virtual Scrolling</h1>
        <p className="text-gray-600">
          Efficiently render large lists by only displaying visible items.
        </p>
      </div>
      
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item Count
          </label>
          <select
            value={itemCount}
            onChange={(e) => setItemCount(Number(e.target.value))}
            className="px-3 py-2 border rounded-md"
          >
            <option value={100}>100 items</option>
            <option value={1000}>1,000 items</option>
            <option value={10000}>10,000 items</option>
            <option value={50000}>50,000 items</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'rank' | 'price' | 'change')}
            className="px-3 py-2 border rounded-md"
          >
            <option value="rank">Rank</option>
            <option value="price">Price</option>
            <option value="change">24h Change</option>
          </select>
        </div>
        
        <div className="ml-auto text-sm text-gray-600">
          <strong>Performance:</strong> Only ~10 DOM nodes for {itemCount.toLocaleString()} items
        </div>
      </div>
      
      {/* Virtual List */}
      <VirtualCryptoList 
        cryptoData={sortedData}
        currency={currency}
        height={600}
      />
      
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Virtual Scrolling Benefits:</strong><br/>
          • Constant rendering performance regardless of list size<br/>
          • Minimal DOM nodes (only visible items + buffer)<br/>
          • Smooth scrolling even with 50k+ items<br/>
          • Lower memory usage
        </p>
      </div>
    </div>
  );
}

function generateLargeCryptoDataset(count: number): CryptoData[] {
  const cryptoNames = [
    "Bitcoin",
    "Ethereum",
    "Cardano",
    "Polkadot",
    "Chainlink",
    "Litecoin",
    "Stellar",
    "Dogecoin",
    "Uniswap",
    "Solana",
    "Polygon",
    "Avalanche",
  ];

  return Array.from({ length: count }, (_, index) => {
    const basePrice = Math.random() * 1000 + 1;
    return {
      id: `crypto-${index}`,
      name: `${cryptoNames[index % cryptoNames.length]} ${
        Math.floor(index / cryptoNames.length) + 1
      }`,
      symbol: `${cryptoNames[index % cryptoNames.length]
        .slice(0, 3)
        .toUpperCase()}${Math.floor(index / cryptoNames.length) + 1}`,
      current_price: basePrice,
      price_change_percentage_24h: (Math.random() - 0.5) * 20,
      market_cap: basePrice * (Math.random() * 1000000 + 100000),
      volume_24h: basePrice * (Math.random() * 100000 + 10000),
      rank: index + 1,
    };
  });
}
