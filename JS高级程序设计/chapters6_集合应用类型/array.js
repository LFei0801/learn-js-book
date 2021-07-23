/***
 * 数组构造
 */

const arr0 = new Array("red", "blue", "yellow");
console.log(arr0); //[ 'red', 'blue', 'yellow' ]
const arr1 = ["red", "blue", "yellow"];
console.log(arr1); //[ 'red', 'blue', 'yellow' ]

/**
 * JS数组特性
 */

// 长度可变
arr1.push("green");
console.log(arr1); //[ 'red', 'blue', 'yellow', 'green' ]
// 可以存储任意类型的数据
const arr2 = [0, 1, 2, "string", true, undefined, { name: "jack" }];
console.log(arr2); //[ 0, 1, 2, 'string', true, undefined, { name: 'jack' } ]

/**
 * from() 和 of()
 * 类数组结构即任何可以迭代的结构或者有一个length属性和可以索引元素的结构
 */

// 1. 字符串转数组
console.log(Array.from("Matt")); //[ 'M', 'a', 't', 't' ]
console.log("Matt".split("")); //[ 'M', 'a', 't', 't' ]
// 2. 对现有数组进行浅复制
// 数组是引用类型，所有直接复制给另一个变量的话是深拷贝
const a1 = [2, 3, 4, 5];
const a2 = a1;
a2[0] = 3;
console.log(a1); //[ 3, 3, 4, 5 ]
console.log(a2); //[ 3, 3, 4, 5 ]
// 浅拷贝
const a3 = Array.from(a1);
console.log(a3);
a3[0] = 5;
console.log(a3); //[ 5, 3, 4, 5 ]
console.log(a1); //[ 3, 3, 4, 5 ]
console.log(a2); //[ 3, 3, 4, 5 ]

/**
 * Array.of()
 */
console.log(Array.of(1, 2, 3, 4, 5)); //[ 1, 2, 3, 4, 5 ]

/**
 * 迭代器方法
 */

const a4 = ["foo", "bar", "baz", "quz"];
console.log(a4.keys()); //Object [Array Iterator] {}
console.log(a4.values()); //Object [Array Iterator] {}
console.log(a4.entries()); //Object [Array Iterator] {}
for (const k of a4.keys()) {
  console.log(k); //0 1 2 3
}
for (const v of a4.values()) {
  console.log(v); //foo bar baz quz
}
for (const a of a4.entries()) {
  console.log(a); //[ 0, 'foo' ]  [ 1, 'bar' ] [ 2, 'baz' ] [ 3, 'quz' ]
}

// 拆分键值对
for (const [k, v] of a4.entries()) {
  console.log(`kek->${k},value->${v}`); //kek->0,value->foo ....  kek->3,value->quz
}

/**
 * 栈方法
 */
console.log("####栈####");
const stack = [];
const len = stack.push(1, 2, 3, 4); //[ 1, 2, 3, 4 ]
console.log(len);
console.log(stack); //[ 1, 2, 3, 4 ]
const deleteEle = stack.pop();
console.log(deleteEle); //4
console.log(stack); //[ 1, 2, 3 ]

/**
 * 队列方法
 */
console.log("####队列####");
const queue = [];
const qLen = queue.push(1, 2, 3, 4);
console.log(qLen); //4
console.log(queue); //[ 1, 2, 3, 4 ]
const qDeleteEle = queue.shift();
console.log(qDeleteEle); //1
console.log(queue); //[ 2, 3, 4 ]

/***
 * 循环队列
 */
console.log("####循环队列####");
const loopQueue = [];
loopQueue.push(1, 2, 3, 4, 5, 6);
// 删除的元素重新入队
loopQueue.push(loopQueue.shift());

/**
 * 反向队列
 */
console.log("####反向队列####");
const rQueue = [];
const rqLen = rQueue.unshift(1, 2, 3, 4);
console.log(rqLen); //4
console.log(rQueue); //[ 1, 2, 3, 4 ]
const rqDeleteEle = rQueue.pop();
console.log(rqDeleteEle); //4
console.log(rQueue); //[ 1, 2, 3 ]

/***
 * 排序方法
 */
console.log("####排序方法####");
const a5 = [1, 5, 10, 25, 20, 35];
console.log(a5.reverse()); //[ 35, 20, 25, 10, 5, 1 ]
console.log(a5.sort()); // 1, 10, 20, 25, 35, 5 ]
/**
 * 从小往大排序
 */
console.log(a5); //[ 1, 10, 20, 25, 35, 5 ]
a5.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
console.log(a5); //[ 1, 5, 10, 20, 25, 35 ]

/**
 * 操作方法
 */
const a6 = ["slice", "splice", "concat"];
const deteleArr = a6.splice(1, 1); //删除a6[1] 这个元素
console.log("d:", deteleArr, "a6:", a6); // d: [ 'splice' ] a6: [ 'slice', 'concat' ]
// a6: [ 'slice', 'concat' ]
const insertArr = a6.splice(1, 0, "splice", "Array.from");
console.log(insertArr); //[] splice始终返回删除的元素数组
console.log("a6:", a6); //a6: [ 'slice', 'splice', 'Array.from', 'concat' ]
// a6: [ 'slice', 'splice', 'Array.from', 'concat' ]
const replaceArr = a6.splice(1, 2, "hello world");
console.log(replaceArr); //[ 'splice', 'Array.from' ]
console.log(a6); //[ 'slice', 'hello world', 'concat' ]

/**
 * 搜索和位置方法
 */
console.log("####搜索和位置方法####");
const alice = { name: "Alice", age: 12 };
const people = [{ name: "Alice", age: 12 }];
const morePeople = [alice];
console.log(people.includes(alice)); //false
console.log(morePeople.includes(alice)); //true

const person = [
  { name: "jack", age: 18, gender: 0 },
  { name: "Alice", age: 22, gender: 1 },
  { name: "Bob", age: 23, gender: 0 },
];
// indexof,lastindexof,incledes一般用判断数组是否含有某个值
const Alice = { name: "jack", age: 18, gender: 0 };
console.log(person.includes(Alice)); //false  因为是使用严格相等，所以会出现查找不到的情况
// 建议使用find方法查找对象数组
console.log(person.find((p) => p.name === "Alice")); //{ name: 'Alice', age: 22, gender: 1 }

/**
 * 迭代方法
 */

/**
 * person = [
  { name: "jack", age: 18, gender: 0 },
  { name: "Alice", age: 22, gender: 1 },
  { name: "Bob", age: 23, gender: 0 },
  ];
 */

console.log(person.every((p) => p.age > 18)); //false
console.log(person.some((p) => p.age > 18)); //true
