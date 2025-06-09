/**
 * prices[]
 * prices[i] price of given stock on i day
 * 
 * maximize profit -> choose a single day to buy stock and a diffrent day in the future to sell stock
 * if no profit return 0
 * 
 * e.g. prices = [7, 1, 5, 3, 6, 4]
 * 
 * 
 * buy on day 2 and sell on day 5 [1, 5]
 * 
 * 
 * 
 * v0.2
 * buy - min
 * sell - max
 * profit - max - min
 * 
 * min = prices[0]
 * profit = 0;
 * 
 * i = 1
 * 
 * prices[i] < min;
 * 
 * min = prices[i] = 1
 * profit = Math.max(profit, prices[i] - min) = 0
 *
 * 
 * i = 2
 * 
 * profit = 5 - 1 = 4;
 * 
 * ...
 * 
 * i = 4
 * 
 * profit = Math.max(4, 6 - 1) = 5
 * 
 * 
 * 
 * v0.1
 * two pointers one starts on i, one on i+1;
 * 
 * i = 0
 * j = 1
 * 
 * p[i] = 7
 * p[j] = 1
 * 
 * p[j] < p[i] so we increment j
 * 
 * ...
 * 
 * i = 1
 * j= 2
 * 
 * p[i] = 1
 * p[j] = 5
 * 
 * maxProfit = p[j] - p[i] = 4
 * 
 * we increment j 
 * we look for a j that is bigger than 5;
 * 
 * j = 4 
 * p[j] = 6;
 * 
 * p[j] > currentMaxSellingPrice(5)
 * 
 * maxProfit = 5
 * 
 * ...
 * 
 * i = 2
 * i = 3
 * 
 * maxProfit = 5
 */

 
function getMaxProfit(prices) {
  let min, max, profit;


  min = prices[0]
  profit = 0;

  for(i = 1; i < prices.length; i++) {
    if(prices[i] < min) {
      min = prices[i]
    }

    profit = Math.max(profit, prices[i] - min);
  }

  return profit
}

/**
 * youtube approach
 *  
 * 
 * 1) BF - v0.1 - complexity O(n^2)
 * 2) optimal
 * 
 *  - buy at lowest, sell at highest
 *  - variables: buy; sell; profit
 * 
 * 
 * 
 */




// tests
console.log(`${5} = `, getMaxProfit([7, 1, 5, 3, 6, 4]));

