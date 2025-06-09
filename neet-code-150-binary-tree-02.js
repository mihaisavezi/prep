/**
 * max depth binary tree
 * parcurg tree-ul pana la ultimii copii -> adica pana cand nodul meu nu are copii
 * si acolo 
 */

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper function to create trees from arrays (level-order)
function createTreeFromArray(arr) {
  if (!arr || arr.length === 0) return null;

  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();

    if (i < arr.length && arr[i] !== undefined) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;

    if (i < arr.length && arr[i] !== undefined) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }

  return root;
}

// Helper function to serialize tree back to array for easy comparison
function treeToArray(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();

    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }

  // Remove trailing nulls
  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}

// Pretty print tree structure
function printTree(root, prefix = "", isLast = true) {
  if (!root) return;

  console.log(prefix + (isLast ? "└── " : "├── ") + root.val);

  const children = [root.left, root.right].filter((child) => child !== null);
  children.forEach((child, index) => {
    const isLastChild = index === children.length - 1;
    const newPrefix = prefix + (isLast ? "    " : "│   ");
    printTree(child, newPrefix, isLastChild);
  });
}


class Tree {
  /**
   * @param {TreeNode} root
   * @return {TreeNode}
   */
  invert({root, method}) {
    if(!root) return null;
    if(method === 'recursive') {
      const right = this.invert({root:root.right, method:'recursive'});
      const left  = this.invert({root:root.left, method:'recursive'});

      root.right = left;
      root.left = right;

      return root
    } else if(method === 'iterative'){
      // Iterative approach using stack
      const stack = [root];

      while (stack.length > 0) {
        const node = stack.pop();

        // Swap children
        [node.left, node.right] = [node.right, node.left];

        // Add children to stack for processing
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
      }

      return root;
    }
  }

  getMaxDepth({node, method}) {
    if(method === 'recursive') {
      if(node === null ) return 0;
  
      const leftMax = this.getMaxDepth({node: node.left, method: 'recursive'});
      const rightMax = this.getMaxDepth({node: node.right, method: 'recursive'});
  
      return Math.max(leftMax, rightMax) + 1
    } else if (method === 'stack') {
      const stack = [[node, 1]];
      let result = 0

      while (stack.length > 0) {
        const [currentNode, depth] = stack.pop();
        if (currentNode !== null) {
          result = Math.max(result, depth);
          stack.push([currentNode.left, depth + 1]);
          stack.push([currentNode.right, depth + 1]);
        }
      }
      
      return result;
    }

  }
}
export { Tree, TreeNode, createTreeFromArray, treeToArray, printTree };

