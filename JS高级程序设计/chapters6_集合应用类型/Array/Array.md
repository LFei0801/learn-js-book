## 2.数组

JS 数组和其他语言数组区别主要有两点：

```javascript
/**
 * JS数组特性
 */

// 长度可变
arr1.push("green");
console.log(arr1); //[ 'red', 'blue', 'yellow', 'green' ]
// 可以存储任意类型的数据
const arr2 = [0, 1, 2, "string", true, undefined, { name: "jack" }];
console.log(arr2); //[ 0, 1, 2, 'string', true, undefined, { name: 'jack' } ]
```

- 数组可以存储任意类型的数据
- 数组长度是可变的

数组构造有两种：构造函数和数组字面量

```javascript
/***
 * 数组构造
 */

const arr0 = new Array("red", "blue", "yellow");
console.log(arr0); //[ 'red', 'blue', 'yellow' ]
const arr1 = ["red", "blue", "yellow"];
console.log(arr1); //[ 'red', 'blue', 'yellow' ]
```

**数组构造函数有两个方法：from 和 of**

1. **from**可以将**类数组结构**转换为**数组**
2. **of**可以将**一组参数**转换为**数组**

### 2.1 Array.form()

类数组结构即任何可以迭代的结构或者有一个 length 属性和可以索引元素的结构

**将字符串转为数组**

```javascript
console.log(Array.from("Matt")); //[ 'M', 'a', 't', 't' ]
```

**实现数组浅拷贝**

```javascript
// 数组是引用类型，所有直接复制给另一个变量的话是深拷贝
const a1 = [2, 3, 4, 5];
const a2 = a1;
a2[0] = 3;
console.log(a1); //[ 3, 3, 4, 5 ]
console.log(a2); //[ 3, 3, 4, 5 ]
```

实现数组浅拷贝

```javascript
// 浅拷贝
const a3 = Array.from(a1);
console.log(a3);
a3[0] = 5;
console.log(a3); //[ 5, 3, 4, 5 ]
console.log(a1); //[ 3, 3, 4, 5 ]
console.log(a2); //[ 3, 3, 4, 5 ]
```

_from 可以将一切可迭代的对象转为数组类型，但是不建议使用将其作为对象转数组方法_

### 2.2 Array.of()

将参数转为数组

```javascript
console.log(Array.of(1, 2, 3, 4));
```

### 2.3 Array.isArray(value)

判断一个值是否是数组类型

```javascript
const obj = {};
console.log(Array.isArray(obj)); // falsee
```

### 2.4 迭代器方法

有 3 个检测数组内容的方法

- keys() 返回数组的索引
- values() 返回数组元素值的迭代器
- entries() 返回索引/值对的迭代器

```javascript
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
```

可以使用 entries 方法结合解构语法十分方便的拆分键值对

```javascript
// 拆分键值对
for (const [k, v] of a4.entries()) {
  console.log(`kek->${k},value->${v}`); //kek->0,value->foo ....  kek->3,value->quz
}
```

### 2.5 栈方法

栈是一种后入先出的结构，只能在栈顶添加/删除数据，可以使用 push 和 pop 方法模拟栈结构

- push(values) 接受任意数量的参数并将他们添加到数组末尾，返回新数组的长度
- pop() 删除数组的最后一项,返回被删除的那一项

```javascript
/**
 * 栈方法
 */

const stack = [];
const len = stack.push(1, 2, 3, 4); //[ 1, 2, 3, 4 ]
console.log(len);
console.log(stack); //[ 1, 2, 3, 4 ]
const deleteEle = stack.pop();
console.log(deleteEle); //4
console.log(stack); //[ 1, 2, 3 ]
```

### 2.6 队列方法

队列是先入先出的方结构，队首删除数据，队尾添加数据，可以使用 push 和 shift 方法模拟队列

- shift 删除数组第一个元素，返回值是这个元素的值

```javascript
console.log("####队列方法####");
const queue = [];
const qLen = queue.push(1, 2, 3, 4);
console.log(qLen); //4
console.log(queue); //[ 1, 2, 3, 4 ]
const qDeleteEle = queue.shift();
console.log(qDeleteEle); //1
console.log(queue); //[ 2, 3, 4 ]
```

**循环队列**
循环队列是一种特殊的队列，从队首删除得元素会从队尾重新进入队列

```javascript
const loopQueue = [];
loopQueue.push(1, 2, 3, 4, 5, 6);
// 删除的元素重新入队
loopQueue.push(loopQueue.shift());
```

**反向队列**
队尾删除元素，队首添加数据，可以使用 unshift 和 pop 模拟反向队列

- unshift(values) 从数组开头添加数据

### 2.7 排序方法

- reverse() 将数组反序
- sort() 数组排序

reverse 方法是将数组反向排列

```javascript
const a5 = [1, 10, 15, 20, 35];
console.log(a5.reverse()); //[ 35, 20, 15, 10, 1 ]
```

但是如果要对数组元素进行排序则不太适用，因此需要 sort 方法

### 2.7.1 sort 方法

sort 方法默认按从小到大排序，但是其比较原则是按字符串比较大小

```javascript
const a5 = [1, 5, 10, 25, 20, 35];
console.log(a5.sort()); // 1, 10, 20, 25, 35, 5 ]
```

sort 可以传入一个回调函数，用来解决这个问题

- 如果 第一个参数排在第二个参数**前面**，则返回值是 **-1**
- 如果 第一个参数排在第二个参数**后面** 则 返回值是 **1**
- 如果 **不改变次序** 则 返回值是 **0**

```javascript
/**
 * 从小往大排序
 */
console.log(a5); //[ 1, 10, 20, 25, 35, 5 ]
a5.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
console.log(a5); //[ 1, 5, 10, 20, 25, 35 ]
```

### 2.8 操作方法

- concat() 合并数组，有了解构语法后，就很少用这个方法了
- slice() 数组切片，左闭右开，同字符串 slice 方法
- splice() 最强大的数组操作方法

**splice 方法**
splice 方法主要目的是插入元素，接受多个参数：

1. 第一个参数为开始位置
2. 第二个参数为删除元素的数量
3. 后面的参数为要插入的元素

splice 可以实现很多操作，比如删除，替换，插入

1. **删除元素**
   传入两个参数：删除的位置，删除的数量
   ```javascript
   const a6 = ["slice", "splice", "concat"];
   const deteleArr = a6.splice(1, 1); //删除a6[1] 这个元素
   console.log("d:", deteleArr, "a6:", a6); // d: [ 'splice' ] a6: [ 'slice', 'concat' ]
   ```
2. **插入元素**
   传入三个或更多个元素：开始位置，0，插入的元素
   ```javascript
   //a6: [ 'slice', 'concat' ]
   const insertArr = a6.splice(1, 0, "splice", "Array.from");
   console.log(insertArr); //[] splice始终返回删除的元素数组
   console.log("i:", deteleArr, "a6:", a6); //i: [ 'splice' ] a6: [ 'slice', 'splice', 'Array.from', 'concat' ]
   ```
3. **替换元素**
   传入三个或更多个参数：开始位置，删除元素数量，插入的元素
   ```javascript
   // a6: [ 'slice', 'splice', 'Array.from', 'concat' ]
   const replaceArr = a6.splice(1, 2, "hello world");
   console.log(replaceArr); //[ 'splice', 'Array.from' ]
   console.log(a6); //[ 'slice', 'hello world', 'concat' ]
   ```

### 2.9 搜索和位置方法

主要有五个方法：

1. indexof()
2. lastIndexof()
3. findIndex()
4. includes()
5. find()

1~3 方法都是查找元素索引，找到返回索引，没有返回-1；includes 方法是查看是否包含该元素，返回布尔值
**其中 indexof,lastIndexof,inclues 是严格相等所以有时候会出现奇怪问题**

```javascript
const alice = { name: "Alice", age: 12 };
const people = [{ name: "Alice", age: 12 }];
const morePeope = [alice];
```

当我查找 people 元素是否还有 alice 时，会出现查找不到的情况

```javascript
console.log(people.includes(alice)); //false
console.log(morePeople.includes(alice)); //true
```

因为是使用严格相等，所以会出现查找不到的情况,**建议使用 find 方法查找对象数组**

```javascript
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
```

### 2.10 迭代方法

- map()
- filter()
- forEach()
- every()
- some()

map、filter、forEach 经常使用，就不再记录。重点记录 every 和 some 两个方法

1. every() 是对数组每一项对运行传入的函数，如果每一项都符合条件则返回 true
2. some() 是如果有一项符合条件则返回 true

```javascript
/**
 * person = [
  { name: "jack", age: 18, gender: 0 },
  { name: "Alice", age: 22, gender: 1 },
  { name: "Bob", age: 23, gender: 0 },
  ];
 */

console.log(person.every((p) => p.age > 18)); //false
console.log(person.some((p) => p.age > 18)); //true
```

判断数组是否符合条件时，非常好用
