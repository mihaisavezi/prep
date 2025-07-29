"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styled from "styled-components";

const tradingSchema = z
  .object({
    cryptoId: z.string().min(1, "Please select a cryptocurrency"),
    orderType: z.enum(["market", "limit"]),
    side: z.enum(["buy", "sell"]),
    amount: z.number().min(0.001, "Minimum amount is 0.001"),
    limitPrice: z.number().optional(),
  })
  .refine(
    (data) => {
      if (data.orderType === "limit" && !data.limitPrice) {
        return false;
      }
      return true;
    },
    {
      message: "Limit price is required for limit orders",
      path: ["limitPrice"],
    }
  );

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.lg};
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
`;

const Label = styled.label`
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.875rem;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border: 1px solid
    ${(props) => (props.hasError ? props.theme.colors.danger : "#D1D5DB")};
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}20;
  }
`;

const Select = styled.select<{ hasError?: boolean }>`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border: 1px solid
    ${(props) => (props.hasError ? props.theme.colors.danger : "#D1D5DB")};
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}20;
  }
`;

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.danger};
  font-size: 0.75rem;
  margin-top: ${(props) => props.theme.spacing.xs};
`;

export default function TradingForm() {
  const { sortedMarketData, addToPortfolio, state } = useTrading();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(tradingSchema),
    defaultValues: {
      cryptoId: "",
      orderType: "market",
      side: "buy",
      amount: 0,
      limitPrice: undefined,
    },
  });

  const watchOrderType = watch("orderType");
  const watchCryptoId = watch("cryptoId");

  const selectedCrypto = sortedMarketData.find((c) => c.id === watchCryptoId);

  const onSubmit = async (data) => {
    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (data.side === "buy" && selectedCrypto) {
        addToPortfolio(selectedCrypto, data.amount);
      }

      reset();
    } catch (error) {
      console.error("Order failed:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <TradingCard>
        <h3>Place Order</h3>

        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <FormField>
            <Label>Cryptocurrency</Label>
            <Controller
              name="cryptoId"
              control={control}
              render={({ field }) => (
                <Select {...field} hasError={!!errors.cryptoId}>
                  <option value="">Select cryptocurrency</option>
                  {sortedMarketData.map((crypto) => (
                    <option key={crypto.id} value={crypto.id}>
                      {crypto.name} ({crypto.symbol.toUpperCase()}) - $
                      {crypto.current_price}
                    </option>
                  ))}
                </Select>
              )}
            />
            {errors.cryptoId && (
              <ErrorMessage>{errors.cryptoId.message}</ErrorMessage>
            )}
          </FormField>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <FormField>
              <Label>Order Type</Label>
              <Controller
                name="orderType"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <option value="market">Market</option>
                    <option value="limit">Limit</option>
                  </Select>
                )}
              />
            </FormField>

            <FormField>
              <Label>Side</Label>
              <Controller
                name="side"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </Select>
                )}
              />
            </FormField>
          </div>

          <FormField>
            <Label>Amount</Label>
            <Controller
              name="amount"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Input
                  {...field}
                  type="number"
                  step="0.001"
                  value={value || ""}
                  onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                  hasError={!!errors.amount}
                  placeholder="0.001"
                />
              )}
            />
            {errors.amount && (
              <ErrorMessage>{errors.amount.message}</ErrorMessage>
            )}
          </FormField>

          {watchOrderType === "limit" && (
            <FormField>
              <Label>Limit Price</Label>
              <Controller
                name="limitPrice"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    value={value || ""}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    hasError={!!errors.limitPrice}
                    placeholder="Enter limit price"
                  />
                )}
              />
              {errors.limitPrice && (
                <ErrorMessage>{errors.limitPrice.message}</ErrorMessage>
              )}
            </FormField>
          )}

          {selectedCrypto && (
            <div
              style={{
                padding: "1rem",
                backgroundColor: "#F3F4F6",
                borderRadius: "6px",
                fontSize: "0.875rem",
              }}
            >
              <p>
                Current Price:{" "}
                <PriceDisplay>${selectedCrypto.current_price}</PriceDisplay>
              </p>
              <p>Available Balance: ${state.portfolio.balance.toFixed(2)}</p>
            </div>
          )}

          <TradingButton
            type="submit"
            disabled={isSubmitting}
            variant={watch("side") === "buy" ? "success" : "danger"}
          >
            {isSubmitting
              ? "Processing..."
              : `${watch("side")} ${
                  watch("cryptoId") ? selectedCrypto?.symbol.toUpperCase() : ""
                }`}
          </TradingButton>
        </FormContainer>
      </TradingCard>
    </ThemeProvider>
  );
}
