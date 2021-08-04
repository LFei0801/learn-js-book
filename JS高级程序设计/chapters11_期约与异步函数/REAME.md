# Promise 与 异步编程

1. 异步编程
2. Promise
3. 异步函数

## 1. 异步编程

异步行为是为了优化因计算量大而时间长的操作。如果在等待其他操作完成的同时，即使运行其他指令，系统也能保持稳定，那么这样做就是由意义的。

### 1.1 同步与异步

**同步行为**对应内存中顺序执行的处理器指令

```javascript
// 同步操作
let x = 3;
x = x + 4;
```

程序执行的每一步，都可以推断程序的状态，这是因为后面的指令总是在前面的指令完成后才执行<br>

**异步行为**类似于系统中断，即当前异步代码执行的同时外部代码也会执行

```javascript
let y = 3;
setTimeout(() => {
  y = y + 3;
  console.log(y);
}, 1000); //6
console.log(x);
```

程序会等待 1s 后才执行定时器里面的函数,也就是说先输出 x 的值，在输出 y 计算后的值，虽然**console.log(x)**在定时器下面。<br>
如果代码要访问一些高延迟的资源，比如向远程服务器发送请求并等待响应，那么就会出现长时间的等待，此时使用异步编程会不妨碍系统的运行。<br>

### 1.2 以往的异步编程

在早期的 JS 中，只支持定义回调函数来表明异步操作完成。比如下面这个代码：

```javascript
function double(value) {
  setTimeout(() => setTimeout(() => console.log(value * 2)), 1000);
}
double(3);
```

这个例子中，JS 运行时会把回调函数推到自己的消息队列上去等待执行，推到队列后，回调函数什么时候出列被执行对 JS 代码时完全不可见的。也就是说如果在异步函数中想要拿到一个值，这是非常困难的。

```javascript
// 无法拿到 value * 2后的结果
function double(value) {
  setTimeout(() => {
    value *= 2;
  }, 1000);
  return value;
}
const ret = double(3);
console.log(ret); //3
```

也就是说，**假如 setTimeout 操作会返回一个值，有什么办法可以把这个值传给需要他的地方？** <br>

**1.给异步操作提供一个回调，这个回调中包含要使用异步返回值的代码**

```javascript
// 提供回调函数取到异步操作的值
function double(value, callback) {
  setTimeout(() => callback(value * 2), 1000);
}
// 6
double(3, (x) => console.log(x));
```

这里的 setTimeout 调用会告诉 JS 运行时在 1s 后把一个函数推到消息队列上，这个函数会有运行时负责一部调度执行。

**2.失败处理**
异步操作的失败处理在回调函数模型中也要考虑，因此自然出现了成功回调和失败回调

```javascript
function double(value, success, error) {
  setTimeout(() => {
    try {
      if (typeof value !== "number") {
        throw new Error("value must be a number");
      }
      success(value * 2);
    } catch (e) {
      error(e);
    }
  }, 1000);
}
const successCallback = (x) => console.log(x);
const errorCallback = (e) => console.log(e);
double(3, successCallback, errorCallback);
double("b", successCallback, errorCallback);
```

这种模式已经不可取，因为必须在初始化异步函数时定义回调。
<br>
随着回调函数一步一步嵌套，回调地狱就产生了，维护代码非常困难。

## 2. Promise 期约

Promise 是 ES6 新增的引用类型，可以通过 new 操作符来实例化。Promise 是一个有状态的对象，可以有如下 3 个状态：

1. 待定 pending
2. 兑现 resolved
3. 拒绝 rejected
   **pending 待定**是 Promise 对象的初始状态，可以转化为**兑现状态**或者**拒绝状态**，这是转换过程是**不可逆的**，状态转换，是通过其内部的两个函数*resolve*和*reject*实现的。<br>

- resolve() 会转换为 兑现状态
- reject() 会转换为 拒绝状态

```javascript
const p = new Promise((resolve, reject) => {});
console.log(p); //Promise { <pending> }
```

