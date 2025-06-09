// is palindrome
// if lowercase letters and removing all non alpha numeric characters
// the characters are in the same order if you read ltr or rtl
// eg. "was it a car or a cat I saw"






/**
 *
 * isPalindrome(text)
 * example input text = "was it a car or a cat I saw"
 * output => true
 * 
 * 
 * 
 * v0.1
 * 
 * cleanText = "wasitacaroracatisaw"
 * 
 * startIndex++
 * endIndex--
 * 
 * compare each character until startIndex>endIndex
 * 
 * 
 * complexity
 * 
 * time O(n)
 * space O(n)
 * 
 */
 
function isPalindrome(text) {
  const cleanText = text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  let startIndex = 0;
  let endIndex = cleanText.length - 1;
  let isPalindrome = true

  while (startIndex < endIndex && isPalindrome) {
      if (cleanText[startIndex] !== cleanText[endIndex]) {
         isPalindrome = false;
      }
      startIndex++;
      endIndex--;
  }
  return isPalindrome;
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
 * 1) create duplicate reverse string, iterate again to compare characters
 * 
 * 2) v0.1
 * 
 * 
 * 
 */




// tests
console.log('true', isPalindrome("was it a car or a cat I saw"));
console.log('false', isPalindrome("race a car"));

