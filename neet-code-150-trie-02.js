/**
 * 
 * 
Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the WordDictionary class:

WordDictionary() Initializes the object.
void addWord(word) Adds word to the data structure, it can be matched later.
bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.

 */


class TrieNode {
  constructor() {
      this.children = {}
      this.isEndOfWord = false;
  }
}

var WordDictionary = function() {
  this.root = new TrieNode();
};

/** 
* @param {string} word
* @return {void}
*/
WordDictionary.prototype.addWord = function(word) {
  let node = this.root;

  for(let char of word) {
      if(!node.children[char]) {
          node.children[char] = new TrieNode()
      }

      node = node.children[char]
  }

  node.isEndOfWord = true;
};

/** 
* @param {string} word
* @return {boolean}
*/
WordDictionary.prototype.search = function(word) {
  return this.searchHelper(word, 0, this.root);
};

WordDictionary.prototype.search = function (word) {
  let node = this.root
  let stack = [[node, 0]];

  while(stack.length > 0) {
    const [currentNode, currentIndex] = stack.pop();

    if (currentIndex === word.length) {
      return currentNode.isEndOfWord;
    }

    const char = word[currentIndex];

    if(char === '.') {
      for(let childChar in currentNode.children) {
        stack.push([currentNode.children[childChar], currentIndex + 1]);
      }
    } else {
      if(currentNode.children[char]) {
        stack.push([currentNode.children[char], currentIndex + 1]);
      }
    }

  }

  return false;
};

// recursive
WordDictionary.prototype.searchHelper = function (word, index, node) {
  // Base case: reached end of word
  if (index === word.length) {
    return node.isEndOfWord;
  }

  const char = word[index];

  if (char === ".") {
    // Wildcard: try all possible children
    for (let childChar in node.children) {
      if (this.searchHelper(word, index + 1, node.children[childChar])) {
        return true;
      }
    }
    return false;
  } else {
    // Regular character: follow specific path
    if (!node.children[char]) {
      return false;
    }
    return this.searchHelper(word, index + 1, node.children[char]);
  }
};


/** 
* Your WordDictionary object will be instantiated and called as such:
* var obj = new WordDictionary()
* obj.addWord(word)
* var param_2 = obj.search(word)
*/

const  wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
console.log(`🚀 ~ wordDictionary.search("pad"):`, wordDictionary.search("pad"))
wordDictionary.search("bad"); // return True
console.log(`🚀 ~ wordDictionary.search("bad"):`, wordDictionary.search("bad"))
wordDictionary.search(".ad"); // return True
console.log(`🚀 ~ wordDictionary.search(".ad"):`, wordDictionary.search(".ad"))
wordDictionary.search("b.."); // return True
console.log(`🚀 ~ wordDictionary.search("b.."):`, wordDictionary.search("b.."))


class WordDictionaryVisualised {
  constructor() {
    this.root = new TrieNode();
    this.debugMode = true; // Toggle for visualization
  }
  
  addWord(word) {
    let node = this.root;

    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }

      node = node.children[char];
    }

    node.isEndOfWord = true;
  }

  // Enhanced search with visualization
  search(word, debug = false) {
    this.debugMode = debug;
    let stack = [[this.root, 0]];
    let stepCount = 0;

    if (debug) {
      console.log(`\n🔍 Searching for: "${word}"`);
      console.log("=".repeat(40));
    }

    while (stack.length > 0) {
      if (debug) {
        stepCount++;
        this.visualizeSearchStep(stack, word, stepCount);
      }

      const [currentNode, currentIndex] = stack.pop();

      if (currentIndex === word.length) {
        if (currentNode.isEndOfWord) {
          if (debug) console.log("✅ FOUND MATCH!");
          return true;
        }
        if (debug) console.log("❌ Reached end but not a word, continuing...");
        continue;
      }

      const char = word[currentIndex];

      if (char === ".") {
        if (debug) console.log(`🔀 Wildcard '.' at position ${currentIndex}`);
        for (let childChar in currentNode.children) {
          stack.push([currentNode.children[childChar], currentIndex + 1]);
          if (debug) console.log(`   ➕ Added path for '${childChar}'`);
        }
      } else {
        if (currentNode.children[char]) {
          stack.push([currentNode.children[char], currentIndex + 1]);
          if (debug) console.log(`➡️  Following path for '${char}'`);
        } else {
          if (debug) console.log(`🚫 No path for '${char}', dead end`);
        }
      }
    }

    if (debug) console.log("❌ No match found");
    return false;
  }

  visualizeSearchStep(stack, word, stepCount) {
    console.log(`\nStep ${stepCount}:`);
    console.log("┌─────────────────────────────────┐");
    console.log("│           STACK STATE           │");
    console.log("├─────────────────────────────────┤");

    if (stack.length === 0) {
      console.log("│            (empty)              │");
    } else {
      for (let i = stack.length - 1; i >= 0; i--) {
        const [node, index] = stack[i];
        const children = Object.keys(node.children);
        const endMarker = node.isEndOfWord ? " [END]" : "";
        const nextChar = index < word.length ? word[index] : "EOF";

        let nodeDesc = children.length > 0 ? `{${children.join(",")}}` : "leaf";
        let line = `│ pos:${index} next:'${nextChar}' ${nodeDesc}${endMarker}`;
        line += " ".repeat(Math.max(0, 33 - line.length + 2)) + "│";
        console.log(line);

        if (i > 0) console.log("├─────────────────────────────────┤");
      }
    }
    console.log("└─────────────────────────────────┘");
  }

  // Helper method to visualize the entire trie structure
  visualizeTrie() {
    console.log("\n🌳 TRIE STRUCTURE:");
    console.log("==================");
    this.printTrieNode(this.root, "", true);
  }

  printTrieNode(node, prefix, isLast) {
    const marker = node.isEndOfWord ? " [WORD]" : "";
    console.log(prefix + (isLast ? "└── " : "├── ") + "•" + marker);

    const children = Object.keys(node.children);
    children.forEach((char, index) => {
      const isLastChild = index === children.length - 1;
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      console.log(newPrefix + (isLastChild ? "└── " : "├── ") + char);
      this.printTrieNode(
        node.children[char],
        newPrefix + (isLastChild ? "    " : "│   "),
        true
      );
    });
  }
}

const wordDictionaryVis = new WordDictionaryVisualised();
wordDictionaryVis.addWord("bad");
wordDictionaryVis.addWord("dad");
wordDictionaryVis.addWord("mad");
// wordDictionaryVis.search("pad", true); // return False
// wordDictionaryVis.search("bad", true); // return True
wordDictionaryVis.search(".ad", true); // return True
wordDictionaryVis.search("b..", true); // return True
