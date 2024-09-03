let languageData;

let openSidebarObserversInitialized = false;
let openMainObserversInitialized = false;
let openClassListObserversInitialized = false;
let openStatsSectionObserversInitialized = false;

const prefixes = [
  {
    us: "Phantasmal",
    tw: "幻影的",
  },
  {
    us: "Anomalous",
    tw: "異常的",
  },
  {
    us: "Divergent",
    tw: "相異的",
  },
  {
    us: "Blight-ravaged",
    tw: "凋落蔓延",
  },
  {
    us: "Blighted",
    tw: "凋落",
  },
];

(async () => {
  await fetch(chrome.runtime.getURL("json/language_zh_tw.json"))
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      languageData = json;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  new MutationObserver(primaryCallback).observe(document, {
    childList: true,
    subtree: true,
  });
})();

// 主要的 MutationObserver
function primaryCallback(mutationsList, observer) {
  const sidebar = document.querySelector("#openSidebar");
  if (sidebar && !openSidebarObserversInitialized) {
    createSidebarObservers(sidebar);
    openSidebarObserversInitialized = true;
  }

  const main = document.querySelector("main");
  if (main && !openMainObserversInitialized) {
    createMainObservers(main);
    openMainObserversInitialized = true;
  }

  if (location.pathname.match(/^\/builds/)) {
    const classList = document.querySelector("div[role=listbox]");
    if (classList && !openClassListObserversInitialized) {
      createClassListObservers(classList);
      openClassListObserversInitialized = true;
    }

    const stats = document.querySelector("#stats");
    if (stats && !openStatsSectionObserversInitialized) {
      const statsSection = stats.closest("section");
      createStatsSectionObservers(statsSection);
      openStatsSectionObserversInitialized = true;
    }
  }

  // 觀察 tooltip 覺得會有點卡，也沒有那麼必要，先停用
  // createTippyObservers(document.body);

  // 檢查其他次要的 MutationObserver 是否都建立完成
  if (
    openSidebarObserversInitialized &&
    openMainObserversInitialized &&
    openClassListObserversInitialized &&
    openStatsSectionObserversInitialized
  ) {
    // 斷開主要的 MutationObserver 以節省效能
    observer.disconnect();
  }
}

