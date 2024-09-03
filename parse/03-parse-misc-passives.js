// pageContents 作為爬頁面的 cache 資料，注意 debug 的時候不要把這個變數清掉
let output = {},
  data = {},
  pageContents = pageContents || {};

const urls = {
  Small_Cluster_Jewel: {
    us: "https://poedb.tw/us/Small_Cluster_Jewel",
    tw: "https://poedb.tw/tw/Small_Cluster_Jewel",
    handleUs: handleCluster,
    handleTw: handleCluster,
  },
  Medium_Cluster_Jewel: {
    us: "https://poedb.tw/us/Medium_Cluster_Jewel",
    tw: "https://poedb.tw/tw/Medium_Cluster_Jewel",
    handleUs: handleCluster,
    handleTw: handleCluster,
  },
  Large_Cluster_Jewel: {
    us: "https://poedb.tw/us/Large_Cluster_Jewel",
    tw: "https://poedb.tw/tw/Large_Cluster_Jewel",
    handleUs: handleCluster,
    handleTw: handleCluster,
  },
  Notable: {
    us: "https://poedb.tw/us/Notable",
    tw: "https://poedb.tw/tw/Notable",
    handleUs: handleNotable,
    handleTw: handleNotable,
  },
  Keystone: {
    us: "https://poedb.tw/us/Keystone",
    tw: "https://poedb.tw/tw/Keystone",
    handleUs: handleKeystone,
    handleTw: handleKeystone,
  },
  Passive_mastery: {
    us: "https://poedb.tw/us/Passive_mastery",
    tw: "https://poedb.tw/tw/Passive_mastery",
    handleUs: handleMastery,
    handleTw: handleMastery,
  },
  // 野獸
  Bestiary_league: {
    us: "https://poedb.tw/us/Bestiary_league",
    tw: "https://poedb.tw/tw/Bestiary_league",
    handleUs: handleBeast,
    handleTw: handleBeast,
  },
  // 輿圖天賦樹
  Atlas_passive_skill: {
    us: "https://poedb.tw/us/Atlas_passive_skill",
    tw: "https://poedb.tw/tw/Atlas_passive_skill",
    handleUs: handleAltasPassive,
    handleTw: handleAltasPassive,
  },
};

run();

