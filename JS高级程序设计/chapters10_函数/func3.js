function getSum() {
  return [...arguments].reduce((count, item) => (item += count), 0);
}

console.log(getSum(...[1, 2, 3, 4])); //10
console.log(getSum(...[1, 23])); //24

// 先调用
const ret = add(1, 2);
console.log(ret); //3
// 后声明
function add(num1, num2) {
  return num1 + num2;
}

// 会出错
// doAdd(1, 2);
// const doAdd = (num1, num2) => num1 + num2;

function callSomeFunction(someFunction, ...someArugments) {
  return someFunction(someArugments);
}

function sum(values) {
  return values.reduce((count, item) => (count += item), 0);
}

function greeting(name) {
  console.log(`Hello ${name}`);
}
console.log(callSomeFunction(sum, 1, 2, 3)); //6
callSomeFunction(greeting, "jack"); //Hello jack

function createCallFunction(num1, num2) {
  return () => num1 + num2;
}

const func = createCallFunction(1, 2);
console.log(func); //[Function (anonymous)]
console.log(func()); //3

function createCompareFunc(propName) {
  return (object1, object2) => {
    let value1 = object1[propName];
    let value2 = object2[propName];
    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  };
}

const data = [
  { name: "Nero", age: 12 },
  { name: "Rose", age: 18 },
  { name: "Jack", age: 15 },
];
data.sort(createCompareFunc("name"));
console.log(data);
/**
 * [
  { name: 'Jack', age: 15 },
  { name: 'Nero', age: 12 },
  { name: 'Rose', age: 18 }
]
 */
