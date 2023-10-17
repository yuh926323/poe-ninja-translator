//---------------------------------------
// Step. A+B 都只是用來測試抓部分的資料而已
// 實際使用請直接使用 Step.C 整合的來抓資料
//---------------------------------------
// Step.A
// https://poedb.tw/tw/Helmets#HelmetLabEnchant
// https://poedb.tw/us/Helmets#HelmetLabEnchant
// let output = {};
// document.querySelectorAll("#HelmetLabEnchant table tbody tr").forEach((ele) => {
//   let proportion = ele.querySelector("td:nth-child(4)").innerText;
//   if (!proportion) {
//     return;
//   }
//   let key = ele.querySelector("td:nth-child(2)").innerText;
//   if (!key) {
//     return;
//   }
//   let value = ele.querySelector("td:nth-child(3)").innerText;
//   output[key] = value;
// });

// console.log(JSON.stringify(output));

// Step.B
// ---------------------------------------------
// https://poedb.tw/tw/Small_Cluster_Jewel#EnchantmentModifiers
// https://poedb.tw/us/Small_Cluster_Jewel#EnchantmentModifiers
// let output = {};
// document.querySelectorAll('#EnchantmentModifiers table tbody tr td a span.explicitMod').forEach((ele) => {
//     let value = ele.innerText.split('\n')[0]
//     let key = ele.parentElement.href.split('/').pop()
//     output[key] = value;
// })
// console.log(JSON.stringify(output));

// Step.C
// ---------------------------------------------
let enOutput, zhtwOutput;

const urls = [
    {
        'us': 'https://poedb.tw/us/Helmets',
        'tw': 'https://poedb.tw/tw/Helmets',
    },
    {
        'us': 'https://poedb.tw/us/Small_Cluster_Jewel',
        'tw': 'https://poedb.tw/tw/Small_Cluster_Jewel',
    },
    {
        'us': 'https://poedb.tw/us/Medium_Cluster_Jewel',
        'tw': 'https://poedb.tw/tw/Medium_Cluster_Jewel',
    },
    {
        'us': 'https://poedb.tw/us/Large_Cluster_Jewel',
        'tw': 'https://poedb.tw/tw/Large_Cluster_Jewel',
    },
    {
        'us': 'https://poedb.tw/us/Notable',
        'tw': 'https://poedb.tw/tw/Notable',
    },
    {
        'us': 'https://poedb.tw/us/Keystone',
        'tw': 'https://poedb.tw/tw/Keystone',
    },
    {
        'us': 'https://poedb.tw/us/Passive_mastery',
        'tw': 'https://poedb.tw/tw/Passive_mastery',
    },
    {
        'us': 'https://poedb.tw/us/Ancestor_league',
        'tw': 'https://poedb.tw/tw/Ancestor_league',
    },
];

enOutput = {};
zhtwOutput = {};

