import { expect, describe, test } from "vitest";
import { classNamesV2 as classNames,  EventEmitter, throttle, isBalancedBrackets, maxProductSubArray } from "./great-frontend-javascript";
import { e } from "vitest/dist/chunks/index.CmSc2RE5.js";



describe.only("maxProductSubArray", () => {

  test("single element", () => {
    expect(maxProductSubArray([2])).toBe(2);
  });

  test("two elements", () => {
    expect(maxProductSubArray([2, 3])).toBe(6);
    expect(maxProductSubArray([-2, -3])).toBe(6);
    expect(maxProductSubArray([-2, 3])).toBe(3);
    expect(maxProductSubArray([2, -3])).toBe(2);
  });

  test("multiple elements", () => {
    expect(maxProductSubArray([2, 3, 4])).toBe(24);
    expect(maxProductSubArray([-2, 3, 4])).toBe(12);
    expect(maxProductSubArray([2, -3, 4])).toBe(4);
    expect(maxProductSubArray([2, 3, -4])).toBe(6);

    expect(maxProductSubArray([-2, 3, -4, 5])).toBe(120);
  });
});

describe("isBalancedBrackets", () => {
  test("empty string", () => {
    expect(isBalancedBrackets("")).toBe(false);
  });

  test("single pair of brackets", () => {
    expect(isBalancedBrackets("()")).toBe(true);
    expect(isBalancedBrackets("[]")).toBe(true);
    expect(isBalancedBrackets("{}")).toBe(true);
  });

  test("multiple pairs of brackets", () => {
    expect(isBalancedBrackets("()[]{}")).toBe(true);
    expect(isBalancedBrackets("{[()]}")).toBe(true);
    expect(isBalancedBrackets("((()))")).toBe(true);
    expect(isBalancedBrackets("[{()}]")).toBe(true);
  })

  test.only("unbalanced brackets", () => {
    expect(isBalancedBrackets("([)]")).toBe(false); 
    expect(isBalancedBrackets("(){")).toBe(false); 
  })
});



describe("throttle", () => {
  test("can be initialized", () => {
    const increment = throttle(() => {}, 50);
    expect(increment).toBeInstanceOf(Function);
  });

  test("invokes callback immediately", () => {
    let i = 0;
    const increment = throttle(() => {
      i++;
    }, 50);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(1);
  });

  test("throttles immediate invocations", () => {
    let i = 0;
    const increment = throttle(() => {
      i++;
    }, 50);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(1);
    increment();
    expect(i).toBe(1);
  });

  test("throttles delayed invocations", async () => {
    let i = 0;
    const increment = throttle(() => {
      i++;
    }, 100);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(1);

    await new Promise(resolve => setTimeout(resolve, 25));
    increment();
    expect(i).toBe(1);

    await new Promise(resolve => setTimeout(resolve, 25));
    increment();
    expect(i).toBe(1);
  });

  test("uses arguments", () => {
    let i = 21;
    const increment = throttle((a, b) => {
      i += a * b;
    }, 50);

    expect(i).toBe(21);
    increment(3, 7);
    expect(i).toBe(42);
  });

  test("can be called again after first throttling window", async () => {
    let i = 0;
    const increment = throttle(() => {
      i++;
    }, 100);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(1);

    // Should not fire yet.
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(i).toBe(1);
    increment();
    expect(i).toBe(1);

    await new Promise(resolve => setTimeout(resolve, 100));
    expect(i).toBe(1);
    increment();
    expect(i).toBe(2);

    await new Promise(resolve => setTimeout(resolve, 50));
    expect(i).toBe(2);
    increment();
    expect(i).toBe(2);
  });

  test("callbacks can access `this`", async () => {
    const increment = throttle(function (delta) {
      this.val += delta;
    }, 50);

    const obj = {
      val: 2,
      increment,
    };

    expect(obj.val).toBe(2);
    obj.increment(3);
    expect(obj.val).toBe(5);

    await new Promise(resolve => setTimeout(resolve, 100));
    obj.increment(10);
    expect(obj.val).toBe(15);
  });
});

