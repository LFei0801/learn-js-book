const p1 = new Promise((resolve, reject) => {
  resolve("p1 success ");
});

const p2 = new Promise((resolve, reject) => {
  resolve("p2 success");
});

const p3 = new Promise((resolve, reject) => {
  reject("p3 failed");
});

// [ 'p1 success ', 'p2 failed' ]
Promise.all([p1, p2])
  .then((values) => console.log(values))
  .catch((error) => console.log(error));

// p3 failed
Promise.all([p1, p3]).then(
  (values) => {
    console.log(values);
  },
  (error) => {
    console.log(error);
  }
);

function getUsers(names, url) {
  // ajax返回promise数据
  let promises = names.map((name) => ajax(`${url}?${name}`));
  return Promise.all(promises);
}
