import EnhancedTradingDashboard from "../components/EnhancedTradingDashboard";
import { TradingProvider } from "../contexts/TradingContext";
import { fetchInitialCryptoData } from "./LevelOne";

export default async function Level2Page() {
  const initialData = await fetchInitialCryptoData();

  return (
    <TradingProvider initialData={initialData}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm p-6">
          <h1 className="text-3xl font-bold">
            Level 2: Enhanced State + Performance
          </h1>
        </header>
        <EnhancedTradingDashboard />
      </div>
    </TradingProvider>
  );
}
