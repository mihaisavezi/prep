import { useEffect, useRef } from "react";


export default function cycle(...values) {
  let count = 0;
  return function () {
    const returnValue = values[count];
    count++;
    count = count % values.length;
    return returnValue;
  };
}

export const useClickAnywhere = (handler) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  
  }, [handler])

  useEffect(() => {
    const handleClick = (e) => {
      handlerRef.current(e);
    };
    
    window.addEventListener("click", handleClick);


    return () => window.removeEventListener("click", handleClick);
    
  }, [])
}




Array.prototype.myReduce = function (callbackFn, initialValue) {
  const context = this;
  const hasInitialValue = arguments.length >= 2;

  if (context.length === 0 && !hasInitialValue) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  if (context.length === 0) return initialValue;

  let accumulator;
  let startIndex;

  if (hasInitialValue) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    // Find first non-sparse element
    startIndex = 0;
    while (startIndex < context.length && !(startIndex in context)) {
      startIndex++;
    }
    accumulator = context[startIndex];
    startIndex++;
  }

  for (let i = startIndex; i < context.length; i++) {
    // Skip sparse array holes
    if (i in context) {
      accumulator = callbackFn(accumulator, context[i], i, context);
    }
  }

  return accumulator;
};


console.log([-1, ,-3, , 4, , ,].myReduce((prev, curr)  => prev + curr,  0));



// https://www.greatfrontend.com/questions/javascript/use-boolean?practice=practice&tab=coding
let currentValue;
export function useBoolean(initialValue = false) {
  if(currentValue === undefined) {
    currentValue = initialValue;
  }

  const setValue = (toSet) => {
    currentValue = toSet;

    return;
  }

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { get value() { return currentValue}, setTrue, setFalse };
}

const {value, setTrue, setFalse} = useBoolean(true);


setFalse();

console.log(value);
