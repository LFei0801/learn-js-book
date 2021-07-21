# 基本引用类型

- 学习内置对象 Date,RegExp
- 学习基本 Javascript 数据类型
- 原始值与原始值包装类型

## 一、 内置对象

### 1. Date

#### Date 构造函数

Date 类型将日期保存为 1970 年 1 月 1 日零时至今所经过的毫秒数
创建日期对象，使用 new 操作符来调用 Date 构造函数

```javascript
let now = new Date();
```

不给 Date 构造函数传递参数的情况下，创建的对象将保存当前的日期和时间

```javascript
const time = new Date();
console.log(time); //2021-07-14T05:31:42.564Z
```

#### Date.parse 和 Date.UTC（不常使用）

Date.parse() 函数接受一个表示日期的字符串，将其转换为改日期的毫秒参数

```javascript
console.log(Date.parse("May 23 2021")); //1621699200000
```

注意这个代码与下面代码等价

```javascript
console.log(new Date("May 23 21"));
```

Date.UTC()方法返回日期的毫秒表示，但使用的是跟 Date.parse()不同的信息来生产这个值

#### toLocalString,toString,valueof 方法

- toLocalString()方法返回与浏览器运行的本地环境一直的日期和时间,12 小时制，分上下午
- toString() 方法返回带时区信息的日期和时间，时间是 24 小时制
- valueOf() 返回日期的毫秒表示

```javascript
console.log(new Date().toLocaleString()); //2021/7/14 下午1:43:24
console.log(new Date().toString()); //Wed Jul 14 2021 13:43:38 GMT+0800 (中国标准时间)
```

_注意，这两个方法返回的结果可能在每个浏览器上都是不同的，因此只对调试有用，不能用于显示_

#### 日期的格式化方法

Date 类型有几个专门用于格式化日期的方法，他们会返回字符串,同样不能用于显示

```javascript
// 格式化方法
console.log("------格式化方法-------------");
console.log(new Date().toDateString()); //Wed Jul 14 2021
console.log(new Date().toTimeString()); //13:49:35 GMT+0800 (中国标准时间)
console.log(new Date().toLocaleDateString()); //2021/7/14
console.log(new Date().toLocaleTimeString()); //下午1:51:41
console.log(new Date().toUTCString()); //Wed, 14 Jul 2021 05:52:16 GMT
```

#### 日期组件方法

日期组件方法有很多，这里选几个常用的记录一下

**a. getTime() 返回日期的毫秒显示,可以用这个函数来设置对象的 id 属性**
_但是这种方法还是有可能导致 ID 一样的问题_

```javascript
// getTime() 运用
function createPerson(name, age, gender) {
  const person = {
    id: new Date().getTime(),
    name,
    age,
    gender,
  };
  return person;
}

console.log(createPerson("jack", 12, 0)); //{ id: 1626242318999, name: 'jack', age: 12, gender: 0 }
console.log(createPerson("rose", 12, 0)); //{ id: 1626242319000, name: 'rose', age: 12, gender: 0 }
console.log(createPerson("Bob", 12, 0)); //{ id: 1626242319001, name: 'Bob', age: 12, gender: 0 }
```

**b.格式化日期格式的函数**
包括 getFullYear,getMonth,getDate,getHours,getMinutes,getSeconds
_注意：这些函数返回值都为 number 类型_

```javascript
// 如果小于10，则将其设置为  0X 形式的字符串
const addZero = (n) => (n < 0 ? `0${n}` : `${n}`);
/*
 * 日期形式格式化
 * YYYY-MM-DDT:HH:mm:ss
 */
function formatDate() {
  const date = new Date();
  const year = date.getFullYear();
  const mouth = date.getMonth(); //0~11
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();
  return `${year}-${addZero(mouth + 1)}-${addZero(day)} ${addZero(
    hour
  )}:${addZero(minute)}:${addZero(seconds)}`;
}

console.log(formatDate()); //2021-7-14 14:15:36
```

**c.注意区分 getDate() 和 getDay() 方法**

- getDate() 返回几号；
- getDay() 返回星期几 ：0 星期天 6 星期六

**d. setDate 和 getDate 方法**

- setDate() 设置日期中的日
- getDate() 返回日期中的日

可以运行这两个函数获取今年所有日期

