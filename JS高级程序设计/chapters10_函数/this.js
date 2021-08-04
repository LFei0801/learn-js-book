class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getName() {
    console.log("get->", this); //Person { name: 'Jack', age: 22 }
    return this.name;
  }
  setName(name) {
    console.log("set->", this);
    this.name = name;
  }
}

const p = new Person("Jack", 22);
console.log(p.getName()); //Jack
p.setName("Rose");
console.log(p.getName()); //Rose
