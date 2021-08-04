const p = new Promise((resolve, reject) => {});
console.log(p); //Promise { <pending> }

const p1 = new Promise((resolve, reject) => {
  resolve("Success");
});
console.log(p1); //Promise { 'Success' }

// const p2 = new Promise((resolve, reject) => {
//   reject("failed");
// });
// console.log(p2); //Promise { <rejected> 'failed' }

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
