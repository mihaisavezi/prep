// components/AdvancedPerformanceDashboard.tsx
"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useQuery, useQueryClient, useQueries } from "@tanstack/react-query";
import { usePerformanceMonitoring } from "../hooks/usePerformanceMonitoring";
import { useWebWorker } from "../hooks/useWebWorker";

interface MarketData {
  symbol: string;
  price: number;
  volume: number;
  change24h: number;
  prices: number[];
  lastUpdated: number;
}

// Simulated API calls with realistic delays
const fetchMarketData = async (symbols: string[]): Promise<MarketData[]> => {
  console.log(`🌐 Fetching market data for: ${symbols.join(", ")}`);
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

  return symbols.map((symbol) => ({
    symbol,
    price: Math.random() * 1000 + 100,
    volume: Math.random() * 1000000,
    change24h: (Math.random() - 0.5) * 10,
    prices: Array.from({ length: 100 }, () => Math.random() * 1000 + 100),
    lastUpdated: Date.now(),
  }));
};

const fetchSingleCrypto = async (symbol: string): Promise<MarketData> => {
  console.log(`🔍 Fetching single crypto: ${symbol}`);
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    symbol,
    price: Math.random() * 1000 + 100,
    volume: Math.random() * 1000000,
    change24h: (Math.random() - 0.5) * 10,
    prices: Array.from({ length: 100 }, () => Math.random() * 1000 + 100),
    lastUpdated: Date.now(),
  };
};

const fetchHistoricalData = async (
  symbol: string,
  days: number = 7
): Promise<number[]> => {
  console.log(`📊 Fetching ${days} days of historical data for ${symbol}`);
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return Array.from(
    { length: days * 24 },
    (_, i) => Math.random() * 1000 + 100 + Math.sin(i / 24) * 50
  );
};

