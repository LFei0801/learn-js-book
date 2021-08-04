// 休眠函数
async function delay(time = 2000) {
  return new Promise((resolve, reject) => {
    // 一定时间后在改变promise状态
    setTimeout(() => resolve(), time);
  });
}
// 展示内容函数
async function show(content) {
  for (const value of content) {
    // await会暂停异步函数的代码执行，等待Promise状态改变
    await delay();
    console.log(value);
  }
}

show([1, 2, 3, 4, 5]);
