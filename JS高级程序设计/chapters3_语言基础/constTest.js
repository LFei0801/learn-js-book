const person = { name: "jack", age: 15 };
person.age = 20;
console.log(person); //{ name: 'jack', age: 20 }

person = { name: 123, age: 1321 };
console.log(person); //Assignment to constant variable.