describe("EventEmitter", () => {
  test("constructor", () => {
    const emitter = new EventEmitter();
    expect(emitter).toBeInstanceOf(EventEmitter);
  });

  describe("methods can be chained", () => {
    test("on() can be chained", () => {
      const emitter = new EventEmitter();
      emitter.on("foo", () => {}).on("foo", () => {});
    });

    test("off() can be chained", () => {
      const emitter = new EventEmitter();
      emitter.off("foo", () => {}).off("foo", () => {});
    });
  });

  describe("subscribe", () => {
    test("single listener", () => {
      const emitter = new EventEmitter();
      let a = 0;
      emitter.on("foo", () => {
        a = 1;
      });
      emitter.emit("foo");

      expect(a).toBe(1);
    });

    test("multiple listeners", () => {
      const emitter = new EventEmitter();
      let a = 0,
        b = 1;
      emitter.on("foo", () => {
        a = 1;
      });
      emitter.on("foo", () => {
        b = 3;
      });
      emitter.emit("foo");

      expect(a).toBe(1);
      expect(b).toBe(3);
    });

    test("multiple events", () => {
      const emitter = new EventEmitter();
      let a = 0,
        b = 1;
      emitter.on("foo", () => {
        a = 1;
      });
      emitter.on("bar", () => {
        b = 3;
      });
      emitter.emit("foo");
      expect(a).toBe(1);
      expect(b).toBe(1);

      emitter.emit("bar");
      expect(b).toBe(3);
    });

    test("same listener added multiple times", () => {
      const emitter = new EventEmitter();

      let num = 1;
      function double() {
        num *= 2;
      }

      emitter.on("double", double);
      emitter.emit("double");
      expect(num).toBe(2);

      emitter.on("double", double);
      emitter.emit("double");
      expect(num).toBe(8);
    });
  });

  describe("emit", () => {
    test("existing event returns true", () => {
      const emitter = new EventEmitter();

      emitter.on("foo", () => {});
      expect(emitter.emit("foo")).toBe(true);
    });

    describe("listeners are invoked with arguments", () => {
      test("single argument", () => {
        const emitter = new EventEmitter();

        let sum = 0;
        emitter.on("foo", (a: number) => {
          sum = a;
        });
        emitter.emit("foo", 3);
        expect(sum).toBe(3);

        emitter.emit("foo", 5);
        expect(sum).toBe(5);
      });

      test("two arguments", () => {
        const emitter = new EventEmitter();

        let sum = 0;
        emitter.on("foo", (a: number, b: number) => {
          sum = a + b;
        });
        emitter.emit("foo", 3, 5);
        expect(sum).toBe(8);

        emitter.emit("foo", 4, 13);
        expect(sum).toBe(17);
      });

      test("three arguments", () => {
        const emitter = new EventEmitter();

        let product = 0;
        emitter.on("foo", (a: number, b: number, c: number) => {
          product = a * b * c;
        });
        emitter.emit("foo", 3, 5, 6);
        expect(product).toBe(90);

        emitter.emit("foo", 4, 13, 9);
        expect(product).toBe(468);
      });
    });

    describe("non-existing event name returns false", () => {
      test("custom event", () => {
        const emitter = new EventEmitter();

        expect(emitter.emit("foo")).toBe(false);
      });

      test("same name as built-in event", () => {
        const emitter = new EventEmitter();

        expect(emitter.emit("toString")).toBe(false);
      });
    });
  });

  describe("unsubscribe", () => {
    test("single listener", () => {
      const emitter = new EventEmitter();

      let sum = 0;
      function addTwoNumbers(a: number, b: number) {
        sum = a + b;
      }
      emitter.on("foo", addTwoNumbers);
      expect(emitter.emit("foo", 2, 5)).toBe(true);
      expect(sum).toBe(7);

      emitter.off("foo", addTwoNumbers);
      expect(emitter.emit("foo", -3, 9)).toBe(false);
      expect(sum).toBe(7);
    });

    test("multiple listeners", () => {
      const emitter = new EventEmitter();

      let sum = 0;
      function addTwoNumbers(a: number, b: number) {
        sum = a + b;
      }
      emitter.on("foo", addTwoNumbers);
      expect(emitter.emit("foo", 2, 5)).toBe(true);
      expect(sum).toBe(7);

      let product = 0;
      function multiplyTwoNumbers(a: number, b: number) {
        product = a * b;
      }
      emitter.on("foo", multiplyTwoNumbers);
      expect(emitter.emit("foo", 4, 5)).toBe(true);
      expect(sum).toBe(9);
      expect(product).toBe(20);

      emitter.off("foo", addTwoNumbers);
      expect(emitter.emit("foo", -3, 9)).toBe(true);
      expect(sum).toBe(9);
      expect(product).toBe(-27);

      emitter.off("foo", multiplyTwoNumbers);
      expect(emitter.emit("foo", 3, 7)).toBe(false);
      expect(sum).toBe(9);
      expect(product).toBe(-27);
    });

    test("multiple events", () => {
      const emitter = new EventEmitter();

      let sum = 0;
      function addTwoNumbers(a: number, b: number) {
        sum = a + b;
      }
      emitter.on("foo", addTwoNumbers);
      expect(emitter.emit("foo", 2, 5)).toBe(true);
      expect(sum).toBe(7);

      expect(emitter.emit("bar", 3, 7)).toBe(false);
      emitter.on("bar", addTwoNumbers);
      expect(emitter.emit("bar", 3, 7)).toBe(true);
      expect(sum).toBe(10);

      emitter.off("foo", addTwoNumbers);
      expect(emitter.emit("foo", -3, 9)).toBe(false);
      expect(sum).toBe(10);

      emitter.off("bar", addTwoNumbers);
      expect(emitter.emit("bar", -3, 9)).toBe(false);
      expect(sum).toBe(10);
    });

    test("same listener added multiple times removed correctly", () => {
      const emitter = new EventEmitter();

      let num = 1;
      function double() {
        num *= 2;
      }

      emitter.on("double", double);
      emitter.emit("double");
      expect(num).toBe(2);

      emitter.on("double", double);
      emitter.emit("double");
      expect(num).toBe(8);

      emitter.off("double", double);
      emitter.emit("double");
      expect(num).toBe(16);

      emitter.off("double", double);
      emitter.emit("double");
      expect(num).toBe(16);
    });
  });
});

