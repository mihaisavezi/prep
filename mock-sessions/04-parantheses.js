// {[()]} => if in order return true; [x]
/**
 *  {[()]} => if in order return true; [x]
 *  {[()] => return false [x]
 *  {[}) => return false
 *  {}()[] => return true
 *  ([)] => return false
 * 
 */


function hasMatchingParanthesis(string) {
    if(string.length === 0) return false;

    let match = {
        "[": "]",
        "{": "}",
        "(": ")"
    }

    let matchOpen = Object.keys(match);
    let matchClose = Object.values(match);
    let stack = [];

    for(let char of string) {
        if(matchOpen.includes(char)) {
            stack.push(char)
        } else if(matchClose.includes(char)) {
              let lastOpenParanthesis = stack.pop();
              if (char !== match[lastOpenParanthesis]) {
                return false;
              }
        }
    }

    if(stack.length > 0 ) return false;

    return true;
}

/**
 * {[()]}
 * 
 * {[(
 * 
 * (
 * 
 * ) === )
 * 
 * 
 */


console.log("expected: true is =>",hasMatchingParanthesis("{[()]}"));
console.log("expected: false is =>", hasMatchingParanthesis("{[()]"));
console.log("expected: true is =>", hasMatchingParanthesis("{}()[]"));
console.log("expected: false is =>", hasMatchingParanthesis("([)]"));
console.log("expected: true is =>", hasMatchingParanthesis("{[(test)]}"));
console.log("expected: true is =>", hasMatchingParanthesis("{asd[vds(fd)fds]dfs}dsf"));
console.log("expected: true is =>", hasMatchingParanthesis("{[vds(fd)fds]dfs}dsf"));
console.log("expected: false is =>", hasMatchingParanthesis(""));
