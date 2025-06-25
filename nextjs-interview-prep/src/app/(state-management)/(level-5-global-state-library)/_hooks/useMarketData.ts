import { useEffect } from "react";
import { useMarketStore } from "../_stores/marketStore";

export function useMarketData() {
  const { setCoins, setLoading, setError, currency } = useMarketStore();

  useEffect(() => {
    const fetchMarketData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1`,
          {
            next: { revalidate: 3600 },
            signal: AbortSignal.timeout(6000), // Reduced timeout
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch market data");
        }

        const data = await response.json();
        setCoins(data);
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();

    // Set up real-time updates
    const interval = setInterval(fetchMarketData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [currency, setCoins, setLoading, setError]);
}
