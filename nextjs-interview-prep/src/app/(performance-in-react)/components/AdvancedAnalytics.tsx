"use client";

export default function AdvancedAnalytics() {
  // Simulate heavy analytics calculations
  const analytics = {
    rsi: 67.5,
    macd: 0.23,
    bollinger: { upper: 46500, lower: 44200 },
    volume: 2.4e9,
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Advanced Analytics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900">RSI</h4>
          <p className="text-2xl font-bold text-blue-600">{analytics.rsi}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-900">MACD</h4>
          <p className="text-2xl font-bold text-green-600">{analytics.macd}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-medium text-purple-900">Bollinger Bands</h4>
          <p className="text-sm text-purple-600">
            {analytics.bollinger.upper} / {analytics.bollinger.lower}
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-medium text-orange-900">Volume</h4>
          <p className="text-lg font-bold text-orange-600">
            {(analytics.volume / 1e9).toFixed(1)}B
          </p>
        </div>
      </div>
    </div>
  );
}
