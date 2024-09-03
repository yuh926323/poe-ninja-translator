// 貼在物品目錄去產生需要 scraper 的 url
// https://poedb.tw/tw/Items

let data = {};

(async () => {
  document.querySelectorAll("#物品 .card-body a").forEach((ele) => {
    const key = ele.href.replace("https://poedb.tw/tw/", "");
    data[key] = {
      nameTw: ele.innerText,
      tw: ele.href,
    };
  });

  let request = new Request(`https://poedb.tw/us/Items`);
  await fetch(request).then((response) => {
    if (!response.ok) {
      return Promise.resolve();
    }
    return response.text().then((str) => {
      let responseDoc = new DOMParser().parseFromString(str, "text/html");
      responseDoc.querySelectorAll("#Item .card-body a").forEach((ele) => {
        const key = ele.href.replace("https://poedb.tw/us/", "");
        data[key] = {
          ...data[key],
          nameUs: ele.innerText,
          us: ele.href,
        };
      });
    });
  });

  console.log(JSON.stringify(data));
})();
