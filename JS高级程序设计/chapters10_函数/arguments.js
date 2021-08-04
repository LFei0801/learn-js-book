function sum(num1, num2) {
  return num1 + num2;
}

console.log(sum(1, 2, 3)); //3
console.log(sum("sn1", "sn2", 1, 2, 3, 4)); //sn1sn2

function sumAruments() {
  return arguments[0] + arguments[1];
}

console.log(sumAruments(1, 2)); //3

function doAdd(num1, num2) {
  if (arguments.length === 1) {
    return num1 + 10;
  } else {
    return arguments[0] + num2;
  }
}

console.log(doAdd(1)); //11
console.log(doAdd(1, 2)); //3

function add(num1, num2) {
  arguments[1] = 10;
  return arguments[0] + num2;
}
console.log(add(1, 2)); //11

function foo() {
  console.log(arguments[0]);
}
const bar = () => {
  console.log(arguments[0]);
};
foo(3); //3
bar(3); //{}
