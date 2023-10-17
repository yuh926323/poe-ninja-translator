<?php

$output = [];
$observer = [];

// Step.1 處理 UI
$ui = [
    // 'General' => '一般',
    'Currency' => '通貨',
    'Fragments' => '碎片',
    'Tattoos' => '紋身',
    'Omens' => '預照',
    'Divination Cards' => '命運卡',
    'Artifacts' => '探險通貨',
    'Oils' => '油瓶',
    'Incubators' => '培育器',
    // 'Equipment & gems' => '裝備 & 技能寶石',
    'Unique Weapons' => '傳奇武器',
    'Unique Armours' => '傳奇護甲',
    'Unique Accessories' => '傳奇飾品',
    'Unique Flasks' => '傳奇藥劑',
    'Unique Jewels' => '傳奇珠寶',
    'Unique Relics' => '傳奇聖物',
    'Skill Gems' => '技能寶石',
    'Cluster Jewels' => '星團珠寶',
    // 'Atlas' => '輿圖',
    'Maps' => '地圖',
    'Blighted Maps' => '凋落地圖',
    'Blight-ravaged Maps' => '凋落蔓延地圖',
    'Scourged Maps' => '災魘地圖',
    'Unique Maps' => '傳奇地圖',
    'Delirium Orbs' => '譫妄玉',
    'Invitations' => '釋界邀請',
    'Scarabs' => '聖甲蟲',
    'Memories' => '記憶',
    // 'Crafting' => '工藝',
    'Base Types' => '基底物品',
    'Fossils' => '化石',
    'Resonators' => '鑄新儀',
    'Helmet Enchants' => '頭盔附魔',
    'Beasts' => '野獸',
    'Essences' => '精髓',
    'Vials' => '神廟罈',
];
foreach ($ui as $en => $zh) {
    $output[md5($en)] = [
        'name' => $en,
        'name_zh_tw' => $zh,
    ];
}

// Step.2
// Helmet, Cluster
// Notable, KeyStone, Mastery
$enHelmetEnchants = json_decode(file_get_contents(__DIR__ . '/en/helmetEnchants.json'), true);
$zhtwHelmetEnchants = json_decode(file_get_contents(__DIR__ . '/zh-TW/helmetEnchants.json'), true);
foreach ($enHelmetEnchants as $key => $enchants) {
    if (isset($enchants['name']) && isset($enchants['desc'])) {
        $output[md5($enchants['name'])] = [
            'name' => $enchants['name'],
            'name_zh_tw' => $zhtwHelmetEnchants[$key]['name'],
        ];
        if (isset($enchants['isNotable'])) {
            $output[md5('Allocates ' . $enchants['name'])] = [
                'name' => 'Allocates ' . $enchants['name'],
                'name_zh_tw' => '配置' . $zhtwHelmetEnchants[$key]['name'],
            ];
        }
        foreach ($enchants['desc'] as $index => $desc) {
            if (!isset($zhtwHelmetEnchants[$key]['desc'][$index])) {
                dd($enchants, $zhtwHelmetEnchants[$key], $key);
            }
            $output[md5($desc)] = [
                'name' => $desc,
                'name_zh_tw' => $zhtwHelmetEnchants[$key]['desc'][$index],
            ];
        }
        continue;
    }
    $pattern = '/\(([0-9]+)–[0-9]+\) (to|至) \([0-9]+–([0-9]+)\)/';
    $enName = preg_replace($pattern, '$1 $2 $2', $enchants);
    $zhtwName = preg_replace($pattern, '$1 $2 $3', $zhtwHelmetEnchants[$key]);

    $output[md5($enName)] = [
        'name' => $enName,
        'name_zh_tw' => $zhtwName,
    ];
}

// Step.3
$poeTradejson = json_decode(file_get_contents(__DIR__ . '/poe.trade.zh/translate.json'), true);

$keys = array_map('strlen', array_keys($poeTradejson));
array_multisort($keys, SORT_ASC, $poeTradejson);
$enItemKeys = array_keys($poeTradejson);

$enJson = json_decode(file_get_contents(__DIR__ . '/en/items.json'), true)['result'];

foreach ($enJson as $category) {
    foreach ($category['entries'] as $entry) {
        if (in_array($category['id'], ['accessories', 'armour', 'currency', 'flasks', 'jewels', 'weapons', 'heistmission', 'sentinel'])) {
            if (isset($entry['name'])) {
                $pattern = $entry['name'];
            } else {
                $pattern = $entry['text'];
            }
        } else if (in_array($category['id'], ['cards', 'gems', 'maps', 'leaguestones', 'monsters', 'heistequipment', 'logbook', 'memoryline'])) {
            $pattern = $entry['text'];
        }

        $res = preg_grep('/^' . $pattern . '/', $enItemKeys);
        // if ($pattern == 'Arc') {
        //     dd($res);
        // }
        if ($res) {
            $keyName = array_values($res)[0];

            $output[md5($pattern)] = [
                'name' => $pattern,
                'name_zh_tw' => $poeTradejson[$keyName]['zh_tw'],
            ];
        }
        if (count($res) > 1) {
            $observer[] = array_merge($res, $output[md5($pattern)]);
        }
    }
}