async function run() {
  for (const index in urls) {
    console.log(index);
    if (pageContents[index] && pageContents[index].tw) {
      urls[index].handleTw(pageContents[index].tw, "tw");
    } else {
      let request = new Request(urls[index].tw);
      await fetch(request).then((response) =>
        handleUrl(response, index, urls[index].handleTw)
      );
    }
    if (pageContents[index] && pageContents[index].us) {
      urls[index].handleUs(pageContents[index].us, "us");
    } else {
      let request = new Request(urls[index].us);
      await fetch(request).then((response) =>
        handleUrl(response, index, urls[index].handleUs)
      );
    }
  }

  // 手動調整的部分很醜，但我暫時想不到有甚麼比較好處理的方式

  // 因為小型星團的格擋使用同一個連結，導致對應起來會被蓋掉，需要特別調整
  data["Small_Cluster_Jewel_affliction_chance_to_block_attack"] =
    data["Small_Cluster_Jewel_affliction_chance_to_block"];
  data["Small_Cluster_Jewel_affliction_chance_to_block_spell"] =
    data["Small_Cluster_Jewel_affliction_chance_to_block"];
  data["Small_Cluster_Jewel_affliction_chance_to_block_attack"]["us"]["name"] =
    "+2% Chance to Block Attack Damage";
  data["Small_Cluster_Jewel_affliction_chance_to_block_spell"]["us"]["name"] =
    "2% Chance to Block Spell Damage";
  data["Small_Cluster_Jewel_affliction_chance_to_block_attack"]["tw"]["name"] =
    "+2% 攻擊傷害格擋率";
  data["Small_Cluster_Jewel_affliction_chance_to_block_spell"]["tw"]["name"] =
    "2% 法術傷害格擋率";
  delete data["Small_Cluster_Jewel_affliction_chance_to_block"];

  // Notable
  output["Untiring"]["us"]["desc"][1] +=
    " " + output["Untiring"]["us"]["desc"][2];
  output["Untiring"]["us"]["desc"].pop();
  output["Ngamahu%2C_Flames_Advance"]["us"]["desc"][1] +=
    " " + output["Ngamahu%2C_Flames_Advance"]["us"]["desc"][2];
  output["Ngamahu%2C_Flames_Advance"]["us"]["desc"].pop();
  output["Essence_Glutton"]["us"]["desc"][1] +=
    " " + output["Essence_Glutton"]["us"]["desc"][2];
  output["Essence_Glutton"]["us"]["desc"].splice(2, 1);
  output["Commander_of_Darkness"]["us"]["desc"][0] +=
    " " + output["Commander_of_Darkness"]["us"]["desc"][1];
  output["Commander_of_Darkness"]["us"]["desc"].splice(1, 1);
  output["Gratuitous_Violence"]["us"]["desc"][0] +=
    " " + output["Gratuitous_Violence"]["us"]["desc"][1];
  output["Gratuitous_Violence"]["us"]["desc"].splice(1, 1);

  output["Conqueror"]["us"]["desc"][2] +=
    " " + output["Conqueror"]["us"]["desc"][3];
  output["Conqueror"]["us"]["desc"].splice(3, 1);

  output["Master_of_Metal"]["us"]["desc"][1] +=
    " " + output["Master_of_Metal"]["us"]["desc"][2];
  output["Master_of_Metal"]["us"]["desc"].splice(2, 1);
  output["Master_of_Metal"]["us"]["desc"][2] +=
    " " + output["Master_of_Metal"]["us"]["desc"][3];
  output["Master_of_Metal"]["us"]["desc"].splice(3, 1);

  output["Pious_Path"]["us"]["desc"][0] +=
    " " + output["Pious_Path"]["us"]["desc"][1];
  output["Pious_Path"]["us"]["desc"].splice(1, 1);

  output["Radiant_Faith"]["us"]["desc"][1] +=
    " " + output["Radiant_Faith"]["us"]["desc"][2];
  output["Radiant_Faith"]["us"]["desc"].splice(2, 1);

  output["Ramako%2C_Suns_Light"]["us"]["desc"][1] +=
    " " + output["Ramako%2C_Suns_Light"]["us"]["desc"][2];
  output["Ramako%2C_Suns_Light"]["us"]["desc"].splice(1, 1);
  output["Ramako%2C_Suns_Light"]["us"]["desc"][2] +=
    " " + output["Ramako%2C_Suns_Light"]["us"]["desc"][3];
  output["Ramako%2C_Suns_Light"]["us"]["desc"].splice(2, 1);

  output["Magmatic_Strikes"]["us"]["desc"][0] +=
    " " + output["Magmatic_Strikes"]["us"]["desc"][1];
  output["Magmatic_Strikes"]["us"]["desc"].splice(1, 1);

  output["Natures_Concoction"]["us"]["desc"][0] +=
    " " + output["Natures_Concoction"]["us"]["desc"][1];
  output["Natures_Concoction"]["us"]["desc"].splice(1, 1);

  // 輿圖天賦樹
  output["Ultimatum_Boss_Chance"]["us"]["desc"][0] +=
    " " + output["Ultimatum_Boss_Chance"]["us"]["desc"][1];
  output["Ultimatum_Boss_Chance"]["us"]["desc"].splice(1, 1);
  output["Brave_The_Tower"]["us"]["desc"][1] +=
    " " + output["Brave_The_Tower"]["us"]["desc"][2];
  output["Brave_The_Tower"]["us"]["desc"].splice(1, 1);
  output["Voracious_Throng"]["us"]["desc"][1] +=
    " " + output["Voracious_Throng"]["us"]["desc"][2];
  output["Voracious_Throng"]["us"]["desc"].splice(1, 1);
  output["Pale_Clarion"]["us"]["desc"][1] +=
    " " + output["Pale_Clarion"]["us"]["desc"][2];
  output["Pale_Clarion"]["us"]["desc"].splice(1, 1);
  output["Swarming_Hive"]["us"]["desc"][1] +=
    " " + output["Swarming_Hive"]["us"]["desc"][2];
  output["Swarming_Hive"]["us"]["desc"].splice(1, 1);

  output["Bribery"]["tw"]["desc"][0] += output["Bribery"]["tw"]["desc"][1];
  output["Bribery"]["tw"]["desc"].splice(1, 1);
  output["Bribery"]["tw"]["desc"][1] += output["Bribery"]["tw"]["desc"][2];
  output["Bribery"]["tw"]["desc"].splice(2, 1);

  output["Bribery"]["us"]["desc"][0] +=
    "\n" + output["Bribery"]["us"]["desc"][1];
  output["Bribery"]["us"]["desc"].splice(1, 1);
  output["Bribery"]["us"]["desc"][1] +=
    "\n" + output["Bribery"]["us"]["desc"][2];
  output["Bribery"]["us"]["desc"].splice(2, 1);

  // data 的部分請存成 misc.json
  console.log(JSON.stringify(data));
  // output 的部分請存成 passives.json
  console.log(JSON.stringify(output));
}

function handleUrl(response, index, handle) {
  if (!response.ok) {
    return Promise.resolve();
  }

  if (response.url.indexOf("https://poedb.tw/tw/") !== -1) {
    return response.text().then((str) => {
      pageContents[index] = {
        ...pageContents[index],
        tw: str,
      };
      handle(str, "tw");
    });
  }
  if (response.url.indexOf("https://poedb.tw/us/") !== -1) {
    return response.text().then((str) => {
      pageContents[index] = {
        ...pageContents[index],
        us: str,
      };
      handle(str, "us");
    });
  }
}

