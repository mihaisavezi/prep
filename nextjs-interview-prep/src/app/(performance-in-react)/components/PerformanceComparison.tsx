// components/PerformanceComparison.tsx
"use client";

import React, { useState, useMemo, useCallback, memo } from "react";

// Child component WITHOUT React.memo
function ChildWithoutMemo({
  onClick,
  count,
  label,
}: {
  onClick: () => void;
  count: number;
  label: string;
}) {
  console.log(`${label} ChildWithoutMemo rendered`);
  return (
    <div className="p-4 border-2 border-red-200 rounded-lg mb-4 bg-red-50">
      <h4 className="font-semibold text-red-800 mb-2">Without React.memo</h4>
      <p className="mb-2">
        Count: <span className="font-bold">{count}</span>
      </p>
      <button
        onClick={onClick}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
      >
        Increment
      </button>
      <p className="text-xs text-red-600 mt-2">
        ⚠️ Re-renders on every parent update
      </p>
    </div>
  );
}

// Child component WITH React.memo
const ChildWithMemo = memo(function ChildWithMemo({
  onClick,
  count,
  label,
}: {
  onClick: () => void;
  count: number;
  label: string;
}) {
  console.log(`${label} ChildWithMemo rendered`);
  return (
    <div className="p-4 border-2 border-green-200 rounded-lg mb-4 bg-green-50">
      <h4 className="font-semibold text-green-800 mb-2">With React.memo</h4>
      <p className="mb-2">
        Count: <span className="font-bold">{count}</span>
      </p>
      <button
        onClick={onClick}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
      >
        Increment
      </button>
      <p className="text-xs text-green-600 mt-2">
        ✅ Only re-renders when props change
      </p>
    </div>
  );
});

// Expensive calculation function
function expensiveCalculation(num: number): number {
  console.log(`Running expensive calculation for ${num}`);
  let result = 0;
  // Simulate heavy computation
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(i) * (num + 1);
  }
  return Math.floor(result);
}

