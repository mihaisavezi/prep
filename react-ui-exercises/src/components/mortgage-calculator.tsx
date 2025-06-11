import React, { useState } from 'react'

type Props = {}

const MortgageCalculator = (props: Props) => {
  const [amount, setAmount] = useState(0);
  const [termYears, setTermYears] = useState(0);
  const [rate, setRate] = useState(0);
  const [outputs, setOutputs] = useState({'Monthly Payment': 0, 'Total Interest Paid': 0, 'Total Payment Amount': 0});
  console.log("🚀 ~ MortgageCalculator ~ outputs:", outputs)

  const compute = () => {
      // Validate inputs
      if (amount <= 0 || termYears <= 0 || rate < 0) {
        setOutputs({
          'Monthly Payment': 0,
          'Total Interest Paid': 0,
          'Total Payment Amount': 0
        });
        return;
      }

      const p = amount;
      // !attention to percentage transformations
      const i = parseFloat(((rate / 100) / 12).toFixed(8)); // Monthly interest rate without rounding
      const n = termYears * 12;

      let M;
      if (rate === 0) {
        // For zero interest loans, simply divide principal by number of months
        M = p / n;
      } else {
        M = p * (i * (1 + i) ** n) / ((1 + i) ** n - 1);
      }

      const monthlyPayment = parseFloat(M.toFixed(2));
      const totalPayment = parseFloat((M * n).toFixed(2));
      const totalInterest = parseFloat((totalPayment - p).toFixed(2));

      setOutputs({
        'Monthly Payment': monthlyPayment,
        'Total Interest Paid': totalInterest,
        'Total Payment Amount': totalPayment
      });
  }


  return (
    <>
      <div>MortgageCalculator</div>
      <input
        type="number"
        name="amount"
        id="amount"
        placeholder="Loan Amount"
        required
        onChange={(e) => setAmount(e.target.valueAsNumber)}
      />
      <input
        type="number"
        name="term"
        id="term"
        placeholder="Loan Term (years)"
        required
        onChange={(e) => setTermYears(e.target.valueAsNumber)}
      />
      <input
        type="number"
        name="rate"
        id="rate"
        placeholder="Loan Interest Rate (APR)%"
        required
        min={0}
        max={100}
        onChange={(e) => setRate(e.target.valueAsNumber)}
      />
      <button onClick={compute}>Calculate</button>
      {Object.entries(outputs).map((output) => (
        <div>
          {output[0]}: {output[1]}
        </div>
      ))}
    </>
  );
}

export default MortgageCalculator;
