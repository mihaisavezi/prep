// app/products/page.tsx
interface Product {
  id: number;
  name: string;
  price: number;
}

// This runs on the server for each request
export default async function ProductsPage() {
  // Simulate fetching data (could be from database, API, etc.)
  const products: Product[] = [
    { id: 1, name: "Bitcoin", price: 45000 },
    { id: 2, name: "Ethereum", price: 3200 },
    { id: 3, name: "Cardano", price: 0.85 },
  ];

  return (
    <div>
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

// Optional: Add metadata for SEO
export const metadata = {
  title: "Crypto Products - Bitpanda",
  description: "Browse our selection of cryptocurrency products",
};
