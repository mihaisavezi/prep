"use client";

import { FixedSizeList as List } from "react-window";
import { useTrading } from "../contexts/TradingContext";
import { memo, useMemo } from "react";
import { fetchInitialCryptoData } from "../combined/LevelOne";

const VirtualCryptoRow = memo(function VirtualCryptoRow({
  index,
  style,
  data,
}) {
  const { cryptos, onSelect, selectedId } = data;
  const crypto = cryptos[index];

  return (
    <div style={style} className="px-4 py-2 border-b hover:bg-gray-50">
      <div
        className={`p-3 rounded cursor-pointer ${
          selectedId === crypto.id ? "bg-blue-100" : ""
        }`}
        onClick={() => onSelect(crypto.id)}
      >
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-semibold">{crypto.name}</h4>
            <p className="text-sm text-gray-600">
              {crypto.symbol.toUpperCase()}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold">
              ${crypto.current_price.toLocaleString()}
            </p>
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
    </div>
  );
});

export default function VirtualCryptoList() {
  const { sortedMarketData, selectCrypto, state } = useTrading();

  const itemData = useMemo(
    () => ({
      cryptos: sortedMarketData,
      onSelect: selectCrypto,
      selectedId: state.selectedCrypto,
    }),
    [sortedMarketData, selectCrypto, state.selectedCrypto]
  );

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">
          Market Data ({sortedMarketData.length} coins)
        </h3>
      </div>
      <List
        height={400}
        itemCount={sortedMarketData.length}
        itemSize={80}
        itemData={itemData}
        overscanCount={5}
      >
        {VirtualCryptoRow}
      </List>
    </div>
  );
}
