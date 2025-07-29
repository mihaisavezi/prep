// returns true | false


function isPalindrome(input) {
    if(input.length < 1) return false;
    if(input.length === 1) return true;

    let start = 0;
    let end = input.length - 1;

    while(start < end) {
        if(input[start] !== input[end]) return false;
        start += 1;
        end -= 1
    }

    return true;
}


isPalindrome('abcba')
console.log("🚀 ~ isPalindrome('abcba'): true", isPalindrome('abcba'))
console.log("🚀 ~ isPalindrome('abcxba'): false", isPalindrome('abcxba'))