换句话说，promise 像一个生产者，当在生产过程中就是待定状态，生产结束出来结果后，就通过 resolve 和 reject 来通知生产是否完成

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve("Success");
});
console.log(p1); //Promise { 'Success' }

const p2 = new Promise((resolve, reject) => {
  reject("failed");
});
console.log(p2); //Promise { <rejected> 'failed' }
```

返回的状态通过**then 方法**来处理返回的结果，then 方法有两个方法，一个处理成功的状态，一个处理失败的状态

```javascript
const p3 = new Promise((resolve, reject) => {
  // const value = 3;
  const value = 4;
  if (value > 3) {
    resolve(value);
  } else {
    reject(`${value} <= 3`);
  }
});
p3.then(
  (value) => {
    console.log(value); //4
  },
  (err) => {
    console.log(err); //3 <= 3
  }
);
```

### 2.1 理解 Promise 同步

Promise 里面的代码时同步执行的，即:

```javascript
new Promise((resolve, reject) => {
  //同步代码;
});
```

同步代码里面的代码是同步执行的，而 reject、resolve 改变了 promise 状态之后会将代码放到一个**微任务队列中**执行；**setTimeout 等定时器**是将任务放到宏任务队列中执行。<br>
由于 JS 是单线程语言，有一个任务轮询的机制，这个机制实际上就是一个优先级队列，同步代码>微任务代码>宏任务代码。

```javascript
/**
 * 执行结果：
 *    promise
      同步代码
      then
      setTimeout
 */
setTimeout(() => {
  console.log("4.setTimeout");
}, 0);
new Promise((resolve, reject) => {
  resolve();
  console.log("1.promise");
}).then((value) => {
  console.log("3.then");
});
console.log("2.同步代码");
```

这个例子中，由于 promise 里面的代码是同步执行的，因此*1.promise*会加入主队列中，之后*2.同步代码*也是同步代码，再将其加入主队列中；由于*resolve()*是微任务队列，因此它的优先级高于 setTimeout 代码，先入队。<br>
因此队列顺序如下：promise->同步代码->then->setTimeout<br>
根据队列特点，先入先出原则，打印结果就显而易见了。

### 2.2 then 返回值的处理技巧

then 的返回值也是一个 promise 对象

```javascript
const t = new Promise((resolve, reject) => {
  resolve("success");
}).then((value) => console.log(value));

console.log(t); //Promise { <pending> }
```

这意味着 then 方法可以链式调用

```javascript
new Promise((resolve, reject) => {
  resolve("resolse");
})
  .then((data) => {
    return data;
  })
  .then((data) => {
    console.log("第二个then里的输出：", data);
  });
// 第二个then里的输出： resolse
```

如果 then 方法返回的不是一个 promise 对象时,只要改数据里面包含了 then 方法，那么 then 方法同样可以使用这中链式调用：

```javascript
new Promise((resolve, reject) => {
  resolve("成功了");
})
  .then((data) => {
    return class Person {
      static then(resolve, reject) {
        resolve(data);
      }
    };
  })
  .then((data) => console.log(data)); //成功了
```

### 2.3 使用 Promise 封装异步请求

```javascript
function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = () => {
      if (this.status === 200) {
        resolve(JSON.parse(this.response));
      } else {
        reject("加载失败");
      }
    };
    xhr.onerror = () => {
      reject(this);
    };
  });
}
```

### 2.4 错误处理

promise 的 then 方法会接受两个方法，一个实现兑现状态的处理，一个实现拒绝状态的处理。<br>
then 方法也可以链式调用，但是如果中间有一个 then 方法接受 reject 状态同时没有写对应的处理方法，系统会抛出错误<br>
JS 为我们体统了 catch 方法 来统一处理错误状态

```javascript
new Promise((resolve, reject) => {
  // reject("1.拒绝");
  resolve();
})
  .then(() => {
    return new Promise((resolve, reject) => {
      reject("2.拒绝了");
    });
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      reject("3.拒绝了");
    });
  })
  .catch((err) => console.log(err)); //2.拒绝了
