function publicfun(height, age) {
  console.log(this);
  console.log(`name:${this.name}->age:${age} height:${height}cm`);
}

const obj1 = { name: "Alice" };
const obj2 = { name: "Bob" };

publicfun(188); //name:undefined-> height:188cm
publicfun.call(obj1, 199, 12); //name:Alice->age:12 height:199cm
publicfun.call(obj2, 180, 22); //name:Bob->age:22 height:180cm

publicfun.apply(obj1, [179, 23]); //name:Alice->age:23 height:179cm
