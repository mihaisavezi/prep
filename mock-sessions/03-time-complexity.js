// function test(inputArray) {
//     for(let i = 0; i < inputArray.length; i++) {
//         // ? Time complexity -> O(n)
//          for (let j = 0; i < inputArray.length; i++) {
//            // ? Time complexity ->
//          }
//     }



    // 2 O(n)
// }

// array 100 elemente => fn(array)  100 s
// array 100.000 elemente => fn(array) 100.000 s

// fibonaaci of n, al n-lea numar din secventa de numere
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
function fibonacci(n, m) {
    if (n < 2) {
        return n;
    }

    let prev = 0;
    let cur = 1;
    let value;


    for(let i = 2; i <= n; i++) {
        value = prev + cur;
        prev = cur;
        cur = value;
    }

    return cur;
}


console.log(fibonacci(6));
console.log(fibonacci(500));
