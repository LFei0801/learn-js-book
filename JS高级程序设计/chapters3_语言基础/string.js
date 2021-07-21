// toStrig() 返回当前值的字符串等价物
let age = 11; //11
console.log(age.toString());
let flag = true; //true
console.log(flag.toString());
let obj = { name: "jack", age: 11 };
console.log(obj.toString()); //[object Object]
console.log(JSON.stringify(obj)); //{"name":"jack","age":11}

const string = "abcdef";
console.log(string.split("")); // [ 'a', 'b', 'c', 'd', 'e', 'f' ]
console.log(string.split("!")); // [ 'abcdef' ]
console.log(string.split("||")); // [ 'abcdef' ]

const arr = ["a", "b"];
console.log(arr.join("")); //ab
console.log(arr.join(",")); //a,b
console.log(arr.join("|")); //a|b
console.log(arr.join("\\")); //a\b

// 获取随机颜色
function getRandomColor() {
  let color = "#";
  const allTypeArr = "abcdefg0123456789".toUpperCase().split("");
  for (let i = 0; i < 6; i++) {
    const random = allTypeArr[Math.floor(Math.random() * allTypeArr.length)];
    color += random;
  }
  return color;
}

console.log(getRandomColor()); //#E70G2F
console.log(getRandomColor()); //#2D8A84
console.log(getRandomColor()); //#0A9749
console.log(getRandomColor()); //#1EAA7B
