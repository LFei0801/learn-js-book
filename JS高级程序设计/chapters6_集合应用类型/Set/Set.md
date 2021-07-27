# Set 和 WeakSet

## 1. Set

set 是 ES6 新增的一种集合类型，不同于数组和对象，set 保存的数据形式是{val1,...valn},创造 set 的方法：

```javascript
const set = new Set();
```

## 2. set 的增删改查

### 2.1 add() 添加数据

set 的值可以是任何类型的 JS 数据

```javascript
const set = new Set();
set.add("1");
set.add(1);
console.log(set); //{ '1', 1 }
```

但是 set 中数据不能重复，也就是不能由两个值是**全相等**

```javascript
// set:{"1",1}
set.add(1);
console.log(set); //{ '1', 1 }
```

### 2.2 has() 使用 has 查询数据

```javascript
console.log(set.has(1)); //true
```

### 2.3 detele() 和 clear() 删除数据

```javascript
const s = new Set(["name", 1, true]);
console.log(s.delete("name")); //true
console.log(s); //{ 1, true }
s.clear();
console.log(s); //{}
```

## 3. 类型转换

### 3.1 Set 转为数组

当要对 set 中的数据进行操作时可以借用数组方法

```javascript
// set转为数组
let s1 = new Set("1234567");
console.log(s1); // { '1', '2', '3', '4', '5', '6', '7' }
console.log([...s1]); //[ '1', '2', '3', '4', '5', '6', '7' ]
//当要对set的数据进行操作时可以借用数组方法
// 比如删除是s1中数字大于3的数据
const ret = [...s1].filter((item) => item < 3);
s1 = new Set(ret);
console.log(s1); //{ '1', '2' }
```

### 3.2 数组转为 set

set 的特性是数据严格相等，不会存在两个数据完全相等的情况，因此可以利用这个特定进行数组去重

```javascript
// 数组去重
let a = [1, 2, 3, 1, 2, 1, "true", true, true];
a = [...new Set(a);]
console.log(a); // [ 1, 2, 3, 'true', true ]
```

## 4. 顺序于迭代

set 会维护插入时的顺序，因此支持按顺序迭代

- values() 值迭代对象
- forEach() 迭代
- for of / for in 迭代

```javascript
// 迭代
const s2 = new Set([1, 2, 3, 4, 5, 6]);
s2.forEach((item) => console.log(item)); //1,2,3,4,5,6
for (const v of s2.values()) {
  console.log(v); // 1,2,3,4,5,6
}
```

## 5. 并集交集差集

- 并集，两个集合合并起来的集合
- 交集：两个集合都含有的元素集合
- 差集：比如 A-B,即 A 中含有 B 没有的元素

set 的特性可以很好的处理这个场景

```javascript
// 并、交、差集
const a1 = new Set([1, 2, 3, 4, 6]);
const b1 = new Set([3, 4, 10, 9, 8]);
// 并集
console.log(new Set([...a1, ...b1])); //{ 1, 2, 3, 4, 6, 10, 9, 8 }
// 交集
console.log(new Set([...a1].filter((item) => b1.has(item)))); // { 3, 4 }
// 差集
console.log(new Set([...a1].filter((item) => !b1.has(item)))); //{ 1, 2, 6 }
```

## 5. WeakSet

WeakSet 同 WeakMap 都是弱引用类型

- 值只能是引用类型
- 没有迭代
- 弱引用类型
