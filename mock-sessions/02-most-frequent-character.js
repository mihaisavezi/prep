// "abcdabb" => "b"
// "a" =>
// "aabb" => "a"


// []


function mostFrequentCharacter(input) {
  // O(1) 
  let characterToFrequency = {};
  let maxFrequency = 1;
  let maxCharacter = input[0];
  

  // O(n) time
  for (let i = 1; i < input.length; i++) {
    characterToFrequency[input[i]] = characterToFrequency[input[i]] + 1 || 1;
    
    if (characterToFrequency[input[i]] > maxFrequency) {
        maxFrequency = characterToFrequency[input[i]];
        maxCharacter = input[i];
    }
  }

  return maxCharacter;
}



mostFrequentCharacter("abcdabb");
console.log(`🚀 ~ mostFrequentCharacter("abcdabb");:`, mostFrequentCharacter("abcdabb"));
