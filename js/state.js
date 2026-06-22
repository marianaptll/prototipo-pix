/* =========================================================
   App state
   ========================================================= */

const State = {
  persona: null,
  campaign: null,
  filter: { status: 'all', superintendencia: 'all', diretoria: 'all', gerente: 'all', search: '', sort: 'date_asc', page: 1, pageSize: 15 },
  selectedLeft:  null,
  selectedRight: null,

  setPersona(p) {
    this.persona = p;
    this.campaign = CAMPAIGNS[0];
    this.filter = { status: 'all', superintendencia: 'all', diretoria: 'all', gerente: 'all', search: '', sort: 'date_asc', aprovTab: 'pronto', page: 1, pageSize: 15 };
    this.selectedLeft  = null;
    this.selectedRight = null;
    sessionStorage.setItem('pv_persona', p.id);
  },
  restore() {
    const pid = sessionStorage.getItem('pv_persona');
    if (pid) this.persona = PERSONAS.find(p => p.id === pid) || null;
    if (this.persona) this.campaign = CAMPAIGNS[0];
  },
  logout() {
    this.persona = null;
    this.campaign = null;
    sessionStorage.removeItem('pv_persona');
  },
  setCampaign(c) {
    this.campaign = c;
  },
};

/* ---------- Formatadores ---------- */

function fmtMoney(v) {
  if (v === null || v === undefined || isNaN(v)) return '—';
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function fmtDate(s) {
  if (!s) return '—';
  const parts = s.split('-');
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  return s;
}

function fmtDateTime(s) {
  if (!s) return '—';
  const [d, t] = s.split(' ');
  return `${fmtDate(d)}${t ? ' ' + t : ''}`;
}

/* ---------- Helpers de dados ---------- */

function applyAutoUrgente(records) {
  const now = new Date();
  records.forEach(r => {
    if (r.status === 'aguardando_financeiro' && !r.urgente) {
      const [datePart, timePart] = r.dataHora.split(' ');
      const [y, m, d] = datePart.split('-').map(Number);
      const [hh, mm] = (timePart || '00:00').split(':').map(Number);
      const criada = new Date(y, m - 1, d, hh, mm);
      const diffDays = (now - criada) / (1000 * 60 * 60 * 24);
      if (diffDays >= 2) r.urgente = true;
    }
  });
}

function getRecordsForView() {
  applyAutoUrgente(RECORDS);
  if (State.persona && State.persona.role === 'Comercial') {
    return RECORDS.filter(r => r.gerenteId === State.persona.id);
  }
  return RECORDS;
}

function applyFilters(records) {
  let filtered = records.filter(r => {
    if (State.filter.status !== 'all' && r.status !== State.filter.status) return false;
    if (State.filter.gerente !== 'all' && r.gerenteId !== State.filter.gerente) return false;
    if (State.filter.superintendencia && State.filter.superintendencia !== 'all') {
      const m = MANAGERS.find(x => x.id === r.gerenteId);
      if (!m || m.superid !== State.filter.superintendencia) return false;
    }
    if (State.filter.diretoria && State.filter.diretoria !== 'all') {
      const m = MANAGERS.find(x => x.id === r.gerenteId);
      if (!m || m.dirid !== State.filter.diretoria) return false;
    }
    if (State.filter.search) {
      const q = State.filter.search.toLowerCase();
      if (
        !r.nomePagador.toLowerCase().includes(q) &&
        !r.nomeCliente.toLowerCase().includes(q) &&
        !r.nomeVendedor.toLowerCase().includes(q) &&
        !r.id.toLowerCase().includes(q)
      ) return false;
    }
    return true;
  });

  if (State.filter.urgente) {
    filtered = filtered.filter(r => r.urgente);
  }

  const sort = State.filter.sort || 'date_desc';
  filtered.sort((a, b) => {
    if (sort === 'date_asc')   return a.dataHora < b.dataHora ? -1 : 1;
    if (sort === 'date_desc')  return a.dataHora > b.dataHora ? -1 : 1;
    if (sort === 'value_desc') return b.valorComprovante - a.valorComprovante;
    return 0;
  });
  return filtered;
}

function getCounts(records) {
  return {
    total:                  records.length,
    aguardando_financeiro:  records.filter(r => r.status === 'aguardando_financeiro').length,
    aguardando_contrato:    records.filter(r => r.status === 'aguardando_contrato').length,
    diferenca_pendente:     records.filter(r => r.status === 'diferenca_pendente').length,
    pronto:                 records.filter(r => r.status === 'pronto').length,
    concluida:              records.filter(r => r.status === 'concluida').length,
    cancelada:              records.filter(r => r.status === 'cancelada').length,
    sem_extrato:            records.filter(r => !r.extrato).length,
    orfaos:                 EXTRATO_ORPHANS.length,
  };
}

function statusChip(status) {
  const label = STATUS_LABEL[status] || status;
  return `<span class="chip ${STATUS_CHIP[status] || 'chip-gray'}"><span class="dot"></span>${label}</span>`;
}

function iconState(state) {
  const ch    = { ok: '✓', wait: '···', miss: '✕' }[state] || '·';
  const label = { ok: 'OK', wait: 'Aguardando', miss: 'Pendente' }[state] || '';
  return `<span class="icon-state ${state}" title="${label}">${ch}</span>`;
}

function findRecord(id) {
  return RECORDS.find(r => r.id === id);
}

function managerName(id) {
  const m = MANAGERS.find(x => x.id === id);
  return m ? m.name : '—';
}

function recordStatusIcons(r) {
  const comp = r.comprovante ? 'ok' : 'miss';
  const ext  = r.extrato     ? 'ok' : (r.status === 'aguardando_financeiro' ? 'wait' : 'miss');
  const cont = r.contrato    ? 'ok' : (r.status === 'aguardando_contrato' || r.status === 'pronto' || r.status === 'concluida' ? 'wait' : 'miss');
  return { comp, ext, cont };
}
