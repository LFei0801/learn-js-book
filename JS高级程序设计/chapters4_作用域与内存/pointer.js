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

/**
 * 这种指针形式实现的深拷贝，如果机器断电，对象将不存在
 * 可以用JSON.parse(JSON.stringify(obj))来序列化对象，转换为字符串保存在磁盘上，然后再反序列化转为对象
 */

JSON.parse(JSON.stringify(p1));

// 扩展运算符实现引用值浅拷贝
let a1 = { name: "joker", type: "老虎" };
let a2 = { ...a1 };
a2.name = "rose";
a2.type = "狮子";
console.log("a1->", a1); //a1-> { name: 'joker', type: '老虎' }
console.log("a2->", a2); //a2-> { name: 'rose', type: '狮子' }
