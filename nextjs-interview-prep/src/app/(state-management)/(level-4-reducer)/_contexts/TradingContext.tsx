"use client"


import { createContext, useContext, useReducer, type ReactNode } from "react";

interface Trade {
  id: string;
  symbol: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  timestamp: Date;
  status: "pending" | "completed" | "failed";
}

interface TradingState {
  trades: Trade[];
  balance: number;
  isTrading: boolean;
  error: string | null;
  selectedSymbol: string;
  orderType: "market" | "limit";
  orderAmount: number;
  limitPrice: number;
}

type TradingAction =
  | { type: "SET_SELECTED_SYMBOL"; payload: string }
  | { type: "SET_ORDER_TYPE"; payload: "market" | "limit" }
  | { type: "SET_ORDER_AMOUNT"; payload: number }
  | { type: "SET_LIMIT_PRICE"; payload: number }
  | { type: "START_TRADE" }
  | { type: "COMPLETE_TRADE"; payload: Trade }
  | { type: "FAIL_TRADE"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "UPDATE_BALANCE"; payload: number };

interface TradingContextType {
  state: TradingState;
  dispatch: React.Dispatch<TradingAction>;
  executeTrade: (type: "buy" | "sell", currentPrice: number) => Promise<void>;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export function useTrading() {
    const context = useContext(TradingContext);
    if (context === undefined) {
        throw new Error("useTrading must be used within a TradingProvider");
    }
    return context;
}

const tradingReducer = (state: TradingState, action: TradingAction): TradingState => {
    switch (action.type) {
      case "SET_SELECTED_SYMBOL":
        return { ...state, selectedSymbol: action.payload };

      case "SET_ORDER_TYPE":
        return { ...state, orderType: action.payload };

      case "SET_ORDER_AMOUNT":
        return { ...state, orderAmount: action.payload };

      case "SET_LIMIT_PRICE":
        return { ...state, limitPrice: action.payload };

      case "START_TRADE":
        return { ...state, isTrading: true, error: null };

      case "COMPLETE_TRADE":
        const newTrade = action.payload;
        const tradeCost =
          newTrade.type === "buy"
            ? -(newTrade.amount * newTrade.price)
            : newTrade.amount * newTrade.price;

        return {
          ...state,
          trades: [newTrade, ...state.trades],
          balance: state.balance + tradeCost,
          isTrading: false,
          orderAmount: 0,
        };

      case "FAIL_TRADE":
        return {
          ...state,
          isTrading: false,
          error: action.payload,
        };

      case "CLEAR_ERROR":
        return { ...state, error: null };

      case "UPDATE_BALANCE":
        return { ...state, balance: action.payload };

      default:
        return state;
    }
}

const initialState: TradingState = {
    trades: [],
    balance: 10000,
    isTrading: false,
    error: null,
    selectedSymbol: "",
    orderType: "market",
    orderAmount: 0,
    limitPrice: 0,
}

export function TradingProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(tradingReducer, initialState);


    const executeTrade = async (
      type: "buy" | "sell",
      currentPrice: number
    ): Promise<void> => {
      dispatch({ type: "START_TRADE" });

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate random trade failures (10% chance)
        if (Math.random() < 0.1) {
          throw new Error("Trade execution failed - market volatility");
        }

        const tradePrice =
          state.orderType === "market" ? currentPrice : state.limitPrice;
        const totalCost = state.orderAmount * tradePrice;

        // Check if user has enough balance for buy orders
        if (type === "buy" && totalCost > state.balance) {
          throw new Error("Insufficient balance for this trade");
        }

        const newTrade: Trade = {
          id: Date.now().toString(),
          symbol: state.selectedSymbol,
          type,
          amount: state.orderAmount,
          price: tradePrice,
          timestamp: new Date(),
          status: "completed",
        };

        dispatch({ type: "COMPLETE_TRADE", payload: newTrade });
      } catch (error) {
        dispatch({
          type: "FAIL_TRADE",
          payload:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    };
    
    const value: TradingContextType = {
      state,
      dispatch,
      executeTrade,
    };

    return (<TradingContext.Provider value={value}>{children}</TradingContext.Provider>)
}
