"use client";

import styled, { ThemeProvider } from "styled-components";
import { useState, useMemo } from "react";
import { useTrading } from "../../contexts/TradingContext";

const theme = {
  colors: {
    primary: "#2563eb",
    secondary: "#64748b",
    positive: "#16a34a",
    negative: "#dc2626",
    bg: "#f9fafb",
    card: "#fff",
    border: "#e5e7eb",
  },
};

const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px #0001;
`;

const CryptoList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
`;

const CryptoItem = styled.li<{ selected: boolean }>`
  background: ${({ selected, theme }) =>
    selected ? theme.colors.bg : theme.colors.card};
  border: 2px solid
    ${({ selected, theme }) =>
      selected ? theme.colors.primary : theme.colors.border};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: border 0.2s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const PortfolioBox = styled(Card)`
  min-width: 280px;
`;

const Value = styled.span<{ positive?: boolean }>`
  color: ${({ positive, theme }) =>
    positive === undefined
      ? theme.colors.secondary
      : positive
      ? theme.colors.positive
      : theme.colors.negative};
  font-weight: 600;
`;

export default function EnhancedTradingDashboardStyled() {
  const { sortedMarketData, selectCrypto, state, addToPortfolio } =
    useTrading();
  const [amount, setAmount] = useState(0);

  const portfolioValue = useMemo(() => {
    return state.portfolio.holdings.reduce((total, holding) => {
      const crypto = sortedMarketData.find((c) => c.id === holding.id);
      return total + (crypto ? crypto.current_price * holding.amount : 0);
    }, 0);
  }, [state.portfolio.holdings, sortedMarketData]);

  const handleAddToPortfolio = () => {
    if (amount > 0 && state.selectedCrypto) {
      const crypto = sortedMarketData.find(
        (c) => c.id === state.selectedCrypto
      );
      if (crypto) {
        addToPortfolio(crypto, amount);
        setAmount(0);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ flex: 2 }}>
          <Card>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              Market Data
            </h2>
            <CryptoList>
              {sortedMarketData.map((crypto) => (
                <CryptoItem
                  key={crypto.id}
                  selected={state.selectedCrypto === crypto.id}
                  onClick={() => selectCrypto(crypto.id)}
                >
                  <div style={{ fontWeight: 600 }}>{crypto.name}</div>
                  <div style={{ fontSize: "0.9rem", color: "#64748b" }}>
                    {crypto.symbol.toUpperCase()}
                  </div>
                  <div style={{ marginTop: "0.5rem", fontWeight: 500 }}>
                    ${crypto.current_price.toLocaleString()}
                  </div>
                  <Value
                    positive={crypto.price_change_percentage_24h >= 0 ? crypto.price_change_percentage_24h : undefined}
                    style={{ fontSize: "0.9rem" }}
                  >
                    {crypto.price_change_percentage_24h >= 0 ? "+" : ""}
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </Value>
                </CryptoItem>
              ))}
            </CryptoList>
          </Card>
        </div>
        <PortfolioBox>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Portfolio
          </h3>
          <div style={{ marginBottom: "1rem" }}>
            <div>
              <span style={{ color: "#64748b" }}>Total Value:</span>{" "}
              <Value>${portfolioValue.toLocaleString()}</Value>
            </div>
            <div>
              <span style={{ color: "#64748b" }}>Balance:</span>{" "}
              <span style={{ fontWeight: 600 }}>
                ${state.portfolio.balance.toLocaleString()}
              </span>
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="amount"
              style={{ fontSize: "0.95rem", fontWeight: 500 }}
            >
              Amount to Add
            </label>
            <input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #e5e7eb",
                borderRadius: 6,
                marginTop: 4,
                marginBottom: 8,
              }}
              placeholder="Enter amount"
            />
            <button
              onClick={handleAddToPortfolio}
              disabled={!state.selectedCrypto || amount <= 0}
              style={{
                width: "100%",
                background: theme.colors.primary,
                color: "#fff",
                border: "none",
                padding: "0.7rem",
                borderRadius: 6,
                fontWeight: 600,
                cursor:
                  !state.selectedCrypto || amount <= 0
                    ? "not-allowed"
                    : "pointer",
                opacity: !state.selectedCrypto || amount <= 0 ? 0.5 : 1,
                marginBottom: 8,
              }}
            >
              Add to Portfolio
            </button>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: 8 }}>
              Current Holdings
            </h4>
            {state.portfolio.holdings.length === 0 ? (
              <p style={{ color: "#888", textAlign: "center" }}>
                No holdings yet. Select a cryptocurrency and add to your
                portfolio.
              </p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {state.portfolio.holdings.map((holding) => {
                  const crypto = sortedMarketData.find(
                    (c) => c.id === holding.id
                  );
                  const currentValue = crypto
                    ? crypto.current_price * holding.amount
                    : 0;
                  const gainLoss =
                    currentValue - holding.purchasePrice * holding.amount;
                  return (
                    <li
                      key={holding.id}
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "0.5rem 0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 600 }}>
                          {holding.symbol.toUpperCase()}
                        </span>
                        <div style={{ fontSize: "0.9rem", color: "#64748b" }}>
                          {holding.amount} @ $
                          {holding.purchasePrice.toLocaleString()}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 500 }}>
                          ${currentValue.toLocaleString()}
                        </div>
                        <Value
                          positive={gainLoss >= 0}
                          style={{ fontSize: "0.9rem" }}
                        >
                          {gainLoss >= 0 ? "+" : ""}
                          {gainLoss.toFixed(2)}
                        </Value>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </PortfolioBox>
      </div>
    </ThemeProvider>
  );
}
