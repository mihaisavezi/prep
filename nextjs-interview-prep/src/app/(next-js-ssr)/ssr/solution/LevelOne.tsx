// app/products/page.tsx
interface Product {
  id: number;
  name: string;
  price: number;
}

export default async function ProductsPage() {
  const products: Product[] = [
    { id: 1, name: "Bitcoin", price: 45000 },
    { id: 2, name: "Ethereum", price: 3200 },
    { id: 3, name: "Cardano", price: 0.85 },
  ];

  return (
    <div>
      <header className="bg-white shadow-sm p-6">
        <h1 className="text-3xl font-bold">
          Level 1: Basic SSR with Static Data
        </h1>
      </header>
      <h1>Crypto Products</h1>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p>${product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const metadata = {
  title: "Crypto Products - Bitpanda",
  description: "Browse our selection of cryptocurrency products",
};
