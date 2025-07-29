// app/trading-platform/level3/page.tsx
import { lazy, Suspense } from "react";
import { TradingProvider } from "../contexts/TradingContext";
import VirtualCryptoList from "../components/VirtualCryptoList";
import { fetchInitialCryptoData } from "./LevelOne";
import { AnalyticsSkeleton, ChartSkeleton, OrderBookSkeleton } from "~/app/(performance-in-react)/components/LazyComponents";

// Lazy load heavy components
const LazyTradingChart = lazy(() => import("../../(performance-in-react)/components/TradingChart"));
const LazyAnalytics = lazy(
  () => import("../../(performance-in-react)/components/AdvancedAnalytics")
);
const LazyOrderBook = lazy(
  () => import("../../(performance-in-react)/components/OrderBook")
);

export default async function Level3Page() {
  const initialData = await fetchInitialCryptoData();

  return (
    <TradingProvider initialData={initialData}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm p-6">
          <h1 className="text-3xl font-bold">
            Level 3: Performance + Suspense + Code Splitting
          </h1>
        </header>

        <main className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main trading interface */}
            <div className="lg:col-span-2 space-y-6">
              <Suspense fallback={<ChartSkeleton />}>
                <LazyTradingChart />
              </Suspense>

              <Suspense fallback={<AnalyticsSkeleton />}>
                <VirtualCryptoList />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Suspense fallback={<AnalyticsSkeleton />}>
                <LazyAnalytics />
              </Suspense>

              <Suspense fallback={<OrderBookSkeleton />}>
                <LazyOrderBook />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </TradingProvider>
  );
}

// components/VirtualCryptoList.tsx
