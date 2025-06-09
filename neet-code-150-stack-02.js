/**
 * MinStack
 * 
 * push - push element to stack
 * pop - remove top element
 * top - get top element
 * getMin minimum element of stack
 * 
 * every function is O(1)
 * 
 * []
 * stack.push(1)
 * stack.push(2)
 * stack.push(3)
 * [1, 2, 3]
 * stack.pop()
 * [1, 2]
 * stack.top() => 2
 * stack.getMin() 
 * 
 * => find min from elements 
 * 
 * 
 * v0.2 - two stacks
 * 
 * 
 * s = []
 * min = []
 * 
 * push(3)
 * 
 * s = [3]
 * min = [3]
 * 
 * push(2)
 * 
 * s = [3, 2]
 * min = [3, 2]
 * 
 * 
 * push(7)
 * 
 * s = [3, 2, 7]
 * min = [3, 2, 2] or just [3, 2]
 * 
 * 
 * push(1)
 * 
 * s = [3, 2, 7, 1]
 * min = [3, 2, 2, 1] or just [3, 2, 1]
 * 
 * getMin()
 * => 1
 * 
 * 
 * pop()
 * 
 * s = [3, 2, 7]
 * min = [3, 2, 2] or just [3, 2]
 * 
 * getMin()
 * => 2
 * 
 * 
 * 
 */

//v0.3.1 - with linked lists

class Node {
  constructor(val, next = null, min = Infinity) {
    this.val = val;
    this.next = next;
    this.min = min; // Minimum value up to this node (inclusive)
  }
}

class MinStackWithLinkedList {
  constructor() {
    this.head = null
  }

  push(element) {
    if(this.head == null) {
      this.head = new Node(element);
    } else {
      const newNode = new Node(element, this.head, Math.min(this.head.min, element));
      this.head = newNode;
    }
  }

  pop() {
    this.head = this.head.next
  }

  top() {
    return this.head.val;
  }

  getMin() {
    return this.head.min;
  }
  
}

//v0.3 - storing diffs
class MinStack {
  constructor() {
    this.min = Infinity;
    this.stack = [];
  }

  /**
   * @param {number} val
   * @return {void}
   */
  push(val) {
    if (this.stack.length === 0) {
      this.stack.push(0);
      this.min = val;
    } else {
      this.stack.push(val - this.min);
      if (val < this.min) this.min = val;
    }
  }

  /**
   * @return {void}
   */
  pop() {
    if (this.stack.length === 0) return;

    const pop = this.stack.pop();

    if (pop < 0) this.min -= pop;
  }

  /**
   * @return {number}
   */
  top() {
    const top = this.stack[this.stack.length - 1];
    return top > 0 ? top + this.min : this.min;
  }

  /**
   * @return {number}
   */
  getMin() {
    return this.min;
  }
}

//v0.2
// class MinStack {
//   constructor() {
//     this.stack = [];
//     this.minStack = [];
//   }

//   push(element) {
//     this.stack.push(element);

//     if(this.minStack.length === 0) {
//       this.minStack.push(element);
//     } else {
//       if(element <= this.minStack[this.minStack.length - 1]) {
//         this.minStack.push(element);
//       }
//     }
//   }

//   pop() {
//     const elem = this.stack.pop();
//     const min = this.minStack[this.minStack.length - 1];

//     if(elem === min) {
//       this.minStack.pop();
//     }
//   }

//   top() {
//     return this.stack[this.stack.length - 1];
//   }

//   getMin() {
//     return this.minStack[this.minStack.length - 1];
//   }
// }
 
// function MinStack() {
//   this.stack = [];
//   this.min = undefined;

//   const push = (element) => {
//     this.stack.push(element);

//     if(this.min >= element || this.min === undefined) {
//       this.min = element;
//     }
//   }

//   const pop = () => {
//     this.stack.pop();
//   }

//   const top = () => {
//     return this.stack[this.stack.length - 1];
//   }

//   const getMin = () => {
//     return this.min;
//   }

//   return {
//     push,
//     pop,
//     top,
//     getMin,
//   }
// }

/**
 * 
 */




// tests
minStack = new MinStack();
minStack.push(1);
minStack.push(2);
minStack.push(0);
console.log("🚀 ~ minStack.getMin() = 0 = ", minStack.getMin())
minStack.pop();
minStack.top();    // return 2
console.log("🚀 ~ minStack.top() = 2 =", minStack.top())
minStack.getMin(); // return 1
console.log("🚀 ~ minStack.getMin() = 1 =", minStack.getMin())
minStack.pop()
minStack.getMin()

console.log('------- with linkedList ------')
minStack = new MinStackWithLinkedList();
minStack.push(1);
minStack.push(2);
minStack.push(0);
console.log("🚀 ~ minStack.getMin() = 0 = ", minStack.getMin());
minStack.pop();
minStack.top(); // return 2
console.log("🚀 ~ minStack.top() = 2 =", minStack.top());
minStack.getMin(); // return 1
console.log("🚀 ~ minStack.getMin() = 1 =", minStack.getMin());
minStack.pop();
minStack.getMin();

