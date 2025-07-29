"use client";

export default function OrderBook() {
  const orders = {
    bids: [
      { price: 44950, amount: 0.5 },
      { price: 44940, amount: 1.2 },
      { price: 44930, amount: 0.8 },
      { price: 44920, amount: 2.1 },
      { price: 44910, amount: 0.3 },
    ],
    asks: [
      { price: 45050, amount: 0.7 },
      { price: 45060, amount: 1.1 },
      { price: 45070, amount: 0.9 },
      { price: 45080, amount: 1.8 },
      { price: 45090, amount: 0.4 },
    ],
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">Order Book</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-green-600 mb-2">Bids</h4>
          <div className="space-y-1">
            {orders.bids.map((bid, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-green-600">
                  ${bid.price.toLocaleString()}
                </span>
                <span className="text-gray-600">{bid.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium text-red-600 mb-2">Asks</h4>
          <div className="space-y-1">
            {orders.asks.map((ask, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-red-600">
                  ${ask.price.toLocaleString()}
                </span>
                <span className="text-gray-600">{ask.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
