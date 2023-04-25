<?php

$output = [];
$observer = [];

// Step.1 處理 UI
$ui = [
    // 'General' => '一般',
    'Currency' => '通貨',
    'Fragments' => '碎片',
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
$enHelmetEnchants = json_decode(file_get_contents('en\helmetEnchants.json'), true);
$zhtwHelmetEnchants = json_decode(file_get_contents('zh-TW\helmetEnchants.json'), true);
foreach ($enHelmetEnchants as $key => $enchants) {
    if (isset($enchants['name']) && isset($enchants['desc'])) {
        $output[md5($enchants['name'])] = [
            'name' => $enchants['name'],
            'name_zh_tw' => $zhtwHelmetEnchants[$key]['name'],
        ];
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
    $pattern = '/\(([0-9]+)–[0-9]+\) to \([0-9]+–([0-9]+)\)/';
    $enName = preg_replace($pattern, '$1 to $2', $enchants);
    $pattern = '/\(([0-9]+)–[0-9]+\) 至 \([0-9]+–([0-9]+)\)/';
    $zhtwName = preg_replace($pattern, '$1 to $2', $zhtwHelmetEnchants[$key]);
    
    $output[md5($enName)] = [
        'name' => $enName,
        'name_zh_tw' => $zhtwName,
    ];
}

// Step.3
$poeTradejson = json_decode(file_get_contents('poe.trade.zh\translate.json'), true);

$enItemKeys = array_keys($poeTradejson);

$enJson = json_decode(file_get_contents('en\items.json'), true)['result'];
// $zhtwJson = json_decode(file_get_contents('zh-TW\items.json'), true)['result'];

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

file_put_contents('../json/language_zh_tw.json', json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
file_put_contents('../json/ob.json', json_encode($observer, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

function dd(...$var)
{
    var_dump($var);
    exit;
}
