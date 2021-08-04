# 函数

- 函数表达式
- 默认参数及扩展操作符
- 使用函数实现递归
- 使用闭包实现私有变量

函数实际上是对象，每个函数都是 Function 类型的实例，而 Function 也有属性和方法，和其他类型一样。<br>
因为函数是对象，所以函数名就是指向函数对象的指针

```javascript
function sum(num1, num2) {
  return num1 + num2;
}
```

这里实际上就是定义了一个 sum 并将其初始化为一个函数，这个函数可以通过 sum 来引用。<br>
这段代码也可以用**函数表达式**来声明

```javascript
const sum = function (num1, num2) {
  return num1 + num2;
};
// 箭头函数
const sum = (num1, num2) => num1 + num2;
```

## 1. 箭头函数

箭头函数是 ES6 新增的定义函数的方式。

```javascript
// 箭头函数形式
const sum = (num1, num2) => {
  return num1 + num2;
};
// 函数字面量形式
function sum(num1, num2) {
  return num1 + num2;
}
```

### 1.1 箭头函数的特点

箭头函数可以不需要括号{}，省略{}后，箭头后面只能有一行代码，此时会隐式返回这行代码的值

```javascript
const sum = (num1, num2) => num1 + num2;
console.log(sum(1, 2)); //3
```

当返回值是对象时，需要使用()包裹

```javascript
const personFunc = (name, age, gender) => ({ name, age, gender });
const jack = personFunc("jack", 12, "男");
console.log(jack); //{ name: 'jack', age: 12, gender: '男' }
```

### 1.2 箭头函数的用处

箭头函数使得函数的写法更加简洁，特别适用于回调函数，比如，函数的迭代方法中传入的回调函数：

```javascript
const arr = [1, 2, 3, 4];
const retArr = arr.filter((item) => item > 3);
const retArr1 = arr.filter(function (item) {
  return item > 3;
});
console.log(retArr); //[ 4 ]
console.log(retArr1); //[ 4 ]
```

使用箭头函数明显比普通函数更加简洁

### 1.3 箭头函数的缺点

箭头函数不能使用 arguments,super 和 new.target,也不能作为构造函数，此外箭头函数没有 prototype 属性

## 2. 函数名

函数名就是指向函数的指针，因此一个函数可以由多个函数名

```javascript
const sum = (num1, num2) => num1 + num2;
const anthorSum = sum;
console.log(sum(1, 2)); //3
console.log(anthorSum(1, 2)); //3
```

注意**函数名后不加括号表示访问该函数指针**，加括号表示调用该函数<br>

```javascript
let sum = (num1, num2) => num1 + num2;
let anthorSum = sum;
console.log(sum(1, 2)); //3
console.log(anthorSum(1, 2)); //3

anthorSum = (num1, num2) => num1 - num2;
// sum没有收到影响
console.log(sum(1, 2)); //3
console.log(anthorSum(1, 2)); //-1
```

当修改了*anthorSum*时，*sum*没有收到影响

## 3. 理解参数

JS 函数既不关心传入的参数个数，也不关心传入的参数数据类型。

```javascript
function sum(num1, num2) {
  return num1 + num2;
}

console.log(sum(1, 2, 3)); //3
console.log(sum("sn1", "sn2", 1, 2, 3, 4)); //sn1sn2
```

这是因为在 ECMAScript 内部的参数表现为一个数组。函数被调用时总会接受一个数组 arguments

```javascript
function sumAruments() {
  return arguments[0] + arguments[1];
}

console.log(sumAruments(1, 2)); //3
```

### 3.1 函数声明中的 arguments 对象

argument 对象可以跟命名参数一起使用

```javascript
function doAdd(num1, num2) {
  if (arguments.length === 1) {
    return num1 + 10;
  } else {
    return arguments[0] + num2;
  }
}

console.log(doAdd(1)); //11
console.log(doAdd(1, 2)); //3
```

aruments 中的值会于对象的命名参数同步，也就是说，修改 argumnets 中的值，会影响到命名参数的值

```javascript
function add(num1, num2) {
  arguments[1] = 10;
  return arguments[0] + num2;
}
console.log(add(1, 2)); //11
```

### 3.2 箭头函数中的参数

如果函数是使用箭头语法定义的，那么传给函数的参数将不能使用 argments 关键字访问，而只能通过定义的命名参数访问

```javascript
function foo() {
  console.log(arguments[0]);
}
const bar = () => {
  console.log(arguments[0]);
};
foo(3); //3
bar(3); //{}
```

### 3.3 没有重载

正是由于 ECMAScript 中的参数特性，所有 JS 中没有重载

