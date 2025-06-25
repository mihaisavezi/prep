// app/advanced-market/page.tsx
import { Suspense } from "react";
import ClientErrorBoundary from "./components/ClientErrorBoundary";
import ThemeToggle from "../../(state-management)/components/ThemeToggle";

// Utility function to simulate random failures
function shouldSimulateFailure(failureRate: number = 0.3): boolean {
  return Math.random() < failureRate;
}

// Utility function to simulate network delays
function getRandomDelay(min: number = 500, max: number = 3000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Loading Skeletons (same as before)
function MarketOverviewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-gray-200 rounded animate-pulse w-48"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendingCoinsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3 p-2">
            <div className="w-6 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-1">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
              <div className="h-2 bg-gray-200 rounded animate-pulse w-10"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg border p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
        </div>
      ))}
    </div>
  );
}

// Data Components with Simulated Failures
async function MarketOverview({ currency }: { currency: string }) {
  // Simulate variable loading time
  const delay = getRandomDelay(1000, 4000);
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Simulate random failures (30% chance)
  if (shouldSimulateFailure(0.3)) {
    const errorTypes = [
      "Network timeout - please try again",
      "API rate limit exceeded",
      "Service temporarily unavailable",
      "Invalid response from market data provider",
      "Connection lost during data fetch",
    ];
    const randomError =
      errorTypes[Math.floor(Math.random() * errorTypes.length)];
    throw new Error(`Market Overview Error: ${randomError}`);
  }

  // Simulate occasional network errors
  if (shouldSimulateFailure(0.15)) {
    throw new Error(
      "Network Error: Failed to fetch market data. Please check your connection."
    );
  }

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=12&page=1`,
    {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000), // Reduced timeout to trigger more failures
    }
  );

  if (!response.ok) {
    throw new Error(
      `Market data fetch failed: HTTP ${response.status} - ${response.statusText}`
    );
  }

  const coins = await response.json();

  // Simulate data validation errors
  if (!coins || !Array.isArray(coins)) {
    throw new Error("Invalid market data format received");
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <ThemeToggle/>
        <h2 className="text-2xl font-bold text-gray-900">Market Overview</h2>
        <div className="text-sm text-gray-500">
          Loaded in {(delay / 1000).toFixed(1)}s
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {coins.map((coin: any) => (
          <div
            key={coin.id}
            className="bg-white rounded-lg border hover:shadow-md transition-shadow duration-200 p-4"
          >
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={coin.image}
                alt={coin.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {coin.name}
                </h3>
                <span className="text-sm text-gray-500 uppercase">
                  {coin.symbol}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xl font-bold text-gray-900">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currency,
                }).format(coin.current_price)}
              </div>
              <div
                className={`text-sm font-medium ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="text-xs text-gray-500">
                MCap:{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currency,
                  notation: "compact",
                }).format(coin.market_cap)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

