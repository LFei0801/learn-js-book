function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = () => {
      if (this.status === 200) {
        resolve(JSON.parse(this.response));
      } else {
        reject("加载失败");
      }
    };
    xhr.onerror = () => {
      reject(this);
    };
  });
}
