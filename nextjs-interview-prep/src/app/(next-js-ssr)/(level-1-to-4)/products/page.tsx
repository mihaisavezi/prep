// app/market/page.tsx

import Link from "next/link";

/**
 * Level 2
Now we'll fetch real data from an external API with proper error handling.
 * 
 */
interface CryptoPrice {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
  }
  
  interface MarketPageProps {
    searchParams: { currency?: string };
  }
  
  async function fetchCryptoPrices(currency: string = 'usd'): Promise<CryptoPrice[]> {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`,
        {
          // Revalidate every 60 seconds
          next: { revalidate: 3600 }
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch crypto prices:', error);
      // Return empty array or throw based on your error handling strategy
      return [];
    }
  }
  
  export default async function MarketPage({ searchParams }: MarketPageProps) {
    const { currency = "usd" } = await searchParams;
    const cryptoPrices = await fetchCryptoPrices(currency);
  
    if (cryptoPrices.length === 0) {
      return (
        <div>
          <h1>Market Data</h1>
          <p>Unable to load market data. Please try again later.</p>
        </div>
      );
    }
  
    return (
      <div>
        <h1>Crypto Market ({currency.toUpperCase()})</h1>
        <div className="market-grid">
          {cryptoPrices.map(crypto => (
            <div key={crypto.id} className="crypto-card">
              <Link
                          className="flex max-w-xs flex-col gap-4 rounded-xl bg-blue-400 hover:bg-white/20"
                          href={`/products/${crypto.name.toLowerCase()}`}
                        >
                           <h3>{crypto.name} ({crypto.symbol.toUpperCase()})</h3>
                        </Link>
              <p className="price">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: currency
                }).format(crypto.current_price)}
              </p>
              <p className={`change ${crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Dynamic metadata based on search params
  export async function generateMetadata({ searchParams }: MarketPageProps) {
    const {currency = 'usd'} = await searchParams
    
    return {
      title: `Crypto Market Prices in ${currency.toUpperCase()} - Bitpanda`,
      description: `Live cryptocurrency prices and market data in ${currency.toUpperCase()}`,
    };
  }
  