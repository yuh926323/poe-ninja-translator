let languageData;
$.getJSON(chrome.runtime.getURL("json/language_zh_tw.json")).then((json) => {
  languageData = json;
});

new MutationObserver(function () {
  $("body *")
    .contents()
    .filter(function () {
      return this.nodeType === 3; //Node.TEXT_NODE
    })
    .each(function () {
      if (typeof languageData == "undefined") {
        return;
      }

      let buildJobs = $('div.class-filter-list div[role="listbox"]')[0]
      if (buildJobs && buildJobs.contains(this)) {
        if (languageData.hasOwnProperty(this.data.trim())) {
          this.data = languageData[this.data.trim()].name_zh_tw;
        }
        return;
      }

      $(this)
        .closest("a > span")
        .children("span")
        .filter(function () {
          return this.innerText.search("[5-6]L") == -1;
        })
        .remove();

      let hash = CryptoJS.MD5(this.data.trim()).toString();
      if (languageData.hasOwnProperty(hash)) {
        this.data = languageData[hash].name_zh_tw;
        console.log(this.data, hash);

        let button = $(
          `<div class="flex items-center"><button class="button" data-variant="round" data-size="small" data-copyText="${this.data}">複製</button></div>`
        ).on("click", function (event) {
          event.preventDefault();
          let copyText = event.target.dataset.copytext.replace(
            /(.*) \(.*\)$/,
            "$1"
          );
          copyStringToClipboard(copyText);
        });
        $(this)
          .closest("main table tr td:first-child div[theme=flush] > div")
          .append(button);
      } else {
        let data = this.data.trim();
        let add = "";
        if (data.startsWith("Phantasmal")) {
          data = data.replace("Phantasmal", "").trim();
          add = "幻影的 ";
        } else if (data.startsWith("Anomalous")) {
          data = data.replace("Anomalous", "").trim();
          add = "異常的 ";
        } else if (data.startsWith("Divergent")) {
          data = data.replace("Divergent", "").trim();
          add = "相異的 ";
        } else if (data.startsWith("Blight-ravaged")) {
          data = data.replace("Blight-ravaged", "").trim();
          add = "凋落蔓延 ";
        } else if (data.startsWith("Blighted")) {
          data = data.replace("Blighted", "").trim();
          add = "凋落 ";
        }
        let hash = CryptoJS.MD5(data).toString();
        if (languageData[hash]) {
          this.data = add + languageData[hash].name_zh_tw;
        }
      }
    });
}).observe(document.body, {
  attributes: false,
  childList: true,
  subtree: true,
});

function copyStringToClipboard(str) {
  // Create new element
  var el = document.createElement("textarea");
  // Set value (string to be copied)
  el.value = str;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute("readonly", "");
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard
  document.execCommand("copy");
  // Remove temporary element
  document.body.removeChild(el);
}
