const fn = () => {};
const arr = [];
const obj = {};
const reg = new RegExp();

// typeof
console.log(typeof fn); //function
console.log(typeof arr); //object
console.log(typeof obj); //object
console.log(typeof reg); //object

// instanceof
console.log(arr instanceof Array); //true
console.log(obj instanceof Array); //false
console.log(obj instanceof Object); //true
console.log(reg instanceof RegExp); //true
