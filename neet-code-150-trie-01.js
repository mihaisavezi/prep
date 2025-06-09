/**
 * 
 * 
 * A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.


Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True

 */


class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}


class Trie {
  constructor() {
    this.root = new TrieNode();
  }


  insert(word) {
    let node = this.root


    for(let char of word) {
      if(!node.children[char]) {
        node.children[char] = new TrieNode()
      }

      node = node.children[char];
    }

    node.isEndOfWord = true;
  }


  search(word) {
    let node = this.root

    for(let char of word) {
      if (!node.children[char]) {
        return false
      }

      node = node.children[char];
    }

    return true;
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
}

const niceTrie = new Trie();
niceTrie.insert("cat");
niceTrie.insert("cab");
niceTrie.insert("cattle");
niceTrie.insert("cabin");

console.log(`niceTrie.search("cabbage") -> false = `, niceTrie.search("cabbage"));
console.log(`niceTrie.search("cat") -> true = `, niceTrie.search("cat"));

console.log(
  `niceTrie.startsWith("cabbage") -> false = `,
  niceTrie.startsWith("cabbage")
);
console.log(
  `niceTrie.startsWith("cat") -> true = `,
  niceTrie.startsWith("cat")
);
