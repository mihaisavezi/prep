import { expect, describe, it } from 'vitest'
import { Tree, TreeNode, createTreeFromArray, treeToArray } from './neet-code-150-binary-tree-01.js'


describe("Tree Inversion", () => {
  const tree = new Tree();

  describe("recursive:", () => {
    it("should handle basic binary tree", () => {
      const input = [4, 2, 7, 1, 3, 6, 9];
      const expected = [4, 7, 2, 9, 6, 3, 1];
      const testTree = createTreeFromArray(input);

      const result = tree.invert({ root: testTree, method: "recursive" });
      expect(treeToArray(result)).toEqual(expected);
    });

    it("should handle single node tree", () => {
      const input = [1];
      const expected = [1];
      const testTree = createTreeFromArray(input);

      const result = tree.invert({ root: testTree, method: "recursive" });
      expect(treeToArray(result)).toEqual(expected);
    });

    it("should handle empty tree", () => {
      const result = tree.invert({ root: null, method: "recursive" });
      expect(result).toBeNull();
    });
  });

  describe("iterative", () => {
    it("should handle basic binary tree", () => {
      const input = [4, 2, 7, 1, 3, 6, 9];
      const expected = [4, 7, 2, 9, 6, 3, 1];
      const testTree = createTreeFromArray(input);

      const result = tree.invert({ root: testTree, method: "iterative" });
      expect(treeToArray(result)).toEqual(expected);
    });

    it("should handle single node tree", () => {
      const input = [1];
      const expected = [1];
      const testTree = createTreeFromArray(input);

      const result = tree.invert({ root: testTree, method: "iterative" });
      expect(treeToArray(result)).toEqual(expected);
    });

    it("should handle empty tree", () => {
      const result = tree.invert({ root: null, method: "iterative" });
      expect(result).toBeNull();
    });
  });
});
