function axios(obj) {
  return new Promise((resolve, reject) => {
    const option = {
      url: obj.url || "",
      method: obj.method || "get",
      headers: {},
    };
    fetch(obj.url, option)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        window.$message.error("请求出错");
        reject(err);
      });
  });
}
