"use client"

import { useTrading } from "../_contexts/TradingContext";

interface TradingPanelProps {
  currentPrice: number;
  symbol: string;
}

export default function TradingPanel({
  currentPrice,
  symbol,
}: TradingPanelProps) {
  const { state, dispatch, executeTrade } = useTrading();
  console.log("🚀 ~ state:", state)

  const handleBuy = () => {
    if (state.orderAmount > 0) {
      executeTrade("buy", currentPrice);
    }
  };

  const handleSell = () => {
    if (state.orderAmount > 0) {
      executeTrade("sell", currentPrice);
    }
  };

  const maxBuyAmount = Math.floor(state.balance / currentPrice);

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-xl font-semibold mb-4">Trade {symbol}</h3>

      {state.error && (
        <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
          <p className="text-red-800">{state.error}</p>
          <button
            onClick={() => dispatch({ type: "CLEAR_ERROR" })}
            className="text-red-600 hover:text-red-800 text-sm mt-1"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order Type
          </label>
          <select
            value={state.orderType}
            onChange={(e) =>
              dispatch({
                type: "SET_ORDER_TYPE",
                payload: e.target.value as "market" | "limit",
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="market">Market Order</option>
            <option value="limit">Limit Order</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            step="0.001"
            min="0"
            max={maxBuyAmount}
            value={state.orderAmount}
            onChange={(e) => {
                console.log("🚀 ~ e:", e.target.value);
                dispatch({
                  type: "SET_ORDER_AMOUNT",
                  payload: parseFloat(e.target.value) || 0,
                })
            }
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter amount"
          />
          <p className="text-xs text-gray-500 mt-1">
            Max buy: {maxBuyAmount.toFixed(3)} {symbol}
          </p>
        </div>

        {state.orderType === "limit" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Limit Price
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={state.limitPrice}
              onChange={(e) =>
                dispatch({
                  type: "SET_LIMIT_PRICE",
                  payload: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter limit price"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleBuy}
            disabled={state.isTrading || state.orderAmount <= 0}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            {state.isTrading ? "Trading..." : "Buy"}
          </button>
          <button
            onClick={handleSell}
            disabled={state.isTrading || state.orderAmount <= 0}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            {state.isTrading ? "Trading..." : "Sell"}
          </button>
        </div>

        <div className="text-sm text-gray-600">
          <p>Balance: ${state.balance.toLocaleString()}</p>
          <p>Current Price: ${currentPrice.toLocaleString()}</p>
          {state.orderAmount > 0 && (
            <p>
              Total: $
              {(
                state.orderAmount *
                (state.orderType === "market" ? currentPrice : state.limitPrice)
              ).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
