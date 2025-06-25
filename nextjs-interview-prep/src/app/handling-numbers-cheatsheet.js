// ========================================
// JavaScript Number Handling Cheatsheet
// ========================================

// Number Types
const regularNumber = 123.45;
const bigInteger = 123456789012345678901234567890n; // BigInt

// ========================================
// Basic Number Operations
// ========================================
const a = 10;
const b = 3;

const sum = a + b; // 13
const diff = a - b; // 7
const product = a * b; // 30
const quotient = a / b; // 3.3333333333333335
const remainder = a % b; // 1
const power = a ** b; // 1000

// ========================================
// Number Conversion
// ========================================
const str = "123.45";
const numFromString = Number(str); // 123.45
const intFromString = parseInt(str); // 123
const floatFromString = parseFloat(str); // 123.45

const boolToNum = Number(true); // 1
const boolToNum2 = Number(false); // 0

// Parsing with different bases
const binaryToDecimal = parseInt("1010", 2); // 10
const hexToDecimal = parseInt("FF", 16); // 255

// ========================================
// Number Validation
// ========================================
const isValidNumber = (value) => Number.isNaN(value); // true if NaN
const isFiniteNumber = (value) => Number.isFinite(value); // true if finite
const isNumber = (value) => typeof value === "number"; // true if number type
const isSafeInteger = (value) => Number.isSafeInteger(value); // true if safe integer

// ========================================
// Rounding Methods
// ========================================
const roundingExamples = {
  floor: Math.floor(4.7), // 4 - rounds down
  ceil: Math.ceil(4.1), // 5 - rounds up
  round: Math.round(4.5), // 5 - rounds to nearest
  trunc: Math.trunc(4.9), // 4 - removes decimal part
};

// ========================================
// Floating Point Precision
// ========================================
// Problem: 0.1 + 0.2 === 0.3 is false!
const precisionProblem = 0.1 + 0.2; // 0.30000000000000004

// Solutions:
const fixedDecimal = (0.1 + 0.2).toFixed(2); // '0.30'
const roundedResult = Math.round((0.1 + 0.2) * 100) / 100; // 0.3

// ========================================
// Number Formatting
// ========================================
const num = 1234567.89;

// Basic locale formatting
const usFormat = num.toLocaleString("en-US"); // '1,234,567.89'
const germanFormat = num.toLocaleString("de-DE"); // '1.234.567,89'

// Currency formatting
const usdCurrency = num.toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
}); // '$1,234,567.89'

const eurCurrency = num.toLocaleString("de-DE", {
  style: "currency",
  currency: "EUR",
}); // '1.234.567,89 €'

// Percentage formatting
const percentage = (0.1234).toLocaleString("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
}); // '12.34%'

// Compact notation
const compactNumber = (1234567).toLocaleString("en-US", {
  notation: "compact",
}); // '1.2M'

// ========================================
// BigInt Operations
// ========================================
const bigNum1 = 123456789012345678901234567890n;
const bigNum2 = 987654321098765432109876543210n;

const bigSum = bigNum1 + bigNum2;
const bigProduct = bigNum1 * bigNum2;

// Converting between BigInt and Number
const bigFromNumber = BigInt(123);
const numberFromBig = Number(123n); // Be careful with large values!

// ========================================
// Math Functions
// ========================================
const mathExamples = {
  max: Math.max(1, 5, 3), // 5
  min: Math.min(1, 5, 3), // 1
  random: Math.random(), // random number 0-1
  abs: Math.abs(-10), // 10
  sqrt: Math.sqrt(16), // 4
  pow: Math.pow(2, 3), // 8
  sign: Math.sign(-5), // -1
  floor: Math.floor(4.7), // 4
  ceil: Math.ceil(4.1), // 5
};

// ========================================
// Safe Number Handling
// ========================================
const MAX_SAFE = Number.MAX_SAFE_INTEGER; // 9007199254740991
const MIN_SAFE = Number.MIN_SAFE_INTEGER; // -9007199254740991

const safeAdd = (a, b) => {
  const result = a + b;
  if (!Number.isFinite(result)) {
    throw new Error("Result is not finite");
  }
  return result;
};

const safeParseInt = (str) => {
  const num = parseInt(str);
  return Number.isNaN(num) ? null : num;
};

// ========================================
// Crypto/Financial Number Formatting
// ========================================
const formatCryptoPrice = (price, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(price);
};

const formatPercentage = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "always",
  }).format(value / 100);
};

const formatLargeNumber = (value) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
};

// ========================================
// Common Pitfalls and Solutions
// ========================================

// DON'T: Use == for number comparison
// if (0.1 + 0.2 == 0.3) // false

// DO: Use === and handle precision
const numbersEqual = (a, b, epsilon = 0.0001) => {
  return Math.abs(a - b) < epsilon;
};

// DON'T: Use global isNaN()
// isNaN('hello') // true (converts to NaN first)

// DO: Use Number.isNaN()
// Number.isNaN('hello') // false

// DON'T: Forget radix in parseInt
// parseInt('08') // might be 0 in old browsers

// DO: Always specify radix
// parseInt('08', 10) // 8

// ========================================
// Utility Functions
// ========================================
const numberUtils = {
  // Clamp number between min and max
  clamp: (num, min, max) => Math.min(Math.max(num, min), max),

  // Generate random integer between min and max (inclusive)
  randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

  // Round to specific decimal places
  roundTo: (num, decimals) =>
    Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals),

  // Check if number is even
  isEven: (num) => num % 2 === 0,

  // Check if number is odd
  isOdd: (num) => num % 2 !== 0,

  // Convert degrees to radians
  toRadians: (degrees) => degrees * (Math.PI / 180),

  // Convert radians to degrees
  toDegrees: (radians) => radians * (180 / Math.PI),
};

// ========================================
// Examples Usage
// ========================================

// Crypto price formatting
console.log(formatCryptoPrice(0.00012345)); // "$0.00012345"
console.log(formatCryptoPrice(45000.123)); // "$45,000.12"

// Percentage formatting
console.log(formatPercentage(5.67)); // "+5.67%"
console.log(formatPercentage(-2.34)); // "-2.34%"

// Large number formatting
console.log(formatLargeNumber(1234567890)); // "1.23B"

// Safe operations
try {
  const result = safeAdd(Number.MAX_VALUE, Number.MAX_VALUE);
} catch (error) {
  console.log(error.message); // "Result is not finite"
}

// Utility examples
console.log(numberUtils.clamp(15, 0, 10)); // 10
console.log(numberUtils.randomInt(1, 6)); // Random 1-6
console.log(numberUtils.roundTo(3.14159, 2)); // 3.14
console.log(numberUtils.isEven(4)); // true
console.log(numberUtils.toRadians(90)); // 1.5707963267948966
