function myTimeout(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

myTimeout(1000)
  .then(() => {
    console.log("1s后执行的行为");
    return myTimeout(1000);
  })
  .then(() => console.log("2s后执行的行为"));
