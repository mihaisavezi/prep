import { TradingProvider } from "../_contexts/TradingContext";
import TradeHistory from "../components/TradeHistory";
import TradingPanel from "../components/TradingPanel";

export default function TradingPage() {
  // Mock current price - in real app, this would come from API
  const currentPrice = 45000;

  return (
    <TradingProvider>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Trading Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TradingPanel currentPrice={currentPrice} symbol="BTC" />
          <TradeHistory />
        </div>
      </div>
    </TradingProvider>
  );
}
