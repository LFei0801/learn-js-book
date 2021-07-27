## 3. Map 和 WeakMap

Map 是一种新的集合类型，为 JS 带来了真正的键/值存储机制

### 3.1 创建 map 类型的数据

可以使用 map 构造函数来创建 map 数据

```javascript
// 使用一个构造函数创建一个空映射
const m = new Map();
console.log(m); //{}
// 可以在构造函数中传入参数的形式来添加映射
const m1 = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);
console.log(m1); //{ 'key1' => 'value1', 'key2' => 'value2' }
```

Map 更像一个映射集，存储一个由 key 映射到 value 的映射集合，因此 key 可以是任意的类型数据

```javascript
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
```

**这也是 Map 与 Object 存储的本质区别，Object key 只能是字符串类型的数据**

```javascript
const o = {
  1: "number 1",
  1: "string 1",
};
console.log(o[1]); //string 1
console.log(o["1"]); //string 1
```

### 3.2 map 增删改查

#### 3.2.1 增加数据 set(key,value) 方法

```javascript
// 使用set增减键值对
const m4 = new Map();
m4.set("first", 1);
m4.set("second", 2);
console.log(m4); //{ 'first' => 1, 'second' => 2 }
```

set() 方法返回映射实例，因此可以使用链式操作 Map 数据

```javascript
m4.set("jack", { name: "jack", age: 12 }).set("rose", {
  name: "rose",
  age: 13,
});
console.log(m4); //  'jack' => { name: 'jack', age: 12 },'rose' => { name: 'rose', age: 13 }
```

#### 3.2.2 获取数据 get(key)

```javascript
console.log(m4.get("first")); //1
console.log(m4.get("second")); //2
```

注意如果使用引用类型的数据作为 key，一定要注意引用类型得特点，否则会出现取不出来值得情况

```javascript
const m5 = new Map();
const obj = { name: "syn" };
const fn = () => {};

m5.set(obj, "object value");
m5.set(fn, "function value");

console.log(m5.get(obj)); //object value
console.log(m5.get({ name: "syn" })); //undefined
console.log(m5.get(fn)); //function value
console.log(m5.get(() => {})); //undefined
```

之所以出现 undefind,是因为引用类型得变量存储得是一个指针，指向堆内存中的一个值，而直接存储相同值得字面量实际上是新建一个'指针'了，两个指针指向不同得地址，因此造成了这种 undefined 的情况

#### 3.2.3 has(key) 判断 map 数据集中是否有这个映射

```javascript
console.log(m5.has(obj)); //true
```

#### 3.2.4 size 检测 map 数据中的映射个数

```javascript
console.log(m5.size); //2
```

#### 3.2.5 删除数据，delete 和 clear

- delete(key) 删除 map 中的一个映射，删除成功返回 true,失败返回 false
- clear() 清空 map

#### 3.2.6 更新数据

当存储的键值对中，值类型为引用类型时，可以直接修改 key 对应的值的属性来更新数据

```javascript
const pMap = new Map();
pMap.set("rose", { name: "ROSE" });
console.log(pMap); // { 'rose' => { name: 'ROSE' }
const rose = pMap.get("rose");
rose.name = "rose";
console.log(pMap); //{ 'rose' => { name: 'rose' }
```

**这实际上是使用了引用类型的特点，修改了堆内存中的值来达到更新数据的目的，因此不适用于原始值类型**

```javascript
const sMap = new Map();
sMap.set("number", 1);
let n = sMap.get("number");
n = 2;
console.log(sMap); //{ 'number' => 1 }
```

此时需要在存储一次这个映射，来达到更新的目的

```javascript
sMap.set("number", n);
console.log(sMap); // { 'number' => 2 }
```

### 3.3 迭代操作

map 和字符串一样，有三个迭代方法：

- keys() 返回 key 迭代对象
- values() 返回 value 迭代对象
- entries() 返回 key value 迭代对象

