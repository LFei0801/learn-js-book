const s1 = "some text";
console.log(s1.length); //9
console.log(s1.charAt(8)); //t
console.log(s1.charAt(9)); // ""
console.log(s1.charAt(4)); // ""

/**
 * 提取子字符串方法
 *
 */
console.log("######提取子字符串方法#######");
const s2 = s1.slice(1, 4);
console.log(s2); //ome
console.log(s1.slice());
console.log(s1.slice(3)); //e text
console.log(s1.slice(1, 10)); //ome text
console.log(s1.slice(5, 1)); //""
console.log("--负数情况--");
console.log(s1.slice(-3)); //ext
console.log(s1.slice(-3, -2)); //e
console.log(s1.substr(-3)); //ext
console.log(s1.substr(-3, -2)); //""
console.log(s1.substring(-3)); //some text
console.log(s1.substring(-3, -2)); //""

/**
 * 字符串位置方法
 */
console.log("######查找子字符串位置方法#######");
const s3 = "hello world";
console.log(s3.indexOf("o")); //4
console.log(s3.indexOf("o", 5)); //7
console.log(s3.lastIndexOf("o")); //7
console.log(s3.lastIndexOf("0", 5)); //-1
console.log("--查找所有子字符串--");

/***
 *  查找所有子字符串
 *  @param string 字符串
 *  @param findstrng 目标字符串
 * */
function findAllString(string, findstrng) {
  const positions = [];
  let pos = string.indexOf(findstrng);
  while (pos > -1) {
    positions.push(pos);
    pos = string.indexOf(findstrng, pos + 1);
  }
  return positions;
}

console.log(findAllString("Hello world", "o")); //[ 4, 7 ]
console.log(findAllString("hyperleger fabric is really diffcult", "r")); //[ 4, 9, 14, 21 ]

/**
 * 字符串包含方法
 */
console.log("######字符串包含方法#######");
const s4 = "foobarbaz";
console.log(s4.startsWith("foo")); //true
console.log(s4.startsWith("baz")); //false

console.log(s4.endsWith("foo")); //false
console.log(s4.endsWith("baz")); //true

console.log(s4.includes("foo")); //true
console.log(s4.includes("baz")); //true

/**
 * 字符串模式匹配
 */
console.log("######字符串模式匹配方法#######");
const text = "cat bat sat fat";
const ret = text.replace(/at/g, "one");
console.log(ret); //cone bone sone

/**
 * 替换部分子字符串
 * @param str 字符串
 * @param replace 要替换的子字符串
 * @param result 替换后的子字符串
 */

function replace(str, replace, result) {
  const reg = new RegExp(replace, "g");
  return str.replace(reg, result);
}

console.log(replace("hello world", "world", "javascript")); //hello javascript