export default function PerformanceComparison() {
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [forceRender, setForceRender] = useState(0);

  // LEFT SIDE - WITHOUT useMemo/useCallback
  // Function recreated on every render
  const incrementLeft = () => {
    setLeftCount((prev) => prev + 1);
  };

  // Expensive calculation runs on every render
  const expensiveValueLeft = expensiveCalculation(leftCount);

  // RIGHT SIDE - WITH useMemo/useCallback
  // Function memoized with useCallback
  const incrementRight = useCallback(() => {
    setRightCount((prev) => prev + 1);
  }, []); // Empty dependency array - function never changes

  // Expensive calculation memoized with useMemo
  const expensiveValueRight = useMemo(() => {
    return expensiveCalculation(rightCount);
  }, [rightCount]); // Only recalculates when rightCount changes

  // Force re-render function to demonstrate the difference
  const triggerForceRender = () => {
    setForceRender((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          Performance Comparison: useMemo & useCallback
        </h1>
        <p className="text-gray-600 mb-4">
          Open DevTools Console to see the performance difference between
          optimized and non-optimized components.
        </p>

        {/* Force Re-render Button */}
        <div className="flex items-center space-x-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <button
            onClick={triggerForceRender}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-colors"
          >
            Force Parent Re-render ({forceRender})
          </button>
          <p className="text-sm text-yellow-700">
            Click this to see how child components behave when parent re-renders
            without state changes
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE - WITHOUT OPTIMIZATION */}
        <div className="space-y-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-800 mb-4">
              ❌ Without Optimization
            </h2>

            {/* Performance Issues */}
            <div className="mb-4 p-3 bg-red-100 rounded">
              <h3 className="font-semibold text-red-700 mb-2">
                Performance Issues:
              </h3>
              <ul className="text-sm text-red-600 space-y-1">
                <li>• Function recreated every render</li>
                <li>• Expensive calculation runs every render</li>
                <li>• Child re-renders unnecessarily</li>
              </ul>
            </div>

            {/* Child Component */}
            <ChildWithoutMemo
              onClick={incrementLeft}
              count={leftCount}
              label="LEFT"
            />

            {/* Expensive Calculation Result */}
            <div className="p-3 bg-white border border-red-200 rounded">
              <h4 className="font-semibold text-red-700 mb-2">
                Expensive Calculation Result:
              </h4>
              <p className="text-2xl font-bold text-red-800">
                {expensiveValueLeft.toLocaleString()}
              </p>
              <p className="text-xs text-red-600 mt-1">
                ⚠️ Recalculates on every render
              </p>
            </div>

            {/* Code Example */}
            <details className="mt-4">
              <summary className="cursor-pointer font-semibold text-red-700 hover:text-red-800">
                View Code (Click to expand)
              </summary>
              <pre className="mt-2 p-3 bg-red-100 rounded text-xs overflow-x-auto">
                {`// Function recreated every render
const incrementLeft = () => {
  setLeftCount(prev => prev + 1);
};

// Expensive calculation every render
const expensiveValueLeft = expensiveCalculation(leftCount);`}
              </pre>
            </details>
          </div>
        </div>

        {/* RIGHT SIDE - WITH OPTIMIZATION */}
        <div className="space-y-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              ✅ With Optimization
            </h2>

            {/* Performance Benefits */}
            <div className="mb-4 p-3 bg-green-100 rounded">
              <h3 className="font-semibold text-green-700 mb-2">
                Performance Benefits:
              </h3>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• Function memoized with useCallback</li>
                <li>• Expensive calculation memoized with useMemo</li>
                <li>• Child only re-renders when needed</li>
              </ul>
            </div>

            {/* Child Component */}
            <ChildWithMemo
              onClick={incrementRight}
              count={rightCount}
              label="RIGHT"
            />

            {/* Expensive Calculation Result */}
            <div className="p-3 bg-white border border-green-200 rounded">
              <h4 className="font-semibold text-green-700 mb-2">
                Expensive Calculation Result:
              </h4>
              <p className="text-2xl font-bold text-green-800">
                {expensiveValueRight.toLocaleString()}
              </p>
              <p className="text-xs text-green-600 mt-1">
                ✅ Only recalculates when count changes
              </p>
            </div>

            {/* Code Example */}
            <details className="mt-4">
              <summary className="cursor-pointer font-semibold text-green-700 hover:text-green-800">
                View Code (Click to expand)
              </summary>
              <pre className="mt-2 p-3 bg-green-100 rounded text-xs overflow-x-auto">
                {`// Function memoized with useCallback
const incrementRight = useCallback(() => {
  setRightCount(prev => prev + 1);
}, []); // Never changes

// Expensive calculation memoized
const expensiveValueRight = useMemo(() => {
  return expensiveCalculation(rightCount);
}, [rightCount]); // Only when rightCount changes`}
              </pre>
            </details>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">
          🧪 How to Test Performance Difference:
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-blue-700">
          <li>Open Browser DevTools Console</li>
          <li>Click "Force Parent Re-render" button multiple times</li>
          <li>
            Notice the console logs:
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li>
                Left side: Child re-renders and expensive calculation runs every
                time
              </li>
              <li>
                Right side: Child doesn't re-render, calculation doesn't run
              </li>
            </ul>
          </li>
          <li>
            Click the increment buttons to see when optimized calculations
            actually run
          </li>
          <li>Compare the performance difference in the console</li>
        </ol>
      </div>

      {/* Performance Metrics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <h4 className="font-semibold text-gray-700">Left Count</h4>
          <p className="text-2xl font-bold text-red-600">{leftCount}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <h4 className="font-semibold text-gray-700">Right Count</h4>
          <p className="text-2xl font-bold text-green-600">{rightCount}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <h4 className="font-semibold text-gray-700">Force Renders</h4>
          <p className="text-2xl font-bold text-yellow-600">{forceRender}</p>
        </div>
      </div>
    </div>
  );
}
