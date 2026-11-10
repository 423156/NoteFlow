# NoteFlow｜AI 筆記整理知識庫

把零散的課堂筆記整理成能搜尋、能回溯來源、能相互連結的個人知識庫。網站僅使用 HTML、CSS 與 Vanilla JavaScript，沒有安裝或建置步驟。

## 資料如何流動

`raw/ 原始筆記 → AI 依 AGENTS.md 整理 → data/notes.js 結構化知識 → 網站`

`raw` 是 source of truth，整理時不覆寫原文。目前 4 份原始來源已整理成 7 篇概念筆記：Agent、Harness、Prompt、AGENTS.md、Context Engineering、靜態知識庫與 GitHub Pages。一份來源能支持多篇概念；例如 Harness 同時引用 Agent 課與 Prompt 課，避免將 raw 檔案一對一複製成卡片。

## Repository structure

```text
AGENTS.md                  AI 的執行手冊
README.md                  人的使用指南
log.md                     只追加的 ingest 紀錄
.nojekyll                  讓 Pages 原樣發布檔案，保留 raw .md 連結
index.html                 網站入口
raw/
  01-agent-harness.md
  02-prompt-design.md
  03-static-publishing.md
  context-engineering-class.md
data/notes.js              window.NOTES 結構化資料
assets/css/style.css       響應式視覺
assets/js/app.js           render 與互動
```

`work/`、`outputs/` 是工作環境的驗收暫存／交付區，不是網站執行依賴，不需上傳 GitHub Pages。

## 本機使用

直接以現代瀏覽器開啟 `index.html`。不需要 npm、API、網路字型或伺服器。想測試 HTTP 路徑時，可在此目錄執行 `python -m http.server 8000`（若電腦已有 Python），再開啟 `http://localhost:8000/`。

- 搜尋 title、summary、tags、keyPoints；桌面可按 `/` 聚焦搜尋。
- 左側分類、卡片標籤與搜尋能組合；再次點擊同一標籤取消它，或點「清除篩選」。
- 預設依 updatedAt 由新到舊，同日期依 id 排序；也可切換標題排序。
- 點標題或箭頭閱讀完整筆記；延伸連結直接切換筆記，關閉或 Escape 回到列表。
- 全庫統計不隨篩選改變；知識連結以雙向關聯的一組 pair 計算一次。最近更新顯示全庫前三篇。

## GitHub Pages deployment

1. 將上方結構的檔案上傳或 push 到你的 GitHub repository；保留 `.nojekyll`，不必上傳 work 或 outputs。
2. 在 repository 的 **Settings → Pages → Build and deployment**，將 Source 設為 **Deploy from a branch**。
3. 選擇包含檔案的 branch（例如 `main`），資料夾選 **/ (root)**，按 Save。
4. 等待 GitHub 完成部署，再開啟 Pages 顯示的網址。專案網站通常位於 `https://帳號.github.io/repository/`。
5. 在正式網址重新檢查搜尋、詳情與原始來源連結。所有本地資源皆採相對路徑。

部署設定依 [GitHub 官方說明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)；`.nojekyll` 的用途見 [建立 GitHub Pages 網站](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)。此專案已上傳至 GitHub Repository，並成功部署至 GitHub Pages，網站可透過公開網址正常瀏覽。

## 新增原始筆記

在 raw/ 新增一個 UTF-8 Markdown (.md) 檔，使用清楚且不重複的英文 kebab-case 檔名；不要覆寫舊來源。請 AI：「先讀取 AGENTS.md，依規則 ingest raw/新檔名.md，更新知識與 log，完成驗收。」一般新增內容只會影響 `data/notes.js` 與 `log.md`。

## 測試新 AI 能否接手

開啟沒有這次聊天紀錄的新對話，僅提供 repository 與上述指令。用一份補充現有 Harness 概念的 raw 測試：AI 應更新 `agent-harness`，保留 id 與舊來源，加入新來源、更新日期並 append log，而不是另建同義筆記。再提供真正的新概念，觀察它能否建立新 id 與合理雙向關聯。若內容與舊來源衝突，應保留兩方並標「待確認」。最後檢查 raw 沒被改動、來源與關聯有效，以及網站所有互動仍可用。完整執行規則與驗收清單以 AGENTS.md 為準。
