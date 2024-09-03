nodes = document.querySelector("main").querySelectorAll("*");

nodes.forEach(function (node) {
  // 獲取 node 內所有的子元素
  var contents = Array.from(node.childNodes);
  contents
    .filter(function (node) {
      return node.nodeType === Node.TEXT_NODE;
    })
    .forEach((em) => {
      console.log(em.nodeValue);
    });
});
