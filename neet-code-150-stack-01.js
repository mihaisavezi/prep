/**
 * string s, contains just  (, ), {, }, [, ]
 * => check if input is valid
 * => open brackets must be closed by same type of brackets ] closes [
 * => open brackets must be closed in correct order ({ })
 * 
 * => INVALID: ((()
 * 
 * 
 * v0.3 - using stack
 * 
 * - stackOfOpeningBrackets
 * 
 * iterate thru elements, if closing bracket, compare to top of stack if top of stack is not corresponding => return false
 * 
 * 
 * 
 * v0.2 - FLAWED: doesn't handle {}()[]
 * input = "{([])}"
 * mapOpenToClose = {
 *  "{" : "}",
 *   ....
 * }
 * 
 * input.length % 2 === 0; otherwise => false
 * 
 * iterate until input.length /2
 * compare s[i] cu s[s.length - 1 - i]; assert if mapOpenToClose[s[i]] === s[s.length - 1 - i]
 * if NOT true => return false
 * 
 * otherwise iterate until input.length / 2
 * => true
 * 
 * 
 * 
 * 
 * 
 * v0.1 - - FLAWED: doesn't handle {}()[]
 * input = "{([])}"
 * 
 * openingBrackets = []
 * closingBrackets = []
 * 
 * iterate over elements
 * 
 * i = 0
 * ["{"]
 * []
 * 
 * i = 1
 * ["{", "("]
 * 
 * i = 2
 * ["{", "(", "["]
 * 
 * i = 3
 * ["{", "(", "["]
 * ["]"]
 * 
 * ...
 * 
 * i = 5
 * ["{", "(", "["]
 * ["]", ")", "}"]
 * 
 * 
 * now we go with two pointers, one from the start of oB array one for the cB array
 * we compare the length
 * if length we compare element by element with one starting from the front, one from the back
 */

 
function isValid(pString) {
  if (pString.length % 2 !== 0) {
    return false;
  }

  const mapOpenToClose = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  const openingBrackets = [];

  for(let i = 0; i < pString.length; i++) {
    const isOpeningBracket = mapOpenToClose[pString[i]];

    if (!isOpeningBracket) {
      const topOfStack = openingBrackets.pop();
      const isCorrectClosingBracket = mapOpenToClose[topOfStack] === pString[i];
      if (!isCorrectClosingBracket) {
        return false;
      }
    } else {
      openingBrackets.push(pString[i]);
    }
    }

  return true;
};

/**
 * 
 * 
 * 
 */




// tests
console.log(`${true} = `, isValid("{([])}"));
console.log(`${false} = `, isValid("{([])})"));
console.log(`${true} = `, isValid("{}(){}"));

