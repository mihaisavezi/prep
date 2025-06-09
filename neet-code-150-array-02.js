// s, t
// is t anagram of s -> true
// otherwise -> false

/**
 *
 * s = rat; t = ram
 * s = cat; t = tac
 *
 * check if length is equal
 *
 * create an object -> key = character; value = [count char in s, count char in t]
 * at the end every key needs to have the same value for value[0] and value[1]
 *
 *
 *
 *
 */

/**
 * youtube approach
 *
 * 1) Brute force -> iterate over each character in s, check against every character in t -> O(n^2)
 * 2) check for length; if anagram frequency of words is the same -> solution hashmap or array -> we have an array of 26 characters (eng alphabet)
 *    iterate over s, t with same loop ->
 *
 *
 *    charArray = [0,0...0]
 *
 *    charIndexforS = (s.charAt(i) - 'a')
 *    charIndexforT = (t.charAt(i) - 'a')
 *
 *    charArray[charIndexforS]++;
 *    charArray[charIndexforT]--;
 *
 *    -----
 *
 *    after this iterate over CharArray, if any value is different than 0; then !isAnagram; otherwise isAnagram
 *
 *
 *
 *
 *     complexity: time O(n); space O(1) = 26 chars
 *
 */

function isAnagram(source, dest) {
  if (source.length !== dest.length) return false;

  let isAnagram = true;
  let charCountArray = new Array(26).fill(0);

  for (let i = 0; i < dest.length; i++) {
    charCountArray[source.charCodeAt(i) % 26]++;
    charCountArray[dest.charCodeAt(i) % 26]--;
  }


  for (let i = 0; i < charCountArray.length; i++) {
    if(charCountArray[i] !== 0) {
      isAnagram = false;
      break;
    }
  }


  return isAnagram;
}

// tests
console.log("true", isAnagram("cat", "tca"));
console.log("false", isAnagram("banana", "ananac"));
console.log("true", isAnagram("cattle", "tactle"));

/**
 * s = cat ; t = tac
 *
 * check if length is equal
 *
 * start from end of t, character by character
 * and compare with characters starting from first s character
 *
 */

// 0.1
// WRONG - solved for palindrom
function isPalindrome(source, dest) {
  if (source.length !== dest.length) return false;

  let isPalindrome = true;

  for (let i = 0; i < dest.length; i++) {
    if (dest[i] !== source[source.length - 1 - i]) {
      isPalindrome = false;
      break;
    }
  }

  return isPalindrome;
}

/**
 * youtube approach
 *
 * 1) Brute force -> O(n)^2
 * 2) Sorting -> O(n*logn)
 * 3) keep track of elements, access them quickly -> Hashset
 *      time: 0(n); space: 0(n)
 */

// tests
console.log("isPalindrome");
console.log("true", isPalindrome("cat", "tac"));
console.log("false", isPalindrome("banana", "ananac"));
