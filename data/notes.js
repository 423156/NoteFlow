window.NOTES = [
  {
    id: 'ai-agent', title: 'AI Agent：從目標走向行動', category: 'AI 系統',
    tags: ['Agent', '工作流程'],
    summary: 'Agent 依目標選擇動作、使用工具，並根據結果調整下一步。理解它的關鍵，是觀察一個任務如何被逐步完成。',
    keyPoints: ['觀察狀態 → 選擇動作 → 使用工具 → 根據結果調整。', '設定停止條件，避免不斷循環。', '任務完成與來源可追溯，比文字流暢更重要。'],
    sections: [{ heading: '從回答到執行', body: '在課堂的筆記整理情境中，Agent 不只產出文字，也判斷哪些概念應合併，並利用工具完成整理。' }, { heading: '如何判斷完成', body: '檢查目標是否達成、工具結果是否正確，以及整理內容能否回溯原始來源。' }],
    related: ['agent-harness', 'prompt-design', 'repository-instructions'],
    sources: ['raw/01-agent-harness.md', 'raw/02-prompt-design.md'], createdAt: '2026-11-06', updatedAt: '2026-11-06'
  },
  {
    id: 'agent-harness', title: 'Harness：讓 Agent 有環境可執行', category: 'AI 系統',
    tags: ['Agent', '驗證'],
    summary: 'Harness 是 Agent 周圍的執行環境，提供工具、上下文、權限與檢查機制。它承接模型的決策，讓行動可以被執行與驗證。',
    keyPoints: ['分開理解模型決策與執行環境的責任。', '工具、上下文、權限和檢查機制都是環境的一部分。', '明確規則仍需要實際驗證配合。'],
    sections: [{ heading: '筆記整理的分工', body: 'Agent 決定合併哪些概念；Harness 提供讀檔、寫入結構化資料與檢查來源的能力。' }, { heading: '與 Prompt 配合', body: 'Prompt 描述目標與限制，Harness 提供執行條件。兩者搭配，才能讓要求落實到可檢查的結果。' }],
    related: ['ai-agent', 'prompt-design'], sources: ['raw/01-agent-harness.md', 'raw/02-prompt-design.md'], createdAt: '2026-11-06', updatedAt: '2026-11-06'
  },
  {
    id: 'prompt-design', title: 'Prompt 設計：把完成條件說清楚', category: '知識工作',
    tags: ['Prompt', '工作流程', '驗證'],
    summary: '用明確目標、必要背景、限制與輸出格式降低猜測。先定義什麼叫完成，再檢查輸出是否真的符合要求。',
    keyPoints: ['說明目標、背景、限制與輸出格式。', '要求摘要、重點與來源，使結果容易檢查。', '來源矛盾時標示「待確認」，不自行猜測。'],
    sections: [{ heading: '把需求寫成可檢查的指示', body: '例如：只依提供的原始筆記整理摘要、重點與來源；遇到矛盾時保留不同說法並標示待確認。' }, { heading: '從一次任務到重複工作', body: '每次的原始材料可能不同，穩定的整理規則則適合寫入 AGENTS.md，供下一次任務沿用。' }, { heading: '與上下文工程的關係', body: 'Prompt 設計著重說明任務；上下文工程則安排 AI 工作時需要的背景，決定提供哪些資訊、何時提供，以及如何整理。兩者相關但不完全相同，任務指示之外仍需要適切的背景。' }],
    related: ['ai-agent', 'agent-harness', 'repository-instructions', 'context-engineering'], sources: ['raw/02-prompt-design.md', 'raw/context-engineering-class.md'], createdAt: '2026-11-06', updatedAt: '2026-11-07'
  },
  {
    id: 'repository-instructions', title: 'AGENTS.md：可接手的知識工作流程', category: '知識工作',
    tags: ['AGENTS.md', '工作流程'],
    summary: '把穩定規則放進 repository，讓下一個 AI 不依賴過往對話也能接手。整理前先比對既有概念，是避免重複筆記的重要步驟。',
    keyPoints: ['記錄穩定的工作規則，避免混入單次任務細節。', '新來源先比對既有知識，再合併或建立新概念。', '以實際功能檢查確認工作完成。'],
    sections: [{ heading: '讓流程留在專案裡', body: 'AGENTS.md 把重複任務的規則留在檔案中，新的 AI 能從 repository 理解流程，而不必取得先前聊天紀錄。' }, { heading: '規則與驗收一起交接', body: '靜態網站課堂提供了具體驗收例子：搜尋、分類、標籤、詳情與手機畫面。規則需配合這類可觀察的檢查。' }, { heading: '專案規則也是上下文', body: 'AGENTS.md 將專案規則提供給新接手的 AI，因此也可視為專案上下文的一部分，協助它理解目前工作的背景。' }],
    related: ['ai-agent', 'prompt-design', 'static-knowledge-site', 'context-engineering'], sources: ['raw/02-prompt-design.md', 'raw/03-static-publishing.md', 'raw/context-engineering-class.md'], createdAt: '2026-11-06', updatedAt: '2026-11-07'
  },
  {
    id: 'static-knowledge-site', title: '靜態知識庫：分開資料與畫面', category: '網站發布',
    tags: ['靜態網站', 'JavaScript', '驗證'],
    summary: '以 HTML、CSS 與 JavaScript 建立知識庫，讓結構化資料驅動畫面。內容獨立存放，新增筆記就不需要逐張修改卡片。',
    keyPoints: ['HTML 負責結構、CSS 負責樣式、JavaScript 負責互動。', '由 notes.js 中的 window.NOTES 產生畫面。', '傳統 script 載入支援直接開啟 index.html。'],
    sections: [{ heading: '內容與介面分工', body: '先將原始筆記整理成結構化資料，再由 JavaScript 產生卡片、分類與詳情，避免把每篇內容寫死在 HTML。' }, { heading: '保持本機可用', body: '本練習採用傳統 script 讀取 window.NOTES，不透過 fetch 讀取本地資料。驗收涵蓋搜尋、分類、標籤、詳情與手機畫面。' }],
    related: ['repository-instructions', 'github-pages'], sources: ['raw/03-static-publishing.md'], createdAt: '2026-11-06', updatedAt: '2026-11-06'
  },
  {
    id: 'github-pages', title: 'GitHub Pages：發布你的靜態知識庫', category: '網站發布',
    tags: ['GitHub Pages', '靜態網站'],
    summary: 'GitHub Pages 可發布 repository 裡的靜態檔案。以 index.html 為入口，並使用相對路徑，讓網站在專案子路徑下也能運作。',
    keyPoints: ['入口檔案命名為 index.html。', '此練習不需要後端或資料庫。', '資源使用相對路徑，避免依賴網站根目錄。'],
    sections: [{ heading: '注意專案網址的子路徑', body: '專案網址可能包含 repository 名稱。像 assets/css/style.css 這樣的相對路徑，能隨頁面所在位置找到資源。' }, { heading: '發布前的檢查', body: '檢查搜尋、分類、標籤、詳情與手機畫面；確認本機可直接開啟，並在子路徑下檢查資源載入。' }],
    related: ['static-knowledge-site'], sources: ['raw/03-static-publishing.md'], createdAt: '2026-11-06', updatedAt: '2026-11-06'
  },
  {
    id: 'context-engineering', title: '上下文工程：安排 AI 所需的工作背景', category: '知識工作',
    tags: ['Prompt', '工作流程', 'AGENTS.md'],
    summary: '上下文工程決定要提供哪些背景資訊、何時提供，以及如何整理，讓 AI 理解目前的工作。資訊不足可能讓任務不清楚，過多則可能浪費 token，並使重要資訊不易辨識。',
    keyPoints: ['背景可包含使用者需求、先前對話、專案檔案、工具結果與專案規則。', '安排資訊的內容、提供時機與整理方式，而非只增加資訊量。', 'Prompt 著重任務說明，上下文工程著重準備工作背景。', 'AGENTS.md 可作為新接手 AI 理解專案規則的上下文。'],
    sections: [{ heading: 'AI 需要哪些背景', body: '除了任務指示，AI 還需要了解目前工作的背景。使用者需求、過去的對話、專案檔案、工具結果與專案規則，都可能成為上下文。' }, { heading: '資訊量與重要性的取捨', body: '上下文不足時，AI 可能無法判斷要完成什麼；提供過多資訊也未必更好，因為可能消耗不必要的 token，或讓重要資訊不明顯。整理時應考慮資訊的選擇、提供時機與呈現方式。' }, { heading: '與任務指示及專案規則的關係', body: 'Prompt 設計偏重把任務說清楚，上下文工程偏重準備執行時需要的背景。AGENTS.md 保存專案規則，讓新的 AI 能理解這些規則，也是專案上下文的一種。' }],
    related: ['prompt-design', 'repository-instructions'], sources: ['raw/context-engineering-class.md'], createdAt: '2026-11-07', updatedAt: '2026-11-07'
  }
];
