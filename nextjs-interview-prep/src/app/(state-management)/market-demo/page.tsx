import CurrencyDemo from "../components/CurrencyDemoIndex";

export default function MarketDemoPage() {
  const mockPrices = [
    { name: "Bitcoin", price: 45000 },
    { name: "Ethereum", price: 3200 },
    { name: "Cardano", price: 0.85 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Market Demo - State Lifting</h1>

      <CurrencyDemo/>
    </div>
  );
}
