"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdvancedPerformanceDashboard from "../components/AdvancedPerformanceDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

export default function Level5PerformancePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdvancedPerformanceDashboard />
    </QueryClientProvider>
  );
}
