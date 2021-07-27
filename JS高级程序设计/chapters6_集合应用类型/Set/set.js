const set = new Set();
set.add("1");
set.add(1);
console.log(set); //{ '1', 1 }
set.add(1);
console.log(set);
console.log(set.has(1)); //true

const s = new Set(["name", 1, true]);
console.log(s.delete("name")); //true
console.log(s); //{ 1, true }
s.clear();
console.log(s); //{}

// 类型转换
// set转为数组
let s1 = new Set("1234567");
console.log(s1); // { '1', '2', '3', '4', '5', '6', '7' }
console.log([...s1]); //[ '1', '2', '3', '4', '5', '6', '7' ]
//当要对set的数据进行操作时可以借用数组方法
// 比如删除是s1中数字大于3的数据
const ret = [...s1].filter((item) => item < 3);
s1 = new Set(ret);
console.log(s1); //{ '1', '2' }

// 数组去重
let a = [1, 2, 3, 1, 2, 1, "true", true, true];
a = [...new Set(a)];
console.log(a); // [ 1, 2, 3, 'true', true ]

// 迭代
const s2 = new Set([1, 2, 3, 4, 5, 6]);
s2.forEach((item) => console.log(item)); //1,2,3,4,5,6
for (const v of s2.values()) {
  console.log(v); // 1,2,3,4,5,6
}

// 并、交、差集
const a1 = new Set([1, 2, 3, 4, 6]);
const b1 = new Set([3, 4, 10, 9, 8]);
// 并集
console.log(new Set([...a1, ...b1])); //{ 1, 2, 3, 4, 6, 10, 9, 8 }
// 交集
console.log(new Set([...a1].filter((item) => b1.has(item)))); // { 3, 4 }
// 差集
console.log(new Set([...a1].filter((item) => !b1.has(item)))); //{ 1, 2, 6 }
