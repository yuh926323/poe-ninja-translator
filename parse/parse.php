<?php

$output = [];
$observer = [];

// Step.1 處理 UI
$ui = [
    // 'General' => '一般',
    'Currency' => '通貨',
    'Fragments' => '碎片',
    'Tattoos' => '紋身',
    'Kalguuran Runes' => '卡爾葛符文',
    'Omens' => '預兆',
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

    // Ninja Character Stats
    'Character' => '角色',
    'Attributes' => '屬性',
    'Movement Speed' => '移動速度',
    'Bandits' => '盜賊',
    'Pantheon' => '眾神殿',
    'Pantheon Major' => '眾神殿主神',
    'Pantheon Minor' => '眾神殿次神',
    'Charges' => '充能球',
    'Endurance charges' => '耐力球',
    'Frenzy charges' => '狂怒球',
    'Power charges' => '暴擊球',
    'Defensive' => '防禦',
    'Life' => '生命',
    'Energy shield' => '能量護盾',
    'Mana' => '魔力',
    'Armour' => '護甲值',
    'Evasion rating' => '閃避值',
    'Block' => '格擋',
    'Spell Supression' => '壓抑法術傷害率',
    'Physical taken as' => '物理承受轉化',
    'Resistances' => '抗性',
    'Simulated' => '模擬',
    'Effective Health Pool' => '有效血池',
    'Max Hit' => '最大擊中',
    'Skill DPS Estimation' => '預估技能DPS',
];
$data = [];
foreach ($ui as $en => $zh) {
    $data[md5($en)] = [
        'name' => $en,
        'name_zh_tw' => $zh,
    ];
}
$output['ui'] = $data;

// Step.2
$items = json_decode(file_get_contents(__DIR__ . '/items.json'), true);
$data = [];
foreach ($items as $key => $langs) {
    if (!isset($langs['us']) || !isset($langs['tw'])) {
        // dump($langs);
        continue;
    }
    $itemTw = $langs['tw'];
    $itemUs = $langs['us'];

    $nameTw = $itemTw['fullname'] ?? $itemTw['name'];
    $nameUs = $itemUs['fullname'] ?? $itemUs['name'];
    $md5 = md5($itemUs['name']);
    $obj = [
        'name' => $nameUs,
        'name_zh_tw' => sprintf('%s (%s)', $nameTw, $nameUs),
    ];

    $data[$md5] = $obj;
}
$output['misc'] = $data;

// Step.3
$items = json_decode(file_get_contents(__DIR__ . '/misc.json'), true);
$data = [];
foreach ($items as $key => $langs) {
    $itemTw = $langs['tw'];
    $itemUs = $langs['us'];

    $nameTw = $itemTw['fullname'] ?? $itemTw['name'];
    $nameUs = $itemUs['fullname'] ?? $itemUs['name'];
    $md5 = md5($itemUs['name']);

    $data[$md5] = [
        'name' => $nameUs,
        'name_zh_tw' => sprintf('%s (%s)', $nameTw, $nameUs),
    ];
}
$output['misc'] = array_merge($output['misc'], $data);

// Step.4
$items = json_decode(file_get_contents(__DIR__ . '/passives.json'), true);
$data = [];
foreach ($items as $key => $langs) {
    $passviesTw = $langs['tw'];
    $passviesUs = $langs['us'];

    $nameTw = $passviesTw['name'];
    $nameUs = $passviesUs['name'];
        
    $descTw = $passviesTw['desc'];
    $descUs = $passviesUs['desc'];

    if (isset($nameUs) && isset($descUs)) {
        $md5 = md5($nameUs);
        $data[$md5] = [
            'name' => $nameUs,
            'name_zh_tw' => sprintf('%s (%s)', $nameTw, $nameUs),
        ];

        if (isset($passviesUs['isNotable'])) {
            $allocateNameTw = '配置' . $nameTw;
            $allocateNameUs = 'Allocates ' . $nameUs;
            $allocateMd5 = md5($allocateNameUs);
            $data[$allocateMd5] = [
                'name' => $allocateNameUs,
                'name_zh_tw' => $allocateNameTw,
            ];
        }

        foreach ($descUs as $index => $desc) {
            if (!isset($descTw[$index])) {
                dd($passviesTw, $key);
            }
            $data[md5($desc)] = [
                'name' => $desc,
                'name_zh_tw' => $descTw[$index],
            ];
        }
        continue;
    }
}
$output['passives'] = $data;

// Ninja 翻譯錯誤修正
$str = '+1% to all maximum Resistances if Equipped Helmet, Body Armour, Gloves, and Boots all have Armour';
$output[md5($str)] = [
    'name' => $str,
    'name_zh_tw' => '+1% to all maximum Elemental Resistances if Equipped Helmet, Body Armour, Gloves, and Boots all have Armour'
];