function handleCluster(str, lang) {
  let responseDoc = new DOMParser().parseFromString(str, "text/html");
  responseDoc
    .querySelectorAll(
      "#EnchantmentModifiers table tbody tr td a span.explicitMod"
    )
    .forEach((ele) => {
      ele.innerHTML = ele.innerHTML.replace("<br>", "\n");
      const href = ele.parentElement.href;
      const key = href.split("/").pop();
      const name = ele.innerText.split("(")[0].trim().split("\n").join(", ");

      data[key] = data[key] ?? {};
      data[key][lang] = {
        name: name,
        url: href,
      };
    });
}

function handleNotable(str, lang) {
  let responseDoc = new DOMParser().parseFromString(str, "text/html");
  responseDoc
    .querySelectorAll(
      ".col .d-flex.border.rounded > div:nth-child(2),div.tab-content table tbody tr td:nth-child(2)"
    )
    .forEach((ele) => {
      const key = ele.querySelector("a").href.split("/").pop();
      const name = ele.querySelector("a").innerText;

      output[key] = output[key] ?? {};
      output[key][lang] = {
        name: name,
        desc: [],
        isNotable: 1,
      };

      let mod =
        ele.querySelector("div.implicitMod") ||
        ele.querySelector("span.explicitMod");
      if (!mod) {
        return;
      }
      let span = document.createElement("span");
      span.innerHTML = mod.innerHTML.replaceAll("<br>", "\n");
      let mods = span.innerText.trim().split("\n");
      for (let index in mods) {
        output[key][lang]["desc"][index] = mods[index];
      }
      output[key][lang]["desc"] = output[key][lang]["desc"].filter((n) => n);
    });
}

function handleKeystone(str, lang) {
  let responseDoc = new DOMParser().parseFromString(str, "text/html");
  responseDoc
    .querySelectorAll(
      ".col .d-flex.border.rounded > div:nth-child(2),div.tab-content table tbody tr td:nth-child(2)"
    )
    .forEach((ele) => {
      const key = ele.querySelector("a").href.split("/").pop();
      const name = ele.querySelector("a").innerText;

      output[key] = output[key] ?? {};
      output[key][lang] = {
        name: name,
        desc: [],
      };

      let mod =
        ele.querySelector("div.implicitMod") ||
        ele.querySelector("span.explicitMod");
      if (!mod) {
        return;
      }
      let span = document.createElement("span");
      span.innerHTML = mod.innerHTML.replaceAll("<br>", "\n");
      output[key][lang]["desc"] = [span.innerText.split("(")[0].trim()];
      output[key][lang]["desc"] = output[key][lang]["desc"].filter((n) => n);
    });
}

function handleMastery(str, lang) {
  let responseDoc = new DOMParser().parseFromString(str, "text/html");
  responseDoc
    .querySelectorAll(
      ".col .d-flex.border.rounded > div:nth-child(2),div.tab-content table tbody tr td:nth-child(2)"
    )
    .forEach((ele) => {
      const key = ele.querySelector("a").href.split("/").pop();
      const name = ele.querySelector("a").innerText;

      output[key] = output[key] ?? {};
      output[key][lang] = {
        name: name,
        desc: [],
      };

      let mods = ele.querySelectorAll("li.PassiveMastery");
      if (mods.length == 0) {
        return;
      }
      for (let mod of mods) {
        let span = document.createElement("span");
        span.innerHTML = mod.innerHTML.replaceAll("<br>", ", ");
        const descs = span.innerText.trim().split("\n");
        for (let index in descs) {
          output[key][lang]["desc"][output[key][lang]["desc"].length] =
            descs[index];
        }
        output[key][lang]["desc"] = output[key][lang]["desc"].filter((n) => n);
      }
    });
}

function handleBeast(str, lang) {
  let responseDoc = new DOMParser().parseFromString(str, "text/html");
  responseDoc
    .querySelectorAll(
      '.tab-pane table tbody tr td a[data-hover*="MonsterVarieties"]'
    )
    .forEach((ele) => {
      if (!ele.innerText) {
        return;
      }
      const href = ele.href;
      const key = href.split("/").pop();
      const name = ele.innerText;

      data[key] = data[key] ?? {};
      data[key][lang] = {
        name: name,
        url: href,
      };
    });
}

function handleAltasPassive(str, lang) {
  let responseDoc = new DOMParser().parseFromString(str, "text/html");
  responseDoc
    .querySelectorAll(
      ".col .d-flex.border.rounded > div:nth-child(2),div.tab-content table tbody tr td:nth-child(2)"
    )
    .forEach((ele) => {
      const key = ele.querySelector("a").href.split("/").pop();
      const name = ele.querySelector("a").innerText;

      output[key] = output[key] ?? {};
      output[key][lang] = {
        name: name,
        desc: [],
      };

      let mod =
        ele.querySelector("div.implicitMod") ||
        ele.querySelector("span.explicitMod");
      if (!mod) {
        return;
      }
      let span = document.createElement("span");
      span.innerHTML = mod.innerHTML.replaceAll("<br>", "\n");
      let mods = span.innerText.trim().split("\n");
      for (let index in mods) {
        output[key][lang]["desc"][index] = mods[index];
      }
      output[key][lang]["desc"] = output[key][lang]["desc"].filter((n) => n);
    });
}
