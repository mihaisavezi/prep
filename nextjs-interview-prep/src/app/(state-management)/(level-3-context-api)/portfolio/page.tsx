import { PortfolioProvider } from "../_contexts/PortfolioContext";
import PortfolioList from "../components/PortfolioList";
import PortfolioSummary from "../components/PortfolioSummary";

export default function PortfolioPage() {
  return (
    <PortfolioProvider>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">My Portfolio</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PortfolioSummary />
          <PortfolioList />
        </div>
      </div>
    </PortfolioProvider>
  );
}