```

### 2.5 finally 关键字

finally 无论什么状态都会执行

## 3. Promise 的用处

Promise 可以很方便的封装一些异步函数，这一章会用 Promise 处理一些常见的场景

### 3.1 加载图片

需求：先加载图片，加载后成功再设置图片样式

```Javascript
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        resolve(image);
      };
      image.onerror = reject;
      document.body.appendChild(image);
    });
  }
  loadImage("download.jpg").then(
    (img) => {
      img.style.border = "10px solid #ddd";
    },
    (err) => {
      console.log(err);
    }
  );
```

### 3.2 封装 setTimeout

传统的 setTimeout 的形式是：

```javascript
setTimeout(() => {}, delay);
```

告诉 JS ，delay 事件后执行某些行为，这样写的不太直观，可以使用 Promise 封装一下，使得其更加直观

```javascript
function myTimeout(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

myTimeout(1000)
  .then(() => {
    console.log("1s后执行的行为");
    return myTimeout(1000);
  })
  .then(() => console.log("2s后执行的行为"));
```

这样就非常直观的表达了定时器的作用了

### 3.3 封装 setInterval 动画

需求：长方形从左外有移动，移动到最左边长方形变小。<br>
这是一个典型的动画，以往使用 setInterval 实现:

```javascript
function interval(callback, delay = 50) {
  const id = setInterval(() => callback(id), delay);
}
interval((timeId) => {
  // 向右移动方块
  const div = document.querySelector("div");
  let left = parseInt(getComputedStyle(div).left);
  div.style.left = left + 10 + "px";
  // 移动到400px 出停止移动
  if (left >= 400) {
    clearInterval(timeId);
    // 使得方块变窄
    interval((timeId) => {
      let width = parseInt(getComputedStyle(div).width);
      div.style.width = width - 10 + "px";
      if (width <= 50) {
        clearInterval(timeId);
      }
    }, 70);
  }
});
```

使用 promise 重新封装这个动画

```javascript
function interval(callback, delay = 50) {
  return new Promise((resolve, reject) => {
    const id = setInterval(() => callback(id, resolve), delay);
  });
}
// 移动方块
interval((id, resolve) => {
  const div = document.querySelector("div");
  let left = parseInt(getComputedStyle(div).left);
  div.style.left = left + 10 + "px";
  if (left >= 400) {
    clearInterval(id);
    resolve(div);
  }
})
  // 方块变窄
  .then((div) => {
    interval((id, resolve) => {
      let width = parseInt(getComputedStyle(div).width);
      div.style.width = width - 10 + "px";
      if (width < 50) {
        clearInterval(id);
        resolve(div);
      }
    })
      // 变色
      .then((div) => {
        div.style.backgroundColor = "red";
      });
  });
```

## 4. Promise 方法

Promise 是一种新增的对象类型，其自身自带一些方法

### 4.1 Promise.all()

批量处理数据，只要其中一个是 reject 状态，那么其接受的就 reject 状态，如果两个都是 resolve 状态，那么接受所有的数据

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve("p1 success ");
});

const p2 = new Promise((resolve, reject) => {
  resolve("p2 success");
});

const p3 = new Promise((resolve, reject) => {
  reject("p3 failed");
});

// [ 'p1 success ', 'p2 failed' ]
Promise.all([p1, p2])
  .then((values) => console.log(values))
  .catch((error) => console.log(error));

// p3 failed
Promise.all([p1, p3]).then(
  (values) => {
    console.log(values);
  },
  (error) => {
    console.log(error);
  }
);
```

可以使用 all 方法批量获取数据

```javascript
// 批量 获取 用户数据
function getUsers(names, url) {
  // ajax返回promise数据
  let promises = names.map((name) => ajax(`${url}?name=${name}`));
  return Promise.all(promises);
}
```

### 4.2 Promise.allSettled()

all()只要有一个是 reject 状态那么程序就会自动跳转到 reject 处理程序，忽略兑现状态的数据；<br>
allSettled()只要有一个是兑现状态的 promise，那么就会跳转到兑现处理程序，并且会定位 reject 的 promise,将其状态标识为 rejected。

```javascript
const p1 = new Promise((resolve, reject) => resolve("p1 success"));
const p2 = new Promise((resolve, reject) => resolve("p2 success"));
const p3 = new Promise((resolve, reject) => reject("p3 failed"));

/**
   *[
    { status: 'fulfilled', value: 'p1 success' },
    { status: 'fulfilled', value: 'p2 success' } 
  ]
 */
Promise.allSettled([p1, p2]).then(
  (values) => console.log(values),
  (error) => console.log(error)
);

/**
 * [
    { status: 'fulfilled', value: 'p1 success' },
    { status: 'rejected', reason: 'p3 failed' }
  ]
 */
Promise.allSettled([p1, p3]).then(
  (values) => console.log(values),
  (error) => console.log(error)
);
```

使用 allSettled 获取数据，数据不存在也会运行

```javascript
function getUsers(names, url) {
  let promises = name.map((name) => ajax(`${url}?name=${name}`));
  return Promise.allSettled(promises);
}
// 过滤不存在的数据
getUsers(["jack", "Alice", "Bob"], "http://localhost:3000").then((values) => {
  const users = values.filter((usr) => usr.status !== "rejected");
});
```

### 4.3 Promise.race()

同样批量获取数据，但是只接受数据处理快的 promise<br>
如果两个 Promise，一个是 resolve,一个是 reject,那么只接受 resolve 状态的数据

```javascript
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("p1 resolve"), 1000);
});

const p2 = new Promise((resolve, reject) => resolve("p2 resolved"));
const p3 = new Promise((resolve, reject) => reject("p3 rejected"));
const p4 = new Promise((resolve, reject) =>
  setTimeout(() => reject("p4 rejected"), 1000)
);

// p2 resolved
Promise.race([p1, p2]).then(
  (value) => console.log(value),
  (error) => console.log(error)
);
// p3 rejected
Promise.race([p3, p4]).then(
  (value) => console.log(value),
  (error) => console.log(error)
);
// p2 resolved
Promise.race([p2, p3]).then(
  (value) => console.log(value),
  (err) => console.log(err)
);
```

## 4. 异步函数

ES8 的 async/await 旨在解决利用异步结构组织代码的问题，为此 ES8 新增的两个关键字 async 和 await

### 4.1 async

async 用于声明异步函数。

```javascript
async function foo() {
  console.log(1);
}
const bar = async () => console.log(2);

foo(); //1
bar(); //2
```

使用 async 关键字可以让函数具有异步特征,但总体上其代码仍然是同步求值的。

```javascript
async function foo() {
  console.log(1);
}
foo();
console.log(2);
//1
//2
```

可以看到 async 里面的代码仍然是同步运行的，可以将其视为 Promise 的语法糖<br>
当异步函数使用了 return 关键字返回值时，这个值会被 Promise.resolve()包装成一个 Promise 对象。

```javascript
async function getName() {
  console.log(1);
  return "Jack";
}
console.log(getName()); //Promise { 'Jack' }
getName().then((value) => console.log(value)); //jack
```

### 4.2 await

await 是 then 的语法糖,await 必须放在 async 函数里面

```javascript
const p = new Promise((resolve, reject) => resolve("resolve"));
p.then((value) => console.log(value));

async function foo() {
  const value = await p;
  console.log(value);
}
foo(); //resolve
```

### 4.3 练习：每隔一段时间输出内容

主要运行 await 会暂停异步函数的代码执行，等待 Promise 状态改变，这个特性

```javascript
// 休眠函数
async function delay(time = 2000) {
  return new Promise((resolve, reject) => {
    // 一定时间后在改变promise状态
    setTimeout(() => resolve(), time);
  });
}
// 展示内容函数
async function show(content) {
  for (const value of content) {
    // await会暂停异步函数的代码执行，等待Promise状态改变
    await delay();
    console.log(value);
  }
}

show([1, 2, 3, 4, 5]);
```
