(() => {
  'use strict';
  const notes = window.NOTES;
  const $ = (selector) => document.querySelector(selector);
  const state = { query: '', category: '', tag: '', sort: 'recent' };
  const byId = new Map(notes.map(note => [note.id, note]));
  const categories = [...new Set(notes.map(note => note.category))];
  const tags = [...new Set(notes.flatMap(note => note.tags))];
  const dialog = $('#detail');
  let returnFocus = null;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const tagButton = tag => `<button class="tag${state.tag === tag ? ' active' : ''}" data-tag="${escape(tag)}" aria-pressed="${state.tag === tag}"># ${escape(tag)}</button>`;
  const recentSort = (a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.id.localeCompare(b.id);

  function renderNavigation() {
    $('#categories').innerHTML = ['', ...categories].map((category, index) => `<button class="category-button${state.category === category ? ' active' : ''}" data-category="${escape(category)}" aria-pressed="${state.category === category}"><span class="nav-icon" aria-hidden="true">${index ? '▤' : '▦'}</span><span>${escape(category || '全部筆記')}</span><span class="nav-count">${category ? notes.filter(note => note.category === category).length : notes.length}</span></button>`).join('');
    $('#tag-cloud').innerHTML = tags.map(tagButton).join('');
    $('#breadcrumb').textContent = state.category || '全部筆記';
  }

  function renderNotes() {
    const query = state.query.trim().toLocaleLowerCase();
    const visible = notes.filter(note => (!state.category || note.category === state.category) && (!state.tag || note.tags.includes(state.tag)) && (!query || [note.title, note.summary, ...note.tags, ...note.keyPoints].join(' ').toLocaleLowerCase().includes(query)));
    visible.sort(state.sort === 'recent' ? recentSort : (a, b) => a.title.localeCompare(b.title, 'zh-Hant'));
    $('#result-count').textContent = `${visible.length} 篇`;
    $('#library-title').textContent = state.category || '所有筆記';
    $('#notes-grid').innerHTML = visible.map(note => `<article class="note-card"><div class="card-top"><span class="category-chip">${escape(note.category)}</span><span class="card-index">${String(notes.indexOf(note) + 1).padStart(2, '0')}</span></div><h3 class="note-title"><button class="note-link" data-note="${note.id}">${escape(note.title)}</button></h3><p>${escape(note.summary)}</p><div class="card-tags">${note.tags.map(tagButton).join('')}</div><div class="card-bottom"><span>更新於 <time datetime="${note.updatedAt}">${note.updatedAt.replaceAll('-', '.')}</time></span><button data-note="${note.id}" aria-label="閱讀${escape(note.title)}">↗</button></div></article>`).join('');
    $('#empty').hidden = visible.length > 0;
    const filters = [state.query.trim() && `搜尋：${state.query.trim()}`, state.category && `分類：${state.category}`, state.tag && `標籤：${state.tag}`].filter(Boolean);
    $('#active-filters').hidden = !filters.length;
    $('#active-filters').innerHTML = filters.map(filter => `<span>${escape(filter)}</span>`).join('') + '<button class="text-button" data-reset>清除篩選 ×</button>';
  }

  function renderOverview() {
    const pairs = new Set(notes.flatMap(note => note.related.map(id => [note.id, id].sort().join('|'))));
    $('#statistics').innerHTML = [[notes.length, '知識筆記', 'NOTES'], [categories.length, '主題分類', 'CATEGORIES'], [tags.length, '學習標籤', 'TAGS'], [pairs.size, '知識連結', 'CONNECTIONS']].map(([count, label, english]) => `<div class="stat"><strong>${String(count).padStart(2, '0')}</strong><span>${label}</span><small>${english}</small></div>`).join('');
    $('#recent-list').innerHTML = [...notes].sort(recentSort).slice(0, 3).map(note => `<button class="recent-row" data-note="${note.id}"><span class="recent-symbol" aria-hidden="true">▧</span><span>${escape(note.title)}</span><time datetime="${note.updatedAt}">${note.updatedAt.replaceAll('-', '.')}</time><span aria-hidden="true">↗</span></button>`).join('');
  }

  function openNote(id) {
    const note = byId.get(id);
    if (!note) return;
    if (!dialog.open) returnFocus = document.activeElement;
    const sources = note.sources.map(source => `<li><a class="source-link" href="${source.split('/').map(encodeURIComponent).join('/')}" target="_blank" rel="noopener">${escape(source)} ↗</a></li>`).join('');
    $('#detail-content').innerHTML = `<span class="category-chip">${escape(note.category)}</span><h2 id="detail-title" tabindex="-1">${escape(note.title)}</h2><div class="card-tags">${note.tags.map(tagButton).join('')}</div><div class="detail-meta">建立 ${note.createdAt} <span aria-hidden="true"> / </span> 更新 ${note.updatedAt}</div><p class="detail-summary">${escape(note.summary)}</p><section class="detail-section"><h3>核心重點</h3><ul>${note.keyPoints.map(point => `<li>${escape(point)}</li>`).join('')}</ul></section>${note.sections.map(section => `<section class="detail-section"><h3>${escape(section.heading)}</h3><p>${escape(section.body)}</p></section>`).join('')}<section class="detail-section"><h3>延伸連結 <span class="muted">/ RELATED NOTES</span></h3><div class="detail-related">${note.related.length ? note.related.map(relatedId => `<button class="related-button" data-note="${relatedId}">${escape(byId.get(relatedId).title)} ↗</button>`).join('') : '<p>尚無相關筆記。</p>'}</div></section><section class="detail-section"><h3>原始來源 <span class="muted">/ SOURCES</span></h3><ul>${sources}</ul></section>`;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    $('#detail-title').focus({ preventScroll: true });
  }

  function reset() {
    state.query = ''; state.category = ''; state.tag = '';
    $('#search').value = '';
    renderNavigation(); renderNotes(); $('#search').focus();
  }
  document.addEventListener('click', event => {
    const noteButton = event.target.closest('[data-note]');
    if (noteButton) { openNote(noteButton.dataset.note); return; }
    const categoryButton = event.target.closest('[data-category]');
    if (categoryButton) {
      state.category = categoryButton.dataset.category; renderNavigation(); renderNotes();
      [...$('#categories').children].find(button => button.dataset.category === state.category)?.focus();
      return;
    }
    const tag = event.target.closest('[data-tag]');
    if (tag) {
      state.tag = state.tag === tag.dataset.tag ? '' : tag.dataset.tag;
      if (dialog.open) dialog.close();
      renderNavigation(); renderNotes(); $('#search').focus(); return;
    }
    if (event.target.closest('[data-reset]')) reset();
  });
  $('#search').addEventListener('input', event => { state.query = event.target.value; renderNotes(); });
  $('#sort').addEventListener('change', event => { state.sort = event.target.value; renderNotes(); });
  $('#reset-empty').addEventListener('click', reset);
  $('#close-detail').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { if (returnFocus?.isConnected) returnFocus.focus(); });
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !dialog.open && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !event.ctrlKey && !event.metaKey && !event.altKey) { event.preventDefault(); $('#search').focus(); }
  });
  renderNavigation(); renderOverview(); renderNotes();
})();
