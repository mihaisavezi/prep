// lib/auth.ts
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  preferences: {
    currency: string;
    favoriteCoins: string[];
  };
}

export async function getServerUser(): Promise<User | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return null;
    }

    // Verify JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Fetch user data from database/API
    const response = await fetch(
      `${process.env.API_BASE_URL}/users/${payload.sub}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to get server user:", error);
    return null;
  }
}

// app/dashboard/page.tsx


interface Portfolio {
  coin: string;
  symbol: string;
  amount: number;
  currentPrice: number;
  totalValue: number;
  change24h: number;
}

async function fetchUserPortfolio(
  userId: string,
  currency: string
): Promise<Portfolio[]> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/users/${userId}/portfolio?currency=${currency}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.INTERNAL_API_KEY}`,
        },
        next: { revalidate: 30 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch portfolio");
    }

    return await response.json();
  } catch (error) {
    console.error("Portfolio fetch error:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const user = await getServerUser();

  if (!user) {
    console.log(`redirect("/login")`);
    return (
      <div>
        <header className="bg-white shadow-sm p-6">
          <h1 className="text-3xl font-bold">
            Level 4: SSR with Authentication and User Context
          </h1>
        </header>
        Redirecting to login..., no user found
      </div>
    );
  }

  const currency = user?.preferences.currency;
  const [portfolio] = await Promise.all([
    fetchUserPortfolio(user.id, currency),
  ]);

  const totalPortfolioValue = portfolio.reduce(
    (sum, item) => sum + item.totalValue,
    0
  );

  return (
    <div className="dashboard">
      <header className="bg-white shadow-sm p-6">
        <h1 className="text-3xl font-bold">
          Level 3: SSR with Dynamic Routes and Parallel Data Fetching
        </h1>
      </header>
      <header className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <div className="portfolio-summary">
          <div className="total-value">
            <h2>Portfolio Value</h2>
            <p className="amount">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: currency,
              }).format(totalPortfolioValue)}
            </p>
          </div>
        </div>
      </header>

      <section className="portfolio-section">
        <h3>Your Portfolio</h3>
        {portfolio.length > 0 ? (
          <div className="portfolio-list">
            {portfolio.map((item) => (
              <div key={item.coin} className="portfolio-item">
                <div className="coin-info">
                  <h4>
                    {item.coin} ({item.symbol.toUpperCase()})
                  </h4>
                  <p>
                    {item.amount} {item.symbol.toUpperCase()}
                  </p>
                </div>
                <div className="value-info">
                  <p className="value">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: currency,
                    }).format(item.totalValue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No assets in portfolio yet.</p>
        )}
      </section>
    </div>
  );
}

export const metadata = {
  title: "Dashboard - Bitpanda",
  description:
    "Manage your cryptocurrency portfolio and track your investments",
  robots: "noindex, nofollow",
};
