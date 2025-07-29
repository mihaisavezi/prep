import { TradingProvider } from "../contexts/TradingContext";
import StyledComponentsRegistry from "../components/StyledComponentsRegistry";
import TradingFormStyled from "../components/styled/TradingFormStyles";
import EnhancedTradingDashboardStyled from "../components/styled/EnhancedTradingDashboardStyles";

// SSR data loader
async function fetchInitialCryptoData() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10",
    { next: { revalidate: 300 } }
  );
  return response.json();
}

export default async function Level4Page() {
  const initialData = await fetchInitialCryptoData();

  return (
    <StyledComponentsRegistry>
      <TradingProvider initialData={initialData}>
        <div>
          <header
            style={{
              background: "#fff",
              boxShadow: "0 1px 3px #eee",
              padding: "1.5rem",
            }}
          >
            <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>
              Level 4: Styled Components + Advanced Forms
            </h1>
            <p style={{ color: "#666", marginTop: "0.5rem" }}>
              SSR, Context, Performance, <b>Styled Components</b>, and{" "}
              <b>Advanced Form</b>
            </p>
          </header>
          <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem" }}>
            <EnhancedTradingDashboardStyled />
            <div style={{ marginTop: "3rem" }}>
              <TradingFormStyled />
            </div>
          </main>
        </div>
      </TradingProvider>
    </StyledComponentsRegistry>
  );
}