async function TrendingCoins() {
  // Simulate variable loading time
  const delay = getRandomDelay(800, 2500);
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Simulate random failures (25% chance)
  if (shouldSimulateFailure(0.25)) {
    const errorTypes = [
      "Trending data service is down",
      "Cache miss - trending data unavailable",
      "Too many requests to trending endpoint",
      "Trending algorithm is being updated",
    ];
    const randomError =
      errorTypes[Math.floor(Math.random() * errorTypes.length)];
    throw new Error(`Trending Error: ${randomError}`);
  }

  const response = await fetch(
    "https://api.coingecko.com/api/v3/search/trending",
    {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(6000), // Reduced timeout
    }
  );

  if (!response.ok) {
    throw new Error(`Trending data fetch failed: HTTP ${response.status}`);
  }

  const data = await response.json();

  // Simulate data structure issues
  if (!data.coins || !Array.isArray(data.coins)) {
    throw new Error("Invalid trending data structure");
  }

  const trending = data.coins.slice(0, 7);

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <span className="mr-2">🔥</span>
          Trending
        </h3>
        <div className="text-xs text-gray-500">
          {(delay / 1000).toFixed(1)}s
        </div>
      </div>
      <div className="space-y-3">
        {trending.map((item: any, index: number) => (
          <div
            key={item.item.id}
            className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors duration-150"
          >
            <span className="text-sm font-medium text-gray-500 w-6">
              #{index + 1}
            </span>
            <img
              src={item.item.small}
              alt={item.item.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {item.item.name}
              </div>
              <div className="text-xs text-gray-500 uppercase">
                {item.item.symbol}
              </div>
            </div>
            <div className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
              {item.item.score + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function MarketStats({ currency }: { currency: string }) {
  // Simulate variable loading time
  const delay = getRandomDelay(500, 1500);
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Simulate random failures (20% chance)
  if (shouldSimulateFailure(0.2)) {
    const errorTypes = [
      "Global market stats temporarily unavailable",
      "Database connection timeout",
      "Market data aggregation in progress",
      "Stats calculation service overloaded",
    ];
    const randomError =
      errorTypes[Math.floor(Math.random() * errorTypes.length)];
    throw new Error(`Stats Error: ${randomError}`);
  }

  const response = await fetch("https://api.coingecko.com/api/v3/global", {
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(4000), // Reduced timeout
  });

  if (!response.ok) {
    throw new Error(`Global stats fetch failed: HTTP ${response.status}`);
  }

  const data = await response.json();

  // Simulate data validation
  if (!data.data) {
    throw new Error("Global market data is incomplete");
  }

  const stats = data.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-500">
            Total Market Cap
          </h4>
          <div className="text-xs text-green-600">
            ✓ {(delay / 1000).toFixed(1)}s
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
            notation: "compact",
          }).format(stats.total_market_cap[currency])}
        </p>
        <p
          className={`text-sm font-medium ${
            stats.market_cap_change_percentage_24h_usd >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {stats.market_cap_change_percentage_24h_usd >= 0 ? "+" : ""}
          {stats.market_cap_change_percentage_24h_usd.toFixed(2)}%
        </p>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">
          24h Trading Volume
        </h4>
        <p className="text-2xl font-bold text-gray-900">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
            notation: "compact",
          }).format(stats.total_volume[currency])}
        </p>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">
          Bitcoin Dominance
        </h4>
        <p className="text-2xl font-bold text-gray-900">
          {stats.market_cap_percentage.btc.toFixed(1)}%
        </p>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">
          Active Cryptocurrencies
        </h4>
        <p className="text-2xl font-bold text-gray-900">
          {stats.active_cryptocurrencies.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

// Simulate a component that fails more frequently
async function NewsSection() {
  const delay = getRandomDelay(2000, 5000);
  await new Promise((resolve) => setTimeout(resolve, delay));

  // High failure rate for demonstration (50% chance)
  if (shouldSimulateFailure(0.5)) {
    const errorTypes = [
      "News API quota exceeded",
      "News service maintenance in progress",
      "Content filtering service unavailable",
      "RSS feed parsing failed",
      "News database connection lost",
    ];
    const randomError =
      errorTypes[Math.floor(Math.random() * errorTypes.length)];
    throw new Error(`News Error: ${randomError}`);
  }

  // Mock news data
  const mockNews = [
    {
      id: 1,
      title: "Bitcoin Reaches New All-Time High",
      summary:
        "Cryptocurrency markets surge as institutional adoption continues.",
      timestamp: new Date().toISOString(),
      source: "CryptoNews",
    },
    {
      id: 2,
      title: "Ethereum 2.0 Upgrade Shows Promising Results",
      summary: "Network efficiency improvements exceed expectations.",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      source: "BlockchainToday",
    },
  ];

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900">Latest News</h4>
        <div className="text-xs text-green-600">
          Loaded in {(delay / 1000).toFixed(1)}s
        </div>
      </div>
      <div className="space-y-3">
        {mockNews.map((article) => (
          <article
            key={article.id}
            className="border-b border-gray-100 pb-3 last:border-b-0"
          >
            <h5 className="font-medium text-gray-900 mb-1">{article.title}</h5>
            <p className="text-sm text-gray-600 mb-2">{article.summary}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{article.source}</span>
              <time>{new Date(article.timestamp).toLocaleTimeString()}</time>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// Main Page Component
interface AdvancedMarketPageProps {
  searchParams: {
    currency?: string;
    view?: string;
  };
}

export default async function AdvancedMarketPage({
  searchParams,
}: AdvancedMarketPageProps) {
  const currency = searchParams.currency || "usd";
  const view = searchParams.view || "overview";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
              Advanced Crypto Market
            </h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                🔄 Refresh page to trigger different errors
              </div>
              <select
                defaultValue={currency}
                name="currency"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
              </select>
            </div>
          </div>
        </header>

        {/* Layout */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            {/* Market Stats - Lower failure rate */}
            <ClientErrorBoundary fallbackType="market">
              <Suspense fallback={<StatsGridSkeleton />}>
                <MarketStats currency={currency} />
              </Suspense>
            </ClientErrorBoundary>

            {/* Market Overview - Medium failure rate */}
            <ClientErrorBoundary fallbackType="market">
              <Suspense fallback={<MarketOverviewSkeleton />}>
                <MarketOverview currency={currency} />
              </Suspense>
            </ClientErrorBoundary>
          </main>

          {/* Sidebar */}
          <aside className="mt-8 lg:mt-0 space-y-6">
            {/* Trending - Medium failure rate */}
            <ClientErrorBoundary fallbackType="sidebar">
              <Suspense fallback={<TrendingCoinsSkeleton />}>
                <TrendingCoins />
              </Suspense>
            </ClientErrorBoundary>

            {/* News Section - High failure rate for demonstration */}
            <ClientErrorBoundary fallbackType="sidebar">
              <Suspense
                fallback={
                  <div className="bg-white rounded-lg border p-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-24 mb-4"></div>
                    <div className="space-y-3">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              >
                <NewsSection />
              </Suspense>
            </ClientErrorBoundary>
          </aside>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  searchParams,
}: AdvancedMarketPageProps) {
  const currency = searchParams.currency || "usd";

  return {
    title: `Advanced Crypto Market - ${currency.toUpperCase()} | Bitpanda`,
    description: `Real-time cryptocurrency market data with error handling demonstration`,
  };
}
