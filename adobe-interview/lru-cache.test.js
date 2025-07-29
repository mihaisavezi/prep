import { describe, it, expect, beforeEach } from "vitest";
import LRUCache from "./lru-cache.js";

describe("LRU Cache - Core Functionality", () => {
  let cache;

  beforeEach(() => {
    cache = new LRUCache(3);
  });

  describe("Basic Operations", () => {
    it("should return -1 for missing keys", () => {
      expect(cache.get("nonexistent")).toBe(-1);
    });

    it("should store and retrieve values", () => {
      cache.put("a", 1);
      expect(cache.get("a")).toBe(1);
    });

    it("should update existing keys", () => {
      cache.put("a", 1);
      cache.put("a", 2);
      expect(cache.get("a")).toBe(2);
      expect(cache.size()).toBe(1);
    });

    it("should maintain insertion order when under capacity", () => {
      cache.put("a", 1);
      cache.put("b", 2);
      cache.put("c", 3);

      expect(cache.keys()).toEqual(["c", "b", "a"]);
    });
  });

  describe("LRU Eviction", () => {
    it("should evict least recently used item when over capacity", () => {
      cache.put("a", 1);
      cache.put("b", 2);
      cache.put("c", 3);
      cache.put("d", 4); // Should evict 'a'

      expect(cache.get("a")).toBe(-1);
      expect(cache.get("b")).toBe(2);
      expect(cache.get("c")).toBe(3);
      expect(cache.get("d")).toBe(4);
    });

    it("should move accessed items to front", () => {
      cache.put("a", 1);
      cache.put("b", 2);
      cache.put("c", 3);

      cache.get("a"); // Move 'a' to front
      cache.put("d", 4); // Should evict 'b' (not 'a')

      expect(cache.get("a")).toBe(1);
      expect(cache.get("b")).toBe(-1);
      expect(cache.get("c")).toBe(3);
      expect(cache.get("d")).toBe(4);
    });

    it("should handle rapid alternation correctly", () => {
      cache.put("a", 1);
      cache.put("b", 2);
      cache.put("c", 3);

      // Alternate between a and b
      for (let i = 0; i < 10; i++) {
        cache.get("a");
        cache.get("b");
      }

      cache.put("d", 4); // Should evict 'c'
      expect(cache.get("c")).toBe(-1);
      expect(cache.keys()).toEqual(["d", "b", "a"]);
    });
  });
});

describe("LRU Cache - Edge Cases", () => {
  describe("Capacity Edge Cases", () => {
    it("should handle capacity of 0", () => {
      const cache = new LRUCache(0);

      cache.put("a", 1);
      expect(cache.get("a")).toBe(-1);
      expect(cache.size()).toBe(0);
    });

    it("should handle capacity of 1", () => {
      const cache = new LRUCache(1);

      cache.put("a", 1);
      expect(cache.get("a")).toBe(1);

      cache.put("b", 2);
      expect(cache.get("a")).toBe(-1);
      expect(cache.get("b")).toBe(2);
      expect(cache.size()).toBe(1);
    });

    it("should handle large capacity", () => {
      const cache = new LRUCache(10000);

      // Fill to capacity
      for (let i = 0; i < 10000; i++) {
        cache.put(i, i * 2);
      }
      expect(cache.size()).toBe(10000);

      // Trigger eviction
      cache.put(10000, 20000);
      expect(cache.size()).toBe(10000);
      expect(cache.get(0)).toBe(-1); // First item evicted
      expect(cache.get(10000)).toBe(20000);
    });
  });

  describe("Data Type Handling", () => {
    let cache;

    beforeEach(() => {
      cache = new LRUCache(3);
    });

    it("should handle various key types", () => {
      cache.put(1, "number key");
      cache.put("string", "string key");
      cache.put(null, "null key");

      expect(cache.get(1)).toBe("number key");
      expect(cache.get("string")).toBe("string key");
      expect(cache.get(null)).toBe("null key");
    });

    it("should handle various value types", () => {
      cache.put("null", null);
      cache.put("undefined", undefined);
      cache.put("object", { a: 1 });
      cache.put("array", [1, 2, 3]);

      expect(cache.get("null")).toBe(-1);
      expect(cache.get("undefined")).toBe(undefined);
      expect(cache.get("object")).toEqual({ a: 1 });
      expect(cache.get("array")).toEqual([1, 2, 3]);
    });

    it("should maintain object references", () => {
      const obj = { value: 1 };
      cache.put("obj", obj);

      const retrieved = cache.get("obj");
      expect(retrieved).toBe(obj); // Same reference

      retrieved.value = 2;
      expect(cache.get("obj").value).toBe(2);
    });
  });

  describe("Boundary Conditions", () => {
    it("should handle exact capacity operations", () => {
      const cache = new LRUCache(2);

      cache.put("a", 1);
      cache.put("b", 2);
      expect(cache.size()).toBe(2);

      // Update existing - should not evict
      cache.put("a", 10);
      expect(cache.size()).toBe(2);
      expect(cache.get("b")).toBe(2);

      // Add new - should evict
      cache.put("c", 3);
      expect(cache.size()).toBe(2);
      expect(cache.get("a")).toBe(-1);
    });

    it("should handle empty operations", () => {
      const cache = new LRUCache(3);

      expect(cache.get("missing")).toBe(-1);
      expect(cache.keys()).toEqual([]);
      expect(cache.size()).toBe(0);
    });
  });
});
