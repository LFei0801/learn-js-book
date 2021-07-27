// 使用一个构造函数创建一个空映射
const m = new Map();
console.log(m); //{}
// 可以在构造函数中传入参数的形式来添加映射
const m1 = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);
console.log(m1); //{ 'key1' => 'value1', 'key2' => 'value2' }

/**
 * key 可以是任意类型的数据
 */

/**
 *[Function (anonymous)] => 'function',
  1 => 'number',
  { name: 12 } => 'Object'
 */
const m3 = new Map([
  [() => {}, "function"],
  [1, "number"],
  [{ name: 12 }, "Object"],
]);
console.log(m3);

/**
 * Object只能存储字符串类型的key
 */
const o = {
  1: "number 1",
  1: "string 1",
};
console.log(o[1]); //string 1
console.log(o["1"]); //string 1

/**
 * 增删改查
 */

// 使用set增减键值对
const m4 = new Map();
m4.set("first", 1);
m4.set("second", 2);
console.log(m4); //{ 'first' => 1, 'second' => 2 }
m4.set("jack", { name: "jack", age: 12 }).set("rose", {
  name: "rose",
  age: 13,
});
console.log(m4); //  'jack' => { name: 'jack', age: 12 },'rose' => { name: 'rose', age: 13 }
console.log(m4.get("first")); //1
console.log(m4.get("second")); //2

const m5 = new Map();
const obj = { name: "syn" };
const fn = () => {};

m5.set(obj, "object value");
m5.set(fn, "function value");

console.log(m5.get(obj)); //object value
console.log(m5.get({ name: "syn" })); //undefined
console.log(m5.get(fn)); //function value
console.log(m5.get(() => {})); //undefined

console.log(m5.has(obj)); //true
console.log(m5.size); //2

/**
 * 修改数据
 */

// 引用类型的值
const pMap = new Map();
pMap.set("rose", { name: "ROSE" });
console.log(pMap); // { 'rose' => { name: 'ROSE' }
const rose = pMap.get("rose");
rose.name = "rose";
console.log(pMap); //{ 'rose' => { name: 'rose' }

// 原始类型的值
const sMap = new Map();
sMap.set("number", 1);
let n = sMap.get("number");
n = 2;
console.log(sMap); //{ 'number' => 1 }
sMap.set("number", n);
console.log(sMap); // { 'number' => 2 }
