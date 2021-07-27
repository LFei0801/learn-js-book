const map = new Map([
  ["JACK", { age: 12 }],
  ["ROSE", { age: 18 }],
  ["ALICE", { age: 22 }],
  ["BOB", { age: 30 }],
]);

// console.log(map.keys()); //{ 'JACK', 'ROSE', 'ALICE', 'BOB' }
// console.log(map.values()); //{ { age: 12 }, { age: 18 }, { age: 22 }, { age: 30 } }
// console.log(map.entries()); // {  [ 'JACK', { age: 12 } ], ... [ 'BOB', { age: 30 } ]}

// // 可以用for of /for in 来遍历这个迭代对象
// for (const [k, v] of map.entries()) {
//   console.log(k, v); //ALICE { age: 22 } ...  BOB { age: 30 }
// }
// // 也可以用forEach遍历map
// map.forEach((val, key) => {
//   console.log(key, val); //ALICE { age: 22 } ...  BOB { age: 30 }
// });

/**
 * 将map中所有key转为小写
 */

// 死循环： map处于存放/删除数据的循环中，没有退出条件
// map.forEach((val, key) => {
//   const newKey = key.toLowerCase();
//   const flag = map.delete(key);
//   if (flag) {
//     map.set(newKey, val);
//   }
// });

// const newkeys = [];
// const values = [];
// // 删除所有的键值对，并存储新的键值对
// map.forEach((val, key) => {
//   newkeys.push(key.toLowerCase());
//   values.push(val);
//   map.delete(key);
// });
// for (let i = 0; i < newkeys.length; i++) {
//   map.set(newkeys[i], values[i]);
// }
// console.log(map); //'jack' => { age: 12 } ...  'bob' => { age: 30 }

// // 解决2：
// const ret = [...map].map((m) => {
//   m[0] = m[0].toLowerCase();
//   m[1] = m[1];
//   return m;
// });
// map.clear();
// ret.forEach((m) => {
//   map.set(m[0], m[1]);
// });
// console.log(map);

// 解决3：
const ret = [...map].map(([key, value]) => {
  key.toLowerCase();
  value = value;
  return [key, value];
});
map.clear();
ret.forEach(([key, value]) => map.set(key, value));
console.log(map);
