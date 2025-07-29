import { describe, it, expect, beforeEach } from "vitest";
import { findLeaders, findLeadersNaive } from "./leaders-in-array.js";

describe("Leaders in Array - Find Leaders Algorithm", () => {
  describe("Basic Functionality Tests", () => {
    it("should find leaders in the classic example", () => {
      const input = [16, 17, 4, 3, 5, 2];
      const expected = [17, 5, 2];

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should handle single element array", () => {
      const input = [42];
      const expected = [42];

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should return empty array for empty input", () => {
      const input = [];
      const expected = [];

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should maintain original left-to-right order", () => {
      const input = [7, 10, 4, 3, 6, 5, 2];
      const expected = [10, 6, 5, 2];

      expect(findLeaders(input)).toEqual(expected);
    });
  });

  describe("Edge Cases", () => {
    it("should handle ascending array (only rightmost is leader)", () => {
      const input = [1, 2, 3, 4, 5];
      const expected = [5];

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should handle descending array (all are leaders)", () => {
      const input = [5, 4, 3, 2, 1];
      const expected = [5, 4, 3, 2, 1];

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should handle array with all equal elements", () => {
      const input = [3, 3, 3, 3, 3];
      const expected = [3]; // Only rightmost

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should handle array with duplicate leaders", () => {
      const input = [7, 7, 5, 5, 2, 2];
      const expected = [7, 5, 2]; // Only rightmost of each value

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should handle negative numbers", () => {
      const input = [-1, -5, -3, -2, -4];
      const expected = [-1, -2, -4];

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should handle mixed positive and negative numbers", () => {
      const input = [5, -2, 3, -1, 0];
      const expected = [5, 3, 0];

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should handle large numbers (32-bit integers)", () => {
      const input = [1000000000, 999999999, 1000000001, 500000000];
      const expected = [1000000001, 500000000];

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should handle alternating high-low pattern", () => {
      const input = [10, 1, 9, 2, 8, 3];
      const expected = [10, 9, 8, 3];

      expect(findLeaders(input)).toEqual(expected);
    });
  });

  describe("Boundary Conditions", () => {
    it("should handle two element array - first greater", () => {
      const input = [5, 3];
      const expected = [5, 3];

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should handle two element array - second greater", () => {
      const input = [3, 5];
      const expected = [5];

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should handle two equal elements", () => {
      const input = [4, 4];
      const expected = [4]; // Only rightmost

      expect(findLeaders(input)).toEqual(expected);
    });
  });

  describe("Complex Scenarios", () => {
    it("should handle array with no interior leaders", () => {
      const input = [1, 5, 2, 4, 3];
      const expected = [5, 4, 3];

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should handle mountain pattern", () => {
      const input = [1, 3, 6, 4, 2];
      const expected = [6, 4, 2];

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should handle valley pattern", () => {
      const input = [6, 2, 1, 4, 8];
      const expected = [8];

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should handle plateau patterns", () => {
      const input = [5, 5, 3, 3, 1, 1];
      const expected = [5, 3, 1];

      expect(findLeaders(input)).toEqual(expected);
    });
  });

  describe("Algorithm Correctness Verification", () => {
    it("should produce same results as naive O(n²) approach", () => {
      const testCases = [
        [16, 17, 4, 3, 5, 2],
        [1, 2, 3, 4, 5],
        [5, 4, 3, 2, 1],
        [7, 10, 4, 3, 6, 5, 2],
        [-1, -5, -3, -2, -4],
        [42],
        [],
        [3, 3, 3],
        [5, -2, 3, -1, 0],
      ];

      testCases.forEach((testCase) => {
        const optimizedResult = findLeaders([...testCase]);
        const naiveResult = findLeadersNaive([...testCase]);

        expect(optimizedResult).toEqual(naiveResult);
      });
    });

    it("should not modify the original array", () => {
      const original = [16, 17, 4, 3, 5, 2];
      const copy = [...original];

      findLeaders(original);

      expect(original).toEqual(copy);
    });
  });

  describe("Performance Tests", () => {
    it("should handle moderately large arrays efficiently", () => {
      // Create array: [1000, 999, 998, ..., 1] (all are leaders)
      const largeArray = Array.from({ length: 1000 }, (_, i) => 1000 - i);

      const startTime = performance.now();
      const result = findLeaders(largeArray);
      const endTime = performance.now();

      const duration = endTime - startTime;

      expect(result).toHaveLength(1000); // All elements are leaders
      expect(duration).toBeLessThan(10); // Should be very fast

      console.log(`Processed 1000 elements in ${duration.toFixed(2)}ms`);
    });

    it("should handle worst case scenario (ascending array)", () => {
      // Ascending array - only last element is leader
      const ascendingArray = Array.from({ length: 5000 }, (_, i) => i + 1);

      const startTime = performance.now();
      const result = findLeaders(ascendingArray);
      const endTime = performance.now();

      const duration = endTime - startTime;

      expect(result).toEqual([5000]); // Only last element
      expect(duration).toBeLessThan(5); // Should be fast even for worst case

      console.log(
        `Worst case (5000 elements) processed in ${duration.toFixed(2)}ms`
      );
    });

    it.skip("should be significantly faster than naive approach for large inputs", () => {
      const testArray = Array.from({ length: 1000 }, (_, i) =>
        Math.floor(Math.random() * 1000)
      );

      // Test optimized approach
      const optimizedStart = performance.now();
      const optimizedResult = findLeaders([...testArray]);
      const optimizedEnd = performance.now();

      // Test naive approach (smaller array to avoid timeout)
      const smallerArray = testArray.slice(0, 100);
      const naiveStart = performance.now();
      const naiveResult = findLeadersNaive([...smallerArray]);
      const naiveEnd = performance.now();

      const optimizedTime = optimizedEnd - optimizedStart;
      const naiveTime = naiveEnd - naiveStart;

      console.log(`Optimized (1000 elements): ${optimizedTime.toFixed(2)}ms`);
      console.log(`Naive (100 elements): ${naiveTime.toFixed(2)}ms`);

      // Optimized should be much faster even with 10x more data
      expect(optimizedTime).toBeLessThan(naiveTime * 2);
    });
  });

  describe("Data Type Edge Cases", () => {
    it("should handle floating point numbers", () => {
      const input = [3.5, 2.1, 4.7, 1.2];
      const expected = [4.7, 1.2];

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should handle very small differences", () => {
      const input = [1.0001, 1.0002, 1.0];
      const expected = [1.0002, 1.0];

      expect(findLeaders(input)).toEqual(expected);
    });

    it("should handle integer boundaries", () => {
      const input = [Number.MAX_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER, 0];
      const expected = [Number.MAX_SAFE_INTEGER, 0];

      expect(findLeaders(input)).toEqual(expected);
    });
  });

  describe("Input Validation", () => {

    it("should handle arrays with non-numeric values", () => {
      const input = [1, "2", 3, null, 5];

      // Depending on implementation, might need type coercion handling
      expect(() => findLeaders(input)).not.toThrow();
    });
  });
});