const AdvancedPerformanceDashboard = () => {
  const [selectedSymbols, setSelectedSymbols] = useState(["BTC", "ETH", "ADA"]);
  const [enableRealTime, setEnableRealTime] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<string>("BTC");
  const [refreshCount, setRefreshCount] = useState(0);
  const queryClient = useQueryClient();
  const { processData, isLoading: workerLoading } = useWebWorker();
  const performanceMetrics = usePerformanceMonitoring("AdvancedDashboard");

  // Use refs to prevent infinite loops
  const processingRef = useRef(false);
  const lastProcessedDataRef = useRef<string>("");

  // Main market data query with proper caching
  const {
    data: marketData,
    isLoading: isLoadingMarket,
    error: marketError,
    dataUpdatedAt,
    isFetching: isFetchingMarket,
    isStale: isMarketStale,
  } = useQuery({
    queryKey: ["marketData", selectedSymbols.sort()], // Sorted for consistent cache keys
    queryFn: () => fetchMarketData(selectedSymbols),
    staleTime: 30000, // Data is fresh for 30 seconds
    gcTime: 300000, // Keep in cache for 5 minutes (renamed from cacheTime in v5)
    refetchInterval: enableRealTime ? 10000 : false, // Refetch every 10 seconds if real-time
    refetchOnWindowFocus: true, // Refetch when window gains focus
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    select: (data) => {
      // Transform data and add cache timestamp
      return data.map((item) => ({
        ...item,
        cached: true,
        cacheTimestamp: Date.now(),
      }));
    },
  });

  // Individual crypto queries for detailed view
  const {
    data: cryptoDetail,
    isLoading: isLoadingDetail,
    isFetching: isFetchingDetail,
  } = useQuery({
    queryKey: ["cryptoDetail", selectedCrypto],
    queryFn: () => fetchSingleCrypto(selectedCrypto),
    staleTime: 20000, // Fresh for 20 seconds
    gcTime: 600000, // Keep in cache for 10 minutes
    enabled: !!selectedCrypto, // Only run if selectedCrypto exists
  });

  // Historical data query
  const { data: historicalData, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["historicalData", selectedCrypto, 7], // Include days parameter
    queryFn: () => fetchHistoricalData(selectedCrypto, 7),
    staleTime: 60000, // Fresh for 1 minute
    gcTime: 900000, // Keep in cache for 15 minutes
    enabled: !!selectedCrypto,
  });

  // Parallel queries for multiple cryptos (demonstrates useQueries)
  const cryptoQueries = useQueries({
    queries: selectedSymbols.map((symbol) => ({
      queryKey: ["individualCrypto", symbol],
      queryFn: () => fetchSingleCrypto(symbol),
      staleTime: 25000,
      gcTime: 300000,
    })),
  });

  // Technical indicators state
  const [technicalIndicators, setTechnicalIndicators] = useState<any>(null);
  const [indicatorsLoading, setIndicatorsLoading] = useState(false);

  // Process technical indicators with web worker
  const processIndicators = useCallback(
    async (prices: number[]) => {
      if (processingRef.current || !prices?.length) return;

      const dataKey = JSON.stringify(prices.slice(0, 10));
      if (lastProcessedDataRef.current === dataKey) return;

      processingRef.current = true;
      setIndicatorsLoading(true);

      try {
        const result = await processData(
          prices,
          "calculateTechnicalIndicators"
        );
        setTechnicalIndicators(result);
        lastProcessedDataRef.current = dataKey;
      } catch (error) {
        console.error("Technical indicators calculation failed:", error);
      } finally {
        setIndicatorsLoading(false);
        processingRef.current = false;
      }
    },
    [processData]
  );

  // Process indicators when crypto detail changes
  useEffect(() => {
    if (cryptoDetail?.prices) {
      processIndicators(cryptoDetail.prices);
    }
  }, [cryptoDetail, processIndicators]);

  // Memoized portfolio calculations
  const portfolioStats = useMemo(() => {
    if (!marketData || marketData.length === 0) return null;

    console.log("📊 Calculating portfolio stats...");

    const totalValue = marketData.reduce((sum, item) => sum + item.price, 0);
    const avgChange =
      marketData.reduce((sum, item) => sum + item.change24h, 0) /
      marketData.length;
    const totalVolume = marketData.reduce((sum, item) => sum + item.volume, 0);

    return {
      totalValue,
      avgChange,
      totalVolume,
      count: marketData.length,
      lastCalculated: Date.now(),
    };
  }, [marketData]);

  // Cache management functions
  const handleSymbolToggle = useCallback(
    (symbol: string) => {
      setSelectedSymbols((prev) => {
        const newSymbols = prev.includes(symbol)
          ? prev.filter((s) => s !== symbol)
          : prev.length < 8
          ? [...prev, symbol]
          : prev;

        // Prefetch data for new symbols
        if (!prev.includes(symbol) && newSymbols.includes(symbol)) {
          queryClient.prefetchQuery({
            queryKey: ["individualCrypto", symbol],
            queryFn: () => fetchSingleCrypto(symbol),
            staleTime: 25000,
          });
        }

        return newSymbols;
      });
    },
    [queryClient]
  );

  // Prefetch on hover
  const prefetchSymbol = useCallback(
    (symbol: string) => {
      queryClient.prefetchQuery({
        queryKey: ["cryptoDetail", symbol],
        queryFn: () => fetchSingleCrypto(symbol),
        staleTime: 20000,
      });

      queryClient.prefetchQuery({
        queryKey: ["historicalData", symbol, 7],
        queryFn: () => fetchHistoricalData(symbol, 7),
        staleTime: 60000,
      });
    },
    [queryClient]
  );

  // Manual refresh with cache invalidation
  const handleManualRefresh = useCallback(() => {
    setRefreshCount((prev) => prev + 1);
    queryClient.invalidateQueries({ queryKey: ["marketData"] });
    queryClient.invalidateQueries({ queryKey: ["cryptoDetail"] });
  }, [queryClient]);

  // Clear specific cache entries
  const handleClearCache = useCallback(() => {
    queryClient.removeQueries(); // Clear all queries
    setTechnicalIndicators(null);
    lastProcessedDataRef.current = "";
  }, [queryClient]);

  // Get cache statistics
  const cacheStats = useMemo(() => {
    const cache = queryClient.getQueryCache();
    const queries = cache.getAll();
    console.log("🚀 ~ cacheStats ~ cache:", cache.getAll())

    return {
      totalQueries: queries.length,
      activeQueries: queries.filter((q) => q.getObserversCount() > 0).length,
      staleQueries: queries.filter((q) => q.isStale()).length,
      cachedData: queries.reduce((acc, q) => acc + (q.state.data ? 1 : 0), 0),
    };
  }, [queryClient, refreshCount]); // Include refreshCount to trigger recalculation

  const availableSymbols = [
    "BTC",
    "ETH",
    "ADA",
    "DOT",
    "LINK",
    "UNI",
    "MATIC",
    "AVAX",
    "SOL",
    "ATOM",
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          Level 5: Advanced Performance with React Query Caching
        </h1>
        <p className="text-gray-600">
          Demonstrating React Query's intelligent caching, background updates,
          and performance optimization.
        </p>
      </div>

      {/* Performance Metrics */}
      {performanceMetrics && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">
            ⚡ Performance Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white p-3 rounded">
              <span className="text-blue-600 font-medium">Render Time:</span>
              <div className="text-lg font-mono font-bold">
                {performanceMetrics.renderTime.toFixed(2)}ms
              </div>
            </div>
            <div className="bg-white p-3 rounded">
              <span className="text-blue-600 font-medium">Memory Usage:</span>
              <div className="text-lg font-mono font-bold">
                {performanceMetrics.memoryUsage.toFixed(2)}MB
              </div>
            </div>
            <div className="bg-white p-3 rounded">
              <span className="text-blue-600 font-medium">DOM Nodes:</span>
              <div className="text-lg font-mono font-bold">
                {performanceMetrics.componentCount}
              </div>
            </div>
            <div className="bg-white p-3 rounded">
              <span className="text-blue-600 font-medium">Last Update:</span>
              <div className="text-xs font-mono">
                {performanceMetrics.lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* React Query Cache Statistics */}
      <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-900 mb-2">
          🗄️ React Query Cache Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded">
            <span className="text-green-600 font-medium">Total Queries:</span>
            <div className="text-lg font-mono font-bold">
              {cacheStats.totalQueries}
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <span className="text-green-600 font-medium">Active Queries:</span>
            <div className="text-lg font-mono font-bold">
              {cacheStats.activeQueries}
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <span className="text-green-600 font-medium">Stale Queries:</span>
            <div className="text-lg font-mono font-bold">
              {cacheStats.staleQueries}
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <span className="text-green-600 font-medium">Cached Data:</span>
            <div className="text-lg font-mono font-bold">
              {cacheStats.cachedData}
            </div>
          </div>
        </div>
        <div className="mt-2 text-xs text-green-700">
          {isMarketStale && (
            <span className="bg-yellow-200 px-2 py-1 rounded mr-2">
              Market data is stale
            </span>
          )}
          {isFetchingMarket && (
            <span className="bg-blue-200 px-2 py-1 rounded mr-2">
              Background fetching...
            </span>
          )}
          Last updated:{" "}
          {dataUpdatedAt
            ? new Date(dataUpdatedAt).toLocaleTimeString()
            : "Never"}
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={enableRealTime}
              onChange={(e) => setEnableRealTime(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium">
              🔄 Real-time Updates (10s)
              {enableRealTime && (
                <span className="text-green-600 ml-1">ACTIVE</span>
              )}
            </span>
          </label>

          <button
            onClick={handleManualRefresh}
            disabled={isLoadingMarket}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoadingMarket
              ? "Refreshing..."
              : `Invalidate Cache (${refreshCount})`}
          </button>

          <button
            onClick={handleClearCache}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Clear All Cache
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selected Crypto for Detail View:
          </label>
          <select
            value={selectedCrypto}
            onChange={(e) => setSelectedCrypto(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            {availableSymbols.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Market Symbols ({selectedSymbols.length}/8):
          </label>
          <div className="flex flex-wrap gap-2">
            {availableSymbols.map((symbol) => (
              <button
                key={symbol}
                onClick={() => handleSymbolToggle(symbol)}
                onMouseEnter={() => prefetchSymbol(symbol)}
                disabled={
                  !selectedSymbols.includes(symbol) &&
                  selectedSymbols.length >= 8
                }
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  selectedSymbols.includes(symbol)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                }`}
              >
                {symbol}
                {/* Show cache status */}
                {queryClient.getQueryState(["individualCrypto", symbol])
                  ?.data && <span className="ml-1 text-xs">💾</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading States */}
      {(isLoadingMarket ||
        isLoadingDetail ||
        isLoadingHistory ||
        workerLoading ||
        indicatorsLoading) && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
            <span className="text-yellow-800">
              {isLoadingMarket && "Loading market data..."}
              {isLoadingDetail && "Loading crypto details..."}
              {isLoadingHistory && "Loading historical data..."}
              {workerLoading && "Web Worker processing..."}
              {indicatorsLoading && "Calculating technical indicators..."}
            </span>
          </div>
        </div>
      )}

      {/* Error Handling */}
      {marketError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">
            ⚠️ Error: {(marketError as Error).message}
          </p>
        </div>
      )}

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Stats */}
        {portfolioStats && (
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              📊 Portfolio Overview
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded">
                <span className="text-gray-600 text-sm">Total Value:</span>
                <div className="text-2xl font-bold text-blue-600">
                  $
                  {portfolioStats.totalValue.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <span className="text-gray-600 text-sm">Average Change:</span>
                <div
                  className={`text-xl font-semibold ${
                    portfolioStats.avgChange >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {portfolioStats.avgChange >= 0 ? "+" : ""}
                  {portfolioStats.avgChange.toFixed(2)}%
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Calculated:{" "}
                {new Date(portfolioStats.lastCalculated).toLocaleTimeString()}
              </div>
            </div>
          </div>
        )}

        {/* Crypto Detail */}
        {cryptoDetail && (
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              🔍 {cryptoDetail.symbol} Details
              {isFetchingDetail && (
                <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              )}
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600">Price:</span>
                <div className="text-xl font-bold">
                  ${cryptoDetail.price.toFixed(2)}
                </div>
              </div>
              <div>
                <span className="text-gray-600">24h Change:</span>
                <div
                  className={`font-semibold ${
                    cryptoDetail.change24h >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {cryptoDetail.change24h >= 0 ? "+" : ""}
                  {cryptoDetail.change24h.toFixed(2)}%
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Updated:{" "}
                {new Date(cryptoDetail.lastUpdated).toLocaleTimeString()}
              </div>
            </div>
          </div>
        )}

        {/* Technical Indicators */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            🔬 Technical Analysis
            {indicatorsLoading && (
              <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            )}
          </h3>
          {technicalIndicators ? (
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 rounded">
                <span className="text-gray-600 text-sm">RSI (14):</span>
                <div className="text-xl font-bold text-orange-600">
                  {technicalIndicators.rsi?.toFixed(2) || "N/A"}
                </div>
              </div>
              <div className="p-3 bg-teal-50 rounded">
                <span className="text-gray-600 text-sm">MACD:</span>
                <div className="text-lg font-bold text-teal-600">
                  {technicalIndicators.macd?.toFixed(4) || "N/A"}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Select a crypto to see technical indicators</p>
            </div>
          )}
        </div>
      </div>

      {/* Cache Demonstration */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">
          🚀 React Query Caching Features:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <ul className="space-y-1">
            <li>✅ Intelligent background refetching every 10 seconds</li>
            <li>✅ Data stays fresh for 30 seconds (staleTime)</li>
            <li>✅ Cache persists for 5 minutes (gcTime)</li>
            <li>✅ Automatic retry with exponential backoff</li>
          </ul>
          <ul className="space-y-1">
            <li>✅ Prefetching on hover for instant navigation</li>
            <li>✅ Parallel queries with useQueries</li>
            <li>✅ Cache invalidation and manual refresh</li>
            <li>✅ Real-time cache statistics display</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdvancedPerformanceDashboard;
