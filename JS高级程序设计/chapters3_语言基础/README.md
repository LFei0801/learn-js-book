# 基础部分

主要记录了一下之前写 JS 时的一些疑问点，以及一些常用 API

## 一、 let、const、var

- let、const 是 ES6 提出来的新的声明变量关键字
- 不再推荐使用 var
- 尽量使用 const，只有确保变量在之后会修改时候才使用 let

### 1. let 与 var

- let 和 var 声明的都是变量，后续都可以修改其值

```javascript
var message = "hello";
message = 1;
let name = "Jack";
name = "rose";
```

- var 作用域是函数作用域，这样会导致一些很怪异的现象

```javascript
for (var i = 0; i < 10; i++) {
  console.log(i); //0,1,2,3……,9
}
console.log(i); //10
```

因为是函数作用域，所有 i 这个变量会作用到 for 循环外

- let 作用域是块作用域，这样就跟其他语言类似了

```javascript
for (let i = 0; i < 10; i++) {
  console.log(i); //0,1,2,3,4,5……,9
}
console.log(i); //error:i 未定义
```

- var 会有变量提升的现象，let 不会有
- var 声明的变量会成为全局作用域 window 对象的属性，let 声明的变量不会有

```javascript
var name = "jack";
console.log(Window.name); //jack
let age = 18;
console.log(Window.age); //undefind
```

### 2.const

- const 声明的是常量，必须在声明变量的同时初始化变量
- 常量不可再修改
- 也是块作用域

```javascript
const age = 36;
age = 23; //TypeError
```

- const 不允许重复声明同一变量

```javascript
const name = "Jack";
const name = "error"; //syntaxError
```

- const 声明的变量如果是引用类型，可以修改其内部值
  **因为 const 声明的限制只适用于它指向变量的引用**

```javascript
const obj = { name: "jack", age: 18 };
obj.name = "rose"; //允许
// 但是不能再赋值obj
obj = {name:"rose",age="19"} //Assignment to constant variable.
```

### 3. 声明风格

1. 不使用 var
2. const 优先使用、let 次之

## 二、 值类型

ESMAScript 有 7 中原始类型：

1. Undefined
2. Null
3. Boolean
4. Number
5. String
6. Symbol
7. Object

_注意这里没有 Array 和 function,因为 array 和 function 都是 Object 类型_

**可以使用 typeof 来检测变量是哪一种原始类型**

### 1. undefined

当使用 let 声明变量但未初始化变量时，就相当于给变量赋予了 undefined,所以没必要显示给某个变量赋值 undefined

```javascript
let name;
console.log(name); //undefined
```

**注意使用 tepeof 检测未初始化值的变量时会显示 undefind,但是检测未声明的变量时仍然是 undefind**

```javascript
let name;
console.log(typeof name); //undefined
console.log(typeof age); //undefined
```

**解释：虽然严格来讲 name 和 age 存在根本性差异，但它对任何一格变量都不可能执行什么真正的操作**

### 2. Null

null 从逻辑上来讲是一个空对象指针，因此当声明一个对象值但是不知道其赋予什么值时，使用 null 来声明

```javascript
let animal = null;
```

### 3. Boolean

#### 其他类型与布尔类型转换对应：

1. 非空字符串--->true, 空字符--->false
2. 非零数值--->true, 0、NAN--->false
3. 任意对象--->true, null --> false
4. N/A 不存在 ---> true, undefined ---> false

### 4. Number

NAN:表示 不是数值，用来表示本来要返回数值的操作失败了

- 常用 API
- parseInt(string) 将字符串转化为整数
- parseFloat(string) 将字符串转化为浮点数
- Math.random() 获取 0,1 之间的随机数（不包括 1）
- Math.floor() 向下取整
- Math.round() 四舍五入
- Math.ceil() 向上取整
- toFixed(n) 保留 n 位小数，注意返回的是字符串

### 5.字符串

**其他类型转字符串**：

1.  toString(): 适用于数值、布尔值、对象和字符串；null,undefind 不适用于此方法

- toString(number):表示将转化为几进制的数字，用于数字转字符串
  _注：对象转字符串最好用 JSON.stringify 方法_

```javascript
// toStrig() 返回当前值的字符串等价物
let age = 11; //11
console.log(age.toString());
let flag = true; //true
console.log(flag.toString());
let obj = { name: "jack", age: 11 };
console.log(obj.toString()); //[object Object]
console.log(JSON.stringify(obj)); //{"name":"jack","age":11}
```

2. 如果不确定一个值是不是 null 或者 undefind 类型可以使用 String()函数：

- 如果该值有 toString(),则调用该方法
- 如果是 null 返回 "null"
- 如果是 undefind 则返回 "undefined"

#### 字符串与数组

使用 string.split("")方法将字符串转为数组类型

- 如果是 split(""),则将字符串每个字符都分为数组中的一项
- 如果是 split("任意符串"), 则将字符串整体作为数组中的一项

```javascript
const string = "abcdef";
console.log(string.split("")); // [ 'a', 'b', 'c', 'd', 'e', 'f' ]
console.log(string.split("!")); // [ 'abcdef' ]
console.log(string.split("||")); // [ 'abcdef' ]
```

使用 join()方法将数组转为字符串类型

- join()不带参数则默认以逗号分割数组每一项然后转化为字符串
- join("符号") 表示以该符号分割数组每一项
- join("") 表示以空字串分割数组每一项

**获取随机颜色**

```javascript
// 获取随机颜色
function getRandomColor() {
  let color = "#";
  const allTypeArr = "abcdefg0123456789".toUpperCase().split("");
  for (let i = 0; i < 6; i++) {
    const random = allTypeArr[Math.floor(Math.random() * allTypeArr.length)];
    color += random;
  }
  return color;
}

console.log(getRandomColor()); //#E70G2F
console.log(getRandomColor()); //#2D8A84
console.log(getRandomColor()); //#0A9749
console.log(getRandomColor()); //#1EAA7B
```

```javascript
const arr = ["a", "b"];
console.log(arr.join("")); //ab
console.log(arr.join(",")); //a,b
console.log(arr.join("|")); //a|b
console.log(arr.join("\\")); //a\b
```

#### 模板字符串

### 6. Symbol() 类型