// Ninja 翻譯錯誤修正
$str = '+1% to all maximum Resistances if Equipped Helmet, Body Armour, Gloves, and Boots all have Armour';
$output[md5($str)] = [
    'name' => $str,
    'name_zh_tw' => '+1% to all maximum Elemental Resistances if Equipped Helmet, Body Armour, Gloves, and Boots all have Armour'
];

// 職業
$jobs = [
    'Marauder' => '野蠻人',
    'Juggernaut' => '勇士',
    'Berserker' => '暴徒',
    'Chieftain' => '酋長',
    'Ranger' => '遊俠',
    'Raider' => '俠客',
    'Deadeye' => '銳眼',
    'Pathfinder' => '追獵者',
    'Witch' => '女巫',
    'Occultist' => '秘術家',
    'Elementalist' => '元素使',
    'Necromancer' => '死靈師',
    'Duelist' => '決鬥者',
    'Slayer' => '處刑者',
    'Gladiator' => '衛士',
    'Champion' => '冠軍',
    'Templar' => '聖堂武僧',
    'Inquisitor' => '判官',
    'Hierophant' => '聖宗',
    'Guardian' => '守護者',
    'Shadow' => '暗影刺客',
    'Assassin' => '刺客',
    'Trickster' => '詐欺師',
    'Saboteur' => '破壞者',
    'Scion' => '貴族',
    'Ascendant' => '昇華使徒',
];
foreach ($jobs as $en => $zh) {
    $output[$en] = [
        'name' => $en,
        'name_zh_tw' => $zh,
    ];
}

// 其他有的沒的
$customs = [
    'Vaal' => '瓦爾',
    'Awakened' => '覺醒',
    'Phantasmal' => '幻影的',
    'Divergent' => '相異的',
    'Anomalous' => '異常的',
    'The Gilded Chalice' => '鍍金聖杯',
    'The Second Sacrament' => '第二聖事',
    'The Hour of Divinity' => '神聖時刻',
    'The Night Lamp' => '夜燈',
    'The Broken Censer' => '破香爐',
    'The First Crest' => '第一頂峰',
    'The Original Scripture' => '初始經文',
    'The Blood of Innocence' => '善之血',
    'The Chains of Castigation' => '懲戒鎖鏈',
    'The Power and the Promise' => '權力和誓約',
    'Ancestral Tattoo of Bloodlines' => '血族的祖靈紋身',
    "2% increased Recovery Rate of Life, Mana and Energy Shield\nper Tribe for which you have an allocated Tattoo" => '每個你配置紋身的部落，增加 2% 生命、魔力和能量護盾恢復率',
    "Einhar's Memory of Harvest Beasts" => "豐收野獸之埃哈的記憶",
    "Einhar's Memory of the Sacred Grove" => "聖殿密園之埃哈的記憶",
    "Einhar's Memory of Crystal Prisons" => "水晶監獄之埃哈的記憶",
    "Kirac's Memory of Survivor's Guilt" => "倖存罪惡之基拉克的記憶",
    "Niko's Memory of Demonic Onslaught" => "惡魔猛攻之尼科的記憶",
    "Niko's Memory of Chasms" => "裂谷之尼科的記憶",
    "Niko's Memory of Grasping Hands" => "亡者之手之尼科的記憶",
    "Kirac's Memory of Phaaryl" => "法瑞爾之基拉克的記憶",
    "Alva's Memory of Cascading Fortunes" => "鉅額財富之艾瓦的記憶",
    "Alva's Memory of Reverse Incursion" => "逆襲之艾瓦的記憶",
    "Kirac's Memory of the Pantheon" => "眾神殿之基拉克的記憶",
    "Niko's Memory of Tormented Souls" => "罪魂之尼科的記憶",
];
foreach ($customs as $en => $zh) {
    $output[md5($en)] = [
        'name' => $en,
        'name_zh_tw' => $zh,
    ];
}

file_put_contents(__DIR__ . '/../json/language_zh_tw.json', json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
file_put_contents(__DIR__ . '/../json/ob.json', json_encode($observer, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

function dd(...$var)
{
    var_dump($var);
    exit;
}
