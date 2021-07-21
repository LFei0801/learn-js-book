const str = "what do you want to search? hello js,hello css".toUpperCase();

// 匹配字符串中的search 不区分大小写
const reg1 = /search/i;
// 匹配字符串中所有的hello,不区分大小写
const reg2 = /hello/gi;

console.log(str.match(reg1)); //['SEARCH', index: 20, input: 'WHAT DO YOU WANT TO SEARCH? HELLO JS,HELLO CSS',groups: undefined]
console.log(str.match(reg2)); //[ 'HELLO', 'HELLO' ]

/**
 * 将格式如： +86(123-456-789)
 * 处理成 123456789
 */

const number = "+86(123-456-789)";
let regNumber = /\d/g;
console.log(number.match(regNumber).join("")); //86123456789
const retNumber = number.match(regNumber).join("").slice(2);
console.log(retNumber); //123456789

/**
 * 查找 “I'm study CSS3 CSS2 ” 中所有的 形如CSS这类字符串与后面的数字
 */

let str2 = "I'm study CSS3  CSS2";
const regexp = /\w\w\w\d/g;
console.log(str2.match(regexp)); //[ 'CSS3', 'CSS2' ]

/***
 *  量词
 */

// 查找有3~5个数字连一起的字符串
console.log("I'm not 123, but 12345 years old".match(/\d{3,5}/g)); //[ '123', '12345' ]
// 查找所有的数字
console.log("+7(903)-123-45-67".match(/\d+/g).join("")); //79031234567
// 查找color或者colour
console.log("Should I write color or colour?".match(/colou?r/gi)); //[ 'color', 'colour' ]
//查找一个 1 后跟任意数量的 0 的数字
console.log("1 100 1000 5000".match(/10*/g)); //[ '1', '100', '1000' ]
// 查找省略号即连续3或更多个点
console.log("Hi..,Hello!... How goes?.....".match(/\.{3,}/g)); //[ '...', '.....' ]
// 搜寻格式为 #ABCDEF 的 HTML 颜色值
const color =
  "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";
const colorReg = /#[a-zA-Z0-9]{6}\b/gi;
console.log(color.match(colorReg)); //[ '#121212', '#AA00ef' ]

/**
 * 检验形如 150123456213@qq.com的邮箱格式是否正确
 */

function isEmail(email) {
  const reg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
  return reg.test(email);
}

console.log(isEmail("1234567@qq.com")); //true
console.log(isEmail("1234567")); //false
console.log(isEmail("1234567@163.com")); //true
console.log(isEmail("1234567@google.com")); //true

/**
 * 检查用户名是否是以字母开头,且用户名长度不超过8位
 */

function isUsername(name) {
  const reg = /^[a-zA-Z]+/;
  return reg.test(name) && name.length <= 8;
}

console.log(isUsername("adad1231")); //true
console.log(isUsername("123Username")); //false
console.log(isUsername("usernaem")); //true

/**
 * 检测用户密码是否是字母、数字的结合且长度大于6位小于等于16位
 * 且检测用户密码强度等级
 * 0 不符合格式
 * 1 仅包含数字或者字母
 * 2 数字和字母的组合
 * 3 数字、字母其他符号的组合
 */

function isPassword(pwd) {
  const pwdFormat = /^[\w]{6,16}/i;
  const charc = /[a-zA-Z]/; //字母
  const number = /\d/; //数字
  const other = /[_.@]/; //其他符号
  if (pwdFormat.test(pwd)) {
    if (charc.test(pwd) && number.test(pwd) && other.test(pwd)) {
      return 3;
    } else if (charc.test(pwd) && number.test(pwd)) {
      return 2;
    } else if (charc.test(pwd) || number.test(pwd)) {
      return 1;
    }
  }
  return 0;
}

console.log(isPassword("123")); //0
console.log(isPassword("123456")); //1
console.log(isPassword("qweqwe123")); //2
console.log(isPassword("check_password_123")); //3
