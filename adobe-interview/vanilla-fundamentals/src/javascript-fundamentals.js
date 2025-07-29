/**
 * 
 * 1. event loop
 * - endless loop where the JS engine waits for tasks, executes them and then "sleeps", waiting for a new one
 * - Dequeue and run the oldest task from the macrotask queue (e.g. “script”).
        Execute all microtasks:
        While the microtask queue is not empty:
            Dequeue and run the oldest microtask.
        Render changes if any.
        If the macrotask queue is empty, wait till a macrotask appears.
Go to step 1.
    - All microtasks are completed before any other event handling or rendering or any other macrotask takes place.

 * 2. classes
 * 3. prototypal inheritance
 */


function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.type = 'module';

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}


// !TODO promisify fn


function promisify(fn) {
    return function(...args) {
        return new Promise((res, rej) => {
            function callback(err, result) {
                if(err) rej(err)
                else {
                    res(result)
                }
            }

            args.push(callback)

            fn.apply(this, args)
            // fn.call(this, ...args)
        })
    }
}



let promisifiedLoadScript = promisify(loadScript);

promisifiedLoadScript('./counter.js').then(v => console.log(v)).catch(e => console.warn('error happened: it is handled'))


promisifiedLoadScript("./mtfs.js").then((v) => console.log(v));
// if we forget to add error handling error goes here
// doesn't run: error handled
window.addEventListener('unhandledrejection', event => console.warn(event.reason));


// rewrite the following example with async await

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(console.warn); // Error: 404


async function loadJsonAsync(url) {
    let response = await fetch(url);
    if(response.status === 200) {
        let json = await response.json()
        return json
    }
    throw new Error(response.status);
}

loadJsonAsync().catch(console.warn);


// 3. prototypal inheritance


let animal = {
  isSleeping: false,
  sleep() {
    this.isSleeping = true;
    console.log(this.isSleeping); // Logs the actual boolean value
    return "sleeping..."; // Optional: return something meaningful
  },
};




let dog = {
   woof() {
        console.log('is woofing');
        return "woof!"; // Optional: return something meaningful
    },
    checkIsSleeping() {
        return this.isSleeping
    }
}

Object.setPrototypeOf(dog, animal);

console.log(Object.getPrototypeOf(dog) === animal);
console.log(dog.woof())
console.log('should return false', dog.checkIsSleeping())
console.log("dog:should sleep", dog.sleep())
console.log('should return true',dog.checkIsSleeping())

// exercise -> https://javascript.info/prototype-inheritance
// lookup will follow the path: pockets → bed → table → head
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};

Object.setPrototypeOf(pockets, bed)
Object.setPrototypeOf(bed, table)
Object.setPrototypeOf(table, head)


// https://javascript.info/task/changing-prototype
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();


Rabbit.prototype = {};
console.warn(rabbit.eats);


// exercise 
/**
 * Add to the prototype of all functions the method defer(ms), that runs the function after ms milliseconds.

After you do it, such code should work:

function f() {
  alert("Hello!");
}

f.defer(1000); // shows "Hello!" after 1 second
 */

function f() {
  console.warn("Hello!");
}

Function.prototype.defer = function(ms) {
    let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
}

// f.defer(1000); 


function func(a, b) {
  console.warn('func: ', a + b);
}

func.defer(1000)(1, 2);


