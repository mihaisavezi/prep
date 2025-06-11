/**
 *  head = [0, 1, 2, 3];
 * 
 *  => [3,2,1,0]
 * 
 * 
 * v0.2 - recursive: https://leetcode.com/problems/reverse-linked-list/solutions/5612752/step-by-step-explained-with-images-easiest-to-understand-java-c-python-javascript-go-codes/
 * v0.1 - solution: https://leetcode.com/problems/reverse-linked-list/solutions/5612752/step-by-step-explained-with-images-easiest-to-understand-java-c-python-javascript-go-codes/
 * 
 * 
 * 
 * 
 *  */


/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */

class ListNode {
       constructor(val = 0, next = null) {
           this.val = val;
           this.next = next;
       }
   }



function reverseList({head, method}) {
  if (method === 'iterative') {
    let prev = null;
  
    let current = head;
  
    while(current !== null) {
      const tempNext = current.next;
      current.next = prev;
      prev = current;
      current = tempNext
    }

    return prev;
  } else if (method === 'recursive') {
    
    if(head === null || head.next === null) return head


    let newHead = reverseList({head: head.next, method: 'recursive'})

    head.next.next = head;
    head.next = null;

    return newHead;
  }
}

// Helper function to print list
function printList(head) {
  const values = [];
  let current = head;
  while (current) {
      values.push(current.val);
      current = current.next;
  }
  return values.join(' -> ') + ' -> null';
}

// Test the function
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);

console.log("Original:", printList(head));
const reversed = reverseList({head, method: 'recursive'});
console.log("Reversed:", printList(reversed));

const reversedIterative = reverseList({ head: reversed, method: "iterative" });
console.log("Reversed:", printList(reversedIterative));
