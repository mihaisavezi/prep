// array of strings string[], group anagrams together




/**
 *
 * example input strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * output => [["bat"], ["nat", "tan"], ["ate", "tea", "eat"]]
 * 
 * 
 * 
 * v0.3-optimal
 * 
 * - create an array of 26 characters A...Z
 * 
 * "eat" => array representation looks like this 100010000...1...0 
 * - we have ones where the character exists
 * "tea" => array representation looks lke this 100010000...1...0
 * - same as "eat", because it uses the same letters
 * 
 * if this is the same we can use 100010000...1...0 as key to our object
 * 
 * {
 *  "100010000...1...0": ["eat", "tea"]
 * }
 * ""
 * 
 * "tan" => 1000...1...1...0
 * 
 * {
 * "100010000...1...0": ["eat", "tea"]
 * "1000...1...1...0": ["tan"]
 * }
 * 
 * ...
 * 
 * {
 *  ...:  ["eat", "tea"],
 *  ...: ["tan", "nat"]
 *  ...: ["bat"]
 * }
 * 
 * time complexity O(n*k)
 * k = max length of K
 * space complexity O(n*k)
 * n = n is number of strings in any given input
 * k = longest length of any given string
 */
 
function groupAnagrams(strs) {
  const res = {};
  for (let s of strs) {
      const count = new Array(26).fill(0);
      for (let c of s) {
          count[c.charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
      }
      const key = count.join('');
      if (!res[key]) {
          res[key] = [];
      }
      res[key].push(s);
  }
  console.log("🚀 ~ groupAnagrams ~ Object.values(res);:", res);
  return Object.values(res);
}

/** 
 * v0.2
 * anagramsArray = [];
 * sortedCharactersArray = []
 * 
 * iterate over elements
 * 
 * after one iteration
 * sortedCharactersArray = ["aet", "aet", "ant", "aet", "ant", "abt"];
 * 
 * we iterate again 
 * 
 * 1st iteration
 * "aet"
 * 
 * push element at index 0 from strs to anagramsArray => [[eat]]
 * check every element if === "aet" push element at index x from strs to anagramsArray => [[eat,tea,ate]]
 * 
 * 
 * time complexity: O(n*logn*k)
 * k = length of largest string
 * 
 * 
 * v0.1
 * anagramsArray = [];
 * 
 * iterate over elements
 * 
 * take 1st element currentAnagramArray = ["eat"];
 * base = currentAnagramArray[0];
 * 
 * start comparing to each other element
 * first check length;
 * => if base.length !== current.length => !isAnagram
 * => else create charactersArray = Array(26)
 *    iterate over characters
 *    and if at the end every character in charactersArray = 0, then current is anagram with base
 *    push current in currentAnagramArray
 * 
 * at the end of iteration of first character
 * ["eat", "tea", "ate"]
 * push that into anagrams array anagramsArray = [["eat", "tea", "ate"]]
 * 
 * ideas:
 * - take out from input array each element that gets pushed into anagrams array
 * 
 * at the end of first iteration
 * strs = ["tan", "nat", "bat"]
 * 
 * then
 * take 1st element currentAnagramArray = ["tan"];
 * base = currentAnagramArray[0];
 * 
 * 
 * ...
 * 
 * at the end of iteration of  character
 * ["tan", "nat"]
 * push that into anagrams array anagramsArray = [["eat", "tea", "ate"], ["tan", "nat"]]
 * 
 *  at the end of  iteration
 * strs = ["bat"]
 * 
 * strs.length = 1 => push strs to anagrams array 
 * [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
 *
 * 
 * 
 * 
 * 
 *
 *
 */

/**
 * youtube approach
 *  
 * 
 * 1)alt: sort each string, use as key to a hashmap, then add every anagram to that key
 * => return values of that object
 * 2)best: characterCount array, use it as key to hashmap
 * 
 * 
 * 
 */




// tests
console.log(
  `[ [ 'eat', 'tea', 'ate' ], [ 'tan', 'nat' ], [ 'bat' ] ]`,
  groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
);

