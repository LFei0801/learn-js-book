/**
 * 创建对象
 */

// 构造函数创建对象
const obj = new Object();
obj.name = "jack";
console.log(obj); //{ name: 'jack' }

// 对象字面量构造函数
const obj1 = {
  name: "jack",
};
console.log(obj); //{ name: 'jack' }

/***
 * 访问对象属性
 */
const person = {
  name: "jack",
  age: 2,
  gender: "男",
};
console.log(person.age);
console.log(person["age"]);
const gender = "gender";
console.log(person.gender); //男
console.log(person[gender]); //男