### 3.4 默认参数

ES5 中实现默认参数的一种常见方式就是检测某个参数是否等于 undefined

```javascript
function making(name) {
  name = typeof name !== "undefined" ? name : "Jack";
  console.log(name);
}
making(); //Jack
making("Rose"); //Rose
```

ES6 中不用这么麻烦，可以显示定义默认参数，只要在函数定义中的参数后面用=就可以为参数传入一个默认参数了

```javascript
function newMaking(name = "Jack") {
  console.log(name);
}
newMaking(); //Jack
newMaking("Rose ES6"); //Rose ES6
```

## 4. 参数扩展与收集

可以使用扩展运算符来给函数传递参数<br>
比如累加函数，实现参数的累加

```javascript
function getSum() {
  return [...arguments].reduce((count, item) => (item += count), 0);
}

console.log(getSum(...[1, 2, 3, 4])); //10
console.log(getSum(...[1, 23])); //24
```

**本质是利用函数参数的 argumnets 类数组来一次性传递多个参数**

## 5. 函数声明与函数表达式

函数声明即用**function**关键字声明的一个函数，函数表达式即是用=将一个函数名复制给一个匿名函数或者箭头函数<br>
**函数声明**形式的函数会自动实现函数声明提升，即先调用函数，在声明函数是没有问题的

```javascript
// 先调用
const ret = add(1, 2);
console.log(ret); //3
// 后声明
function add(num1, num2) {
  return num1 + num2;
}
```

**函数表达式没有函数声明提升**，因此不能先调用在声明函数

```javascript
// 会出错
doAdd(1, 2);
const doAdd = (num1, num2) => num1 + num2;
```

## 6. 函数作为值

因为函数名就是指向函数的一个指针，因此可以在函数中传入另一个函数，也可以在函数中返回另一个函数实现递归
**函数中传入另一个函数**

```javascript
// someAruments接受剩余参数
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
```

**返回另一个函数**
返回另一个函数这个特性非常有用，比如可以使用这个特性实现**函数柯里化**<br>
当函数名后面带括号时，比如**sum(1,2)**表示调用这个函数，但是我们有时候想给函数传递参数但不想立即调用它时，可以使用返回函数的方法来实现这个需求

```javascript
function createCallFunction(num1, num2) {
  return () => num1 + num2;
}
const func = createCallFunction(1, 2);
console.log(func); //[Function (anonymous)]
console.log(func()); //3
```

注意这个函数时返回一个匿名函数，第四行给这个函数传递两个参数但是没有执行这个函数，而是将这个匿名函数传递给了另外一个*func*对象，再通过*func*对象来调用这个匿名函数<br>
这种*柯里化函数*在**React**中经常用到<br>
<br>
比如传入一个对象数组，想根据对象数组中的某一个属性进行排序，此时可以使用这种方法实现

```javascript
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
```

## 7. this

在标准函数中，this 执行当前函数的调用者

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getName() {
    console.log("get->", this); //Person { name: 'Jack', age: 22 }
    return this.name;
  }
  setName(name) {
    console.log("set->", this);
    this.name = name;
  }
}

const p = new Person("Jack", 22);
console.log(p.getName()); //Jack
p.setName("Rose");
console.log(p.getName()); //Rose
```

箭头函数没有自己的 this,往往指向定义箭头函数的上下文，因此在 class 中箭头函数中的 this 往往指向类的实例化对象

## 8. call、bind 和 apply

函数也是对象，因此函数也有自带的方法，call 和 apply 就是自带的两个方法，都是以指定的 this 来调用函数，即会设置调用函数时函数体内 this 对象的值。<br>
bind 是 ES5 定义的新方法，bind()会创建一个新的函数实例，其 this 的值会被绑定到传给 bind()的对象

1. call() 传递参数必须为逗号分隔传递，第一个参数要指向的目标
2. apply() 传递参数必须为数组方式传递，第一个参数时要指向的目标
3. call 和 apply 都是立即执行，bind 不会立即执行函数

```javascript
function publicfun(height, age) {
  console.log(this);
  console.log(`name:${this.name}->age:${age} height:${height}cm`);
}

const obj1 = { name: "Alice" };
const obj2 = { name: "Bob" };

publicfun(188); //name:undefined-> height:188cm
publicfun.call(obj1, 199, 12); //name:Alice->age:12 height:199cm
publicfun.call(obj2, 180, 22); //name:Bob->age:22 height:180cm

publicfun.apply(obj1, [179, 23]); //name:Alice->age:23 height:179cm
// apply 以数组形式传递参数
```
