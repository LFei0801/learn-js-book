const p1 = new Promise((resolve, reject) => resolve("p1 success"));
const p2 = new Promise((resolve, reject) => resolve("p2 success"));
const p3 = new Promise((resolve, reject) => reject("p3 failed"));

/**
   *[
    { status: 'fulfilled', value: 'p1 success' },
    { status: 'fulfilled', value: 'p2 success' } 
  ]
 */
Promise.allSettled([p1, p2]).then(
  (values) => console.log(values),
  (error) => console.log(error)
);

/**
 * [
    { status: 'fulfilled', value: 'p1 success' },
    { status: 'rejected', reason: 'p3 failed' }
  ]
 */
Promise.allSettled([p1, p3]).then(
  (values) => console.log(values),
  (error) => console.log(error)
);

function getUsers(names, url) {
  let promises = name.map((name) => ajax(`${url}?name=${name}`));
  return Promise.allSettled(promises);
}
// 过滤不存在的数据
getUsers(["jack", "Alice", "Bob"], "http://localhost:3000").then((values) => {
  const users = values.filter((usr) => usr.status !== "rejected");
});