(async () => {
    for (const index of urls.keys()) {
        if (index === 0) {
            let request = new Request(urls[index].us);
            await fetch(request).then(handleEnHelemnt)
            request = new Request(urls[index].tw);
            await fetch(request).then(handleZhtwHelemnt)
        } else if (index >= 1 && index <= 3) {
            let request = new Request(urls[index].us);
            await fetch(request).then(handleEnCluster)
            request = new Request(urls[index].tw);
            await fetch(request).then(handleZhtwCluster)
        } else if (index === 4) {
            let request = new Request(urls[index].us);
            await fetch(request).then(handleEnNotable)
            request = new Request(urls[index].tw);
            await fetch(request).then(handleZhtwNotable)
        } else if (index === 5) {
            let request = new Request(urls[index].us);
            await fetch(request).then(handleEnKeystone)
            request = new Request(urls[index].tw);
            await fetch(request).then(handleZhtwKeystone)
        } else if (index === 6) {
            let request = new Request(urls[index].us);
            await fetch(request).then(handleEnMastery)
            request = new Request(urls[index].tw);
            await fetch(request).then(handleZhtwMastery)
        } else if (index === 7) {
            let request = new Request(urls[index].us);
            await fetch(request).then(handleEnAncestor)
            request = new Request(urls[index].tw);
            await fetch(request).then(handleZhtwAncestor)
        }
    }

    enOutput['Small_Cluster_Jewel_affliction_chance_to_block_attack'] = '+1% Chance to Block Attack Damage'
    enOutput['Small_Cluster_Jewel_affliction_chance_to_block_spell'] = '1% Chance to Block Spell Damage'
    delete enOutput['Small_Cluster_Jewel_affliction_chance_to_block']
    zhtwOutput['Small_Cluster_Jewel_affliction_chance_to_block_attack'] = '+1% 攻擊傷害格擋率'
    zhtwOutput['Small_Cluster_Jewel_affliction_chance_to_block_spell'] = '1% 法術傷害格擋率'
    delete zhtwOutput['Small_Cluster_Jewel_affliction_chance_to_block']
    // Notable
    enOutput['Untiring']['desc'][1] += ' ' + enOutput['Untiring']['desc'][2]
    enOutput['Untiring']['desc'].pop()
    enOutput['Ngamahu%2C_Flames_Advance']['desc'][1] += ' ' + enOutput['Ngamahu%2C_Flames_Advance']['desc'][2]
    enOutput['Ngamahu%2C_Flames_Advance']['desc'].pop()
    enOutput['Essence_Glutton']['desc'][1] += ' ' + enOutput['Essence_Glutton']['desc'][2]
    enOutput['Essence_Glutton']['desc'].splice(2, 1)
    enOutput['Commander_of_Darkness']['desc'][0] += ' ' + enOutput['Commander_of_Darkness']['desc'][1]
    enOutput['Commander_of_Darkness']['desc'].splice(1, 1)
    enOutput['Gratuitous_Violence']['desc'][0] += ' ' + enOutput['Gratuitous_Violence']['desc'][1]
    enOutput['Gratuitous_Violence']['desc'].splice(1, 1)

    enOutput['Conqueror']['desc'][2] += ' ' + enOutput['Conqueror']['desc'][3]
    enOutput['Conqueror']['desc'].splice(3, 1)

    enOutput['Master_of_Metal']['desc'][1] += ' ' + enOutput['Master_of_Metal']['desc'][2]
    enOutput['Master_of_Metal']['desc'].splice(2, 1)
    enOutput['Master_of_Metal']['desc'][2] += ' ' + enOutput['Master_of_Metal']['desc'][3]
    enOutput['Master_of_Metal']['desc'].splice(3, 1)

    enOutput['Pious_Path']['desc'][0] += ' ' + enOutput['Pious_Path']['desc'][1]
    enOutput['Pious_Path']['desc'].splice(1, 1)

    enOutput['Radiant_Faith']['desc'][1] += ' ' + enOutput['Radiant_Faith']['desc'][2]
    enOutput['Radiant_Faith']['desc'].splice(2, 1)

    enOutput['Tawhoa%2C_Forests_Strength']['desc'][0] += ' ' + enOutput['Tawhoa%2C_Forests_Strength']['desc'][1]
    enOutput['Tawhoa%2C_Forests_Strength']['desc'].splice(1, 1)

    enOutput['Ramako%2C_Suns_Light']['desc'][1] += ' ' + enOutput['Ramako%2C_Suns_Light']['desc'][2]
    enOutput['Ramako%2C_Suns_Light']['desc'].splice(1, 1)
    enOutput['Ramako%2C_Suns_Light']['desc'][2] += ' ' + enOutput['Ramako%2C_Suns_Light']['desc'][3]
    enOutput['Ramako%2C_Suns_Light']['desc'].splice(2, 1)

    enOutput['Magmatic_Strikes']['desc'][0] += ' ' + enOutput['Magmatic_Strikes']['desc'][1]
    enOutput['Magmatic_Strikes']['desc'].splice(1, 1)

    // 專精
    enOutput['Armour_and_Energy_Shield_Mastery']['desc'][3] += ' ' + enOutput['Armour_and_Energy_Shield_Mastery']['desc'][4]
    enOutput['Armour_and_Energy_Shield_Mastery']['desc'].splice(4, 1)

    console.log(JSON.stringify(enOutput))
    console.log(JSON.stringify(zhtwOutput))
})()

