"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styled, { ThemeProvider } from "styled-components";
import { useTrading } from "../../contexts/TradingContext";

const theme = {
  colors: {
    primary: "#2563eb",
    danger: "#dc2626",
    border: "#e5e7eb",
    bg: "#f9fafb",
    text: "#111827",
  },
};

const StyledForm = styled.form`
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 2rem;
  max-width: 420px;
  margin: 0 auto;
`;

const Field = styled.div`
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.2rem;
  display: block;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.6rem;
  border: 1.5px solid
    ${({ hasError, theme }) =>
      hasError ? theme.colors.danger : theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  margin-top: 0.2rem;
`;

const Select = styled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.6rem;
  border: 1.5px solid
    ${({ hasError, theme }) =>
      hasError ? theme.colors.danger : theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  margin-top: 0.2rem;
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.9rem;
  margin-top: 0.2rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 0.8rem;
  transition: background 0.2s;
  &:hover {
    background: #1e40af;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const tradingSchema = z.object({
  cryptoId: z.string().min(1, "Please select a cryptocurrency"),
  amount: z.number().min(0.001, "Minimum amount is 0.001"),
});

export default function TradingFormStyled() {
  const { sortedMarketData, addToPortfolio } = useTrading();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(tradingSchema),
    defaultValues: {
      cryptoId: "",
      amount: 0,
    },
  });

  const onSubmit = async (data: { cryptoId: string; amount: number }) => {
    const crypto = sortedMarketData.find((c) => c.id === data.cryptoId);
    if (crypto) {
      addToPortfolio(crypto, data.amount);
      reset();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <h3
          style={{
            fontWeight: 700,
            fontSize: "1.2rem",
            marginBottom: "1.2rem",
          }}
        >
          Add to Portfolio (Styled Form)
        </h3>
        <Field>
          <Label>Cryptocurrency</Label>
          <Controller
            name="cryptoId"
            control={control}
            render={({ field }) => (
              <Select {...field} hasError={!!errors.cryptoId}>
                <option value="">Select cryptocurrency</option>
                {sortedMarketData.map((crypto) => (
                  <option key={crypto.id} value={crypto.id}>
                    {crypto.name} ({crypto.symbol.toUpperCase()})
                  </option>
                ))}
              </Select>
            )}
          />
          {errors.cryptoId && <ErrorText>{errors.cryptoId.message}</ErrorText>}
        </Field>
        <Field>
          <Label>Amount</Label>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                step="0.001"
                hasError={!!errors.amount}
                placeholder="0.001"
                value={field.value || ""}
                onChange={(e) =>
                  field.onChange(parseFloat(e.target.value) || 0)
                }
              />
            )}
          />
          {errors.amount && <ErrorText>{errors.amount.message}</ErrorText>}
        </Field>
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add to Portfolio"}
        </SubmitButton>
      </StyledForm>
    </ThemeProvider>
  );
}
