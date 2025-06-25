"use client";

import { useState, ReactNode } from "react";

interface CurrencyState {
  currency: string;
  setCurrency: (currency: string) => void;
}

interface CurrencyProviderProps {
  children: (currencyState: CurrencyState) => ReactNode;
  initialCurrency?: string;
}

export default function CurrencyProvider({
  children,
  initialCurrency = "usd",
}: CurrencyProviderProps) {
  const [currency, setCurrency] = useState(initialCurrency);

  return <>{children({ currency, setCurrency })}</>;
}
