// components/ClientErrorBoundary.tsx
"use client";

import { ErrorBoundary } from "react-error-boundary";
import { type ReactNode, useState, startTransition } from "react";
import { useRouter } from "next/navigation";

interface MarketErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function MarketErrorFallback({
  error,
  resetErrorBoundary,
}: MarketErrorFallbackProps) {
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter()

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    resetErrorBoundary();
  };

  const handleRetryWithServer = () => {
    startTransition(() => {
        setRetryCount((prev) => prev + 1);
        router.refresh()
        resetErrorBoundary()
    })
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="text-red-600 mb-4">
        <svg
          className="w-12 h-12 mx-auto mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Market data temporarily unavailable
      </h3>
      <p className="text-red-600 mb-4">
        We're experiencing issues loading market data.
      </p>

      {retryCount > 0 && (
        <div className="text-sm text-red-500 mb-3">
          Retry attempts: {retryCount}
        </div>
      )}

      <div className="space-x-2">
        <button
          onClick={handleRetry}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          Try Again
        </button>
        <button
          onClick={handleRetryWithServer}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          Try Again with Server
        </button>
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          Refresh Page
        </button>
      </div>

      <details className="mt-4 text-left">
        <summary className="cursor-pointer text-red-700 font-medium">
          Error details
        </summary>
        <pre className="mt-2 text-xs bg-red-100 p-2 rounded text-red-800 overflow-auto">
          {error.message}
        </pre>
      </details>
    </div>
  );
}

function SidebarErrorFallback({
  error,
  resetErrorBoundary,
}: MarketErrorFallbackProps) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
      <div className="text-yellow-600 mb-2">
        <svg
          className="w-8 h-8 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h4 className="text-yellow-800 font-medium mb-2">Section unavailable</h4>
      <p className="text-sm text-yellow-700 mb-3">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
      >
        Retry
      </button>
    </div>
  );
}

interface ClientErrorBoundaryProps {
  children: ReactNode;
  fallbackType?: "market" | "sidebar";
}

export default function ClientErrorBoundary({
  children,
  fallbackType = "market",
}: ClientErrorBoundaryProps) {
  const FallbackComponent =
    fallbackType === "market" ? MarketErrorFallback : SidebarErrorFallback;

  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={(error, errorInfo) => {
        // Log errors for monitoring
        console.error("Error Boundary caught an error:", error);
        console.error("Error Info:", errorInfo);

        // In production, you'd send this to your error monitoring service
        // Example: Sentry.captureException(error, { extra: errorInfo });
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
