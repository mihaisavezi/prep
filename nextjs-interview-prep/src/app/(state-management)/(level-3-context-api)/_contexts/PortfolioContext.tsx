"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  purchasePrice: number;
  currentPrice: number;
}

interface PortfolioContextType {
  portfolio: PortfolioItem[];
  addToPortfolio: (item: Omit<PortfolioItem, "id">) => void;
  removeFromPortfolio: (id: string) => void;
  updateCurrentPrice: (symbol: string, price: number) => void;
  getTotalValue: () => number;
  getTotalGainLoss: () => number;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export function usePortfolio() {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}

interface PortfolioProviderProps {
  children: ReactNode;
}

export function PortfolioProvider({ children }: PortfolioProviderProps) {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
    {
      id: "1",
      symbol: "BTC",
      name: "Bitcoin",
      amount: 0.1,
      purchasePrice: 40000,
      currentPrice: 45000,
    },
    {
      id: "2",
      symbol: "ETH",
      name: "Ethereum",
      amount: 2,
      purchasePrice: 2800,
      currentPrice: 3200,
    },
  ]);

  const addToPortfolio = (item: Omit<PortfolioItem, "id">) => {
    const newItem: PortfolioItem = {
      ...item,
      id: Date.now().toString(),
    };
    setPortfolio((prev) => [...prev, newItem]);
  };

  const removeFromPortfolio = (id: string) => {
    setPortfolio((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCurrentPrice = (symbol: string, price: number) => {
    setPortfolio((prev) =>
      prev.map((item) =>
        item.symbol === symbol ? { ...item, currentPrice: price } : item
      )
    );
  };

  const getTotalValue = () => {
    return portfolio.reduce(
      (total, item) => total + item.amount * item.currentPrice,
      0
    );
  };

  const getTotalGainLoss = () => {
    return portfolio.reduce(
      (total, item) =>
        total + item.amount * (item.currentPrice - item.purchasePrice),
      0
    );
  };

  const value: PortfolioContextType = {
    portfolio,
    addToPortfolio,
    removeFromPortfolio,
    updateCurrentPrice,
    getTotalValue,
    getTotalGainLoss,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}
