"use client";

interface CurrencySelectorProps {
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

export default function CurrencySelector({
  currency,
  onCurrencyChange,
}: CurrencySelectorProps) {
  return (
    <select
      value={currency}
      onChange={(e) => onCurrencyChange(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="usd">USD ($)</option>
      <option value="eur">EUR (€)</option>
      <option value="gbp">GBP (£)</option>
      <option value="jpy">JPY (¥)</option>
    </select>
  );
}
