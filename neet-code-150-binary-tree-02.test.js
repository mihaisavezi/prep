import { expect, describe, it } from 'vitest'
import { Tree, createTreeFromArray, treeToArray } from './neet-code-150-binary-tree-02.js'


describe("Tree Maximum depth", () => {
  const tree = new Tree();

  describe("recursive:", () => {
    it("should handle basic binary tree", () => {
      const input = [1, 2, 3, null, null, 4];
      const expected = 3
      const testTree = createTreeFromArray(input);

      const result = tree.getMaxDepth({node: testTree, method: "recursive"});
      expect(result).toEqual(expected);
    });
  });
  describe("stack:", () => {
    it("should handle basic binary tree", () => {
      const input = [1, 2, 3, null, null, 4];
      const expected = 3;
      const testTree = createTreeFromArray(input);

      const result = tree.getMaxDepth({node:testTree, method: "stack"});
      expect(result).toEqual(expected);
    });
  });
});
