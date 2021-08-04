let sum = (num1, num2) => num1 + num2;
let anthorSum = sum;
console.log(sum(1, 2)); //3
console.log(anthorSum(1, 2)); //3

anthorSum = (num1, num2) => num1 - num2;
console.log(sum(1, 2)); //3
console.log(anthorSum(1, 2)); //-1
