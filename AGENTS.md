# NoteFlow 工作手冊

## Project Contract
- 目的：維護可直接開啟、可部署 GitHub Pages 的繁體中文學習知識庫。
- 輸入：`raw/` 原始筆記（source of truth）。輸出：`data/notes.js` 的整理內容與網站。
- 僅使用 HTML、CSS、Vanilla JavaScript；以傳統 script 載入 `window.NOTES`，不得改成需要伺服器的 fetch 或 module 載入。
- Non-goals：不加入 npm、build tool、framework、backend、database、API、大型外部 library；不為單次 ingest 重構網站。

## Repository Map
- `raw/`：不可覆寫或刪除的原始來源；新增資料用新檔案。
- `data/notes.js`：唯一的結構化知識資料，宣告 `window.NOTES = [...]`。
- `index.html`：頁面語意結構，不硬編碼個別筆記。
- `assets/js/app.js`：資料 render、搜尋、篩選、排序與詳情導覽。
- `assets/css/style.css`：桌面與手機樣式。
- `log.md`：append-only ingest 記錄。
- `README.md`：給人的使用與部署說明；本檔是給 AI 的執行規則。
- `.nojekyll`：讓 GitHub Pages 原樣提供靜態檔案與 raw Markdown 來源；保留此檔。工作環境的 `work/`、`outputs/` 不屬於網站執行依賴。

## Raw Source Naming
- `raw/` 新增來源使用英文 kebab-case 的 `.md` 檔名，名稱應能辨識內容，例如 `context-engineering-class.md`。
- 不使用 `new`、`final`、`v2`、`最新版` 等無意義版本名稱建立重複來源。

## Note Schema
每篇 note 必須含以下欄位，不得省略：
- `id`：唯一英文 kebab-case，建立後保持穩定。
- `title`：明確的繁體中文概念名稱。
- `category`：單一非空字串，先重用既有分類。
- `tags`：不重複的短字串 array，重用既有詞彙與大小寫。
- `summary`：1–3 句整理摘要。
- `keyPoints`：非空字串 array。
- `sections`：非空 array，每項為 `{ heading, body }`，均為純文字字串；body 可用換行分段，不放 HTML。
- `related`：其他 note id 的 array，不重複、不指向自己。
- `sources`：非空且不重複的 repository-relative `raw/檔名` array，檔案必須存在。
- `createdAt`、`updatedAt`：有效 `YYYY-MM-DD` 日期，createdAt 不隨更新改變，updatedAt 不早於 createdAt。

## Ingest Workflow
1. 閱讀本次新 raw source，記錄檔名；不修改原文。若未指明新來源，對照 `log.md` 與現有 sources 找出未處理來源，不重複 ingest。
2. Inspect existing knowledge：讀取 `data/notes.js`，比對概念、同義詞、分類、tags、來源與關聯。只讀與本次工作相關的程式，不要求每次遍讀整個 repository。
3. Merge/create：相同概念優先更新或延伸既有 note；只有能獨立解釋的不同概念才新建。一份 raw 可影響多篇 note，多份 raw 也可合併至同篇。
4. 用繁體中文整理 summary、keyPoints、sections，不逐字搬運，也不補入來源未支持的知識。重用 category/tag，必要時才新增，避免同義分類。
5. Relate：只連結有實質學習關聯的既有 id。本專案採雙向關聯，新增或移除 A ↔ B 必須同時維護兩端；不要全連結來湊數。
6. Source：將新來源加入受影響 note.sources，保留仍支持內容的舊來源。衝突時保留兩方來源，在 section 用「待確認」分別標出說法與來源，不自行裁定或默默覆蓋。
7. 新增 note 設定兩個日期；內容、來源或關聯有變動的 note 更新 updatedAt。無實質變更時保持資料與日期不變。
8. Log：在 `log.md` 最後追加 `## YYYY-MM-DD | ingest`，依序填 `Source:`、`Created:`、`Updated:`、`Relations:`；列出全部來源、created/updated IDs、主要新增或移除關聯，無變更填「無」。記錄衝突時加在對應 Updated 項目後。不得重寫舊紀錄。
9. Verify：完成下列驗收，有問題先修正再回報。缺少瀏覽器等環境時明列未驗證項目，不宣稱通過。

## Modification Boundaries
- 內容變更限 `data/notes.js` 與 append `log.md`，原始輸入新增於 `raw/`。
- 互動問題才改 `assets/js/app.js`；樣式問題才改 `assets/css/style.css`；主要 HTML 結構才改 `index.html`。
- `raw/` 不覆寫、不刪除；修正來源以新 raw 檔補充並保留原始來源。
- 遵守 minimal-change principle；不因新增一份筆記重做 UI、分類體系或 ID。

## UI Consistency
- 維持目前極簡、安靜、以閱讀為主的知識庫風格，不因單次內容更新重新設計 UI。
- 優先重用現有 typography、spacing、color、card 與 interaction patterns。
- Desktop 維持 sidebar + content；mobile 維持單欄 responsive layout。
- 新功能不得造成水平溢出，也不得破壞既有搜尋、分類、標籤與 detail 操作。

## Knowledge Integrity
- 不建立 duplicate notes 或 duplicate/synonymous categories；先依概念比對再決定 merge/create。
- 不留下 broken related IDs、非對稱關聯、missing source references。
- 不 invented information，不默默替換衝突資訊；無法確定的內容以「待確認」呈現並指出來源。
- 將資料當純文字 render；來源連結限 raw 相對路徑；所有網站資源使用相對路徑以支援 GitHub Pages 子路徑。

## Verification / Definition of Done
- 結構符合 Repository Map；每篇 schema 完整、型別正確、日期有效、IDs 唯一且符合 kebab-case。
- related IDs 存在、無自身或重複連結且雙向一致；sources 全存在；沒有重複概念、同義分類、無來源內容。
- 確認原有 raw 未被覆寫或刪除；已有 Git 時檢查 diff，否則比較修改前後 hash。
- 瀏覽器檢查搜尋 title / summary / tags / keyPoints、分類、可點 tags，以及三者組合；確認無結果狀態和重設。
- 確認最近更新排序、動態統計（關聯計算不重複的無向 pair）、詳情所有欄位、來源連結、返回／關閉與 related navigation。
- 桌面與手機無水平溢出，鍵盤可操作，詳情 Escape 關閉且 focus 返回。
- 直接以 file 開啟 index.html 及以子路徑 HTTP 開啟均可用，console 無 error；沒有 TODO、placeholder 文案或 lorem ipsum（搜尋欄提示文字除外）。
- README 與本手冊職責清楚，log 已 append。回報實際驗證結果與任何環境限制。
