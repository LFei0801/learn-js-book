const t = new Promise((resolve, reject) => {
  resolve("success");
}).then((value) => console.log(value));

console.log(t); //Promise { <pending> }

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

// new Promise((resolve, reject) => {
//   resolve("成功了");
// })
//   .then((data) => {
//     return class Person {
//       static then(resolve, reject) {
//         resolve(data);
//       }
//     };
//   })
//   .then((data) => console.log(data)); //成功了

new Promise((resolve, reject) => {
  reject("1.拒绝");
  // resolve();
})
  .then(() => {
    return new Promise((resolve, reject) => {
      reject("2.拒绝了");
    });
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      reject("2.拒绝了");
    });
  })
  .catch((err) => console.log(err));
