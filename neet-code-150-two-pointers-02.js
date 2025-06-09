/**
 * given string s, find the length of longest substring without repeating characters
 * 
 * eg. s = "abcabcbb"
 * 
 * => 3 = "abc"
 * 
 * e.g s = "pwwkew"
 * 
 * => 3 = "wke"
  Algorithm: Longest Substring Without Repeating Characters (Sliding Window)

  Objective: Find the length of the longest substring in string 's'
             that contains no repeating characters.

  Example: s = "pwwkew" -> Expected output: 3 (for "wke" or "kew")

  Key Data Structures:
    - start:      Pointer to the beginning of the current window (substring).
    - end:        Pointer to the end of the current window. It iterates through the string.
    - maxLength:  Stores the maximum length found so far.
    - charMap:    A map (or dictionary) to store characters and their last seen indices
                  within the current window. Format: { character: index }

  Visual Walkthrough with s = "pwwkew":

  Initial State:
  s = "p  w  w  k  e  w"
       ^                 (end = 0)
       ^                 (start = 0)
  charMap = {}
  maxLength = 0

  ------------------------------------------------------------------------------------
  Iteration 1: end = 0, currentChar = 'p'
  ------------------------------------------------------------------------------------
  s = "p  w  w  k  e  w"
       ^ (end)
       ^ (start)
  Window: "p"

  1. 'p' not in charMap.
  2. charMap['p'] = 0;               => charMap = {'p': 0}
  3. currentLength = end - start + 1 = 0 - 0 + 1 = 1
  4. maxLength = max(0, 1) = 1

  ------------------------------------------------------------------------------------
  Iteration 2: end = 1, currentChar = 'w'
  ------------------------------------------------------------------------------------
  s = "p  w  w  k  e  w"
          ^ (end)
       ^ (start)
  Window: "pw"

  1. 'w' not in charMap.
  2. charMap['w'] = 1;               => charMap = {'p': 0, 'w': 1}
  3. currentLength = end - start + 1 = 1 - 0 + 1 = 2
  4. maxLength = max(1, 2) = 2

  ------------------------------------------------------------------------------------
  Iteration 3: end = 2, currentChar = 'w' (DUPLICATE!)
  ------------------------------------------------------------------------------------
  s = "p  w  w  k  e  w"
             ^ (end)
       ^ (start)
  Window was "pww" before adjustment. Current char 'w' is a duplicate.

  1. 'w' IS in charMap. charMap['w'] is 1.
  2. Condition: charMap['w'] (which is 1) >= start (which is 0) -> TRUE.
     This means the previous 'w' is INSIDE our current window "pw".
  3. Adjust start: start = charMap['w'] + 1 = 1 + 1 = 2.
     The window slides. `start` moves past the old 'w'.
  s = "p  w  w  k  e  w"
             ^ (end)
             ^ (start) - new position
  Window: "w" (the second 'w')

  4. Update charMap for the new 'w': charMap['w'] = 2 (current end index)
                                     => charMap = {'p': 0, 'w': 2}
     (Note: 'p':0 is still in charMap but it's "before" `start`, so it's ignored for now)
  5. currentLength = end - start + 1 = 2 - 2 + 1 = 1
  6. maxLength = max(2, 1) = 2

  ------------------------------------------------------------------------------------
  Iteration 4: end = 3, currentChar = 'k'
  ------------------------------------------------------------------------------------
  s = "p  w  w  k  e  w"
                ^ (end)
             ^ (start)
  Window: "wk"

  1. 'k' not in charMap (or rather, its previous occurrences are before `start`).
  2. charMap['k'] = 3;               => charMap = {'p': 0, 'w': 2, 'k': 3}
  3. currentLength = end - start + 1 = 3 - 2 + 1 = 2
  4. maxLength = max(2, 2) = 2

  ------------------------------------------------------------------------------------
  Iteration 5: end = 4, currentChar = 'e'
  ------------------------------------------------------------------------------------
  s = "p  w  w  k  e  w"
                   ^ (end)
             ^ (start)
  Window: "wke"

  1. 'e' not in charMap.
  2. charMap['e'] = 4;               => charMap = {'p': 0, 'w': 2, 'k': 3, 'e': 4}
  3. currentLength = end - start + 1 = 4 - 2 + 1 = 3
  4. maxLength = max(2, 3) = 3

  ------------------------------------------------------------------------------------
  Iteration 6: end = 5, currentChar = 'w' (DUPLICATE!)
  ------------------------------------------------------------------------------------
  s = "p  w  w  k  e  w"
                      ^ (end)
             ^ (start)
  Window was "wkew" before adjustment. Current char 'w' is a duplicate.

  1. 'w' IS in charMap. charMap['w'] is 2.
  2. Condition: charMap['w'] (which is 2) >= start (which is 2) -> TRUE.
     The previous 'w' (at index 2) is INSIDE our current window "wke".
  3. Adjust start: start = charMap['w'] + 1 = 2 + 1 = 3.
  s = "p  w  w  k  e  w"
                      ^ (end)
                ^ (start) - new position
  Window: "kew"

  4. Update charMap for the new 'w': charMap['w'] = 5 (current end index)
                                     => charMap = {'p': 0, 'w': 5, 'k': 3, 'e': 4}
  5. currentLength = end - start + 1 = 5 - 3 + 1 = 3
  6. maxLength = max(3, 3) = 3

  ------------------------------------------------------------------------------------
  Loop ends. Return maxLength.

  Final maxLength = 3.

  Pseudocode:
  function getLongestSubstring(s):
    if s.length == 0: return 0
    start = 0
    maxLength = 0
    charMap = new Map() // Stores {char: last_index_seen}

    for end from 0 to s.length - 1:
      currentChar = s[end]

      if charMap.has(currentChar) AND charMap.get(currentChar) >= start:
        // Duplicate found within the current window
        // Move start pointer to the right of the previous occurrence of currentChar
        start = charMap.get(currentChar) + 1
      
      // Update the last seen index of currentChar
      charMap.set(currentChar, end)

      // Calculate length of current window and update maxLength
      maxLength = max(maxLength, end - start + 1)
      
    return maxLength

 *
 * 
 * 
 * v0.1 - WRONG
 * 
 * e.g; "abcabcbb"
 * 
 * start, end, max;
 * 
 * charArray[26];
 * 
 * start = 0
 * 
 * charArray[s[start]]++
 * 
 * i = 1
 * 
 * get value at charArray[s[i]]
 * if == 0, character is not found, add it
 * end = i
 * max = Math.max(max, end - start + 1) = 2
 * 
 * 
 * i = 2
 * get value at charArray[s[i]]
 * if == 0, character is not found, add it
 * end = i
 * max = Math.max(max, end - start + 1) = 3
 * 
 * i = 3
 * get value at charArray[s[i]]
 * if > 0, character is duplicate
 * this is the length of the substring; 
 * => now, we can compare the value of  charArray[s[i]] to 1 so it needs to be > 1
 * => update start = i
 * 
 * ...
 * 
 * i = 6
 * charArray[s[i]] > 1, character is duplicate
 * this is the length of substring
 * max = Math.max(max, end - start + 1)
 * 
 * 
 */

