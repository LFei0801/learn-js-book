// // 同步操作
// let x = 3;
// x = x + 4;
// // 异步操作
// let y = 3;
// setTimeout(() => {
//   y = y + 3;
//   console.log(y);
// }, 1000); //6
// console.log(x);

// 无法拿到 value * 2后的结果
// function double(value) {
//   setTimeout(() => {
//     value *= 2;
//   }, 1000);
//   return value;
// }
// const ret = double(3);
// console.log(ret); //3

// // 提供回调函数取到异步操作的值
// function double(value, callback) {
//   setTimeout(() => callback(value * 2), 1000);
// }
// // 6
// double(3, (x) => console.log(x));

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