// 職業
$classes = [
    'Marauder' => '野蠻人',
    'Juggernaut' => '勇士',
    'Berserker' => '暴徒',
    'Chieftain' => '酋長',
    'Ranger' => '遊俠',
    'Warden' => '守護者',
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
$data = [];
foreach ($classes as $en => $zh) {
    $data[md5($en)] = [
        'name' => $en,
        'name_zh_tw' => $zh,
    ];
}
$output['ui'] = array_merge($output['ui'], $data);

// 稀有度 + 基底排列組合
$baseItems = [
    "Claw" => "爪",
    "Dagger" => "匕首",
    "Wand" => "法杖",
    "One Handed Sword" => "單手劍",
    "Thrusting One Handed Sword" => "細劍",
    "One Handed Axe" => "單手斧",
    "One Handed Mace" => "單手錘",
    "Sceptre" => "權杖",
    "Rune Dagger" => "符紋匕首",
    "Bow" => "弓",
    "Staff" => "長杖",
    "Two Handed Sword" => "雙手劍",
    "Two Handed Axe" => "雙手斧",
    "Two Handed Mace" => "雙手錘",
    "Warstaff" => "征戰長杖",
    "Quiver" => "箭袋",
    "Shield" => "盾",
    "Gloves" => "手套",
    "Boots" => "鞋子",
    "Body Armour" => "胸甲",
    "Helmet" => "頭部",
    "Amulet" => "項鍊",
    "Ring" => "戒指",
    "Belt" => "腰帶",
    "Tincture" => "萃取物",
    "Flask" => "藥劑",
    "Weapon" => "武器",
    "Jewel" => "珠寶",
];
$rarities = [
    'Normal' => '普通',
    'Magic' => '魔法',
    'Rare' => '稀有',
    'Unique' => '傳奇',
];
$data = [];
foreach ($rarities as $rarityEn => $rarityZh) {
    foreach ($baseItems as $itemEn => $itemZh) {
        $fullItmeEn = $rarityEn . " " . $itemEn;
        $md5 = md5($fullItmeEn);
        $data[$md5] = [
            'name' => $fullItmeEn,
            'name_zh_tw' => sprintf('%s%s (%s)', $rarityZh, $itemZh, $fullItmeEn),
        ];
        $md5 = md5($itemEn);
        $data[$md5] = [
            'name' => $itemEn,
            'name_zh_tw' => sprintf('%s (%s)', $itemZh, $itemEn),
        ];
    }
}
$output['ui'] = array_merge($output['ui'], $data);

// 其他有的沒的
$customs = [
    // "2% increased Recovery Rate of Life, Mana and Energy Shield\nper Tribe for which you have an allocated Tattoo" => '每個你配置紋身的部落，增加 2% 生命、魔力和能量護盾恢復率',
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
    'Eramir' => '艾米爾',
    'Alira' => '阿莉亞',
    'Kraityn' => '克雷頓',
    'Oak' => '歐克',
    'The Brine King' => '海洋王之魂',
    'Arakaali' => '艾爾卡莉之魂',
    'Solaris' => '日耀神之魂',
    'Lunaris' => '月影神之魂',
    'Abberath' => '艾貝拉斯之魂',
    'Gruthkul' => '葛魯斯寇之魂',
    'Yugul' => '伊果之魂',
    'Shakari' => '夏卡莉之魂',
    'Tukohama' => '圖克哈瑪之魂',
    'Ralakesh' => '芮勒蓋許之魂',
    'Garukhan' => '卡洛翰之魂',
    'Ryslatha' => '瑞斯拉薩之魂',
    'No Major God' => '沒有選擇主神',
    'No Minor God' => '沒有選擇次神',
];
$data = [];
foreach ($customs as $en => $zh) {
    $md5 = md5($en);
    $data[$md5] = [
        'name' => $en,
        'name_zh_tw' => sprintf('%s (%s)', $zh, $en),
    ];
}
$output['misc'] = array_merge($output['misc'], $data);

// 底下放不要雙語版本的，因為畫面會很雜亂
$customs = [
    'Vaal' => '瓦爾',
    'Awakened' => '覺醒',
    'Phantasmal' => '幻影的',
    'Divergent' => '相異的',
    'Anomalous' => '異常的',
    "Your Maps have +2% chance to contain other Extra Content that can\nbe turned off through Atlas Passives" => "你的地圖有 +2% 機率含有可以透過輿圖天賦關閉的其他額外內容",
];
$data = [];
foreach ($customs as $en => $zh) {
    $md5 = md5($en);
    $data[$md5] = [
        'name' => $en,
        'name_zh_tw' => $zh,
    ];
}
$output['misc'] = array_merge($output['misc'], $data);


// 主要輸出為 language_zh_tw.json
// ob.json 是拿來 debug 用的
file_put_contents(__DIR__ . '/../json/language_zh_tw.json', json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
file_put_contents(__DIR__ . '/../json/ob.json', json_encode($observer, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

function dump(...$var)
{
    var_dump($var);
}

function dd(...$var)
{
    var_dump($var);
    exit;
}
