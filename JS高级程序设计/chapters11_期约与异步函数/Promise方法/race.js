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
