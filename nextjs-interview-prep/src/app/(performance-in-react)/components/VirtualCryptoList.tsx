// components/VirtualCryptoList.tsx
"use client";

import { FixedSizeList as List } from 'react-window';
import { memo, useMemo } from 'react';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  volume_24h: number;
  rank: number;
}

interface CryptoRowProps {
  index: number;
  style: React.CSSProperties;
  data: {
    items: CryptoData[];
    currency: string;
  };
}

// Memoized row component for better performance
const CryptoRow = memo(function CryptoRow({ index, style, data }: CryptoRowProps) {
  const crypto = data.items[index];
  const { currency } = data;
  
  if (!crypto) {
    return (
      <div style={style} className="flex items-center p-4 border-b">
        <div className="animate-pulse flex space-x-4 w-full">
          <div className="rounded-full bg-gray-300 h-8 w-8"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      notation: amount > 1e9 ? 'compact' : 'standard',
      maximumFractionDigits: amount < 1 ? 6 : 2
    }).format(amount);
  };

  return (
    <div 
      style={style} 
      className="flex items-center p-4 border-b hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center space-x-4 w-full">
        {/* Rank */}
        <div className="w-12 text-sm text-gray-500 font-medium">
          #{crypto.rank}
        </div>
        
        {/* Name & Symbol */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 truncate">
            {crypto.name}
          </div>
          <div className="text-sm text-gray-500 uppercase">
            {crypto.symbol}
          </div>
        </div>
        
        {/* Price */}
        <div className="w-32 text-right">
          <div className="font-semibold">
            {formatCurrency(crypto.current_price)}
          </div>
        </div>
        
        {/* 24h Change */}
        <div className="w-24 text-right">
          <div className={`font-medium ${
            crypto.price_change_percentage_24h >= 0 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
            {crypto.price_change_percentage_24h.toFixed(2)}%
          </div>
        </div>
        
        {/* Market Cap */}
        <div className="w-32 text-right">
          <div className="text-sm text-gray-600">
            {formatCurrency(crypto.market_cap)}
          </div>
        </div>
        
        {/* Volume */}
        <div className="w-32 text-right">
          <div className="text-sm text-gray-600">
            {formatCurrency(crypto.volume_24h)}
          </div>
        </div>
      </div>
    </div>
  );
});

interface VirtualCryptoListProps {
  cryptoData: CryptoData[];
  currency: string;
  height: number;
}

export default function VirtualCryptoList({ 
  cryptoData, 
  currency, 
  height 
}: VirtualCryptoListProps) {
  // Memoize the data object to prevent unnecessary re-renders
  const itemData = useMemo(() => ({
    items: cryptoData,
    currency
  }), [cryptoData, currency]);

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Header */}
      <div className="flex items-center p-4 bg-gray-50 border-b font-medium text-sm text-gray-700">
        <div className="w-12">#</div>
        <div className="flex-1">Name</div>
        <div className="w-32 text-right">Price</div>
        <div className="w-24 text-right">24h %</div>
        <div className="w-32 text-right">Market Cap</div>
        <div className="w-32 text-right">Volume</div>
      </div>
      
      {/* Virtual List */}
      <List
        height={height}
        itemCount={cryptoData.length}
        itemSize={72} // Height of each row
        itemData={itemData}
        overscanCount={5} // Render 5 extra items outside viewport
      >
        {CryptoRow}
      </List>
      
      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t text-center text-sm text-gray-600">
        Showing {cryptoData.length} cryptocurrencies with virtual scrolling
      </div>
    </div>
  );
}

// Generate large dataset for demonstration
function generateLargeCryptoDataset(count: number): CryptoData[] {
  const cryptoNames = [
    'Bitcoin', 'Ethereum', 'Cardano', 'Polkadot', 'Chainlink', 'Litecoin',
    'Stellar', 'Dogecoin', 'Uniswap', 'Solana', 'Polygon', 'Avalanche'
  ];
  
  return Array.from({ length: count }, (_, index) => {
    const basePrice = Math.random() * 1000 + 1;
    return {
      id: `crypto-${index}`,
      name: `${cryptoNames[index % cryptoNames.length]} ${Math.floor(index / cryptoNames.length) + 1}`,
      symbol: `${cryptoNames[index % cryptoNames.length].slice(0, 3).toUpperCase()}${Math.floor(index / cryptoNames.length) + 1}`,
      current_price: basePrice,
      price_change_percentage_24h: (Math.random() - 0.5) * 20,
      market_cap: basePrice * (Math.random() * 1000000 + 100000),
      volume_24h: basePrice * (Math.random() * 100000 + 10000),
      rank: index + 1
    };
  });
}

// app/performance-demo/level4/page.tsx
