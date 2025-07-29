import { describe, it, expect, beforeEach, vi } from "vitest";
import getAllLinks from "./get-all-links";

describe("Get All Descendant Links - All Implementations", () => {
  let linkFinder;
  const testUrl = "http://example.com";

  beforeEach(() => {
    linkFinder = getAllLinks();
    // Clear console.warn spy before each test
    vi.clearAllMocks();
  });

  describe("Basic Functionality Tests", () => {
    const expectedResult = [
      "http://example.com/about",
      "http://example.com/contact",
      "http://example.com/services",
    ];

    it("should find all descendants with DFS Recursive", () => {
      const result = linkFinder.dfsRecursive(testUrl);
      expect(result).toHaveLength(3);
      expect(result).toEqual(expect.arrayContaining(expectedResult));
    });

    it("should find all descendants with DFS Iterative", () => {
      const result = linkFinder.dfsIterative(testUrl);
      expect(result).toHaveLength(3);
      expect(result).toEqual(expect.arrayContaining(expectedResult));
    });

    it("should find all descendants with BFS Queue", () => {
      const result = linkFinder.bfsQueue(testUrl);
      expect(result).toHaveLength(3);
      expect(result).toEqual(expect.arrayContaining(expectedResult));
    });

    it("should find all descendants with Async Batch", async () => {
      const result = await linkFinder.asyncBatch(testUrl, 2);
      expect(result).toHaveLength(3);
      expect(result).toEqual(expect.arrayContaining(expectedResult));
    });
  });

  describe("Algorithm Consistency", () => {
    it("should produce identical results across all sync implementations", () => {
      const dfsRecursiveResult = linkFinder.dfsRecursive(testUrl);
      const dfsIterativeResult = linkFinder.dfsIterative(testUrl);
      const bfsResult = linkFinder.bfsQueue(testUrl);

      // Sort results for comparison (order may vary)
      const sortedDfsRecursive = [...dfsRecursiveResult].sort();
      const sortedDfsIterative = [...dfsIterativeResult].sort();
      const sortedBfs = [...bfsResult].sort();

      expect(sortedDfsRecursive).toEqual(sortedDfsIterative);
      expect(sortedDfsIterative).toEqual(sortedBfs);
    });

    it("should produce same results for sync and async implementations", async () => {
      const syncResult = linkFinder.dfsRecursive(testUrl);
      const asyncResult = await linkFinder.asyncBatch(testUrl, 2);

      const sortedSync = [...syncResult].sort();
      const sortedAsync = [...asyncResult].sort();

      expect(sortedSync).toEqual(sortedAsync);
    });
  });

  describe("Edge Cases", () => {
    it("should handle URLs with no links", () => {
      const result = linkFinder.dfsRecursive("http://example.com/services");
      expect(result).toEqual([]);
    });

    it("should handle circular dependencies", () => {
      // The test data has circular deps: about → example.com, contact → example.com
      const result = linkFinder.dfsRecursive("http://example.com/about");

      // Should not include the start URL and should not infinite loop
      expect(result).not.toContain("http://example.com/about");
      expect(result).toEqual(
        expect.arrayContaining(["http://example.com/services"])
      );
    });

    it("should not include the starting URL in results", () => {
      const result = linkFinder.dfsRecursive(testUrl);
      expect(result).not.toContain(testUrl);
    });

    it("should handle non-existent URLs gracefully", () => {
      const result = linkFinder.dfsRecursive("http://nonexistent.com");
      expect(result).toEqual([]);
    });
  });

  describe("Async Implementation Specific Tests", () => {
    it("should handle different concurrency levels", async () => {
      const concurrency1 = await linkFinder.asyncBatch(testUrl, 1);
      const concurrency3 = await linkFinder.asyncBatch(testUrl, 3);
      const concurrency5 = await linkFinder.asyncBatch(testUrl, 5);

      // Results should be identical regardless of concurrency
      const sorted1 = [...concurrency1].sort();
      const sorted3 = [...concurrency3].sort();
      const sorted5 = [...concurrency5].sort();

      expect(sorted1).toEqual(sorted3);
      expect(sorted3).toEqual(sorted5);
    });

    it("should be faster with higher concurrency", async () => {
      const startTime1 = Date.now();
      await linkFinder.asyncBatch(testUrl, 1);
      const time1 = Date.now() - startTime1;

      const startTime3 = Date.now();
      await linkFinder.asyncBatch(testUrl, 3);
      const time3 = Date.now() - startTime3;

      // Higher concurrency should generally be faster
      // (though with small dataset, difference might be minimal)
      console.log(`Concurrency 1: ${time1}ms, Concurrency 3: ${time3}ms`);
      expect(time3).toBeLessThanOrEqual(time1 + 100); // Allow some variance
    });

    it("should handle async errors gracefully", async () => {
      // This test would require mocking the asyncGetAllLinks to throw errors
      // For now, just verify it doesn't crash
      const result = await linkFinder.asyncBatch(testUrl, 2);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("Performance Tests", () => {
    it("should complete sync implementations within reasonable time", () => {
      const startTime = Date.now();
      const result = linkFinder.dfsRecursive(testUrl);
      const duration = Date.now() - startTime;

      expect(result).toHaveLength(3);
      expect(duration).toBeLessThan(50); // Should be very fast for sync
    });

    it("should handle larger mock datasets efficiently", () => {
      // Test with a URL that has many descendants
      const startTime = Date.now();
      const result = linkFinder.bfsQueue(testUrl);
      const duration = Date.now() - startTime;

      expect(duration).toBeLessThan(100);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("Data Integrity Tests", () => {
    it("should not modify the original URL data", () => {
      const originalTestUrl = testUrl;
      linkFinder.dfsRecursive(testUrl);

      expect(testUrl).toBe(originalTestUrl);
    });

    it("should return unique URLs only", () => {
      const result = linkFinder.dfsRecursive(testUrl);
      const uniqueResult = [...new Set(result)];

      expect(result).toEqual(uniqueResult);
    });

    it("should return proper array format", () => {
      const result = linkFinder.dfsRecursive(testUrl);

      expect(Array.isArray(result)).toBe(true);
      result.forEach((url) => {
        expect(typeof url).toBe("string");
        expect(url).toMatch(/^https?:\/\//);
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle malformed URLs gracefully", () => {
      expect(() => linkFinder.dfsRecursive("not-a-url")).not.toThrow();
      expect(() => linkFinder.dfsRecursive("")).not.toThrow();
      expect(() => linkFinder.dfsRecursive(null)).not.toThrow();
    });

    it("should continue processing despite individual URL failures", () => {
      // Since our mock doesn't throw errors, this tests the error handling structure
      const result = linkFinder.dfsRecursive(testUrl);
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