```javascript
/**
 * 获取今年所有的日期
 */

// 返回当前日期的后一天
function addDaY(date) {
  let ret = new Date(date);
  ret.setDate(ret.getDate() + 1); // 设置ret为当前日期的后一天
  return ret;
}

// 获取所有的日期
function getAllDayOfyear() {
  const year = new Date().getFullYear();
  // 今年第一天
  const firstDay = new Date(`January 1 ${year}`);
  // 今年最后一天
  const lastDay = new Date(`December 31 ${year}`);
  // 日期数组
  let date = [firstDay];
  // 设置当前日期为日期数组最后一项
  let currentDay = date[date.length - 1];
  // 当前日期不为今年最后一天是，就将明天添加到日期数组中
  while (currentDay.getTime() !== lastDay.getTime()) {
    date.push(addZero(currentDay, 1));
    currentDay = date[date.length - 1];
  }
  return date;
}
```

### 2. RegEXP

正则表达式说搜索和替换字符串的一种强大方式

```javascript
//斜杠 "/" 会告诉 JavaScript 我们正在创建一个正则表达式。它的作用类似于字符串的引号。
let expression = /pattern/flags
```

也可以使用构造函数 new RegExp 来创建正则表达式

```javascript
const search = promt("what do you want to search?");
let regexp = new RegExp(search);
```

flags 为标记，用于控制正则表达式的行为。标记分为五类：

- g: 全局模式。表示查找字符串的全部内容
- i: 不区分大小，表示在查找匹配时忽略 pattern 和字符串的大小
- m: 多行模式，表示查找到一行文本末尾时会继续查找
- y: 粘附模式，表示只查找从 lastIndex 开始及之后的字符串
- u: unicode 模式，启用 Unicode 匹配
- s: dotAll 模式，表示元字符，匹配任何字符 （包括 \n 或\r)

```javascript
// 匹配字符串中的search 不区分大小写
const reg1 = /search/i;
// 匹配字符串中所有的hello,不区分大小写
const reg2 = /hello/gi;

console.log(str.match(reg1)); //['SEARCH', index: 20, input: 'WHAT DO YOU WANT TO SEARCH? HELLO JS,HELLO CSS',groups: undefined]
console.log(str.match(reg2)); //[ 'HELLO', 'HELLO' ]
```

#### a.字符类

字符类是一个特殊的符号，匹配特定集中的符号

- 数字类 \d 对应于 任何一个数字

```javascript
/**
 * 将格式如： +86(123-456-789)
 * 处理成 123456789
 */

const number = "+86(123-456-789)";
let regNumber = /\d/g;
console.log(number.match(regNumber).join("")); //86123456789
const retNumber = number.match(regNumber).join("").slice(2);
console.log(retNumber); //123456789
```

- \s 空格符号：包括空格，制表符 \t，换行符 \n 和其他少数稀有字符，例如 \v，\f 和 \r。
- \w 单字字符：拉丁字母或数字或下划线 \_。非拉丁字母（如西里尔字母或印地文）不属于 \w。

```javascript
/**
 * 查找 “I'm study CSS3 CSS2 ” 中所有的 形如CSS这类字符串与后面的数字
 */

let str2 = "I'm study CSS3  CSS2";
const regexp = /\w\w\w\d/g;
console.log(str2.match(regexp)); //[ 'CSS3', 'CSS2' ]
```

#### b 反向类

每个字符类，都有一个“反向类”，用相同的字母表示，但要以大写书写形式，“反向”表示它与所有其他字符匹配，

- \D 除 \d 以外的任何字符，例如字母
- \S 除 \s 以外的任何字符
- \W 除 \w 以外的任何字符，例如非拉丁字母或空格

#### 点（.) 是匹配任何字符

_注：点表示任何字符而不是缺少字符_

#### 锚点：字符串开始 ^ 和末尾 $

- 插入符号 ^ 匹配文本开头，而美元符号 $ 则匹配文本末尾
- 这两个锚点 ^...$ 放在一起常常被用于测试一个字符串是否完全匹配一个模式

#### 方括号 […] 中的几个字符或者字符类意味着“搜索给定的字符中的任意一个”

- 比如说，[eao] 意味着查找在 3 个字符 'a'、'e' 或者 `‘o’ 中的任意一个
- [a-z] 会匹配从 a 到 z 范围内的字母，[0-5] 表示从 0 到 5 的数字

#### 量词 `+,*,?` 和 `{n}`

- +：重复一次或多次
- \*：表示重复零次或多次 ,这个字符可以多次出现或不出现。
- ?:重复零次或 1 次,使得符号变得可选。
- {n}: 重复 n 次
- {n,}: 重复 n 次或更多次
- {n,m}: 重复 n 到 m 次

_注意两次其效果的是在量词坐标的字符_

```javascript
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
```

### 检查格式

#### 检查邮箱格式

```javascript
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
```

#### 检擦用户名格式

```javascript
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
```

#### 检测用户密码强度

```javascript
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
```
