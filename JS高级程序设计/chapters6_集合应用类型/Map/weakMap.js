let key = {};
const wm = new WeakMap();
wm.set(key, "val");
console.log(wm.has(key)); //true
key = null;
console.log(wm.has(key)); //false
