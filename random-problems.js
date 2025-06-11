/**
 * https://www.youtube.com/watch?v=C5XnCptIUX8&list=TLPQMTAwNjIwMjVfYdqzhtDJSg&index=11
 * 
 * 
 * input: 1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19
 * 
 * indices so that the entire array is now sorted, you want to find the minimum such sequence, return indexes
 * => (3, 9)
 * 
 * 
 * 
 * 
 * 
 * v0.4 - itnerview - iterative approach
 * two pointers highlighting the boundaries - left, right
 * 
 * we iterate thru every element
 * compare max to current element; if element is out of place (currentElement < max)
 * => we update right boundary
 * 
 * for the left we start from the end and we decrement one by one
 * compare min to current element, if currentElement > min
 * => we update the left boundary
 * 
 * => [left, right]
 * 
 * 
 * 
 * v0.3 //!WRONG
 * start; end pointer;
 * 
 * we look from the start for the first element that is unsorted; and from the back the same
 * 
 * 
 * v0.2-interviewer
 * worst case
 * Input: 10, 9, 8, 7, 6, 5
 * Output: (0, 5)
 * 
 * 
 * Sort, and compare indices
 * 1,2, 4, 3, 6
 * 1,2, 3, 4, 6
 * ---  ?  ?  --
 * 0 1 (2  3)  4
 * 
 * use start, end pointers
 * 
 * n*lg n - quick sort
 * n - iterate thru
 * 
 * Total: n log n
 * 
 * 
 * v0.1
 * outcome: doesn't work
 * - two pointeres
 * 
 * left; right;
 * 
 * right - left = minSequence
 * 
 * minSequence starts from length of array
 * 
 * leftIndex = firstValue;
 * 
 * we iterate through elements;
 * 
 * i = 0
 * 
 * leftIndex = 0;
 * 
 * i = 1
 * 
 * if array[1] > array[leftIndex]
 * 
 * leftIndex = i = 1
 * 
 * 
 * 
 * ...
 * 
 * i = 6;
 * 
 * compare array[6] cu array[leftIndex]
 * 
 * if array[1] < array[leftIndex];
 * 
 * left = leftIndex;
 * right = array[1]
 * 
 * i = 2
 * 
 * compare array[2] cu array[leftIndex]
 * 
 * if array[2] > array[leftIndex];
 *
 * 
 */

function minUnsortedSequence(array) {
    let left = -1;
    let right = -1;
    let length = array.length;

    let max = array[0];
    let min = array[length - 1];


    for(let i = 0; i < length; i++) {

        if(array[i] >= max) {
            max = array[i];
        } else {
            right = i;
        }

        let j = length - 1 - i;

        if(array[j] <= min) {
            min = array[j];
        } else {
            left = j;
        }
    }
    return [left, right];
}

// !WRONG
// function minUnsortedSequence(array) {
//     let start = 0;
//     let end = array.length - 1;
//     let minSequence = array.length;
//     let statusStart = false;
//     let statusEnd = false;



//     while(!statusStart || !statusEnd) {
//         if(!statusStart && array[start] > array[start + 1]) {
//             statusStart = true;
//         }

//         if(!statusEnd && array[end - 1] > array[end]) {
//             statusEnd = true;
//         }
        
//         start++;
//         end--;
//     }

//     return [start, end];
// }


console.log(minUnsortedSequence([1, 2,  4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]));
