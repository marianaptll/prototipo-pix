/* =========================================================
   Shared UI components
   ========================================================= */

function renderShell(content, activeRoute) {
  const counts = getCounts(getRecordsForView());
  return `
    <div class="app-shell">
      <header class="topbar">
        <div class="topbar-left">
          <div class="topbar-logo">
            <img src="imagem/logo_portal_pv.webp" alt="Portal Porto Vale" class="logo-img" />
          </div>
        </div>
        <div class="topbar-right">
          ${State.persona ? renderPersonaSwitch() : ''}
          <div class="topbar-bell">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span class="bell-badge">1</span>
          </div>
          ${State.persona ? `
            <div class="topbar-user">
              <div class="topbar-user-info">
                <span class="topbar-user-name">${State.persona.name.toUpperCase()}</span>
                <span class="topbar-user-role">${State.persona.role}</span>
              </div>
              <div class="avatar avatar-gray">${State.persona.initials}</div>
            </div>
          ` : ''}
        </div>
      </header>

      ${State.persona ? renderSubnav(activeRoute, counts) : ''}

      <main class="main">${content}</main>
    </div>
  `;
}

function renderPersonaSwitch() {
  const curr = State.persona;
  const isGerente = curr && curr.role === 'Comercial';
  const outros = PERSONAS.filter(p => p.role !== 'Comercial');

  return `
    <div class="persona-switch">
      <button class="${isGerente ? 'active' : ''}" data-action="switch-role-gerente">Comercial</button>
      ${outros.map(p => `
        <button class="${curr && curr.id === p.id ? 'active' : ''}"
                data-action="switch-persona" data-persona="${p.id}"
                title="${p.name} · ${p.role}">
          ${p.role === 'Financeiro' ? 'Financeiro' : 'Aprovação'}
        </button>
      `).join('')}
    </div>
  `;
}

function renderSubnav(active, counts) {
  const role = State.persona.role === 'Comercial' ? 'gerente' : State.persona.id;
  let links = [];

  if (role === 'gerente') {
    const myRecords = RECORDS.filter(r => r.gerenteId === State.persona.id);
    const acoesPend = myRecords.filter(r => r.status === 'aguardando_contrato').length;
    links = [
      { href: '#/minhas-vendas',     icon: Icons.list,     label: 'Minhas vendas',     key: 'minhas-vendas',     badge: acoesPend || 0 },
      { href: '#/vendas-concluidas', icon: Icons.complete, label: 'Vendas concluídas', key: 'vendas-concluidas' },
    ];
  } else if (role === 'financeiro') {
    const semExtrato = RECORDS.filter(r => r.status === 'aguardando_financeiro').length;
    links = [
      { href: '#/dashboard',        icon: Icons.dashboard, label: 'Pré-vendas',       key: 'dashboard' },
      { href: '#/importar-extrato', icon: Icons.import,    label: 'Importar extrato', key: 'importar-extrato' },
      { href: '#/conciliacao',      icon: Icons.recon,     label: 'Vincular PIX',     key: 'conciliacao', badge: semExtrato + counts.orfaos },
    ];
  } else {
    links = [
      { href: '#/aprovacoes', icon: Icons.complete, label: 'Aprovações', key: 'aprovacoes', badge: counts.pronto },
      { href: '#/campanhas',  icon: Icons.list,     label: 'Campanhas',  key: 'campanhas' },
    ];
  }

  return `
    <nav class="subnav">
      ${links.map(l => `
        <a class="subnav-link ${active === l.key ? 'active' : ''}" href="${l.href}">
          <span class="subnav-icon">${l.icon}</span>
          <span>${l.label}</span>
          ${l.badge ? `<span class="subnav-badge">${l.badge}</span>` : ''}
        </a>
      `).join('')}
    </nav>
  `;
}

/* ---------- Icons ---------- */
const Icons = {
  dashboard: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  list:      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  upload:    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  import:    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>',
  recon:     '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
  contract:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
  complete:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  chevronR:  '<svg class="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  chevronL:  '<svg class="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  download:  '<svg class="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
};

/* ---------- Modal ---------- */

function openModal(title, bodyHTML, footerHTML = '', size = '') {
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-backdrop" data-modal-backdrop>
      <div class="modal ${size}">
        <div class="modal-header">
          <h2>${title}</h2>
          <button class="modal-close" data-modal-close>×</button>
        </div>
        <div class="modal-body">${bodyHTML}</div>
        ${footerHTML ? `<div class="modal-footer">${footerHTML}</div>` : ''}
      </div>
    </div>
  `;
  root.querySelector('[data-modal-backdrop]').addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-modal-backdrop')) closeModal();
  });
  root.querySelectorAll('[data-modal-close]').forEach(el => el.addEventListener('click', closeModal));
}

function closeModal() {
  document.getElementById('modal-root').innerHTML = '';
}

/* ---------- Toast ---------- */

function toast(message, type = 'success') {
  const root = document.getElementById('toast-root');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = message;
  root.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity 0.3s, transform 0.3s';
    el.style.opacity = '0';
    el.style.transform = 'translateX(20px)';
    setTimeout(() => el.remove(), 300);
  }, 3200);
}
