// stores/marketStore.ts
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  volume_24h: number;
  last_updated: string;
}

interface Watchlist {
  coins: string[];
  lastUpdated: Date;
}

interface MarketState {
  // Data
  coins: Record<string, CoinData>;
  watchlist: Watchlist;
  selectedCoin: string | null;
  currency: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCoins: (coins: CoinData[]) => void;
  updateCoinPrice: (coinId: string, price: number, change: number) => void;
  addToWatchlist: (coinId: string) => void;
  removeFromWatchlist: (coinId: string) => void;
  setSelectedCoin: (coinId: string | null) => void;
  setCurrency: (currency: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Computed values
  getWatchlistCoins: () => CoinData[];
  getTotalMarketCap: () => number;
  getTopGainers: () => CoinData[];
  getTopLosers: () => CoinData[];
}

export const useMarketStore = create<MarketState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    coins: {},
    watchlist: {
      coins: ["bitcoin", "ethereum", "cardano"],
      lastUpdated: new Date(),
    },
    selectedCoin: null,
    currency: "usd",
    isLoading: false,
    error: null,

    // Actions
    setCoins: (coins) =>
      set((state) => ({
        coins: coins.reduce((acc, coin) => {
          acc[coin.id] = coin;
          return acc;
        }, {} as Record<string, CoinData>),
      })),

    updateCoinPrice: (coinId, price, change) =>
      set((state) => ({
        coins: {
          ...state.coins,
          [coinId]: state.coins[coinId]
            ? {
                ...state.coins[coinId],
                current_price: price,
                price_change_percentage_24h: change,
                last_updated: new Date().toISOString(),
              }
            : state.coins[coinId],
        },
      })),

    addToWatchlist: (coinId) =>
      set((state) => ({
        watchlist: {
          coins: state.watchlist.coins.includes(coinId)
            ? state.watchlist.coins
            : [...state.watchlist.coins, coinId],
          lastUpdated: new Date(),
        },
      })),

    removeFromWatchlist: (coinId) =>
      set((state) => ({
        watchlist: {
          coins: state.watchlist.coins.filter((id) => id !== coinId),
          lastUpdated: new Date(),
        },
      })),

    setSelectedCoin: (coinId) => set({ selectedCoin: coinId }),
    setCurrency: (currency) => set({ currency }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),

    // Computed values
    getWatchlistCoins: () => {
      const state = get();
      return state.watchlist.coins
        .map((coinId) => state.coins[coinId])
        .filter(Boolean);
    },

    getTotalMarketCap: () => {
      const state = get();
      return Object.values(state.coins).reduce(
        (total, coin) => total + (coin.market_cap || 0),
        0
      );
    },

    getTopGainers: () => {
      const state = get();
      return Object.values(state.coins)
        .filter((coin) => coin.price_change_percentage_24h > 0)
        .sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        )
        .slice(0, 5);
    },

    getTopLosers: () => {
      const state = get();
      return Object.values(state.coins)
        .filter((coin) => coin.price_change_percentage_24h < 0)
        .sort(
          (a, b) =>
            a.price_change_percentage_24h - b.price_change_percentage_24h
        )
        .slice(0, 5);
    },
  }))
);

// Custom hooks for specific use cases
export const useWatchlist = () => {
  const watchlist = useMarketStore((state) => state.watchlist);
  const getWatchlistCoins = useMarketStore((state) => state.getWatchlistCoins);
  const addToWatchlist = useMarketStore((state) => state.addToWatchlist);
  const removeFromWatchlist = useMarketStore(
    (state) => state.removeFromWatchlist
  );

  return {
    watchlist,
    coins: getWatchlistCoins(),
    addCoin: addToWatchlist,
    removeCoin: removeFromWatchlist,
  };
};

export const useMarketStats = () => {
  const getTotalMarketCap = useMarketStore((state) => state.getTotalMarketCap);
  const getTopGainers = useMarketStore((state) => state.getTopGainers);
  const getTopLosers = useMarketStore((state) => state.getTopLosers);
  const currency = useMarketStore((state) => state.currency);

  return {
    totalMarketCap: getTotalMarketCap(),
    topGainers: getTopGainers(),
    topLosers: getTopLosers(),
    currency,
  };
};

