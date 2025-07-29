import { Suspense } from "react";
import ClientErrorBoundary from "../../level-5/components/ClientErrorBoundary";

function MarketOverviewSkeleton() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-header h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
      <div className="skeleton-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="skeleton-card bg-gray-200 rounded h-32 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

function TrendingSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
      ))}
    </div>
  );
}

async function MarketOverview({ currency }: { currency: string }) {
  // Simulate delay and potential errors
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate random failures (30% chance)
  if (Math.random() < 0.3) {
    throw new Error(`Market data fetch failed for ${currency}`);
  }

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=12&page=1`,
    {
      next: { revalidate: 30 },
      signal: AbortSignal.timeout(10000),
    }
  );

  if (!response.ok) {
    throw new Error(`Market data fetch failed: ${response.status}`);
  }

  const coins = await response.json();

  return (
    <section className="market-overview">
      <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
      <div className="coins-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coins.map((coin: any) => (
          <div
            key={coin.id}
            className="coin-card bg-white p-4 rounded-lg border"
          >
            <div className="coin-header flex items-center space-x-3 mb-3">
              <img src={coin.image} alt={coin.name} width={32} height={32} />
              <div>
                <h3 className="font-semibold">{coin.name}</h3>
                <span className="text-sm text-gray-500 uppercase">
                  {coin.symbol}
                </span>
              </div>
            </div>
            <div className="coin-price">
              <span className="text-xl font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currency,
                }).format(coin.current_price)}
              </span>
              <span
                className={`block text-sm ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

async function TrendingCoins() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate random failures (25% chance)
  if (Math.random() < 0.25) {
    throw new Error("Trending data service is down");
  }

  const response = await fetch(
    "https://api.coingecko.com/api/v3/search/trending",
    {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    }
  );

  if (!response.ok) {
    throw new Error(`Trending data fetch failed: ${response.status}`);
  }

  const data = await response.json();
  const trending = data.coins.slice(0, 7);

  return (
    <aside className="trending-sidebar bg-white rounded-lg border p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <span className="mr-2">🔥</span>
        Trending
      </h3>
      <div className="trending-list space-y-3">
        {trending.map((item: any, index: number) => (
          <div
            key={item.item.id}
            className="trending-item flex items-center space-x-3 p-2 hover:bg-gray-50 rounded"
          >
            <span className="rank text-sm font-medium text-gray-500 w-6">
              #{index + 1}
            </span>
            <img
              src={item.item.small}
              alt={item.item.name}
              width={24}
              height={24}
            />
            <div className="trending-info flex-1">
              <span className="name block font-medium">{item.item.name}</span>
              <span className="symbol text-sm text-gray-500 uppercase">
                {item.item.symbol}
              </span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

interface AdvancedMarketPageProps {
  searchParams: {
    currency?: string;
    view?: string;
  };
}

export default async function AdvancedMarketPage({
  searchParams,
}: AdvancedMarketPageProps) {
  const currency = searchParams?.currency || "usd";

  return (
    <div className="advanced-market-page min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-6">
        <h1 className="text-3xl font-bold">
          Level 5: Advanced SSR with Streaming and Error Boundaries
        </h1>
      </header>
      <p className="text-gray-600 mt-2">
        Demonstrating streaming, error boundaries, and performance optimization
      </p>

      <div className="market-layout max-w-7xl mx-auto p-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Main Content */}
          <main className="lg:col-span-3">
            <ClientErrorBoundary fallbackType="market">
              <Suspense fallback={<MarketOverviewSkeleton />}>
                <MarketOverview currency={currency} />
              </Suspense>
            </ClientErrorBoundary>
          </main>

          {/* Sidebar */}
          <aside className="mt-8 lg:mt-0">
            <ClientErrorBoundary fallbackType="sidebar">
              <Suspense fallback={<TrendingSkeleton />}>
                <TrendingCoins />
              </Suspense>
            </ClientErrorBoundary>
          </aside>
        </div>
      </div>
    </div>
  );
}
