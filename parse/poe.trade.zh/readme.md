
Step.1

在市集中文化的插件主控台下指令，並存到對應的檔案:

```json
> chrome.runtime.getURL('json/translate.json')
'chrome-extension://gohimadohmhdicbffkbpoegodammgghi/json/translate.json'           // ./translate.json
> chrome.runtime.getURL('json/clusterJewel.json')
'chrome-extension://gohimadohmhdicbffkbpoegodammgghi/json/clusterJewel.json'        // ./cluster.json
> chrome.runtime.getURL('json/passivesNotable.json')
'chrome-extension://gohimadohmhdicbffkbpoegodammgghi/json/passivesNotable.json'     // ./passivesNotable.json
```

Step.2

執行 `fix_text.php`

Step.3

執行 `sync-poe-data.sh` 將 en/zh-TW 目錄底下的 `items`, `stats`, `static` 都更新一輪，看要不要 format json