describe("classNames", () => {
  test("empty values", () => {
    expect(classNames([])).toEqual("");
  });

  test("single value", () => {
    expect(classNames("foo")).toEqual("foo");
  });

  test("two values", () => {
    expect(classNames("foo", "bar")).toEqual("foo bar");
  });

  test("array values", () => {
    expect(classNames(["foo", "bar", "baz"])).toEqual("foo bar baz");
  });

  test("object values", () => {
    expect(classNames({ "foo-bar": true })).toEqual("foo-bar");
    expect(classNames({ "foo-bar": false })).toEqual("");
    expect(classNames({ foo: true }, { bar: true })).toEqual("foo bar");
    expect(classNames({ foo: true, bar: false, qux: true })).toEqual("foo qux");
  });

  test("mixed values", () => {
    expect(
      classNames(
        "foo",
        {
          bar: true,
          duck: false,
        },
        "baz",
        { quux: true }
      )
    ).toEqual("foo bar baz quux");
    expect(
      classNames("boo", true && "loo", false && "booz", {
        foo: true,
        bar: false,
        baz: 1,
      })
    ).toEqual("boo loo foo baz");
  });

  test("ignores falsey values", () => {
    expect(
      classNames(null, false, "bar", undefined, 0, 1, { baz: null }, "")
    ).toEqual("bar 1");
  });

  test("recursively flattens arrays", () => {
    expect(classNames("a", ["b", { c: true, d: false }])).toEqual("a b c");
    expect(classNames("a", ["b", ["c", ["d"]]])).toEqual("a b c d");
  });
});