```javascript
const map = new Map([
  ["JACK", { age: 12 }],
  ["ROSE", { age: 18 }],
  ["ALICE", { age: 22 }],
  ["BOB", { age: 30 }],
]);

console.log(map.keys()); //{ 'JACK', 'ROSE', 'ALICE', 'BOB' }
console.log(map.values()); //{ { age: 12 }, { age: 18 }, { age: 22 }, { age: 30 } }
console.log(map.entries()); // {  [ 'JACK', { age: 12 } ], ... [ 'BOB', { age: 30 } ]}

// 可以用for of /for in 来遍历这个迭代对象
for (const [k, v] of map.entries()) {
  console.log(k, v); //ALICE { age: 22 } ...  BOB { age: 30 }
}
// 也可以用forEach遍历map
map.forEach((val, key) => {
  console.log(key, val); //ALICE { age: 22 } ...  BOB { age: 30 }
});
```

**键和值在迭代器中可以修改，但映射内部的引用则无法修改。当然，如果修改的是对象的内部属性，可以达到修改目的**

**记录一个 bug**

```javascript
/**
 * 将map中所有key转为小写
 */
// 死循环： map处于存放/删除数据的循环中，没有退出条件
map.forEach((val, key) => {
  const newKey = key.toLowerCase();
  const flag = map.delete(key);
  if (flag) {
    map.set(newKey, val);
  }
});

console.log(map);
```

解决思路 1： 用两个数组存储 map 键值对，修改这个两个数组即可

```javascript
const newkeys = [];
const values = [];
// 删除所有的键值对，并存储新的键值对
map.forEach((val, key) => {
  newkeys.push(key.toLowerCase());
  values.push(val);
  map.delete(key);
});
for (let i = 0; i < newkeys.length; i++) {
  map.set(newkeys[i], values[i]);
}
console.log(map); //'jack' => { age: 12 } ...  'bob' => { age: 30 }
```

解决思路 2：将 map 修改为数组解构，之后使用 map 方法修改这个数组

```javascript
const ret = [...map].map((m) => {
  m[0] = m[0].toLowerCase();
  m[1] = m[1];
  return m;
});
map.clear();
ret.forEach((m) => {
  map.set(m[0], m[1]);
});
console.log(map);
```

但这样写的太不直观了，m[0]是什么？m[1]又是什么？第一次看这个会一脸懵逼，其实 m[0]就是 key，m[1]就是 value，因此可以用解构语法直观的表示这个程序：

```javascript
const ret = [...map].map(([key, value]) => {
  key.toLowerCase();
  value = value; // 不能删除这个
  return [key, value];
});
map.clear();
ret.forEach(([key, value]) => map.set(key, value));
console.log(map);
```

### 3.4 使用 map 结构优雅的处理表单提交

map 数据键可以保存任意类型的数据，因此可以使用 key 保存 dom 节点，value 保存一些配置项，来优雅的处理一些 dom 事件，比如这个常见需求：

1. 需要接受协议
2. 需要接受我是学生协议
3. 不点接受按钮会弹出对应的错误提示
4. 都接受了表单才会提交

```HTML
  <body>
    <form action="https://www.baidu.com" onsubmit="return post()">
      接受协议:
      <input type="checkbox" name="agreement" error="请接受协议" />
      我是学生：
      <input type="checkbox" name="student" error="网站只对学生开发" />
      <input type="submit" value="提交" />
    </form>

    <script>
      function post() {
        const map = new Map();
        const inputs = document.querySelectorAll("[error]");
        inputs.forEach((input) => {
          map.set(input, {
            error: input.getAttribute("error"),
            status: input.checked,
          });
        });
        return [...map].every(([ele, config]) => {
          config.status || alert(config.error); //短路特性
          return config.status;
        });
      }
    </script>
  </body>
```

## 4. WeakMap

weak（弱）,weakMap 中的 weak 体现在以下几个方面：

- weakMap 中的 key 只能是引用类型
- weakMap 是弱引用类型
- weakMap 没有 keys(),values(),entries()等迭代对象
- weakMap 没有 size 统计元素数量

### 4. 1 弱引用类型

weak 表示弱映射的键，也就是这些键不属于正式的引用，不会组织垃圾回收。**只要键存在，键值就会存在映射中，不会当作垃圾回收**

