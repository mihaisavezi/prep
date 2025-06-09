// int nums [], int target
// -> return index of two numbers that sum up to target.
// each input has exactly one solution, can't use same element twice
// return answer in any order



/**
 *
 * nums = [2, 7, 1, 4, 3, 9]  target = 7
 * 
 * => 3, 4 or 4, 3
 * 
 * 
 * 
 * 
 * 
 * v0.2 
 * start iterating over elements
 * create an Index {}
 * take first number(selectedNumber) then loop through remaining numbers
 * add them one by one to the index
 * 
 * i = 0
 * 
 * selectedNumber = 2
 * complement = 5
 * 
 * add nums[i+1] to index;
 * key = nums[i+1]; value = i+1
 * 
 * index = {
 *  7: 1
 * }
 * 
 * i = 2
 * 
 * index = {
 * 7: 1,
 * 1 : 2
 * }
 * 
 * ...
 * 
 * i = 4
 * 
 * index = {
 *  7:1,
 *  1:2,
 *  4:3,
 *  3:4,
 *  9:5,
 *  2:0
 * }
 * 
 * ...
 * 
 * for the second number in nums 
 * 
 * selectedNumber = 2
 * complement = 5
 * 
 * check if index[5] exists, if not, we move to next number
 * 
 * ...
 * 
 *  for the 4th number in nums 
 * 
 * selectedNumber = 4
 * complement = 3
 * 
 * check if index[3] exists,
 * 
 * it exists return nums.indexOf(selectedNumber), index[complement]
 * 
 * 
 * time complexity: 0(n)
 * space complexity: 0(n)
 * 
 * 
 * 
 * 
 * v0.1
 * start iterating over elements 
 * take first number(selectedNumber), look in the rest of the array for target - selectedNumber(complementNumber).
 * if found => index of complementNumber, and of selected Number
 * 
 * if not, check second number, and iterate through every number except currently selected number
 * 
 * worst case O(n^2)
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
 * 1) Brute force -> check for every single character, check for complement in the n-1 array length
 * 2) Sort then binary search -> O(n*logn)
 * 3) hashmap storing value, and index
 */

function twoSum(nums, target) {
  const index = {};

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (index[complement] !== undefined) {
      return [index[complement], i];
    }

    index[nums[i]] = i;
  }
}



// tests
console.log("[3, 4]", twoSum([2, 7, 1, 4, 3, 9], 7));
console.log("[1, 5]", twoSum([2, 7, 1, 4, 3, 9], 16));

