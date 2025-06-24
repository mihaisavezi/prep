export function maxProductSubArray(nums) {

  if (nums.length === 0) return 0;

  let maxProduct = nums[0];
  let minProduct = nums[0];
  let result = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const current = nums[i];

    // Store previous values before updating
    const tempMax = maxProduct;
    const tempMin = minProduct;

    // Update max and min products ending at current position
    maxProduct = Math.max(current, tempMax * current, tempMin * current);
    minProduct = Math.min(current, tempMax * current, tempMin * current);

    // Update global maximum
    result = Math.max(result, maxProduct);
  }

  return result;
}


/**
 * @param {string} str
 * @return {boolean}
 */

const bracketMap = {
  '(' : ')',
  '[' : ']',
  '{' : '}'
}
export function isBalancedBrackets(str) {
  let isBalanced = true;
  let index = 0
  const openBracketStack = [];

  if(str.length === 0) return false;

  while(isBalanced && index <= str.length) {
    if(bracketMap[str[index]]) {
      openBracketStack.push(str[index])
    } else {
      const popped = openBracketStack.pop();
      if(bracketMap[popped] !== str[index]) {
        isBalanced = false
      }
    }
    index++;
  }

  return isBalanced;
}


/**
 * 
 * stack = [
 * 
 * 
 * if ] === ] 
 * 
 *
 */

export function throttle(func, wait) {
  let timer = null;
  return function (...args) {
    if (timer) return;

    func.apply(this, args);
    clearTimeout(timer);
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
    }, wait);
  };
}

// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export has the same interface.

// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export has the same interface.

export class EventEmitter {
  constructor() {
    this.eventMap = new Map();
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  on(eventName, listener) {
    if (!this.eventMap.has(eventName)) {
      this.eventMap.set(eventName, [listener]);
    } else {
      const listenersArray = this.eventMap.get(eventName);
      this.eventMap.set(eventName, [...listenersArray, listener]);
    }

    return this;
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  off(eventName, listener) {
    if (!this.eventMap.has(eventName)) {
      return this;
    }

    const listeners = this.eventMap.get(eventName);
    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    // Clean up empty event arrays
    if (listeners.length === 0) {
      this.eventMap.delete(eventName);
    }

    return this;
  }

  /**
   * @param {string} eventName
   * @param  {...any} args
   * @returns {boolean}
   */
  emit(eventName, ...args) {
    let hasListeners = false;

    if (this.eventMap.has(eventName)) {
      hasListeners = true;
      let listeners = this.eventMap.get(eventName);

      listeners.forEach((listener) => {
        listener(...args);
      });
    }

    return hasListeners;
  }
}

/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */
export function classNames(...args) {
  console.log(args);

  if (args.length === 0) return "";

  // cleanup arg primitives -> filter
  // iterate over them -> return proper primitive string
  // join with space

  const filterFn = (element) => {
    if (typeof element === "string") {
      return element;
    }
    if (typeof element === "boolean") {
      return "";
    }
    if (typeof element === "object" && element.length === 0) {
      return "";
    }
    if (typeof element === "object" && !element.length) {
      const values = Object.entries(element)
        .filter((val) => (val[1] == true ? true : false))
        .map((val) => val[0])
        .join(" ");
      return values;
    }
    if (typeof element === "object" && element.length) {
      const filteredElements = element.filter((val) => !!val).map(filterFn);
      console.log("filteredElements", filteredElements);
      return filteredElements.join(" ");
    }

    return element;
  };
  const mappedValues = args.filter((val) => !!val).map(filterFn);
  const filteredElements = mappedValues.join(" ").trim();
  return filteredElements;
}

export const classNamesV2 = (...args) => {
  if (args.length === 0) return "";
  const filteredArgs = args.filter((e) =>
    Array.isArray(e) ? e.length : !isFalsey(e)
  );
  if (filteredArgs.length === 0) return "";
  const flattenedElements = filteredArgs.map((element) => {
    if (typeof element === "string" || typeof element === "number") {
      return element;
    }
    if (Array.isArray(element)) {
      return classNamesV2(...element);
    }
    if (typeof element === "object") {
      return Object.entries(element)
        .filter(([_, value]) => !isFalsey(value))
        .map(([key, _]) => key)
        .join(" ");
    }
    return "";
  });

  return flattenedElements.filter((v) => !isFalsey(v)).join(" ");
};

const isFalsey = (value) =>
  value === undefined ||
  value === null ||
  value === false ||
  value === 0 ||
  value === "" ||
  Number.isNaN(value);
