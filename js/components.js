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
            <div class="dot"></div>
            Porto Vale
          </div>
          ${State.campaign ? `<div class="topbar-campaign">${State.campaign.name}</div>` : ''}
        </div>
        <div class="topbar-right">
          ${State.persona ? renderPersonaSwitch() : ''}
          ${State.persona ? `<div class="topbar-user"><div class="avatar">${State.persona.initials}</div></div>` : ''}
        </div>
      </header>

      ${State.persona ? renderSubnav(activeRoute, counts) : ''}

      <main class="main">${content}</main>
    </div>
  `;
}

function renderPersonaSwitch() {
  const curr = State.persona;
  const isGerente = curr && curr.role === 'Gerente de Vendas';
  const outros = PERSONAS.filter(p => p.role !== 'Gerente de Vendas');

  return `
    <div class="persona-switch">
      <button class="${isGerente ? 'active' : ''}" data-action="switch-role-gerente">Gerente</button>
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
  const role = State.persona.role === 'Gerente de Vendas' ? 'gerente' : State.persona.id;
  let links = [];

  if (role === 'gerente') {
    const myRecords = RECORDS.filter(r => r.gerenteId === State.persona.id);
    const acoesPend = myRecords.filter(r => r.status === 'aguardando_contrato').length;
    links = [
      { href: '#/nova-prevenda',     icon: '+',            label: 'Nova pré-venda',    key: 'nova-prevenda' },
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
  dashboard: '⊞',
  list:      '≡',
  upload:    '↑',
  import:    '⇪',
  recon:     '⇄',
  contract:  '✎',
  complete:  '✓',
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
