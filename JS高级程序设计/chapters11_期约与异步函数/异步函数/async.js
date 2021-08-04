async function foo() {
  console.log(1);
}
foo();
console.log(2);
//1
//2

async function getName() {
  console.log(1);
  return "Jack";
}
console.log(getName()); //Promise { 'Jack' }
getName().then((value) => console.log(value)); //jack
