# 变量、作用域与内存

- 理解原始值与引用值的区别
- 理解执行上下文和作用域
- 理解垃圾回收

## 一、 原始值与引用值

1. 原始值类型包括：undefined、Null、number、string、Symbol、Boolean

- 原始值大小固定，保存在栈内存上
- 从一个变量到另一个变量赋值 原始值会创建该值的第二个副本（浅拷贝）

2. 引用值类型为 Object

- 引用值保存在堆内存上
- 引用值变量实际上只包含指向相应对象的一个指针，而不是对象本身
- 引用值赋值给另一个变量，只会复制指针，因此结果时两个变量都指向同一个对象(深拷贝)

```javascript
let p1 = { name: "jack", age: 20 };
let p2 = p1;

/**
 * 只改变p2内部属性的情况下，p1内部属性也发生改变了
 * 原因是：p1是一个指针，指向{name,age}这个对象
 * p2=p1,即创建一个新指针，也指向{name,age}
 */
p2.name = "rose";
p2.age = 30;
console.log("p1->", p1); //p1-> { name: 'rose', age: 30 }
console.log("p2->", p2); //p2-> { name: 'rose', age: 30 }
```

```javascript
/**
 * 这种指针形式实现的深拷贝，如果机器断电，对象将不存在
 * 可以用JSON.parse(JSON.stringify(obj))来序列化对象，转换为字符串保存在磁盘上，然后再反序列化转为对象
 */

JSON.parse(JSON.stringify(p1));
```

```javascript
// 扩展运算符实现引用值浅拷贝
let a1 = { name: "joker", type: "老虎" };
let a2 = { ...a1 };
a2.name = "rose";
a2.type = "狮子";
console.log("a1->", a1); //a1-> { name: 'joker', type: '老虎' }
console.log("a2->", a2); //a2-> { name: 'rose', type: '狮子' }
```

### 3. ECMAScript 中所有函数的参数都是按值传递的，即浅拷贝

### 4. typeof 与 instanceof 的区别

typeof 虽然对原始值有用，然后对引用值不大

```javascript
const fn = () => {};
const arr = [];
const obj = {};
const reg = new RegExp();
// typeof
console.log(typeof fn); //function
console.log(typeof arr); //object
console.log(typeof obj); //object
console.log(typeof reg); //object
```

可以使用 instanceof 来解决这个问题

```javascript
// instanceof
console.log(arr instanceof Array); //true
console.log(obj instanceof Array); //false
console.log(obj instanceof Object); //true
console.log(reg instanceof RegExp); //true
```

## 二、 执行上下文

不是很懂~~~~~~

## 三、 垃圾回收

基本思路：确定哪个变量不会再使用，然后释放它占用的的内存。这个过程是周期性的，即垃圾回收程序每隔一段时间就是自动执行

垃圾回收策略：

- 标记清理
- 引用次数

**提高性能的方法：将内存占用量保持在一个较小的值**

1. 解除引用：保证在执行代码时只保存必要的数据，如果数据不再不要，就把它设置为 null,从而释放其引用

_注：解除引用不会自动导致一个值的引用被自动回收，而是确保相关的值已经不再上下文里了，因此它在下次垃圾回收时会被回收_

```javascript
function createPerson(name) {
  let localPerson = new Object();
  localPerson.name = name;
  return localPerson;
}

let globalPerson = createPerson("曹操");
/**
 * 在不需要globalPerson变量后解除引用
 */

globalPerson = null;
```

2. 通过 const 和 let 声明提升性能
3. 避免 Javascript 的“先创建再补充”式的动态属性赋值，并在构造函数中一次性声明所有属性
4. 静态分配和对象池

- 关键思路就是减少浏览器执行垃圾回收的次数，如果能够合理使用分配的内存，同时避免多余的垃圾回收，就可以保住因释放内存而损失的性能
- 浏览器何时运行垃圾回收程序的一个标准就是对象更替速度
  可以看这个程序：

  ```javascript
  // 创建一格矢量类
  class Vector {}
  // 二维矢量加法
  function addVector(a, b) {
    let ret = new Vector();
    ret.x = a.x + b.x;
    ret.y = a.y + b.y;
    return ret;
  }
  ```

  这个程序先创建一个对象，然后修改它，再返回给调用者。如果这个加法被频繁调用，那么垃圾回收程序会发现这里的对象更迭非常快，从而频繁安排垃圾回收

  解决办法：让这个程序使用一个已有的矢量对象

  ```javascript
  function addVector(a, b, vector) {
    vector.x = a.x + b.x;
    vector.y = a.y + b.y;
    return vector;
  }
  ```

  何时实例化这个参数 vertor 从而不让垃圾回收程序顶上？
  可以使用对象池，在初始化的某一刻，可以创建一个对象池，用来管理一组可回收的对象