//v0.2 

function getLongestSubstring(s) {
  if (s.length === 0) return 0;

  let start = 0; // Left boundary of window
  let maxLength = 1; // Track maximum length found
  const charMap = new Map(); // Store character → last seen index

  for (let end = 0; end < s.length; end++) {
    const currentChar = s[end];

    // If character exists and is within current window
    if (charMap.has(currentChar) && charMap.get(currentChar) >= start) {
      // Move start to one position after the duplicate
      start = charMap.get(currentChar) + 1;
    }

    // Update character's latest position
    charMap.set(currentChar, end);

    // Update maximum length
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}


//v0.1 WRONG
// function getLongestSubstring(s) {
//   let start = 0;
//   let end = 0;
//   let max = 1;
//   const charArray = new Array(26).fill(0);
//   let substrings = 0;

//   for (let i = 1; i < s.length; i++) {
    
//     console.log("🚀 ~ getLongestSubstring ~ :", {max, start, end})
//     if (charArray[s.charCodeAt(i) % 26] === substrings) {
//       charArray[s.charCodeAt(i) % 26]++;
//       end = i;
//       max = Math.max(max, end - start);
//     } else {
//       charArray[s.charCodeAt(i) % 26]++;
//       substrings++;
//       start = i;
//       end = i;
//     }

//   }
//   return max
// }


/**
 * youtube approach
 *  
 * 
 * 1) BF: take every single substring, check for repeating characters, 
 * => return the longest one without repeating characters
 * 
 * t complexity O(n^3); O(n^2) for all substrings, then O(n) to check for repeating characters
 * 
 * 2) Optimal - sliding window - two pointers
 * 
 * max=1;
 * 
 * left; right; elements have the property that between them there is no duplicate character
 * if there is, we update the pointer of one of them to mitigate this condition
 * 
 * start both from 0;
 * 
 * hold a Set for characters that exist
 * 
 */




// tests
console.log('3 = ', getLongestSubstring("abcabcbb"));
console.log("1 = ", getLongestSubstring("bbbbb"));