```javascript
let key = {};
const wm = new WeakMap();
wm.set(key, "val");
console.log(wm.has(key)); //true
// 键设为null后，这个映射就自动从weakMap中删除了
key = null;
console.log(wm.has(key)); //false
```

### 4.2 没有迭代对象，和 size

因为 weakMap 中的映射任何时候都可能删除，因此没必要提供迭代其映射的能力

### 4.3 弱引用的好处

非常适合保存一些 DOM 节点和其关联的数据

```javascript
const wm = new WeakMap();
const m = new Map();
const loginBtn = document.querySelector("#login");
m.set(loginBtn, { disable: true });
wm.set(loginBtn, { disable: true });
```

上面这个例子，

1. 如果使用**map**来保存 dom 节点和其数据的话，当登录按钮从 DOM 节点中删除的话，由于 map 中仍然会保存按钮的引用，所以对应的 DOM 节点仍然会逗留在内存中，除非明确的将其从映射中删除掉。
2. 如果这里使用**WeakMap**来保存 DOM 节点和其数据，那么只要登录按钮被删除掉，weakMap 中相对应的映射也会被删除，这样就可以立即释放其内存

### 4.4 WeakMap 练习，实现选课案例

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>选课案例</title>
    <style>
      .select-lesson {
        width: 400px;
        height: 150px;
        display: flex;
        border: 2px solid silver;
        align-items: center;
      }
      ul {
        list-style: none;
        padding: 10px;
        width: 50%;
      }
      ul li {
        font-size: 20px;
        width: 100%;
        padding: 5px;
        border: solid 1px silver;
        position: relative;
      }
      ul li a {
        text-decoration: none;
        background-color: teal;
        border-radius: 4px;
        text-align: center;
        display: inline-block;
        width: 30px;
        height: 30px;
        color: black;
        position: absolute;
        right: 5px;
        top: calc(50% - 15px);
      }
      .render-box {
        width: 50%;
        height: 100%;
        margin-left: 10px;
        border-left: solid 4px silver;
      }

      .render-box p {
        display: flex;
        flex-wrap: wrap;
      }
      .render-box span {
        background: teal;
        padding: 5px;
        border-radius: 4px;
        margin: 2px;
        color: white;
      }
    </style>
  </head>
  <body>
    <div class="select-lesson">
      <ul>
        <li>
          <span>javascript</span>
          <a href="#">+</a>
        </li>
        <li>
          <span>CSS</span>
          <a href="#">+</a>
        </li>
        <li>
          <span>HTML5</span>
          <a href="#">+</a>
        </li>
        <li>
          <span>Golang</span>
          <a href="#">+</a>
        </li>
      </ul>
      <div class="render-box">
        <strong id="count">你选择了0节课</strong>
        <p id="lists"></p>
      </div>
    </div>

    <script>
      class Lesson {
        constructor() {
          this.lis = document.querySelectorAll("li");
          this.countEle = document.getElementById("count");
          this.listEle = document.querySelector("#lists");
          this.map = new WeakMap();
        }
        run() {
          [...this.lis].forEach((li) => {
            li.querySelector("a").addEventListener("click", (e) => {
              const state = li.getAttribute("select");
              const a = e.target;
              if (state) {
                li.removeAttribute("select");
                this.map.delete(li);
                a.innerHTML = "+";
                a.style.backgroundColor = "teal";
              } else {
                li.setAttribute("select", true);
                this.map.set(li);
                a.innerHTML = "-";
                a.style.backgroundColor = "red";
              }
              this.render();
            });
          });
        }
        count() {
          return [...this.lis].reduce((count, li) => {
            return (count += this.map.has(li));
          }, 0);
        }
        lists() {
          const lis = [...this.lis]
            .filter((li) => this.map.has(li))
            .map((li) => {
              return `<span>${li.querySelector("span").innerHTML}</span>`;
            });
          return lis.join("");
        }
        render() {
          this.countEle.innerHTML = `你选择了${this.count()}节课`;
          this.listEle.innerHTML = this.lists();
        }
      }
      new Lesson().run();
    </script>
  </body>
</html>
```
