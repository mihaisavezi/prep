// contexts/TradingContext.tsx
"use client";

import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";

interface Portfolio {
  holdings: Array<{
    id: string;
    symbol: string;
    amount: number;
    purchasePrice: number;
  }>;
  balance: number;
  totalValue: number;
}

interface TradingState {
  portfolio: Portfolio;
  selectedCrypto: string | null;
  marketData: any[];
  filters: {
    sortBy: "price" | "change" | "name";
    showFavorites: boolean;
  };
}

type TradingAction =
  | { type: "SET_MARKET_DATA"; payload: any[] }
  | { type: "SELECT_CRYPTO"; payload: string }
  | { type: "ADD_TO_PORTFOLIO"; payload: { crypto: any; amount: number } }
  | { type: "UPDATE_FILTERS"; payload: Partial<TradingState["filters"]> };

const tradingReducer = (
  state: TradingState,
  action: TradingAction
): TradingState => {
  switch (action.type) {
    case "SET_MARKET_DATA":
      return { ...state, marketData: action.payload };

    case "SELECT_CRYPTO":
      return { ...state, selectedCrypto: action.payload };

    case "ADD_TO_PORTFOLIO":
      const { crypto, amount } = action.payload;
      const cost = crypto.current_price * amount;

      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          holdings: [
            ...state.portfolio.holdings,
            {
              id: crypto.id,
              symbol: crypto.symbol,
              amount,
              purchasePrice: crypto.current_price,
            },
          ],
          balance: state.portfolio.balance - cost,
        },
      };

    case "UPDATE_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    default:
      return state;
  }
};

const TradingContext = createContext<{
  state: TradingState;
  dispatch: React.Dispatch<TradingAction>;
  sortedMarketData: any[];
  portfolioValue: number;
  selectCrypto: (id: string) => void;
  addToPortfolio: (crypto: any, amount: number) => void;
} | null>(null);

export function TradingProvider({ children, initialData }) {
  const [state, dispatch] = useReducer(tradingReducer, {
    portfolio: { holdings: [], balance: 10000, totalValue: 0 },
    selectedCrypto: null,
    marketData: initialData,
    filters: { sortBy: "price", showFavorites: false },
  });

  // Memoized sorted market data
  const sortedMarketData = useMemo(() => {
    return [...state.marketData].sort((a, b) => {
      switch (state.filters.sortBy) {
        case "price":
          return b.current_price - a.current_price;
        case "change":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [state.marketData, state.filters.sortBy]);

  // Memoized portfolio value calculation
  const portfolioValue = useMemo(() => {
    return state.portfolio.holdings.reduce((total, holding) => {
      const currentCrypto = state.marketData.find((c) => c.id === holding.id);
      return (
        total +
        (currentCrypto ? currentCrypto.current_price * holding.amount : 0)
      );
    }, 0);
  }, [state.portfolio.holdings, state.marketData]);

  // Memoized action creators
  const selectCrypto = useCallback((id: string) => {
    dispatch({ type: "SELECT_CRYPTO", payload: id });
  }, []);

  const addToPortfolio = useCallback((crypto: any, amount: number) => {
    dispatch({ type: "ADD_TO_PORTFOLIO", payload: { crypto, amount } });
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      sortedMarketData,
      portfolioValue,
      selectCrypto,
      addToPortfolio,
    }),
    [state, sortedMarketData, portfolioValue, selectCrypto, addToPortfolio]
  );

  return (
    <TradingContext.Provider value={value}>{children}</TradingContext.Provider>
  );
}

export const useTrading = () => {
  const context = useContext(TradingContext);
  if (!context)
    throw new Error("useTrading must be used within TradingProvider");
  return context;
};

