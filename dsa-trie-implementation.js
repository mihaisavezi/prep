// trie node

class TrieNode {

  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }

}

// Trie structure
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;

    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }

    node.isEndOfWord = true;
  }

  find(word) {
    let node = this.root;

    for (const char of word) {
      if(node.isEndOfWord) {
        return true
      }
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }

    return node.isEndOfWord;
  }

  startsWith(prefix) {
    let node = this.root;

    for (const char of prefix) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }

    return true;
  }

  getAllWordsWithPrefix(prefix) {
    let node = this.root;
    const words = [];

    for (const char of prefix) {
      if (!node.children[char]) {
          return [];
        }
        node = node.children[char];
    }
    // we reached the end of the prefix traversal;
    
    const stack = [[node, prefix]];

    while (stack.length > 0) {
      console.log("🚀 ~ Trie ~ getAllWordsWithPrefix ~ stack:", stack)
      const [currentNode, currentWord] = stack.pop();
      console.log("🚀 outed from the stack", [currentNode, currentWord])
      if (currentNode.isEndOfWord) {
        words.push(currentWord);
      }

      for (const char in currentNode.children) {
        stack.push([currentNode.children[char], currentWord + char]);
      }
    }

    return words;
  }

  /**
   * Prints the trie structure in a tree format.
   */
  printTrie() {
    console.log("Trie Structure:");
    this._printNode(this.root, "", "root");
  }

  /**
   * Helper to recursively print nodes with indentation.
   * @param {TrieNode} node Current node.
   * @param {string} indent Current indentation level.
   * @param {string} char Character this node represents.
   */
  _printNode(node, indent, char) {
    const marker = node.isEndOfWord ? " (END)" : "";
    console.log(`${indent}${char}${marker}`);

    const children = Object.keys(node.children).sort();
    children.forEach((childChar, index) => {
      const isLast = index === children.length - 1;
      const newIndent = indent + (isLast ? "  " : "│ ");
      const prefix = isLast ? "└─" : "├─";

      this._printNode(node.children[childChar], newIndent, prefix + childChar);
    });
  }
}


const niceTrie = new Trie();
niceTrie.insert("cat");
niceTrie.insert("cab");
niceTrie.insert("cattle");
niceTrie.insert("cabin");


console.log(`niceTrie.find("cabbage") -> false = `, niceTrie.find("cabbage"));
console.log(`niceTrie.find("cat") -> true = `, niceTrie.find("cat"));


console.log(`niceTrie.startsWith("cabbage") -> false = `, niceTrie.startsWith("cabbage"));
console.log(`niceTrie.startsWith("cat") -> true = `, niceTrie.startsWith("cat"));

console.log("Words starting with 'ca':", niceTrie.getAllWordsWithPrefix("ca"));

niceTrie.printTrie();
console.log(niceTrie);


const trie = new Trie();
trie.insert("apple");
trie.find("apple");   // return True
trie.find("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.find("app");     // return True

