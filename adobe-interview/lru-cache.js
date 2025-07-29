/**
 *  lru cache 
 * 
 *  get -> O(1)
 *  - update access, 
 *  put -> O(1)
 *  - check if at capacity
 *  
 * 
 *  data structures:
 *  - hashmap
 *  - double linked list
 * 
 *  state:
 *  - capacity
 *  - cache
 *  - double linked list
 *  
 *  
 * 
 */

class ListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = new ListNode();
    this.tail = new ListNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _addNode(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    // Clean up references for GC
    node.prev = null;
    node.next = null;
  }

  _moveToFront(node) {
    this._removeNode(node);
    this._addNode(node);
  }

  get(key) {
    const node = this.map.get(key);
    if (!node) return -1;

    this._moveToFront(node);
    return node.value;
  }

  put(key, value) {
    let node = this.map.get(key);

    if (node) {
      // Update existing key
      node.value = value;
      this._moveToFront(node);
    } else {
      // Add new key
      node = new ListNode(key, value);
      this._addNode(node);
      this.map.set(key, node);

      // Evict if over capacity
      if (this.map.size > this.capacity) {
        const lru = this.tail.prev;
        this._removeNode(lru);
        this.map.delete(lru.key);
      }
    }
  }

  // Utility methods for testing
  peek(key) {
    const node = this.map.get(key);
    return node ? node.value : -1;
  }

  keys() {
    const result = [];
    let current = this.head.next;
    while (current !== this.tail) {
      result.push(current.key);
      current = current.next;
    }
    return result;
  }

  size() {
    return this.map.size;
  }

  clear() {
    this.map.clear();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
}

export default LRUCache;
