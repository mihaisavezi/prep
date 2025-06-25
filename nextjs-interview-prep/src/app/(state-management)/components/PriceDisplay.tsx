"use client";

interface PriceDisplayProps {
  price: number;
  currency: string;
}

export default function PriceDisplay({ price, currency }: PriceDisplayProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(price);
  };

  return (
    <span className="font-bold text-lg">{formatPrice(price, currency)}</span>
  );
}
