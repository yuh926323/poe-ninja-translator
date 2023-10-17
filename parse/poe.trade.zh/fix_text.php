<?php

$filepath = __DIR__ . '/translate.json';
$json = json_decode(file_get_contents($filepath), true);
$json['The Fourth Vow Devout Chainmail']['zh_tw'] = '第四誓願 虔誠鏈甲 (The Fourth Vow Devout Chainmail)';
file_put_contents($filepath, json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));