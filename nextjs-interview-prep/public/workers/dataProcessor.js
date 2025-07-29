export const workerCode = `
self.onmessage = function(e) {
  const { data, operation } = e.data;
  
  switch (operation) {
    case 'calculateTechnicalIndicators':
      const result = calculateTechnicalIndicators(data);
      self.postMessage({ type: 'technical-indicators', result });
      break;
    case 'processLargeDataset':
      const processed = processLargeDataset(data);
      self.postMessage({ type: 'processed-data', result: processed });
      break;
  }
};

function calculateTechnicalIndicators(prices) {
  // RSI Calculation
  const rsi = calculateRSI(prices, 14);
  
  // Moving Average
  const ma20 = calculateMA(prices, 20);
  const ma50 = calculateMA(prices, 50);
  
  // MACD
  const macd = calculateMACD(prices);
  
  return { rsi, ma20, ma50, macd };
}

function calculateRSI(prices, period) {
  if (prices.length < period + 1) return null;
  
  let gains = 0;
  let losses = 0;
  
  for (let i = 1; i <= period; i++) {
    const change = prices[i] - prices[i - 1];
    if (change > 0) gains += change;
    else losses -= change;
  }
  
  const avgGain = gains / period;
  const avgLoss = losses / period;
  const rs = avgGain / avgLoss;
  
  return 100 - (100 / (1 + rs));
}

function calculateMA(prices, period) {
  if (prices.length < period) return null;
  
  const sum = prices.slice(-period).reduce((a, b) => a + b, 0);
  return sum / period;
}

function calculateMACD(prices) {
  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);
  
  if (!ema12 || !ema26) return null;
  
  return ema12 - ema26;
}

function calculateEMA(prices, period) {
  if (prices.length < period) return null;
  
  const multiplier = 2 / (period + 1);
  let ema = prices[0];
  
  for (let i = 1; i < prices.length; i++) {
    ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
  }
  
  return ema;
}

function processLargeDataset(data) {
  return data.map(item => ({
    ...item,
    processed: true,
    timestamp: Date.now()
  }));
}
`;