function handleEnHelemnt(response) {
    if (!response.ok) {
        return Promise.resolve()
    }
    return response.text().then((str) => {
        let responseDoc = new DOMParser().parseFromString(str, 'text/html');
        responseDoc.querySelectorAll("#HelmetLabEnchant table tbody tr").forEach((ele) => {
            let proportion = ele.querySelector("td:nth-child(4)").innerText;
            if (!proportion) {
                return;
            }
            let key = ele.querySelector("td:nth-child(2)").innerText;
            if (!key) {
                return;
            }
            let value = ele.querySelector("td:nth-child(3)").innerText;
            enOutput[key] = value;
        });
    })
}

function handleZhtwHelemnt(response) {
    if (!response.ok) {
        return Promise.resolve()
    }
    return response.text().then((str) => {
        let responseDoc = new DOMParser().parseFromString(str, 'text/html');
        responseDoc.querySelectorAll("#HelmetLabEnchant table tbody tr").forEach((ele) => {
            let proportion = ele.querySelector("td:nth-child(4)").innerText;
            if (!proportion) {
                return;
            }
            let key = ele.querySelector("td:nth-child(2)").innerText;
            if (!key) {
                return;
            }
            let value = ele.querySelector("td:nth-child(3)").innerText;
            zhtwOutput[key] = value;
        });
    })
}

function handleEnCluster(response) {
    if (!response.ok) {
        return Promise.resolve()
    }
    return response.text().then((str) => {
        let responseDoc = new DOMParser().parseFromString(str, 'text/html');
        responseDoc.querySelectorAll('#EnchantmentModifiers table tbody tr td a span.explicitMod').forEach((ele) => {
            ele.innerHTML = ele.innerHTML.replace('<br>', '\n')
            let value = ele.innerText.split('(')[0]
            value = value.trim().split('\n').join(', ')
            let key = ele.parentElement.href.split('/').pop()
            enOutput[key] = value;
        })
    })
}

function handleZhtwCluster(response) {
    if (!response.ok) {
        return Promise.resolve()
    }
    return response.text().then((str) => {
        let responseDoc = new DOMParser().parseFromString(str, 'text/html');
        responseDoc.querySelectorAll('#EnchantmentModifiers table tbody tr td a span.explicitMod').forEach((ele) => {
            ele.innerHTML = ele.innerHTML.replace('<br>', '\n')
            let value = ele.innerText.split('(')[0]
            value = value.trim().split('\n').join(', ')
            let key = ele.parentElement.href.split('/').pop()
            zhtwOutput[key] = value;
        })
    })
}

function handleEnNotable(response) {
    if (!response.ok) {
        return Promise.resolve()
    }
    return response.text().then((str) => {
        let responseDoc = new DOMParser().parseFromString(str, 'text/html');
        responseDoc.querySelector('#CommunityWiki').remove()
        responseDoc.querySelectorAll('div.tab-content table tbody tr td:nth-child(2)').forEach((ele) => {
            let key = ele.querySelector('a').href.split('/').pop()
            let value = ele.querySelector('a').innerText
            enOutput[key] = {
                'name': value,
                'desc': [],
                'isNotable': 1,
            }

            let mod = ele.querySelector('div.implicitMod') || ele.querySelector('span.explicitMod')
            if (!mod) {
                return
            }
            let span = document.createElement('span')
            span.innerHTML = mod.innerHTML.replaceAll('<br>', "\n")
            let mods = span.innerText.trim().split("\n")
            for (let index in mods) {
                enOutput[key]['desc'][index] = mods[index];
            }
            enOutput[key]['desc'] = enOutput[key]['desc'].filter(n => n)
        })
    })
}