(function iife() {
  console.log("------- Enhanced Version -------");

  let animal = {
    // Initialize all shared properties
    energy: 100,
    isAwake: true,

    sleep() {
      this.isAwake = false;
      this.energy = Math.min(100, this.energy + 20); // Cap at 100
      console.log(`💤 Energy restored to ${this.energy}`);
      return this;
    },

    wake() {
      this.isAwake = true;
      this.energy = Math.max(0, this.energy - 10); // Floor at 0
      console.log(`☀️ Energy now ${this.energy}`);
      return this;
    },

    // Add status method
    getStatus() {
      return `Energy: ${this.energy}, Awake: ${this.isAwake}`;
    },
  };

  // Use Object.create for consistency
  let mammal = Object.create(animal);
  mammal.bodyTemp = 37; // Mammal-specific property
  mammal.giveWarmth = function () {
    console.log(`🔥 Sharing warmth at ${this.bodyTemp}°C`);
    return this;
  };

  // Create instances with proper initialization
  let dog = Object.create(mammal);
  dog.mood = "neutral";
  dog.breed = "unknown";
  dog.bark = function () {
    console.log("🐕 Woof!");
    this.mood = "excited";
    this.energy = Math.max(0, this.energy - 5);
    return this;
  };
  dog.sleep = function () {
    let proto = this;

    while(proto&& !proto.hasOwnProperty('sleeo')) {
        proto = Object.getPrototypeOf(proto)
    }

     return this
  }

  let cat = Object.create(mammal);
  cat.mood = "neutral";
  cat.breed = "unknown";
  cat.meow = function () {
    console.log("🐱 Meow!");
    this.mood = "content";
    this.energy = Math.max(0, this.energy - 3);
    return this;
  };

  // Enhanced tests
  console.log("\n=== Testing Enhanced Version ===");

  // Test 1: Basic inheritance
  console.log("1. Dog sleeps:", dog.sleep().getStatus());

  // Test 2: Property initialization
  console.log("2. Cat initial energy:", cat.energy);

  // Test 3: Method chaining
  console.log("3. Chaining result:", dog.wake().bark().getStatus());

  // Test 4: Prototype verification (FIXED)
  console.log(
    "4a. Dog prototype is mammal:",
    Object.getPrototypeOf(dog) === mammal
  );
  console.log(
    "4b. Mammal prototype is animal:",
    Object.getPrototypeOf(mammal) === animal
  );

  // Test 5: Property isolation
  dog.energy = 50;
  cat.energy = 80;
  console.log("5. Isolation works:", dog.energy !== cat.energy);

  // New Test 6: Show prototype chain
  console.log("\n=== Prototype Chain Analysis ===");
  let current = dog;
  let level = 0;
  while (current && level < 4) {
    console.log(`Level ${level}:`, current.constructor?.name || "Object");
    current = Object.getPrototypeOf(current);
    level++;
  }
})();


(function iife() {
  function Animal() {
    this.energy = 100;
    this.isAwake = true;
  }

  Animal.prototype.sleep = function () {
    this.isAwake = false;
    this.energy = Math.min(100, this.energy + 20); // Cap at 100
    console.log(`💤 Energy restored to ${this.energy}`);
    return this;
  };

  Animal.prototype.wake = function () {
    this.isAwake = true;
    this.energy = Math.max(0, this.energy - 10); // Floor at 0
    console.log(`☀️ Energy now ${this.energy}`);
    return this;
  };

  Animal.prototype.getStatus = function () {
    return `Energy: ${this.energy}, Awake: ${this.isAwake}`;
  };

  function Mammal(energy = 100, bodyTemp = 37) {
    Animal.call(this, energy);
    this.bodyTemp = bodyTemp;
  }

  Mammal.prototype = Object.create(Animal.prototype);
  Mammal.prototype.constructor = Mammal;
  Mammal.prototype.giveWarmth = function () {
    console.log(`🔥 Sharing warmth at ${this.bodyTemp}°C`);
    return this;
  };

  function Dog(breed = "unknown", energy = 100) {
    Mammal.call(this, energy);
    this.breed = breed;
    this.mood = "neutral";
  }

  Dog.prototype = Object.create(Mammal.prototype);
  Dog.prototype.constructor = Dog;
  Dog.prototype.bark = function () {
    console.log("🐕 Woof!");
    this.mood = "excited";
    this.energy = Math.max(0, this.energy - 5);
    return this;
  };

  Dog.prototype.sleep = function () {
    Animal.prototype.sleep.call(this);
    console.log("🦴 Dreaming about bones...");
    return this;
  };

  function Cat(breed = "unknown", energy = 100) {
    Mammal.call(this, energy);
    this.breed = breed;
    this.mood = "neutral";
  }

  Cat.prototype = Object.create(Mammal.prototype);
  Cat.prototype.constructor = Cat;
  Cat.prototype.meow = function () {
    console.log("🐱 Meow!");
    this.mood = "content";
    this.energy = Math.max(0, this.energy - 3);
    return this;
  };

  // Create instances using constructors
  const dog = new Dog("Golden Retriever");
  const cat = new Cat("Persian", 90);

  // Testing
  console.log("\n=== Testing Constructor Version ===");
  console.log("1. Dog sleeps:", dog.sleep().getStatus());
  console.log("2. Cat initial energy:", cat.energy);
  console.log("3. Chaining result:", dog.wake().bark().getStatus());

  // Enhanced prototype verification
  console.log("4a. dog instanceof Dog:", dog instanceof Dog);
  console.log("4b. dog instanceof Mammal:", dog instanceof Mammal);
  console.log("4c. dog instanceof Animal:", dog instanceof Animal);

  console.log("5. Constructor names:");
  console.log("   - dog.constructor.name:", dog.constructor.name);
  console.log("   - cat.constructor.name:", cat.constructor.name);
})()


