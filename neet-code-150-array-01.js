// nums[]
// hasDuplicate -> true
// !hasDuplicate -> false


/**
 * nums = [1, 3, 4, 3, 7]
 * 
 * check every element once in place -> O(n)
 * create obj {}
 * check nums[i] in obj[i] if exists
 * 
 * i = 1
 * 
 * obj = {1:1}
 * 
 * i = 2
 * 
 * obj = {1:1, 3:1}
 * 
 * ...
 * 
 * i = 4
 * 
 * before check for current index
 * obj = {1:1, 3:1, 4:1}
 * 
 * check if key === 3 exists
 * key === 3 is true => hasDuplicate = true => exit fn with true
 * 
 * 
 */


// 0.1
// function checkDuplicate(nums) {

//     const duplicateIndex = {};
//     let hasDuplicate = false;

//     for(let i = 0; i < nums.length; i++) {
//         if(!duplicateIndex[nums[i]]) {
//             duplicateIndex[nums[i]] = 1
//         } else {
//             hasDuplicate = true;
//             break;
//         }
//     }

//     return hasDuplicate;
// }

// 0.2 
// use Set()
function checkDuplicate(nums) {

    const duplicateIndex = new Set();
    let hasDuplicate = false;

    for(let i = 0; i < nums.length; i++) {
       if(duplicateIndex.has(nums[i]) ) {
         hasDuplicate = true;
         break;
       } else {
        duplicateIndex.add(nums[i]);
       }
    }

    return hasDuplicate;
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
console.log('true', checkDuplicate([1,3,4,3,7]))
console.log('false', checkDuplicate([1,3,4,5,7]))