function handleZhtwNotable(response) {
    if (!response.ok) {
        return Promise.resolve()
    }
    return response.text().then((str) => {
        let responseDoc = new DOMParser().parseFromString(str, 'text/html');
        responseDoc.querySelector('#CommunityWiki').remove()
        responseDoc.querySelectorAll('div.tab-content table tbody tr td:nth-child(2)').forEach((ele) => {
            let key = ele.querySelector('a').href.split('/').pop()
            let value = ele.querySelector('a').innerText
            zhtwOutput[key] = {
                'name': value,
                'desc': [],
                'isNotable': 1,
            }

            let mod = ele.querySelector('div.implicitMod') || ele.querySelector('span.explicitMod')
            if (!mod) {
                return
            }
            let span = document.createElement('span')
            span.innerHTML = mod.innerHTML.replaceAll('<br>', "\n")
            let mods = span.innerText.trim().split("\n")
            for (let index in mods) {
                zhtwOutput[key]['desc'][index] = mods[index];
            }
            zhtwOutput[key]['desc'] = zhtwOutput[key]['desc'].filter(n => n)
        })
    })
}

function handleEnKeystone(response) {
    if (!response.ok) {
        return Promise.resolve()
    }
    return response.text().then((str) => {
        let responseDoc = new DOMParser().parseFromString(str, 'text/html');
        responseDoc.querySelector('#CommunityWiki').remove()
        responseDoc.querySelectorAll('div.tab-content table tbody tr td:nth-child(2)').forEach((ele) => {
            let key = ele.querySelector('a').href.split('/').pop()
            let value = ele.querySelector('a').innerText
            enOutput[key] = {
                'name': value,
                'desc': [],
            }

            let mod = ele.querySelector('div.implicitMod') || ele.querySelector('span.explicitMod')
            if (!mod) {
                return
            }
            let span = document.createElement('span')
            span.innerHTML = mod.innerHTML.replaceAll('<br>', "\n")
            enOutput[key]['desc'] = [
                span.innerText.split("(")[0].trim()
            ]
            enOutput[key]['desc'] = enOutput[key]['desc'].filter(n => n)
        })
    })
}

function handleZhtwKeystone(response) {
    if (!response.ok) {
        return Promise.resolve()
    }
    return response.text().then((str) => {
        let responseDoc = new DOMParser().parseFromString(str, 'text/html');
        responseDoc.querySelector('#CommunityWiki').remove()
        responseDoc.querySelectorAll('div.tab-content table tbody tr td:nth-child(2)').forEach((ele) => {
            let key = ele.querySelector('a').href.split('/').pop()
            let value = ele.querySelector('a').innerText
            zhtwOutput[key] = {
                'name': value,
                'desc': [],
            }

            let mod = ele.querySelector('div.implicitMod') || ele.querySelector('span.explicitMod')
            if (!mod) {
                return
            }
            let span = document.createElement('span')
            span.innerHTML = mod.innerHTML.replaceAll('<br>', "\n")
            zhtwOutput[key]['desc'] = [
                span.innerText.split("(")[0].trim()
            ]
            zhtwOutput[key]['desc'] = zhtwOutput[key]['desc'].filter(n => n)
        })
    })
}

function handleEnMastery(response) {
    if (!response.ok) {
        return Promise.resolve()
    }
    return response.text().then((str) => {
        let responseDoc = new DOMParser().parseFromString(str, 'text/html');
        responseDoc.querySelectorAll('div.tab-content table tbody tr td:nth-child(2)').forEach((ele) => {
            let key = ele.querySelector('a').href.split('/').pop()
            let value = ele.querySelector('a').innerText
            enOutput[key] = {
                'name': value,
                'desc': [],
            }

            let mods = ele.querySelectorAll('li.PassiveMastery')
            if (mods.length == 0) {
                return
            }
            for (let mod of mods) {
                let span = document.createElement('span')
                span.innerHTML = mod.innerHTML.replaceAll('<br>', ", ")
                const descs = span.innerText.trim().split("\n")
                for (let index in descs) {
                    enOutput[key]['desc'][enOutput[key]['desc'].length] = descs[index];
                }
                enOutput[key]['desc'] = enOutput[key]['desc'].filter(n => n)
            }
        })
    })
}

