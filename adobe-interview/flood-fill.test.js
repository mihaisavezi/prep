import { describe, it, expect, beforeEach } from "vitest";
import { floodFill as floodFillIterativeStack, floodFillBFS } from "./flood-fill";

describe("Flood Fill iterative stack", () => {
  let testImage;

  beforeEach(() => {
    testImage = [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ];
  });

  describe("Basic Functionality", () => {
    it("should fill connected cells with new color", () => {
      const result = floodFillIterativeStack(testImage, 1, 1, 2);

      expect(result).toEqual([
        [2, 2, 2],
        [2, 2, 0],
        [2, 0, 1],
      ]);
    });

    it("should not modify original array when cloned", () => {
      const original = testImage;
      floodFillIterativeStack(testImage, 1, 1, 2);

      expect(testImage).toEqual(original);
    });

    it("should return the modified image", () => {
      const input = testImage;
      const result = floodFillIterativeStack(input, 1, 1, 2);

      expect(result).toBe(input); // Same reference
    });
  });

  describe("Edge Cases", () => {
    it("should handle same color fill (no change)", () => {
      const result = floodFillIterativeStack(testImage, 1, 1, 1);

      expect(result).toEqual(testImage);
    });

    it("should handle single pixel image", () => {
      const singlePixel = [[5]];
      const result = floodFillIterativeStack(singlePixel, 0, 0, 3);

      expect(result).toEqual([[3]]);
    });

    it("should handle disconnected regions", () => {
      const disconnected = [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
      ];

      const result = floodFillIterativeStack(disconnected, 0, 0, 2);

      expect(result).toEqual([
        [2, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
      ]);
    });

    it("should fill entire grid if all same color", () => {
      const uniform = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ];

      const result = floodFillIterativeStack(uniform, 1, 1, 2);

      expect(result).toEqual([
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ]);
    });
  });

  describe("Boundary Conditions", () => {
    it("should handle top-left corner start", () => {
      const result = floodFillIterativeStack(testImage, 0, 0, 2);

      expect(result).toEqual([
        [2, 2, 2],
        [2, 2, 0],
        [2, 0, 1],
      ]);
    });

    it("should handle bottom-right corner start", () => {
      const result = floodFillIterativeStack(testImage, 2, 2, 2);

      expect(result).toEqual([
        [1, 1, 1],
        [1, 1, 0],
        [1, 0, 2],
      ]);
    });

    it("should handle isolated pixel", () => {
      const isolated = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];

      const result = floodFillIterativeStack(isolated, 1, 1, 2);

      expect(result).toEqual([
        [0, 0, 0],
        [0, 2, 0],
        [0, 0, 0],
      ]);
    });
  });
});

describe("Flood Fill BFS", () => {
  let testImage;

  beforeEach(() => {
    testImage = [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ];
  });

  describe("Basic Functionality", () => {
    it("should fill connected cells with new color", () => {
      const result = floodFillBFS(testImage, 1, 1, 2);

      expect(result).toEqual([
        [2, 2, 2],
        [2, 2, 0],
        [2, 0, 1],
      ]);
    });

    it("should not modify original array when cloned", () => {
      const original = testImage;
      floodFillBFS(testImage, 1, 1, 2);

      expect(testImage).toEqual(original);
    });

    it("should return the modified image", () => {
      const input = testImage;
      const result = floodFillBFS(input, 1, 1, 2);

      expect(result).toBe(input); // Same reference
    });
  });

  describe("Edge Cases", () => {
    it("should handle same color fill (no change)", () => {
      const result = floodFillBFS(testImage, 1, 1, 1);

      expect(result).toEqual(testImage);
    });

    it("should handle single pixel image", () => {
      const singlePixel = [[5]];
      const result = floodFillBFS(singlePixel, 0, 0, 3);

      expect(result).toEqual([[3]]);
    });

    it("should handle disconnected regions", () => {
      const disconnected = [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
      ];

      const result = floodFillBFS(disconnected, 0, 0, 2);

      expect(result).toEqual([
        [2, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
      ]);
    });

    it("should fill entire grid if all same color", () => {
      const uniform = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ];

      const result = floodFillBFS(uniform, 1, 1, 2);

      expect(result).toEqual([
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ]);
    });
  });

  describe("Boundary Conditions", () => {
    it("should handle top-left corner start", () => {
      const result = floodFillBFS(testImage, 0, 0, 2);

      expect(result).toEqual([
        [2, 2, 2],
        [2, 2, 0],
        [2, 0, 1],
      ]);
    });

    it("should handle bottom-right corner start", () => {
      const result = floodFillBFS(testImage, 2, 2, 2);

      expect(result).toEqual([
        [1, 1, 1],
        [1, 1, 0],
        [1, 0, 2],
      ]);
    });

    it("should handle isolated pixel", () => {
      const isolated = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];

      const result = floodFillBFS(isolated, 1, 1, 2);

      expect(result).toEqual([
        [0, 0, 0],
        [0, 2, 0],
        [0, 0, 0],
      ]);
    });
  });
});
