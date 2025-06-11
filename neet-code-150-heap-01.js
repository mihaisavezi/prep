/**
 * Design a class to find the kth largest integer in a stream of values, including duplicates. 
 * E.g. the 2nd largest from [1, 2, 3, 3] is 3. The stream is not necessarily sorted.

Implement the following methods:

constructor(int k, int[] nums) Initializes the object given an integer k and the stream of integers nums.
int add(int val) Adds the integer val to the stream and returns the kth largest integer in the stream.




Explanation:
KthLargest kthLargest = new KthLargest(3, [1, 2, 3, 3]);
kthLargest.add(3);   // return 3 => ignores duplicates
kthLargest.add(5);   // return 3
kthLargest.add(6);   // return 3
kthLargest.add(7);   // return 5
kthLargest.add(8);   // return 6
 */

/**
 * k = 3; nums = [4,5,8,2]
 * 
 * if nums sorted [2,4,5,8]
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */


class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.nums = nums
    this.kthLargest = null;
  }

  add(value) {


    return this.kthLargest;
  }
}

/**
 * youtube solution
 * 1) use minHeap of size K
 */


const kthLargest = new KthLargest(3, [1, 2, 3, 3]);
kthLargest.add(3);   // return 3
kthLargest.add(5);   // return 3
kthLargest.add(6);   // return 3
kthLargest.add(7);   // return 5
kthLargest.add(8);   // return 6
