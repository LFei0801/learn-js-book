function making(name) {
  name = typeof name !== "undefined" ? name : "Jack";
  console.log(name);
}
making(); //Jack
making("Rose"); //Rose

function newMaking(name = "Jack") {
  console.log(name);
}
newMaking(); //Jack
newMaking("Rose ES6"); //Rose ES6
