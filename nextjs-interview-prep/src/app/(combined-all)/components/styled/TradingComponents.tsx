"use client";

import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background-color: ${(props) => props.theme.colors.background};
      color: ${(props) => props.theme.colors.text.primary};
    }
  `;

const TradingCard = styled.div`
  background: ${(props) => props.theme.colors.surface};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.lg};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: ${(props) => props.theme.spacing.md};
  }
`;

const PriceDisplay = styled.div<{ positive?: boolean }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) =>
    props.positive === undefined
      ? props.theme.colors.text.primary
      : props.positive
      ? props.theme.colors.success
      : props.theme.colors.danger};

  &::before {
    content: "${(props) => (props.positive ? "+" : "")}";
    display: ${(props) => (props.positive === undefined ? "none" : "inline")};
  }
`;

const TradingButton = styled.button<{
  variant?: "primary" | "success" | "danger";
}>`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  background-color: ${(props) => {
    switch (props.variant) {
      case "success":
        return props.theme.colors.success;
      case "danger":
        return props.theme.colors.danger;
      default:
        return props.theme.colors.primary;
    }
  }};

  color: ${(props) => props.theme.colors.text.inverse};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;