function handleZhtwMastery(response) {
    if (!response.ok) {
        return Promise.resolve()
    }
    return response.text().then((str) => {
        let responseDoc = new DOMParser().parseFromString(str, 'text/html');
        responseDoc.querySelectorAll('div.tab-content table tbody tr td:nth-child(2)').forEach((ele) => {
            let key = ele.querySelector('a').href.split('/').pop()
            let value = ele.querySelector('a').innerText
            zhtwOutput[key] = {
                'name': value,
                'desc': [],
            }

            let mods = ele.querySelectorAll('li.PassiveMastery')
            if (mods.length == 0) {
                return
            }
            for (let mod of mods) {
                let span = document.createElement('span')
                span.innerHTML = mod.innerHTML.replaceAll('<br>', ", ")
                const descs = span.innerText.trim().split("\n")
                for (let index in descs) {
                    zhtwOutput[key]['desc'][zhtwOutput[key]['desc'].length] = descs[index];
                }
                zhtwOutput[key]['desc'] = zhtwOutput[key]['desc'].filter(n => n)
            }
        })
    })
}

function handleEnAncestor(response) {
    if (!response.ok) {
        return Promise.resolve()
    }
    return response.text().then((str) => {
        let responseDoc = new DOMParser().parseFromString(str, 'text/html');
        responseDoc.querySelector('#CommunityWiki').remove()
        responseDoc.querySelector('#Equipment').remove()
        responseDoc.querySelector('#FieldItem').remove()
        responseDoc.querySelectorAll('div.tab-content table tbody tr td:nth-child(2)').forEach((ele) => {
            let a = ele.querySelector('a')
            if (!a) {
                return
            }
            let key = a.href.split('/').pop()
            let value = ele.querySelector('a').innerText
            enOutput[key] = {
                'name': value,
                'desc': [],
            }

            let mod = ele.querySelector('div.implicitMod') || ele.querySelector('div.explicitMod')
            if (!mod) {
                return
            }
            let span = document.createElement('span')
            span.innerHTML = mod.innerHTML.replaceAll('<br>', "\n")
            let mods = span.innerText.trim().split("\n")
            for (let index in mods) {
                enOutput[key]['desc'][index] = mods[index];
            }
            enOutput[key]['desc'] = enOutput[key]['desc'].filter(n => n)
        })
    })
}

function handleZhtwAncestor(response) {
    if (!response.ok) {
        return Promise.resolve()
    }
    return response.text().then((str) => {
        let responseDoc = new DOMParser().parseFromString(str, 'text/html');
        responseDoc.querySelector('#CommunityWiki').remove()
        responseDoc.querySelector('#裝備').remove()
        responseDoc.querySelector('#戰場物品').remove()
        responseDoc.querySelectorAll('div.tab-content table tbody tr td:nth-child(2)').forEach((ele) => {
            let a = ele.querySelector('a')
            if (!a) {
                return
            }
            let key = a.href.split('/').pop()
            let value = ele.querySelector('a').innerText
            zhtwOutput[key] = {
                'name': value,
                'desc': [],
            }

            let mod = ele.querySelector('div.implicitMod') || ele.querySelector('div.explicitMod')
            if (!mod) {
                return
            }
            let span = document.createElement('span')
            span.innerHTML = mod.innerHTML.replaceAll('<br>', "\n")
            let mods = span.innerText.trim().split("\n")
            for (let index in mods) {
                zhtwOutput[key]['desc'][index] = mods[index];
            }
            zhtwOutput[key]['desc'] = zhtwOutput[key]['desc'].filter(n => n)
        })
    })
}