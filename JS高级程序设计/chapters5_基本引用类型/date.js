const time = new Date();
console.log(time); //2021-07-14T05:31:42.564Z

console.log("------构造函数-------------");
console.log(Date.parse("May 23 2021")); //1621699200000
console.log(new Date("May 23 ,2021"));

console.log("------重载方法-------------");
console.log(new Date().toLocaleString()); //2021/7/14 下午1:43:24
console.log(new Date().toString()); //Wed Jul 14 2021 13:43:38 GMT+0800 (中国标准时间)

// 格式化方法
console.log("------格式化方法-------------");
console.log(new Date().toDateString()); //Wed Jul 14 2021
console.log(new Date().toTimeString()); //13:49:35 GMT+0800 (中国标准时间)
console.log(new Date().toLocaleDateString()); //2021/7/14
console.log(new Date().toLocaleTimeString()); //下午1:51:41
console.log(new Date().toUTCString()); //Wed, 14 Jul 2021 05:52:16 GMT

// getTime() 运用
function createPerson(name, age, gender) {
  const person = {
    id: new Date(),
    name,
    age,
    gender,
  };
  return person;
}

console.log(createPerson("jack", 12, 0)); //{ id: 1626242318999, name: 'jack', age: 12, gender: 0 }
console.log(createPerson("rose", 12, 0)); //{ id: 1626242319000, name: 'rose', age: 12, gender: 0 }
console.log(createPerson("Bob", 12, 0)); //{ id: 1626242319001, name: 'Bob', age: 12, gender: 0 }

/*
 * 日期形式格式化
 * YYYY-MM-DDT:HH:mm:ss
 */

// 如果小于10，则将其设置为  0X 形式的字符串
const addZero = (n) => (n < 0 ? `0${n}` : `${n}`);

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

/**
 * 返回今年所有的日期
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
