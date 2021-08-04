const p = new Promise((resolve, reject) => resolve("resolve"));
p.then((value) => console.log(value));

async function foo() {
  const value = await p;
  console.log(value);
}
foo(); //resolve
