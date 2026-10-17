# Preview & Shorts Controls for YouTube — 繁體中文指南

我是開發者Lenged。這是適用於電腦版Chrome與Microsoft Edge的免費擴充功能，可在原縮圖內持續預覽Shorts，並調整預覽音量及推薦影片的播放位置。所有功能免費，贊助完全自願。

[English / 한국어](https://github.com/orockandgto-glitch/shorts-in-place-preview) · [日本語](README.ja.md) · [简体中文](README.zh-CN.md)

## 功能

- 音量支援點擊與拖曳。滑鼠靜止3秒後只隱藏控制項，移動時重新顯示，播放及聲音狀態維持。首頁Shorts新增目前/總時間與進度列，放開拖曳後跳轉，可於設定中單獨關閉。

- 游標停留在首頁Shorts縮圖上約0.4秒，即在同一位置、相同大小播放實際影片。移開後停止並還原縮圖，不會同時播放多支Shorts。
- 每個新預覽都以靜音開始，需要聲音時使用左上角的小型音量控制項。
- 觀看一般影片時，右側推薦影片的預覽可調音量，並提供目前時間/總長度與進度列。開啟預覽聲音時，主影片暫時靜音；移開游標後還原先前的聲音狀態。主影片本身仍繼續播放。
- 可選擇自動隱藏Shorts觀看畫面的標題與頻道資訊，游標進入影片時顯示，移開時隱藏。
- 各項功能、停留等待時間及音量可在設定中調整。一般首頁影片使用YouTube原生預覽；點擊縮圖仍正常進入影片頁面。

## 手動安裝v0.6.0

1. 下載[安裝ZIP](https://github.com/orockandgto-glitch/shorts-in-place-preview/raw/main/Preview-Shorts-Controls-0.6.0.zip)，解壓縮至固定資料夾。
2. Chrome開啟 `chrome://extensions`；Edge開啟 `edge://extensions`，啟用「開發人員模式」。
3. 選擇「載入未封裝項目」，指定直接包含 `manifest.json` 的資料夾。
4. 如有舊版獨立擴充功能（Shorts In-place Preview、Preview Volume Control、Shorts Clear View），先停用以避免重複執行。
5. 重新整理YouTube。點擊擴充功能的工具列圖示可開啟設定與說明。

若使用GitHub自動產生的「Source code」壓縮檔，請指定裡面的 `extension` 資料夾，而非儲存庫根目錄。手動安裝不會從GitHub自動更新；新版需解壓縮至安裝位置，重新載入擴充功能後再整理YouTube。

[19秒實際Edge畫面及安裝說明](https://x.com/LengedTools/status/2110974712088273407)：包含實際Shorts預覽錄影，安裝部分是文字指引，並非安裝過程錄影。

## 支援範圍與限制

Edge電腦版已實際使用；作者於2026年10月15日手動測試Chrome並回報所有功能正常。目前套件不支援Firefox、Safari或手機版YouTube，Whale尚未驗證。需要能正常使用YouTube電腦版網站的環境。

功能依賴YouTube內部播放器與網頁結構，網站更新或其他擴充功能可能影響相容性。這不是廣告阻擋工具。曾確認預覽中出現廣告，但未完整驗證廣告、直播與受限內容。預覽可能影響YouTube觀看紀錄與推薦。尚未確認商店公開審核通過，目前提供GitHub手動安裝。

## 回饋與隱私

歡迎在[首次使用回饋](https://github.com/orockandgto-glitch/shorts-in-place-preview/issues/1)用繁體中文分享：安裝哪一步不清楚？音量與進度列在你的螢幕上是否容易操作？可重現的問題請另建[Issue](https://github.com/orockandgto-glitch/shorts-in-place-preview/issues)，附上瀏覽器、擴充功能版本與操作步驟。Issue為公開討論，請勿貼上個人帳號、私人觀看紀錄或未遮蔽的截圖。

擴充功能沒有開發者後端、使用分析或觀看紀錄上傳，偏好設定儲存在裝置本機。YouTube自己的播放請求與資料處理另依其規則。詳見[隱私政策](https://github.com/orockandgto-glitch/shorts-in-place-preview/blob/main/PRIVACY.md)。

[自願支持開發](https://buymeacoffee.com/lenged)。贊助不會解鎖額外功能，也不保證未來持續更新。程式碼供檢查，目前尚未選定允許再利用、再散布的開源授權。

這是獨立專案，與YouTube、Google、Microsoft無隸屬或背書關係。中文說明使用AI協助翻譯與編輯。


v0.6.0變更已於2026年10月18日在Edge確認。Chrome先前測試的是v0.5.2，新互動仍待另外複測。
