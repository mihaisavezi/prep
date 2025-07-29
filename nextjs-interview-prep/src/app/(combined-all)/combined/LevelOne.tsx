// app/trading-platform/level1/page.tsx
import { Suspense } from "react";
import BasicCryptoList from "../components/BasicCryptoList";

// SSR: Fetch initial data on server
export async function fetchInitialCryptoData() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10",
    {
      next: { revalidate: 300 }, // Cache for 5 minutes
    }
  );
  return response.json();
}

export default async function Level1Page() {
  const initialData = await fetchInitialCryptoData();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-6">
        <h1 className="text-3xl font-bold">Level 1: SSR + Basic State</h1>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <Suspense fallback={<div>Loading crypto data...</div>}>
          <BasicCryptoList initialData={initialData} />
        </Suspense>
      </main>
    </div>
  );
}
