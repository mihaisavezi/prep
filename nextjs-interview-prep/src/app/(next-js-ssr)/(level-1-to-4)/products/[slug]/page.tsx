// app/crypto/[slug]/page.tsx
interface CryptoDetail {
  id: string;
  name: string;
  symbol: string;
  market_data: {
    current_price: {usd: number}
    market_cap: {usd: number}
  }
  description: { en: string };
  image: { large: string };
}

interface CryptoNews {
  title: string;
  url: string;
  published_at: string;
  source: string;
}

interface CryptoPageProps {
  params: { slug: string };
  searchParams: { tab?: string };
}

async function fetchCryptoDetail(slug: string): Promise<CryptoDetail | null> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${slug}`,
      { next: { revalidate: 3600*60 } }
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch crypto detail for ${slug}:`, error);
    return null;
  }
}

async function fetchCryptoNews(symbol: string): Promise<CryptoNews[]> {
  try {
    // Mock implementation - replace with real news API
    return [
      {
        title: `${symbol.toUpperCase()} reaches new milestone`,
        url: "#",
        published_at: new Date().toISOString(),
        source: "CryptoNews",
      },
    ];
  } catch (error) {
    console.error(`Failed to fetch news for ${symbol}:`, error);
    return [];
  }
}

async function fetchPriceHistory(id: string): Promise<number[][]> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.prices || [];
  } catch (error) {
    console.error(`Failed to fetch price history for ${id}:`, error);
    return [];
  }
}

export default async function CryptoPage({
  params,
  searchParams,
}: CryptoPageProps) {
  const { slug } = await params;
  const { tab } = await searchParams;

  const activeTab = tab || "overview";

  const [cryptoDetail, news, priceHistory] = await Promise.all([
    fetchCryptoDetail(slug),
    fetchCryptoNews(slug),
    fetchPriceHistory(slug),
  ]);

  if (!cryptoDetail) {
    return (
      <div>
        <h1>Cryptocurrency Not Found</h1>
        <p>The cryptocurrency "{slug}" could not be found.</p>
      </div>
    );
  }

  return (
    <div className="crypto-detail">
      <header className="crypto-header">
        <img
          src={cryptoDetail.image.large}
          alt={cryptoDetail.name}
          width={64}
          height={64}
        />
        <div>
          <h1>
            {cryptoDetail.name} ({cryptoDetail.symbol.toUpperCase()})
          </h1>
          <p className="price">
            ${cryptoDetail.market_data.current_price["usd"].toLocaleString()}
          </p>
        </div>
      </header>

      <nav className="tabs">
        <a
          href={`/products/${slug}?tab=overview`}
          className={`px-8 py-2${activeTab === "overview" ? "active" : ""}`}
        >
          Overview
        </a>
        <a
          href={`/products/${slug}?tab=news`}
          className={`px-8 py-2${activeTab === "overview" ? "active" : ""}`}
        >
          News
        </a>
        <a
          href={`/products/${slug}?tab=chart`}
          className={`px-8 py-2${activeTab === "overview" ? "active" : ""}`}
        >
          Chart
        </a>
      </nav>

      <main className="tab-content">
        {activeTab === "overview" && (
          <div>
            <h2>About {cryptoDetail.name}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: cryptoDetail.description.en.substring(0, 500) + "...",
              }}
            />
            <p>
              Market Cap: $
              {cryptoDetail.market_data.market_cap["usd"].toLocaleString()}
            </p>
          </div>
        )}

        {activeTab === "news" && (
          <div>
            <h2>Latest News</h2>
            {news.length > 0 ? (
              <div className="news-list">
                {news.map((article, index) => (
                  <article key={index} className="news-item">
                    <h3>{article.title}</h3>
                    <p>Source: {article.source}</p>
                    <time>
                      {new Date(article.published_at).toLocaleDateString()}
                    </time>
                  </article>
                ))}
              </div>
            ) : (
              <p>No recent news available.</p>
            )}
          </div>
        )}

        {activeTab === "chart" && (
          <div>
            <h2>7-Day Price History</h2>
            {priceHistory.length > 0 ? (
              <div className="chart-placeholder">
                <p>
                  Chart would render here with {priceHistory.length} data points
                </p>
                <p>
                  Latest price: $
                  {priceHistory[priceHistory.length - 1]?.[1]?.toFixed(2)}
                </p>
              </div>
            ) : (
              <p>Price history unavailable.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const popularCryptos = [
    "bitcoin",
    "ethereum",
    "cardano",
    "solana",
    "polkadot",
  ];

  return popularCryptos.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CryptoPageProps) {
  const {slug} = await params;
  const cryptoDetail = await fetchCryptoDetail(slug);

  if (!cryptoDetail) {
    return { title: "Cryptocurrency Not Found - Bitpanda" };
  }

  return {
    title: `${
      cryptoDetail.name
    } (${cryptoDetail.symbol.toUpperCase()}) - Bitpanda`,
    description: `Current price, market data, and news for ${
      cryptoDetail.name
    }. Trade ${cryptoDetail.symbol.toUpperCase()} on Bitpanda.`,
    openGraph: {
      title: `${cryptoDetail.name} - $${cryptoDetail.market_data.current_price['usd']}`,
      description: `Trade ${cryptoDetail.name} on Bitpanda`,
      images: [cryptoDetail.image.large],
    },
  };
}
