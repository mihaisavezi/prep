// Input: [16, 17, 4, 3, 5, 2]
// Output: [17, 5, 2]

// Explanation:
// 16 is not a leader (17 > 16 on the right)
// 17 is a leader (all elements to right: 4,3,5,2 are smaller)
// 4 is not a leader (5 > 4 on the right)
// 3 is not a leader (5 > 3 on the right)
// 5 is a leader (only 2 to the right, and 5 > 2)
// 2 is a leader (rightmost element)


/** 
 * 
 * approach:
 * 
 * brute force,
 * 
 * check all elements against all the elements to their right
 * 
 * 
 */

function findLeadersNaive(arr) {
    let leaders = [];

    if(arr.length === 1) return arr;


    for(let i = 0; i < arr.length; i++) {
        let isLeader = true;

        for(let j = i + 1; j < arr.length; j++) {
            if(arr[j] >= arr[i]) {
                isLeader = false;
                break;
            }
        }
        

        if(isLeader) {
            leaders.push(arr[i])
        }
    }

    return leaders;
}


// Input: [16, 16, 17, 4, 3, 5, 2]
/**
 * 2 => leader, max
 * 5 => newMax => leader
 * 3 < newMax => NOT leader
 * 4 < newMax => NOT leader
 * 17 > newMax => newMax = 17 = leader
 *
 * 
 * 
 */

function findLeaders(arr) {

    if(arr.length === 0) return [];

    let leaders = [arr[arr.length - 1]];
    let max = arr[arr.length - 1];


    for(let i = arr.length - 2; i >= 0; i--) {
        if(arr[i] > max) {
            max = arr[i]
            leaders.push(arr[i])
        }
    }

    return leaders.reverse()
}


export {
    findLeaders,
    findLeadersNaive
}
