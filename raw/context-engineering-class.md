# Context Engineering

prompt 不是全部  
AI 還需要知道目前工作的背景

context 可能包含：
- 使用者需求
- 之前的對話
- 專案檔案
- 工具結果
- 專案規則

context 太少，AI 可能不知道要做什麼  
但 context 太多也不一定比較好，可能浪費 token，還可能讓重要資訊不明顯

所以 context engineering 應該是在決定：
哪些資訊要給 AI、什麼時候給、怎麼整理

跟 prompt engineering 有關，但不完全一樣  
prompt 比較像是在說明任務  
context engineering 比較像是在準備 AI 工作時需要知道的背景

AGENTS.md 應該也算是一種專案 context，因為可以讓新的 AI 知道這個專案的規則