// 建立 Sidebar MutationObserver
function createSidebarObservers(observerNode) {
  const callback = function (mutationsList, observer) {
    // 選取所有 node 元素
    var nodes = observerNode.querySelectorAll("*");

    nodes.forEach(function (node) {
      // 獲取 node 內所有的子元素
      var contents = Array.from(node.childNodes);

      const t = contents
        .filter(function (node) {
          return node.nodeType === Node.TEXT_NODE;
        })
        .forEach(function (textNode) {
          const hash = CryptoJS.MD5(textNode.nodeValue).toString();
          const ui = languageData["ui"][hash];
          if (ui) {
            textNode.nodeValue = ui.name_zh_tw;
            return;
          }

          if (location.pathname.match(/^\/builds/)) {
            const misc = languageData["misc"][hash];
            if (misc) {
              textNode.nodeValue = misc.name_zh_tw;
              return;
            }
            const passive = languageData["passives"][hash];
            if (passive) {
              textNode.nodeValue = passive.name_zh_tw;
              return;
            }
          }
        });
    });
  };
  callback();

  new MutationObserver(callback).observe(observerNode, {
    childList: true,
    subtree: true,
  });
}
// 建立 ClassList MutationObserver
function createClassListObservers(observerNode) {
  const callback = function (mutationsList, observer) {
    // 選取所有 node 元素
    var nodes = observerNode.querySelectorAll("*");

    nodes.forEach(function (node) {
      // 獲取 node 內所有的子元素
      var contents = Array.from(node.childNodes);

      const t = contents
        .filter(function (node) {
          return node.nodeType === Node.TEXT_NODE;
        })
        .forEach(function (textNode) {
          const hash = CryptoJS.MD5(textNode.nodeValue).toString();
          if (location.pathname.match(/^\/builds/)) {
            const ui = languageData["ui"][hash];
            if (ui) {
              textNode.nodeValue = ui.name_zh_tw;
              return;
            }
          }
        });
    });
  };
  callback();

  new MutationObserver(callback).observe(observerNode, {
    childList: true,
    subtree: true,
  });
}
// 建立 Main MutationObserver
function createMainObservers(observerNode) {
  const callback = function (mutationsList, observer) {
    /*
    // 處理寶石被 tag 切開的問題
    if (location.pathname.match(/character/)) {
      const skilldescs = observerNode.querySelector("#skills");
      if (skilldescs) {
        const section = skilldescs
          .closest("section")
          .querySelectorAll("article > div:nth-child(2)");

        section.forEach((ele) => {
          // 建立新的 <div-edit> 元素
          const divEdit = document.createElement("div-edit");
          const newText = document.createElement("span");

          // 複製原本 <div> 元素的所有屬性到 <div-edit>
          Array.from(ele.attributes).forEach((attr) => {
            divEdit.setAttribute(attr.name, attr.value);
          });

          // 將原本 <div> 內的所有子元素移到 <div-edit> 裡
          let spans = [];
          ele
            .querySelectorAll('span[data-variant="subdued"]')
            .forEach((span) => {
              spans.push(span);
              span.remove();
            });
          newText.innerText = ele.innerText;
          divEdit.appendChild(newText);
          spans.forEach((span) => {
            span.style.marginLeft = "3px";
            divEdit.appendChild(span);
          });

          // 使用 <div-edit> 替換掉原本的 <div>
          ele.replaceWith(divEdit);
        });
      }
    }*/

    // 選取所有 node 元素
    var nodes = observerNode.querySelectorAll("*");

    nodes.forEach(function (node) {
      // 獲取 node 內所有的子元素
      var contents = Array.from(node.childNodes);

      const t = contents
        .filter(function (node) {
          return node.nodeType === Node.TEXT_NODE;
        })
        .forEach(function (textNode) {
          const hash = CryptoJS.MD5(textNode.nodeValue).toString();
          const misc = languageData["misc"][hash];
          if (misc) {
            const originText = textNode.nodeValue;
            textNode.nodeValue = misc.name_zh_tw;
            const copyButtonBaseDiv = textNode.parentNode.closest(
              "main table tr td:first-child div"
            );
            if (copyButtonBaseDiv) {
              const div = document.createElement("div");
              div.classList = "flex items-center";
              const button = document.createElement("div");
              button.classList = "button";
              button.setAttribute("data-variant", "round");
              button.setAttribute("data-size", "small");
              button.setAttribute("data-copyText", textNode.nodeValue);
              button.innerText = "複製";

              button.onclick = function () {
                const copyText = this.getAttribute("data-copyText");

                // 使用 Clipboard API 進行複製
                navigator.clipboard
                  .writeText(copyText)
                  .then(function () {
                    // console.log("複製成功:", copyText);
                    // 你可以在這裡顯示提示，例如 "複製成功"
                  })
                  .catch(function (err) {
                    // console.error("複製失敗:", err);
                    // 處理複製失敗的情況
                  });
              };
              div.appendChild(button);
              copyButtonBaseDiv.append(div);
            }

            return;
          }

          if (location.pathname.match(/^\/builds/)) {
            const passive = languageData["passives"][hash];
            if (passive) {
              textNode.nodeValue = passive.name_zh_tw;
              return;
            }
          }

          for (const prefix of prefixes) {
            if (textNode.nodeValue.startsWith(prefix.us)) {
              textNode.nodeValue = textNode.nodeValue
                .replace(prefix.us, "")
                .trim();

              const hash = CryptoJS.MD5(textNode.nodeValue).toString();
              const misc = languageData["misc"][hash];
              if (misc) {
                textNode.nodeValue = `${prefix.tw} ${misc.name_zh_tw}`;
              }
              break;
            }
          }
        });
    });
  };
  callback();

  new MutationObserver(callback).observe(observerNode, {
    childList: true,
    subtree: true,
  });
}
// 建立 Stats MutationObserver
function createStatsSectionObservers(observerNode) {
  const callback = function (mutationsList, observer) {
    // 選取所有 node 元素
    var nodes = observerNode.querySelectorAll("*");

    nodes.forEach(function (node) {
      // 獲取 node 內所有的子元素
      var contents = Array.from(node.childNodes);

      const t = contents
        .filter(function (node) {
          return node.nodeType === Node.TEXT_NODE;
        })
        .forEach(function (textNode) {
          const hash = CryptoJS.MD5(textNode.nodeValue).toString();
          if (location.pathname.match(/^\/builds/)) {
            const ui = languageData["ui"][hash];
            if (ui) {
              textNode.nodeValue = ui.name_zh_tw;
              return;
            }
          }
        });
    });
  };
  callback();

  new MutationObserver(callback).observe(observerNode, {
    childList: true,
    subtree: true,
  });
}
// 建立 Tooltip MutationObserver
function createTippyObservers(observerNode) {
  const callback = function (mutationsList, observer) {
    // 選取所有 node 元素
    var nodes = observerNode.querySelectorAll("div[data-tippy-root] *");

    nodes.forEach(function (node) {
      // 獲取 node 內所有的子元素
      var contents = Array.from(node.childNodes);

      const t = contents
        .filter(function (node) {
          return node.nodeType === Node.TEXT_NODE;
        })
        .forEach(function (textNode) {
          if (textNode.nodeValue === "s") {
            textNode.nodeValue = "";
          }

          const hash = CryptoJS.MD5(textNode.nodeValue).toString();
          const misc = languageData["misc"][hash];
          if (misc) {
            textNode.nodeValue = misc.name_zh_tw;
            return;
          }
          const passive = languageData["passives"][hash];
          if (passive) {
            textNode.nodeValue = passive.name_zh_tw;
            return;
          }
        });
    });
  };
  callback();

  new MutationObserver(callback).observe(observerNode, {
    childList: true,
    subtree: true,
  });
}
