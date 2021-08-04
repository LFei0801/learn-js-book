const sum = (num1, num2) => num1 + num2;
console.log(sum(1, 2)); //3

const personFunc = (name, age, gender) => ({ name, age, gender });
const jack = personFunc("jack", 12, "男");
console.log(jack); //{ name: 'jack', age: 12, gender: '男' }

const arr = [1, 2, 3, 4];
const retArr = arr.filter((item) => item > 3);
const retArr1 = arr.filter(function (item) {
  return item > 3;
});
console.log(retArr); //[ 4 ]
console.log(retArr1); //[ 4 ]
