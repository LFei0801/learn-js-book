# 集合引用类型

- 对象
- 数组
- Map、WeakMap、Set 以及 WeakSet 类型

## 1、 对象

适合存储和交互程序间的数据,创建对象的方法有两种：

```javascript
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
```

访问对象属性有两种方法

- .语法：方便快捷，但无法访问变量属性
- []语法，可以访问变量属性

```javascript
/***
 * 访问对象属性
 */
const person = {
  name: "jack",
  age: 2,
  gender: "男",
};
console.log(person.age); //2
console.log(person["age"]); //2
const gender = "gender";
console.log(person.gender); //男
console.log(person[gender]); //男
```

**数组详细介绍会在后面章节介绍，由于后面的类型方法很多也很重要，因此我单独写了 Markdown 文档来记录，详情请查看**

- **Array.md**
- **Map.md**
- **Set.md**
