/* =========================================================
   Screens — Porto Vale Pré-Venda PIX
   ========================================================= */

const Screens = {};

/* ==================== HOME HUB ==================== */

Screens.home = function() {
  return renderShell(`
    <div class="hub-content">
      <button class="hub-card" id="hub-btn-pix">
        <div class="hub-card-icon">PIX</div>
        <div class="hub-card-label">Pré-Venda PIX</div>
      </button>
    </div>
  `, null);
};

Screens.homeBind = function() {
  document.getElementById('hub-btn-pix').addEventListener('click', () => {
    const dest = Router._homeRoute();
    location.hash = dest === 'login' ? '#/login' : '#/' + dest;
  });
};

/* ==================== LOGIN ==================== */

Screens.login = function() {
  const selectedId = State.persona ? State.persona.id : 'g1';
  return `
    <div class="login-screen">
      <div class="login-card">
        <div class="login-brand">
          <div class="mark">PV</div>
          <div>
            <div class="name">Porto Vale Consórcios</div>
            <div class="sub">Sistema de Pré-Venda PIX</div>
          </div>
        </div>
        <h1>Entrar no sistema</h1>
        <p class="lead">Escolha o perfil para acessar as telas correspondentes ao seu trabalho nesta campanha.</p>

        <div class="persona-list" id="persona-list">
          ${(() => {
            const renderOpt = p => `
              <div class="persona-option ${p.id === selectedId ? 'selected' : ''}" data-persona-pick="${p.id}">
                <div class="persona-initials">${p.initials}</div>
                <div class="persona-info">
                  <div class="persona-name">${p.name}</div>
                  <div class="persona-role">${p.role}</div>
                  <div class="persona-desc">${p.description}</div>
                </div>
              </div>`;
            const gerentes = PERSONAS.filter(p => p.role === 'Comercial');
            const outros   = PERSONAS.filter(p => p.role !== 'Comercial');
            const supts = SUPERINTENDENCIAS.map(s => {
              const sDirs = DIRETORIAS.filter(d => d.superid === s.id);
              const rows = sDirs.map(d => {
                const dGers = gerentes.filter(g => g.superid === s.id && g.dirid === d.id);
                if (!dGers.length) return '';
                return `<div class="persona-dir-label">${d.name}</div>${dGers.map(renderOpt).join('')}`;
              }).join('');
              return rows ? `<div class="persona-super-label">${s.name}</div>${rows}` : '';
            }).join('');
            return `
              <div class="persona-section-title">Comercial</div>
              ${supts}
              <div class="persona-section-title" style="margin-top:12px">Operacional</div>
              ${outros.map(renderOpt).join('')}
            `;
          })()}
        </div>

        <button class="btn btn-primary btn-lg" id="login-btn" style="width:100%;margin-top:20px">
          Entrar · ${PERSONAS.find(p => p.id === selectedId)?.name || ''}
        </button>
      </div>
    </div>
  `;
};

Screens.loginBind = function() {
  let picked = State.persona ? State.persona.id : 'g1';
  const list = document.getElementById('persona-list');
  list.addEventListener('click', (e) => {
    const opt = e.target.closest('[data-persona-pick]');
    if (!opt) return;
    list.querySelectorAll('.persona-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    picked = opt.dataset.personaPick;
    const persona = PERSONAS.find(p => p.id === picked);
    document.getElementById('login-btn').textContent = `Entrar · ${persona.name}`;
  });
  document.getElementById('login-btn').addEventListener('click', () => {
    const persona = PERSONAS.find(p => p.id === picked);
    State.setPersona(persona);
    const home = Router._homeRoute();
    location.hash = '#/' + home;
  });
};

/* ==================== SELEÇÃO DE CAMPANHA ==================== */

Screens.campaign = function() {
  return renderShell(`
    <div class="page-header">
      <div>
        <h1 class="page-title">Campanhas ativas</h1>
        <p class="page-subtitle">Selecione a campanha em que você vai trabalhar agora.</p>
      </div>
    </div>
    <div class="campaign-grid">
      ${CAMPAIGNS.map(c => {
        const registros  = RECORDS.filter(r => r.campanhaId === c.id);
        const total      = registros.length;
        const concluidas = registros.filter(r => r.status === 'concluida').length;
        const pct        = total > 0 ? Math.round((concluidas / total) * 100) : 0;
        const chipClass  = c.status === 'Ativa' ? 'chip-green' : 'chip-amber';
        return `
          <div class="campaign-card" data-campaign="${c.id}">
            <div class="row between" style="margin-bottom:8px">
              <span class="chip ${chipClass}"><span class="dot"></span>${c.status}</span>
              <span class="muted text-sm">${c.id}</span>
            </div>
            <div class="title">${c.name}</div>
            <div class="dates">Início ${fmtDate(c.start)} · Lançamento ${fmtDate(c.launch)}</div>
            <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
            <div class="progress-text">
              <span>${concluidas} de ${total} concluídas</span>
              <strong>${pct}%</strong>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `, 'campanha');
};

Screens.campaignBind = function() {
  document.querySelectorAll('[data-campaign]').forEach(el => {
    el.addEventListener('click', () => {
      const c = CAMPAIGNS.find(x => x.id === el.dataset.campaign);
      State.setCampaign(c);
      const home = Router._homeRoute();
      location.hash = '#/' + home;
    });
  });
};

/* ==================== GERENTE ==================== */

/* --- Nova Pré-Venda --- */

Screens.novaPrevenda = function() {
  if (!State.campaign) {
    return renderShell(`
      <div class="empty-state">
        <div class="ic">◐</div>
        <h3>Nenhuma campanha ativa</h3>
        <p>Aguarde a abertura de uma campanha para registrar pré-vendas.</p>
      </div>
    `, 'nova-prevenda');
  }

  const now = new Date();
  const hoje = now.toISOString().slice(0,10);
  const hora  = now.toTimeString().slice(0,5);

  return renderShell(`
    <div class="page-header">
      <div>
        <h1 class="page-title">Nova pré-venda</h1>
        <p class="page-subtitle">Registre o comprovante de PIX e os dados do cliente desta venda.</p>
      </div>
    </div>

    <div class="card card-pad">
      <form id="form-prevenda">
        <div class="form-grid" style="grid-template-columns:1fr 1fr 1fr">

          <div class="form-field">
            <label>Campanha <span class="req">*</span></label>
            <select required>
              <option>${State.campaign.name}</option>
            </select>
            <div class="help">Pré-selecionada</div>
          </div>

          <div class="form-field" style="grid-column:span 2">
            <label>Vendedor responsável <span class="req">*</span></label>
            <input type="text" id="f-vendedor" required value="${State.persona.name}" />
          </div>

          <div class="form-field">
            <label>Nome do pagador (quem fez o PIX) <span class="req">*</span></label>
            <input type="text" id="f-pagador" required placeholder="Nome exato conforme o banco" />
          </div>

          <div class="form-field">
            <label>CPF / CNPJ do pagador <span class="req">*</span></label>
            <input type="text" id="f-cpf" required placeholder="000.000.000-00 ou 00.000.000/0001-00" maxlength="18" />
          </div>

          <div class="form-field">
            <label>Nome do cliente (titular do futuro contrato) <span class="req">*</span></label>
            <input type="text" id="f-cliente" required placeholder="Nome que constará no contrato" />
          </div>

          <div style="grid-column:span 3;display:flex;gap:16px;align-items:flex-end">
            <div class="toggle" style="flex:1;margin:0">
              <div>
                <div style="font-weight:600;font-size:13px;color:var(--navy)">O nome do pagador será o mesmo do contrato?</div>
              </div>
              <div class="toggle-btns">
                <button type="button" class="toggle-btn active" data-toggle="sim">Sim</button>
                <button type="button" class="toggle-btn" data-toggle="nao">Não</button>
              </div>
            </div>
            <div class="form-field" style="margin:0;width:150px;flex-shrink:0">
              <label>Valor (R$) <span class="req">*</span></label>
              <input type="number" id="f-valor" step="0.01" required placeholder="0,00" />
            </div>
            <div class="form-field" style="margin:0;flex:1">
              <label>Data e horário <span class="req">*</span></label>
              <input type="datetime-local" id="f-datahora" required value="${hoje}T${hora}" />
            </div>
          </div>

          <div class="form-field full">
            <label>Comprovante de PIX (PDF, JPG ou PNG) <span class="req">*</span></label>
            <div class="dropzone" id="dz-comp">
              <div class="dz-icon">${Icons.upload}</div>
              <div class="dz-title">Clique ou arraste o arquivo aqui</div>
              <div class="dz-hint">Aceita JPG, PNG ou PDF · até 10 MB</div>
              <input type="file" accept=".jpg,.jpeg,.png,.pdf" style="display:none" id="file-comp" />
            </div>
          </div>

          <div class="form-field full">
            <label>Observações</label>
            <textarea id="f-obs" placeholder="Informações adicionais"></textarea>
          </div>


        </div>

        <div class="row between" style="margin-top:20px;align-items:center">
          <a href="#/minhas-vendas" class="btn btn-ghost">${Icons.chevronL}Cancelar</a>
          <button type="submit" class="btn btn-primary btn-lg">Registrar pré-venda</button>
        </div>
      </form>
    </div>
  `, 'nova-prevenda');
};

Screens.novaPrevendaBind = function() {
  document.querySelectorAll('[data-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-toggle]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });



  const dz = document.getElementById('dz-comp');
  const fi = document.getElementById('file-comp');
  dz.addEventListener('click', () => fi.click());
  fi.addEventListener('change', () => {
    const f = fi.files[0];
    if (f) {
      dz.innerHTML = `
        <div class="row" style="gap:14px">
          <div class="dz-icon" style="color:var(--green)">✓</div>
          <div style="flex:1">
            <div class="dz-title">${f.name}</div>
            <div class="dz-hint">${(f.size/1024).toFixed(1)} KB · pronto para enviar</div>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" id="clear-file">Trocar</button>
        </div>`;
      document.getElementById('clear-file').addEventListener('click', (e) => {
        e.stopPropagation(); fi.value = '';
        dz.innerHTML = `
          <div class="dz-icon">${Icons.upload}</div>
          <div class="dz-title">Clique ou arraste o arquivo aqui</div>
          <div class="dz-hint">Aceita JPG, PNG ou PDF · até 10 MB</div>`;
      });
    }
  });

  document.getElementById('form-prevenda').addEventListener('submit', (e) => {
    e.preventDefault();
    const mesmoNome = document.querySelector('[data-toggle].active').dataset.toggle === 'sim';
    const dataHoraRaw = document.getElementById('f-datahora').value;
    const newId = 'PV-' + String(Date.now()).slice(-4);
    const ts    = dataHoraRaw.replace('T', ' ').slice(0, 16);

    const record = {
      id: newId,
      campanhaId: State.campaign.id,
      gerenteId:   State.persona.id,
      gerenteNome: State.persona.name,
      nomeVendedor: document.getElementById('f-vendedor').value,
      nomePagador:  document.getElementById('f-pagador').value,
      nomeCliente:  document.getElementById('f-cliente').value,
      mesmoNomeContrato: mesmoNome,
      motivoDiferenca: mesmoNome ? '' : (document.getElementById('f-motivo')?.value || ''),
      valorComprovante: parseFloat(document.getElementById('f-valor').value) || 0,
      cpfPagador: document.getElementById('f-cpf').value.trim(),
      dataHora: ts,
      comprovante: { fileName: fi.files[0]?.name || 'comprovante.pdf', uploadedAt: ts },
      observacao: document.getElementById('f-obs').value,
      status: 'aguardando_financeiro',
      urgente: false,
      extrato: null,
      valorReal: null,
      contrato: null,
      history: [{ when: ts, who: `${State.persona.name} (Comercial)`, what: 'Pré-venda criada · comprovante enviado' }],
    };

    RECORDS.push(record);
    toast(`Pré-venda ${newId} registrada com sucesso`, 'success');
    setTimeout(() => { location.hash = '#/minhas-vendas'; }, 500);
  });
};

/* --- Minhas Vendas --- */

Screens.minhasVendas = function() {
  const myRecords   = RECORDS.filter(r => r.gerenteId === State.persona.id);
  const allFiltered = applyFilters(myRecords);
  const counts      = getCounts(myRecords);
  const page        = State.filter.page     || 1;
  const pageSize    = State.filter.pageSize || 15;
  const filtered    = allFiltered.slice((page - 1) * pageSize, page * pageSize);

  const summary = [
    { label: 'Total',                value: counts.total,                 status: 'all',                   accent: '' },
    { label: 'Aguardando extrato',   value: counts.aguardando_financeiro, status: 'aguardando_financeiro', accent: 'amber' },
    { label: 'Aguardando contrato',  value: counts.aguardando_contrato,   status: 'aguardando_contrato',   accent: 'blue' },
    { label: 'Diferença pendente',   value: counts.diferenca_pendente,    status: 'diferenca_pendente',    accent: 'orange' },
    { label: 'Pronto para aprovação',value: counts.pronto,                status: 'pronto',                accent: 'green' },
    { label: 'Concluídas',           value: counts.concluida,             status: 'concluida',             accent: 'skyblue' },
    { label: 'Canceladas',           value: counts.cancelada,             status: 'cancelada',             accent: 'red' },
  ];

  return renderShell(`
    <div class="page-header">
      <div>
        <h1 class="page-title">Minhas vendas</h1>
        <p class="page-subtitle">${State.campaign.name} · ${State.persona.name}</p>
      </div>
      <div class="page-actions">
        <a href="#/nova-prevenda" class="btn btn-primary">+ Nova pré-venda</a>
      </div>
    </div>

    <div class="summary-grid">
      ${summary.map(s => `
        <button class="summary-card ${s.accent ? 'accent-' + s.accent : ''} ${State.filter.status === s.status && s.status !== 'all' ? 'active' : ''}"
                data-filter-status="${s.status}">
          <div class="label">${s.label}</div>
          <div class="value">${s.value}</div>
        </button>
      `).join('')}
    </div>

    ${renderPrevVendasFilters()}
    ${renderResultCount(allFiltered.length, counts.total)}

    ${allFiltered.length === 0 ? `
      <div class="empty-state">
        <div class="ic">⊘</div>
        <h3>Nenhuma venda encontrada</h3>
        <p>Tente ajustar os filtros ou crie uma nova pré-venda.</p>
      </div>
    ` : `
      <div class="venda-list">
        ${renderVendaListHeader(false)}
        ${filtered.map(r => renderVendaCard(r, 'gerente')).join('')}
      </div>
      ${renderPagination(allFiltered.length, page, pageSize)}
    `}
  `, 'minhas-vendas');
};

Screens.minhasVendasBind = function() {
  bindStatusFilters();
  bindSortFilter();
  bindSearchFilter();
  bindVendaCardActions();
  bindPagination();
};

/* --- Vendas Concluídas --- */

Screens.vendasConcluidas = function() {
  const base     = RECORDS.filter(r => r.gerenteId === State.persona.id && r.status === 'concluida');
  const filtered = applySearchSort(base);

  return renderShell(`
    <div class="page-header">
      <div>
        <h1 class="page-title">Vendas concluídas</h1>
        <p class="page-subtitle">${State.campaign.name} · ${base.length} venda${base.length !== 1 ? 's' : ''} concluída${base.length !== 1 ? 's' : ''}</p>
      </div>
    </div>

    ${renderSearchBar()}

    ${filtered.length === 0 ? `
      <div class="empty-state">
        <div class="ic">⊘</div>
        <h3>${base.length === 0 ? 'Nenhuma venda concluída ainda' : 'Nenhum resultado'}</h3>
        <p>${base.length === 0 ? 'As vendas aparecem aqui após a cota ser lançada.' : 'Tente ajustar a busca.'}</p>
      </div>
    ` : `
      <div class="venda-list">
        ${renderVendaListHeader(false)}
        ${filtered.map(r => renderVendaCard(r, 'gerente')).join('')}
      </div>
    `}
  `, 'vendas-concluidas');
};

Screens.vendasConcluidasBind = function() {
  bindSortFilter();
  bindSearchFilter();
  bindVendaCardActions();
};

/* --- Visualizar Venda (read-only) --- */

Screens.verVenda = function(id) {
  const r = findRecord(id);
  if (!r) {
    return renderShell(`<div class="empty-state"><h3>Registro não encontrado</h3></div>`, '');
  }

  const isGerente       = State.persona.role === 'Comercial';
  const canMarkUrgente  = State.persona.role === 'Fase 1' || State.persona.role === 'Fase 2';
  const backRoute  = isGerente ? '#/minhas-vendas'
    : (State.persona.id === 'financeiro' ? '#/dashboard' : '#/aprovacoes');

  const needsContrato    = isGerente && r.status === 'aguardando_contrato';
  const diff = r.valorReal !== null ? r.valorReal - r.valorComprovante : 0;
  const needsComplemento = isGerente && r.status === 'diferenca_pendente' && diff > 0.005;
  const needsChamado     = isGerente && r.status === 'diferenca_pendente' && diff < -0.005 && !r.chamadoReembolso;
  const canCancel        = isGerente && State.persona.id === r.gerenteId && r.status !== 'concluida' && r.status !== 'cancelada';

  return renderShell(`
    <div class="page-header">
      <div>
        <a href="${backRoute}" class="back-link">${Icons.chevronL}Voltar</a>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">
          <h1 class="page-title" style="margin:0">${r.nomeCliente}</h1>
          ${statusChip(r.status)}
          ${r.urgente ? `<span class="badge-urgente">🚩 Urgente</span>` : ''}
        </div>
        <p class="page-subtitle">${r.id} · ${r.gerenteNome} · ${fmtDateTime(r.dataHora)}</p>
      </div>
      ${canMarkUrgente && r.status !== 'concluida' ? `
        <div class="page-actions">
          <button class="btn ${r.urgente ? 'btn-danger' : 'btn-secondary'}" id="btn-urgente">
            🚩 ${r.urgente ? 'Remover urgência' : 'Marcar como urgente'}
          </button>
        </div>
      ` : ''}
      ${canCancel ? `
        <div class="page-actions">
          <button class="btn btn-danger" id="btn-cancelar-venda">
            Solicitar cancelamento
          </button>
        </div>
      ` : ''}
    </div>

    ${needsContrato ? `
      <div class="action-panel action-panel-blue">
        <div class="action-panel-label">
          <div class="action-panel-icon">✎</div>
          <div>
            <div class="action-panel-title">Enviar contrato</div>
            <div class="action-panel-desc">Informe o valor real da 1ª parcela e envie o contrato assinado para que a venda avance.</div>
          </div>
        </div>
        <form id="form-action" class="action-panel-form">
          <div style="display:flex;gap:16px;align-items:flex-end;margin-top:12px">
            <div class="form-field" style="width:200px;flex-shrink:0">
              <label>Valor real (R$) <span class="muted" style="font-weight:400;font-size:11px">· pode diferir</span></label>
              <input type="number" id="a-valor" step="0.01" required
                     value="${r.valorComprovante.toFixed(2)}" placeholder="0,00" />
            </div>
            <div class="form-field" style="width:160px;flex-shrink:0">
              <label>Nº do contrato</label>
              <input type="text" id="a-numcontrato" required placeholder="Ex: 0908" value="${String(Math.floor(900 + Math.random() * 100)).padStart(4,'0')}" />
            </div>
            <div class="form-field" style="flex:1">
              <label>Contrato assinado (PDF)</label>
              <div class="dropzone dropzone-sm" id="dz-action">
                <div class="dz-icon">${Icons.upload}</div>
                <div class="dz-title">Clique ou arraste o PDF aqui</div>
                <input type="file" accept=".pdf" style="display:none" id="file-action" />
              </div>
            </div>
            <div>
              <button type="submit" class="btn btn-primary">Confirmar${Icons.chevronR}</button>
            </div>
          </div>
        </form>
      </div>
    ` : ''}

    ${isGerente && r.diferencaAbsorvida ? `
      <div class="action-panel action-panel-amber">
        <div class="action-panel-label">
          <div class="action-panel-icon">!</div>
          <div>
            <div class="action-panel-title">Porto Vale cobriu a diferença de ${fmtMoney(r.diferencaAbsorvida.valor)}</div>
            <div class="action-panel-desc">O cliente pagou menos que o valor do contrato, mas a diferença está dentro do limite aceito. A Porto Vale irá cobrar esse valor de você posteriormente.</div>
          </div>
        </div>
      </div>
    ` : ''}

    ${needsComplemento ? `
      <div class="action-panel action-panel-red">
        <div class="action-panel-label">
          <div class="action-panel-icon">!</div>
          <div>
            <div class="action-panel-title">Pagamento complementar pendente</div>
            <div class="action-panel-desc">
              O cliente pagou <strong>${fmtMoney(r.valorComprovante)}</strong> mas o contrato exige <strong>${fmtMoney(r.valorReal)}</strong>.
              Falta cobrar <strong>${fmtMoney(diff)}</strong>.
              Gere a cobrança, aguarde o pagamento e então envie o comprovante.
            </div>
          </div>
        </div>

        <div class="action-panel-steps">
          <div class="apstep">
            <div class="apstep-num">1</div>
            <div class="apstep-body">
              <div class="apstep-title">Gerar cobrança de ${fmtMoney(diff)}</div>
              <div class="apstep-desc">Envie ao cliente via PIX ou boleto</div>
              <button class="btn btn-secondary" id="btn-gerar-cobranca" style="margin-top:10px">
                Gerar cobrança${Icons.chevronR}
              </button>
            </div>
          </div>

          <div class="apstep">
            <div class="apstep-num">2</div>
            <div class="apstep-body">
              <div class="apstep-title">Enviar comprovante do pagamento</div>
              <div class="apstep-desc">Após o cliente pagar, anexe o comprovante aqui</div>
              <form id="form-action" class="action-panel-form" style="margin-top:10px">
                <div style="display:flex;gap:16px;align-items:flex-end">
                  <div class="form-field" style="width:200px;flex-shrink:0">
                    <label>Valor pago (R$) <span class="muted" style="font-weight:400;font-size:11px">· esperado ${fmtMoney(diff)}</span></label>
                    <input type="number" id="a-valor" step="0.01" required
                           value="${diff.toFixed(2)}" placeholder="0,00" />
                  </div>
                  <div class="form-field" style="flex:1">
                    <label>Comprovante complementar</label>
                    <div class="dropzone dropzone-sm" id="dz-action">
                      <div class="dz-icon">${Icons.upload}</div>
                      <div class="dz-title">Clique ou arraste aqui</div>
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" style="display:none" id="file-action" />
                    </div>
                  </div>
                  <div>
                    <button type="submit" class="btn btn-danger">Enviar complemento${Icons.chevronR}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    ` : ''}

    ${needsChamado ? `
      <div class="action-panel action-panel-amber">
        <div class="action-panel-label">
          <div class="action-panel-icon" style="background:var(--amber)">↩</div>
          <div>
            <div class="action-panel-title">Devolução pendente</div>
            <div class="action-panel-desc">
              O cliente pagou <strong>${fmtMoney(r.valorComprovante)}</strong> mas o contrato é de <strong>${fmtMoney(r.valorReal)}</strong>.
              É necessário devolver <strong>${fmtMoney(Math.abs(diff))}</strong> ao cliente.
              Abra um chamado no financeiro solicitando o reembolso para liberar esta venda para aprovação.
            </div>
          </div>
        </div>
        <div style="margin-top:14px">
          <button class="btn btn-warning" id="btn-chamado">Marcar chamado como aberto${Icons.chevronR}</button>
        </div>
      </div>
    ` : ''}

    ${r.status === 'cancelada' && r.cancelamento ? `
      <div class="action-panel action-panel-red">
        <div class="action-panel-label">
          <div class="action-panel-icon" style="background:var(--red)">✕</div>
          <div>
            <div class="action-panel-title">Venda cancelada internamente</div>
            <div class="action-panel-desc">
              Cancelada em <strong>${fmtDateTime(r.cancelamento.em)}</strong> por <strong>${r.cancelamento.por}</strong>.<br>
              Motivo: ${r.cancelamento.motivo}
            </div>
          </div>
        </div>
        ${r.cancelamento.extornoNecessario && State.persona.role === 'Fase 1' ? `
        <div style="margin-top:12px;background:rgba(0,0,0,.06);border-radius:6px;padding:10px 14px;font-size:13px">
          <strong>Extorno pendente</strong> — o cliente realizou o PIX e precisa ser reembolsado.
          Processe a devolução e registre no histórico.
        </div>` : ''}
      </div>
    ` : ''}

    ${renderVendaDetalhe(r)}
  `, '');
};

Screens.verVendaBind = function(id) {
  const r = findRecord(id);
  if (!r) return;

  bindVendaCardActions();

  // Urgência
  const btnUrgente = document.getElementById('btn-urgente');
  if (btnUrgente) {
    btnUrgente.addEventListener('click', () => {
      r.urgente = !r.urgente;
      toast(r.urgente ? `🚩 ${r.nomeCliente} marcada como urgente` : `Urgência removida · ${r.nomeCliente}`, r.urgente ? 'error' : 'success');
      Router.refresh();
    });
  }

  // Cancelamento com 2FA
  const btnCancelar = document.getElementById('btn-cancelar-venda');
  if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
      openCancelModal(r);
    });
  }

  // Chamado de reembolso (overpayment em diferenca_pendente)
  const btnChamado = document.getElementById('btn-chamado');
  if (btnChamado) {
    btnChamado.addEventListener('click', () => {
      const now = new Date();
      const ts = `${now.toISOString().slice(0,10)} ${now.toTimeString().slice(0,5)}`;
      r.chamadoReembolso = true;
      r.status = 'pronto';
      r.history.push({ when: ts, who: `${State.persona.name} (Comercial)`, what: `Chamado de reembolso aberto · devolução de ${fmtMoney(Math.abs(r.valorReal - r.valorComprovante))} solicitada ao financeiro` });
      r.history.push({ when: ts, who: 'Sistema', what: 'Venda liberada para aprovação de cota' });
      toast(`Chamado aberto · ${r.nomeCliente} pronto para aprovação`, 'success');
      Router.refresh();
    });
  }

  // Visualizar documentos
  document.querySelectorAll('[data-ver-doc]').forEach(btn => {
    btn.addEventListener('click', () => {
      openDocModal(r, btn.dataset.verDoc);
    });
  });

  // Modal de cobrança complementar
  const btnGerar = document.getElementById('btn-gerar-cobranca');
  if (btnGerar) {
    btnGerar.addEventListener('click', () => {
      const valor = r.valorReal - r.valorComprovante;
      const pixKey = '11.222.333/0001-44';
      const pixCode = `00020126580014BR.GOV.BCB.PIX0136${pixKey}5204000053039865406${valor.toFixed(2).replace('.', '')}5802BR5914Porto Vale PIX6009SAO PAULO62070503***6304ABCD`;
      const boletoCode = `34191.09008 61713.190002 61990.190004 8 97430000${Math.round(valor * 100).toString().padStart(10,'0')}`;

      openModal('Gerar cobrança complementar', `
        <div class="cobr-tabs">
          <button class="cobr-tab active" data-cobr="pix">PIX</button>
          <button class="cobr-tab" data-cobr="boleto">Boleto</button>
        </div>

        <div class="cobr-panel" id="cobr-pix">
          <div class="cobr-valor">Cobrança de <strong>${fmtMoney(valor)}</strong></div>
          <div class="cobr-qr">
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="160" height="160" fill="white"/>
              <rect x="10" y="10" width="50" height="50" rx="4" fill="#1A3A5C"/>
              <rect x="18" y="18" width="34" height="34" rx="2" fill="white"/>
              <rect x="24" y="24" width="22" height="22" rx="1" fill="#1A3A5C"/>
              <rect x="100" y="10" width="50" height="50" rx="4" fill="#1A3A5C"/>
              <rect x="108" y="18" width="34" height="34" rx="2" fill="white"/>
              <rect x="114" y="24" width="22" height="22" rx="1" fill="#1A3A5C"/>
              <rect x="10" y="100" width="50" height="50" rx="4" fill="#1A3A5C"/>
              <rect x="18" y="108" width="34" height="34" rx="2" fill="white"/>
              <rect x="24" y="114" width="22" height="22" rx="1" fill="#1A3A5C"/>
              <rect x="70" y="10" width="8" height="8" fill="#1A3A5C"/>
              <rect x="82" y="10" width="8" height="8" fill="#1A3A5C"/>
              <rect x="70" y="22" width="8" height="8" fill="#1A3A5C"/>
              <rect x="82" y="22" width="8" height="8" fill="#1A3A5C"/>
              <rect x="70" y="34" width="8" height="8" fill="#1A3A5C"/>
              <rect x="70" y="70" width="8" height="8" fill="#1A3A5C"/>
              <rect x="82" y="70" width="8" height="8" fill="#1A3A5C"/>
              <rect x="70" y="82" width="8" height="8" fill="#1A3A5C"/>
              <rect x="82" y="82" width="8" height="8" fill="#1A3A5C"/>
              <rect x="94" y="70" width="8" height="8" fill="#1A3A5C"/>
              <rect x="106" y="70" width="8" height="8" fill="#1A3A5C"/>
              <rect x="118" y="70" width="8" height="8" fill="#1A3A5C"/>
              <rect x="130" y="70" width="8" height="8" fill="#1A3A5C"/>
              <rect x="94" y="82" width="8" height="8" fill="#1A3A5C"/>
              <rect x="118" y="82" width="8" height="8" fill="#1A3A5C"/>
              <rect x="106" y="94" width="8" height="8" fill="#1A3A5C"/>
              <rect x="130" y="94" width="8" height="8" fill="#1A3A5C"/>
              <rect x="70" y="94" width="8" height="8" fill="#1A3A5C"/>
              <rect x="82" y="106" width="8" height="8" fill="#1A3A5C"/>
              <rect x="94" y="106" width="8" height="8" fill="#1A3A5C"/>
              <rect x="118" y="106" width="8" height="8" fill="#1A3A5C"/>
              <rect x="70" y="118" width="8" height="8" fill="#1A3A5C"/>
              <rect x="94" y="118" width="8" height="8" fill="#1A3A5C"/>
              <rect x="106" y="118" width="8" height="8" fill="#1A3A5C"/>
              <rect x="130" y="118" width="8" height="8" fill="#1A3A5C"/>
              <rect x="70" y="130" width="8" height="8" fill="#1A3A5C"/>
              <rect x="82" y="130" width="8" height="8" fill="#1A3A5C"/>
              <rect x="118" y="130" width="8" height="8" fill="#1A3A5C"/>
              <rect x="142" y="130" width="8" height="8" fill="#1A3A5C"/>
            </svg>
          </div>
          <div class="cobr-code-wrap">
            <code class="cobr-code" id="pix-code">${pixCode.slice(0,40)}…</code>
            <button class="btn btn-secondary btn-sm" id="btn-copy-pix">Copiar código PIX</button>
          </div>
          <div class="cobr-hint">Chave PIX: ${pixKey}</div>
        </div>

        <div class="cobr-panel" id="cobr-boleto" style="display:none">
          <div class="cobr-valor">Cobrança de <strong>${fmtMoney(valor)}</strong></div>
          <div class="cobr-barcode">
            <svg width="280" height="64" viewBox="0 0 280 64" xmlns="http://www.w3.org/2000/svg">
              ${Array.from({length: 60}, (_,i) => {
                const w = (i % 3 === 0) ? 3 : (i % 5 === 0) ? 1 : 2;
                const x = i * 4 + 10;
                return `<rect x="${x}" y="8" width="${w}" height="48" fill="#1A3A5C"/>`;
              }).join('')}
            </svg>
          </div>
          <div class="cobr-code-wrap">
            <code class="cobr-code" id="boleto-code">${boletoCode}</code>
            <button class="btn btn-secondary btn-sm" id="btn-copy-boleto">Copiar linha digitável</button>
          </div>
          <div class="cobr-hint">Vencimento: em 3 dias úteis</div>
        </div>
      `);

      // Tabs
      document.querySelectorAll('.cobr-tab').forEach(t => {
        t.addEventListener('click', () => {
          document.querySelectorAll('.cobr-tab').forEach(x => x.classList.remove('active'));
          t.classList.add('active');
          document.getElementById('cobr-pix').style.display   = t.dataset.cobr === 'pix'    ? '' : 'none';
          document.getElementById('cobr-boleto').style.display = t.dataset.cobr === 'boleto' ? '' : 'none';
        });
      });
      document.getElementById('btn-copy-pix')?.addEventListener('click', () => {
        navigator.clipboard?.writeText(pixCode);
        toast('Código PIX copiado!', 'success');
      });
      document.getElementById('btn-copy-boleto')?.addEventListener('click', () => {
        navigator.clipboard?.writeText(boletoCode);
        toast('Linha digitável copiada!', 'success');
      });
    });
  }

  const form = document.getElementById('form-action');
  if (!form) return;

  // Dropzone inline
  const dz = document.getElementById('dz-action');
  const fi = document.getElementById('file-action');
  if (dz && fi) {
    dz.addEventListener('click', () => fi.click());
    fi.addEventListener('change', () => {
      const f = fi.files[0];
      if (f) {
        dz.innerHTML = `
          <div style="display:flex;gap:8px;align-items:center">
            <span style="color:var(--green);font-size:16px">✓</span>
            <div>
              <div style="font-size:12px;font-weight:600">${f.name}</div>
              <div style="font-size:11px;color:var(--text-mute)">${(f.size/1024).toFixed(1)} KB</div>
            </div>
          </div>`;
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const now = new Date();
    const ts  = `${now.toISOString().slice(0,10)} ${now.toTimeString().slice(0,5)}`;
    const valor = parseFloat(document.getElementById('a-valor').value) || 0;
    const fileName = fi?.files[0]?.name || 'arquivo.pdf';

    if (r.status === 'aguardando_contrato') {
      const numContrato = document.getElementById('a-numcontrato').value;
      r.valorReal = valor;
      r.contrato  = { fileName, uploadedAt: ts, numContrato };

      const diff = valor - r.valorComprovante;
      if (diff > 5) {
        r.status = 'diferenca_pendente';
        r.history.push({ when: ts, who: `${State.persona.name} (Comercial)`, what: `Contrato enviado · valor real ${fmtMoney(valor)} · Contrato ${numContrato}` });
        r.history.push({ when: ts, who: 'Sistema', what: `Diferença detectada · cliente pagou ${fmtMoney(r.valorComprovante)} mas contrato exige ${fmtMoney(valor)} · aguardando comprovante complementar de ${fmtMoney(diff)}` });
        toast(`Contrato salvo · cobrança de ${fmtMoney(diff)} pendente`, 'error');
      } else if (diff > 0.005) {
        r.status = 'pronto';
        r.diferencaAbsorvida = { valor: diff, absorvidaEm: ts };
        r.history.push({ when: ts, who: `${State.persona.name} (Comercial)`, what: `Contrato enviado · valor real ${fmtMoney(valor)} · Contrato ${numContrato}` });
        r.history.push({ when: ts, who: 'Sistema', what: `Diferença de ${fmtMoney(diff)} absorvida pela Porto Vale · será cobrado do gerente posteriormente` });
        toast(`Contrato enviado · diferença de ${fmtMoney(diff)} será cobrada de você posteriormente`, 'warn');
      } else {
        r.status = 'pronto';
        r.history.push({ when: ts, who: `${State.persona.name} (Comercial)`, what: `Contrato enviado · valor real ${fmtMoney(valor)} · Contrato ${numContrato}` });
        if (diff < -0.005) r.history.push({ when: ts, who: 'Sistema', what: `Pagamento excede o contrato · ${fmtMoney(Math.abs(diff))} a devolver ao cliente` });
        toast(`Contrato enviado · ${r.nomeCliente} pronto para aprovação`, 'success');
      }

    } else if (r.status === 'diferenca_pendente') {
      r.comprovanteComplementar = { fileName, uploadedAt: ts, valor };
      r.extratoComplementar = null;
      r.status = 'aguardando_financeiro';
      r.history.push({ when: ts, who: `${State.persona.name} (Comercial)`, what: `Comprovante complementar enviado · ${fmtMoney(valor)} · aguardando análise do financeiro` });
      toast(`Comprovante enviado · aguardando análise do financeiro`, 'success');
    }

    Router.refresh();
  });
};

/* --- Enviar Contrato --- */

Screens.enviarContrato = function(id) {
  const r = findRecord(id);
  if (!r || r.status !== 'aguardando_contrato') {
    return renderShell(`
      <div class="empty-state">
        <h3>Ação não disponível</h3>
        <p>Este registro não está aguardando contrato ou não foi encontrado.</p>
        <a href="#/minhas-vendas" class="btn btn-secondary" style="margin-top:16px">${Icons.chevronL}Voltar</a>
      </div>
    `, 'minhas-vendas');
  }

  return renderShell(`
    <div class="page-header">
      <div>
        <a href="#/minhas-vendas" class="back-link">${Icons.chevronL}Minhas vendas</a>
        <h1 class="page-title">Enviar contrato</h1>
        <p class="page-subtitle">${r.nomeCliente} · ${r.id}</p>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:900px">

      <!-- Resumo da pré-venda -->
      <div class="card card-pad">
        <h3 style="margin-top:0;color:var(--navy)">Dados da pré-venda</h3>
        <dl class="info-dl">
          <dt>Pagador</dt>   <dd>${r.nomePagador}</dd>
          <dt>Cliente</dt>   <dd>${r.nomeCliente}</dd>
          ${!r.mesmoNomeContrato ? `<dt>Motivo</dt><dd>${r.motivoDiferenca}</dd>` : ''}
          <dt>Comprovante</dt><dd>${fmtMoney(r.valorComprovante)}</dd>
          <dt>Extrato</dt>   <dd>${r.extrato ? `${fmtMoney(r.extrato.valor)} · ${r.extrato.tipo === 'manual' ? 'vinculado manualmente' : 'vinculado automaticamente'}` : '—'}</dd>
          <dt>Data</dt>      <dd>${fmtDateTime(r.dataHora)}</dd>
          ${r.observacao ? `<dt>Obs.</dt><dd>${r.observacao}</dd>` : ''}
        </dl>
      </div>

      <!-- Formulário do contrato -->
      <div class="card card-pad">
        <h3 style="margin-top:0;color:var(--navy)">Dados do contrato</h3>
        <form id="form-contrato">
          <div class="form-grid" style="grid-template-columns:1fr">

            <div class="form-field">
              <label>Valor real da 1ª parcela (R$) <span class="req">*</span></label>
              <input type="number" id="c-valor" step="0.01" required placeholder="${r.valorComprovante.toFixed(2)}"
                     value="${r.valorComprovante.toFixed(2)}" />
              <div class="help">Pode diferir do comprovante inicial</div>
            </div>

            <div class="form-field">
              <label>Número do contrato <span class="req">*</span></label>
              <input type="text" id="c-numcontrato" required placeholder="Ex: 12345" value="${String(Math.floor(900 + Math.random() * 100)).padStart(4,'0')}" />
            </div>

            <div class="form-field">
              <label>Arquivo do contrato (PDF) <span class="req">*</span></label>
              <div class="dropzone" id="dz-cont">
                <div class="dz-icon">${Icons.upload}</div>
                <div class="dz-title">Clique ou arraste o contrato</div>
                <div class="dz-hint">PDF · até 10 MB</div>
                <input type="file" accept=".pdf" style="display:none" id="file-cont" />
              </div>
            </div>

          </div>
          <div class="row between" style="margin-top:20px">
            <a href="#/minhas-vendas" class="btn btn-ghost">${Icons.chevronL}Cancelar</a>
            <button type="submit" class="btn btn-primary btn-lg">Confirmar envio</button>
          </div>
        </form>
      </div>
    </div>
  `, 'minhas-vendas');
};

Screens.enviarContratoBind = function(id) {
  const dz = document.getElementById('dz-cont');
  const fi = document.getElementById('file-cont');
  if (!dz || !fi) return;

  dz.addEventListener('click', () => fi.click());
  fi.addEventListener('change', () => {
    const f = fi.files[0];
    if (f) {
      dz.innerHTML = `
        <div class="row" style="gap:12px">
          <div class="dz-icon" style="color:var(--green)">✓</div>
          <div><div class="dz-title">${f.name}</div><div class="dz-hint">${(f.size/1024).toFixed(1)} KB</div></div>
        </div>`;
    }
  });

  document.getElementById('form-contrato').addEventListener('submit', (e) => {
    e.preventDefault();
    const r = findRecord(id);
    if (!r) return;

    const valorReal = parseFloat(document.getElementById('c-valor').value);
    const numContrato = document.getElementById('c-numcontrato').value;
    const fileName  = fi.files[0]?.name || 'contrato.pdf';
    const now       = new Date();
    const ts        = `${now.toISOString().slice(0,10)} ${now.toTimeString().slice(0,5)}`;

    r.valorReal = valorReal;
    r.contrato  = { fileName, uploadedAt: ts, numContrato };

    const diff = valorReal - r.valorComprovante;
    if (diff > 0.005) {
      r.status = 'diferenca_pendente';
      r.history.push({ when: ts, who: `${State.persona.name} (Comercial)`, what: `Contrato enviado · valor real ${fmtMoney(valorReal)} · Contrato ${numContrato}` });
      r.history.push({ when: ts, who: 'Sistema', what: `Diferença detectada · cliente pagou ${fmtMoney(r.valorComprovante)} mas contrato exige ${fmtMoney(valorReal)} · aguardando comprovante complementar de ${fmtMoney(diff)}` });
    } else {
      r.status = 'pronto';
      r.history.push({ when: ts, who: `${State.persona.name} (Comercial)`, what: `Contrato enviado · valor real ${fmtMoney(valorReal)} · Contrato ${numContrato}` });
      if (diff < -0.005) {
        r.history.push({ when: ts, who: 'Sistema', what: `Pagamento excede o valor do contrato · ${fmtMoney(Math.abs(diff))} a devolver ao cliente` });
      }
    }

    toast(`Contrato enviado · ${r.nomeCliente}`, 'success');
    setTimeout(() => { location.hash = '#/minhas-vendas'; }, 500);
  });
};

/* --- Enviar Comprovante Complementar (diferença pendente) --- */

Screens.enviarComplemento = function(id) {
  const r = findRecord(id);
  if (!r || r.status !== 'diferenca_pendente') {
    return renderShell(`
      <div class="empty-state">
        <h3>Ação não disponível</h3>
        <p>Este registro não está com diferença pendente ou não foi encontrado.</p>
        <a href="#/minhas-vendas" class="btn btn-secondary" style="margin-top:16px">${Icons.chevronL}Voltar</a>
      </div>
    `, 'minhas-vendas');
  }

  const diff = r.valorReal - r.valorComprovante;

  return renderShell(`
    <div class="page-header">
      <div>
        <a href="#/minhas-vendas" class="back-link">${Icons.chevronL}Minhas vendas</a>
        <h1 class="page-title">Comprovante complementar</h1>
        <p class="page-subtitle">${r.nomeCliente} · ${r.id}</p>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:900px">

      <!-- Resumo da diferença -->
      <div class="card card-pad">
        <h3 style="margin-top:0;color:var(--navy)">Diferença pendente</h3>
        <dl class="info-dl">
          <dt>Comprovante inicial</dt> <dd>${fmtMoney(r.valorComprovante)}</dd>
          <dt>Valor real (contrato)</dt><dd>${fmtMoney(r.valorReal)}</dd>
          <dt>Falta pagar</dt>          <dd style="color:var(--red);font-weight:700">${fmtMoney(diff)}</dd>
          <dt>Contrato</dt>                 <dd>${r.contrato?.numContrato || '—'}</dd>
        </dl>
        <div class="tag-warning" style="margin-top:14px">
          O cliente precisa pagar os <strong>${fmtMoney(diff)}</strong> restantes antes que a venda possa ser aprovada. Após o pagamento, envie o comprovante abaixo.
        </div>
      </div>

      <!-- Formulário do complemento -->
      <div class="card card-pad">
        <h3 style="margin-top:0;color:var(--navy)">Comprovante da diferença</h3>
        <form id="form-complemento">
          <div class="form-grid" style="grid-template-columns:1fr">

            <div class="form-field">
              <label>Valor pago neste comprovante (R$) <span class="req">*</span></label>
              <input type="number" id="cc-valor" step="0.01" required placeholder="${diff.toFixed(2)}" />
              <div class="help">Valor esperado: ${fmtMoney(diff)}</div>
            </div>

            <div class="form-field">
              <label>Arquivo do comprovante (PDF, JPG ou PNG) <span class="req">*</span></label>
              <div class="dropzone" id="dz-comp2">
                <div class="dz-icon">${Icons.upload}</div>
                <div class="dz-title">Clique ou arraste o comprovante</div>
                <div class="dz-hint">PDF, JPG ou PNG · até 10 MB</div>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" style="display:none" id="file-comp2" />
              </div>
            </div>

            <div class="form-field">
              <label>Observação</label>
              <textarea id="cc-obs" placeholder="Data do pagamento, forma de contato com o cliente…"></textarea>
            </div>

          </div>
          <div class="row between" style="margin-top:20px">
            <a href="#/minhas-vendas" class="btn btn-ghost">${Icons.chevronL}Cancelar</a>
            <button type="submit" class="btn btn-primary btn-lg">Confirmar complemento</button>
          </div>
        </form>
      </div>

    </div>
  `, 'minhas-vendas');
};

Screens.enviarComplementoBind = function(id) {
  const dz = document.getElementById('dz-comp2');
  const fi = document.getElementById('file-comp2');
  if (!dz || !fi) return;

  dz.addEventListener('click', () => fi.click());
  fi.addEventListener('change', () => {
    const f = fi.files[0];
    if (f) {
      dz.innerHTML = `
        <div class="row" style="gap:12px">
          <div class="dz-icon" style="color:var(--green)">✓</div>
          <div><div class="dz-title">${f.name}</div><div class="dz-hint">${(f.size/1024).toFixed(1)} KB</div></div>
        </div>`;
    }
  });

  document.getElementById('form-complemento').addEventListener('submit', (e) => {
    e.preventDefault();
    const r = findRecord(id);
    if (!r) return;

    const valorComp2 = parseFloat(document.getElementById('cc-valor').value) || 0;
    const fileName   = fi.files[0]?.name || 'complemento.pdf';
    const now        = new Date();
    const ts         = `${now.toISOString().slice(0,10)} ${now.toTimeString().slice(0,5)}`;

    r.comprovanteComplementar = {
      fileName,
      uploadedAt: ts,
      valor: valorComp2,
    };
    r.history.push({ when: ts, who: `${State.persona.name} (Comercial)`, what: `Comprovante complementar enviado · ${fmtMoney(valorComp2)}` });

    const totalPago = r.valorComprovante + valorComp2;
    if (totalPago >= r.valorReal - 0.005) {
      r.status = 'pronto';
      r.history.push({ when: ts, who: 'Sistema', what: `Total pago (${fmtMoney(totalPago)}) atingiu o valor do contrato · venda pronta para aprovação` });
      toast(`Complemento aceito · ${r.nomeCliente} pronto para aprovação`, 'success');
    } else {
      const falta = r.valorReal - totalPago;
      toast(`Comprovante registrado · ainda falta ${fmtMoney(falta)}`, 'error');
    }

    setTimeout(() => { location.hash = '#/minhas-vendas'; }, 500);
  });
};

/* ==================== FINANCEIRO ==================== */

/* --- Dashboard --- */

Screens.dashboard = function() {
  const allFiltered = applyFilters(RECORDS);
  const counts      = getCounts(RECORDS);
  const page        = State.filter.page     || 1;
  const pageSize    = State.filter.pageSize || 15;
  const records     = allFiltered.slice((page - 1) * pageSize, page * pageSize);

  const summary = [
    { label: 'Total de pré-vendas',   value: counts.total,                 status: 'all',                   accent: '' },
    { label: 'Aguardando extrato',    value: counts.aguardando_financeiro,  status: 'aguardando_financeiro', accent: 'amber' },
    { label: 'Aguardando contrato',   value: counts.aguardando_contrato,    status: 'aguardando_contrato',   accent: 'blue' },
    { label: 'Diferença pendente',    value: counts.diferenca_pendente,     status: 'diferenca_pendente',    accent: 'orange' },
    { label: 'Pronto para aprovação', value: counts.pronto,                 status: 'pronto',                accent: 'green' },
    { label: 'Concluídas',            value: counts.concluida,              status: 'concluida',             accent: 'skyblue' },
    { label: 'Canceladas',            value: counts.cancelada,              status: 'cancelada',             accent: 'red' },
  ];

  return renderShell(`
    <div class="page-header">
      <div>
        <h1 class="page-title">Pré-vendas</h1>
        <p class="page-subtitle">${State.campaign.name} · visão geral</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-secondary" id="btn-exportar-fin">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Exportar relatório
        </button>
      </div>
    </div>

    <div class="summary-grid">
      ${summary.map(s => `
        <button class="summary-card ${s.accent ? 'accent-' + s.accent : ''} ${State.filter.status === s.status && s.status !== 'all' ? 'active' : ''}"
                data-filter-status="${s.status}">
          <div class="label">${s.label}</div>
          <div class="value">${s.value}</div>
        </button>
      `).join('')}
    </div>

    ${renderPrevVendasFilters(true)}
    ${renderResultCount(allFiltered.length, counts.total)}

    ${allFiltered.length === 0 ? `
      <div class="empty-state">
        <div class="ic">⊘</div>
        <h3>Nenhum registro encontrado</h3>
        <p>Ajuste os filtros acima.</p>
      </div>
    ` : `
      <div class="venda-list com-urgente">
        ${renderVendaListHeader(true)}
        ${records.map(r => renderVendaCard(r, 'financeiro')).join('')}
      </div>
      ${renderPagination(allFiltered.length, page, pageSize)}
    `}
  `, 'dashboard');
};

Screens.dashboardBind = function() {
  bindStatusFilters();
  bindSortFilter();
  bindSearchFilter();
  bindVendaCardActions();
  bindHierarchyFilters();
  bindExportBtn('btn-exportar-fin', 'financeiro');
  bindPagination();
};

/* --- Importar Extrato --- */

Screens.importarExtrato = function() {
  return renderShell(`
    <div class="page-header">
      <div>
        <h1 class="page-title">Importar extrato bancário</h1>
        <p class="page-subtitle">Importe as entradas PIX para cruzamento automático com os comprovantes.</p>
      </div>
    </div>

    <div class="tabs">
      <div class="tab active" data-tab="upload">A · Upload de arquivo</div>
      <div class="tab" data-tab="manual">B · Lançamento manual</div>
    </div>

    <div id="tab-upload" class="tab-content">
      <div class="card card-pad">
        <h3 style="margin-top:0;color:var(--navy)">Upload do extrato</h3>
        <p class="serif muted">Envie o PDF gerado pelo internet banking ou um CSV exportado da conta corrente. O sistema lê as linhas de PIX recebido e faz o cruzamento por nome e valor.</p>

        <div class="dropzone" id="dz-extrato" style="margin-top:8px">
          <div class="dz-icon">${Icons.import}</div>
          <div class="dz-title">Clique ou arraste o extrato bancário</div>
          <div class="dz-hint">PDF ou CSV · até 20 MB</div>
          <input type="file" accept=".pdf,.csv" id="ext-file" style="display:none" />
        </div>

        <div id="ext-preview" style="display:none;margin-top:16px">
          <h4 style="color:var(--navy);margin-bottom:4px">Preview · entradas identificadas</h4>
          <p class="serif muted text-sm" style="margin-bottom:10px">Entradas que o sistema conseguiu vincular automaticamente estão marcadas em verde.</p>
          <div class="table-wrap">
            <table class="data">
              <thead><tr><th>Remetente no extrato</th><th>Valor</th><th>Data/Hora</th><th>Vinculado a</th></tr></thead>
              <tbody>
                <tr class="row-match">
                  <td>ROBERTA ALMEIDA</td>
                  <td class="cell-money">R$ 1.400,00</td>
                  <td class="cell-secondary">04/06 11:22</td>
                  <td><span class="chip chip-green text-sm">Roberta Almeida · PV-004</span></td>
                </tr>
                <tr class="row-match">
                  <td>CAMILA ANDRADE</td>
                  <td class="cell-money">R$ 1.450,00</td>
                  <td class="cell-secondary">07/06 10:00</td>
                  <td><span class="chip chip-green text-sm">Camila Andrade · PV-008</span></td>
                </tr>
                <tr>
                  <td>JOÃO DA SILVA</td>
                  <td class="cell-money">R$ 1.240,00</td>
                  <td class="cell-secondary">08/06 14:32</td>
                  <td><span class="chip chip-amber text-sm">Não vinculado</span></td>
                </tr>
                <tr>
                  <td>FERNANDA COUTO</td>
                  <td class="cell-money">R$ 1.200,00</td>
                  <td class="cell-secondary">06/06 15:44</td>
                  <td><span class="chip chip-amber text-sm">Não vinculado</span></td>
                </tr>
                <tr>
                  <td>SERGIO PINTO</td>
                  <td class="cell-money">R$ 1.750,00</td>
                  <td class="cell-secondary">01/06 08:55</td>
                  <td><span class="chip chip-amber text-sm">Não vinculado</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tag-info" style="margin-top:12px">
            <strong>2 vinculados automaticamente</strong> · 3 sem correspondência — acesse <a href="#/conciliacao">Vincular PIX</a> para resolver manualmente.
          </div>
          <div class="row between" style="margin-top:14px">
            <a href="#/dashboard" class="btn btn-ghost">${Icons.chevronL}Voltar</a>
            <button class="btn btn-primary" id="confirm-import">Confirmar importação</button>
          </div>
        </div>
      </div>
    </div>

    <div id="tab-manual" class="tab-content" style="display:none">
      <div class="card card-pad">
        <h3 style="margin-top:0;color:var(--navy)">Lançamento manual linha a linha</h3>
        <p class="serif muted">Use quando preferir digitar o extrato direto, sem subir arquivo.</p>

        <div class="form-grid" style="grid-template-columns:2fr 1fr 1fr 1fr">
          <div class="form-field"><label>Nome remetente</label><input type="text" id="m-nome" placeholder="Nome conforme banco" /></div>
          <div class="form-field"><label>Valor (R$)</label><input type="number" id="m-valor" step="0.01" placeholder="0,00" /></div>
          <div class="form-field"><label>Horário</label><input type="text" id="m-hora" placeholder="14:32" /></div>
          <div class="form-field"><label>Chave PIX</label><input type="text" id="m-chave" placeholder="e-mail / CPF / fone" /></div>
        </div>
        <div style="margin-top:12px"><button class="btn btn-secondary" id="add-line">+ Adicionar linha</button></div>
        <div id="manual-list" style="margin-top:18px"></div>
        <div class="row between" style="margin-top:18px">
          <a href="#/dashboard" class="btn btn-ghost">${Icons.chevronL}Voltar</a>
          <button class="btn btn-primary" id="confirm-manual">Processar lançamentos</button>
        </div>
      </div>
    </div>

    <!-- Histórico de importações -->
    <div style="margin-top:36px">
      <h2 class="section-title">Histórico de extratos importados</h2>
      ${EXTRATO_HISTORY.length === 0 ? `<p class="muted serif">Nenhum extrato importado ainda.</p>` : `
        <div class="extrato-history-list">
          ${[...EXTRATO_HISTORY].reverse().map(ext => `
            <div class="extrato-history-card">
              <div class="extrato-history-main">
                <div class="extrato-history-icon">${Icons.import}</div>
                <div class="extrato-history-info">
                  <button class="extrato-history-name" data-download-extrato="${ext.id}" title="Baixar arquivo">${ext.fileName} ${Icons.download}</button>
                  <div class="extrato-history-meta">${fmtDateTime(ext.importedAt)} · ${ext.importedBy}</div>
                </div>
                <div class="extrato-history-summary">
                  <span class="chip chip-green text-sm">${ext.autoLinked} vinculados auto.</span>
                  ${ext.entries.filter(e => e.status === 'manual').length ? `<span class="chip chip-blue text-sm">${ext.entries.filter(e => e.status === 'manual').length} manual</span>` : ''}
                  ${(() => { const p = ext.entries.filter(e => e.status === 'pending').length; return p ? `<span class="chip chip-amber text-sm">${p} pendente${p > 1 ? 's' : ''}</span>` : ''; })()}
                </div>
              </div>
              <button class="btn btn-ghost btn-xs" data-open-extrato="${ext.id}">Ver detalhes</button>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `, 'importar-extrato');
};

Screens.importarExtratoBind = function() {
  document.querySelectorAll('[data-tab]').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      document.getElementById('tab-upload').style.display = t.dataset.tab === 'upload' ? '' : 'none';
      document.getElementById('tab-manual').style.display = t.dataset.tab === 'manual' ? '' : 'none';
    });
  });

  const dz   = document.getElementById('dz-extrato');
  const file = document.getElementById('ext-file');
  dz.addEventListener('click', () => file.click());
  file.addEventListener('change', () => {
    if (file.files[0]) {
      dz.innerHTML = `
        <div class="row" style="gap:14px">
          <div class="dz-icon" style="color:var(--green)">✓</div>
          <div style="flex:1">
            <div class="dz-title">${file.files[0].name}</div>
            <div class="dz-hint">Processando extrato…</div>
          </div>
        </div>`;
      setTimeout(() => {
        document.getElementById('ext-preview').style.display = 'block';
      }, 800);
    }
  });

  const confirmBtn = document.getElementById('confirm-import');
  if (confirmBtn) confirmBtn.addEventListener('click', () => {
    // Simula vinculação automática de 2 registros (PV-001 fica pendente para linking manual)
    const autoMatch = [
      { id: 'PV-004', remetente: 'ROBERTA ALMEIDA',  valor: 1400.00, dataHora: '2026-06-04 11:22' },
      { id: 'PV-008', remetente: 'CAMILA ANDRADE',   valor: 1450.00, dataHora: '2026-06-07 10:00' },
    ];
    const now = new Date();
    const ts  = `${now.toISOString().slice(0,10)} ${now.toTimeString().slice(0,5)}`;

    autoMatch.forEach(m => {
      const r = findRecord(m.id);
      if (r && r.status === 'aguardando_financeiro') {
        r.extrato = { remetente: m.remetente, valor: m.valor, dataHora: m.dataHora, tipo: 'auto' };
        r.status  = 'aguardando_contrato';
        r.history.push({ when: ts, who: 'Sistema', what: `PIX vinculado automaticamente ao extrato · ${fmtMoney(m.valor)}` });
        r.history.push({ when: ts, who: 'Sistema', what: 'Aguardando envio do contrato pelo gerente' });
      }
    });

    // Registra no histórico
    const newId = 'EXT-' + String(EXTRATO_HISTORY.length + 1).padStart(3, '0');
    EXTRATO_HISTORY.push({
      id: newId,
      fileName: (file && file.files[0]) ? file.files[0].name : 'extrato_importado.pdf',
      importedAt: ts,
      importedBy: State.persona ? State.persona.name : 'Financeiro',
      autoLinked: autoMatch.length,
      entries: (() => {
        const pendingEntries = [
          { remetente: 'JOÃO DA SILVA',    valor: 1240.00, dataHora: '2026-06-08 14:32', vinculadoId: null, vinculadoNome: null, status: 'pending' },
          { remetente: 'FERNANDA COUTO',   valor: 1200.00, dataHora: '2026-06-06 15:44', vinculadoId: null, vinculadoNome: null, status: 'pending' },
          { remetente: 'SERGIO PINTO',     valor: 1750.00, dataHora: '2026-06-01 08:55', vinculadoId: null, vinculadoNome: null, status: 'pending' },
        ];
        return [
          ...autoMatch.map(m => ({ remetente: m.remetente, valor: m.valor, dataHora: m.dataHora, vinculadoId: m.id, vinculadoNome: findRecord(m.id) ? findRecord(m.id).nomeCliente : m.remetente, status: 'auto' })),
          ...pendingEntries,
        ];
      })(),
    });

    toast('Importação concluída · 2 pré-vendas vinculadas, restantes aguardam vinculação manual', 'success');
    setTimeout(() => { location.hash = '#/conciliacao'; }, 600);
  });

  // Manual tab
  let manualLines = [];
  const addBtn = document.getElementById('add-line');
  if (addBtn) addBtn.addEventListener('click', () => {
    const nome  = document.getElementById('m-nome').value.trim();
    const valor = parseFloat(document.getElementById('m-valor').value);
    const hora  = document.getElementById('m-hora').value;
    const chave = document.getElementById('m-chave').value;
    if (!nome || !valor) { toast('Informe nome e valor', 'error'); return; }
    const entry = { nome, valor, hora, chave };
    manualLines.push(entry);
    const list = document.getElementById('manual-list');
    list.innerHTML = `<div class="table-wrap"><table class="data">
      <thead><tr><th>Remetente</th><th>Valor</th><th>Horário</th><th>Chave</th></tr></thead>
      <tbody>${manualLines.map(l => `
        <tr><td>${l.nome}</td><td class="cell-money">${fmtMoney(l.valor)}</td>
        <td class="cell-secondary">${l.hora || '—'}</td>
        <td class="cell-secondary">${l.chave || '—'}</td></tr>
      `).join('')}</tbody>
    </table></div>`;
    ['m-nome','m-valor','m-hora','m-chave'].forEach(id => { document.getElementById(id).value = ''; });
  });

  const confirmManual = document.getElementById('confirm-manual');
  if (confirmManual) confirmManual.addEventListener('click', () => {
    if (!manualLines.length) { toast('Nenhuma linha adicionada', 'error'); return; }
    toast(`${manualLines.length} lançamento(s) adicionado(s) · confira vinculações`, 'success');
    setTimeout(() => { location.hash = '#/conciliacao'; }, 600);
  });

  document.querySelectorAll('[data-download-extrato]').forEach(btn => {
    btn.addEventListener('click', () => {
      const ext = EXTRATO_HISTORY.find(e => e.id === btn.dataset.downloadExtrato);
      if (!ext) return;
      const lines = [
        `Extrato importado: ${ext.fileName}`,
        `Importado em: ${fmtDateTime(ext.importedAt)} por ${ext.importedBy}`,
        '',
        'Remetente;Valor;Data/Hora;Vinculado a;Status',
        ...ext.entries.map(e =>
          `${e.remetente};${e.valor.toFixed(2)};${e.dataHora};${e.vinculadoId ? e.vinculadoId + ' - ' + e.vinculadoNome : ''};${e.status}`
        ),
      ].join('\n');
      const blob = new Blob([lines], { type: 'text/csv;charset=utf-8;' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = ext.fileName.replace(/\.[^.]+$/, '') + '_exportado.csv';
      a.click();
      URL.revokeObjectURL(url);
      toast(`Baixando ${ext.fileName}`, 'success');
    });
  });

  document.querySelectorAll('[data-open-extrato]').forEach(btn => {
    btn.addEventListener('click', () => {
      const ext = EXTRATO_HISTORY.find(e => e.id === btn.dataset.openExtrato);
      if (!ext) return;
      const rows = ext.entries.map(e => {
        const chipClass = e.status === 'auto' ? 'chip-green' : e.status === 'manual' ? 'chip-blue' : 'chip-amber';
        const chipLabel = e.status === 'auto' ? 'Auto' : e.status === 'manual' ? 'Manual' : 'Pendente';
        const linkedTo  = e.vinculadoId ? `${e.vinculadoNome} · ${e.vinculadoId}` : '—';
        return `<tr>
          <td>${e.remetente}</td>
          <td class="cell-money">${fmtMoney(e.valor)}</td>
          <td class="cell-secondary">${fmtDateTime(e.dataHora)}</td>
          <td>${e.vinculadoId ? linkedTo : '<span class="muted">—</span>'}</td>
          <td><span class="chip ${chipClass} text-sm">${chipLabel}</span></td>
        </tr>`;
      }).join('');
      openModal(
        `${ext.fileName}`,
        `<p class="muted text-sm serif" style="margin:0 0 14px">Importado em ${fmtDateTime(ext.importedAt)} por ${ext.importedBy}</p>
         <div class="table-wrap">
           <table class="data">
             <thead><tr><th>Remetente</th><th>Valor</th><th>Data/Hora</th><th>Vinculado a</th><th>Status</th></tr></thead>
             <tbody>${rows}</tbody>
           </table>
         </div>`,
        '',
        'lg'
      );
    });
  });
};

/* --- Vincular PIX (conciliação) --- */

Screens.conciliacao = function() {
  const semExtrato  = RECORDS.filter(r => r.status === 'aguardando_financeiro');
  const orfaos      = EXTRATO_ORPHANS;

  return renderShell(`
    <div class="page-header">
      <div>
        <h1 class="page-title">Vincular PIX</h1>
        <p class="page-subtitle">Relacione os PIX do extrato com as pré-vendas que ainda não foram vinculadas.</p>
      </div>
    </div>

    ${semExtrato.length === 0 && orfaos.length === 0 ? `
      <div class="empty-state">
        <div class="ic">✓</div>
        <h3>Tudo vinculado</h3>
        <p>Não há comprovantes nem entradas do extrato pendentes de vinculação.</p>
      </div>
    ` : `
      <div class="concil-grid">

        <!-- Lado esquerdo: pré-vendas sem extrato -->
        <div>
          <div class="concil-header">
            <h3>Comprovantes sem extrato <span class="sidebar-badge" style="display:inline-flex">${semExtrato.length}</span></h3>
            <p class="serif muted text-sm">Pré-vendas cujo PIX ainda não foi identificado no extrato bancário</p>
          </div>
          ${semExtrato.length === 0 ? `<p class="muted serif">Nenhum comprovante pendente.</p>` : `
            <input type="search" id="search-comp" class="filter-input concil-search" placeholder="Buscar por nome, gerente ou ID…" />
            <div class="concil-list" id="list-comp">
              ${semExtrato.map(r => {
                const isCompl = r.comprovanteComplementar && r.extratoComplementar === null;
                const valorLabel = isCompl ? r.comprovanteComplementar.valor : r.valorComprovante;
                return `
                <div class="concil-item ${State.selectedLeft === r.id ? 'selected' : ''}" data-select-left="${r.id}">
                  <div class="row between" style="align-items:flex-start">
                    <div>
                      <strong>${r.nomePagador}</strong>
                      <div class="text-sm muted">${r.nomeCliente} · ${fmtDateTime(r.dataHora)}</div>
                      <div class="text-sm muted">${r.gerenteNome} · ${r.id}</div>
                      ${isCompl ? `<div class="text-sm" style="color:var(--orange);margin-top:4px">Comprovante complementar · ${fmtMoney(r.valorComprovante)} + ${fmtMoney(r.comprovanteComplementar.valor)}</div>` : ''}
                      ${!r.mesmoNomeContrato && !isCompl ? `<div class="text-sm" style="color:var(--blue);margin-top:4px">Pagador ≠ titular · ${r.motivoDiferenca}</div>` : ''}
                    </div>
                    <div style="text-align:right;flex-shrink:0;margin-left:12px">
                      <div class="cell-money" style="margin-bottom:6px">${fmtMoney(valorLabel)}</div>
                      <button class="btn btn-ghost btn-xs" data-preview-record="${r.id}" onclick="event.stopPropagation()">Ver detalhes</button>
                    </div>
                  </div>
                </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

        <!-- Centro: ação de vincular -->
        <div class="concil-center">
          <div id="link-status" class="concil-link-status">
            ${State.selectedLeft && State.selectedRight ? `
              <div class="concil-match-preview">
                <div class="text-sm" style="color:var(--navy);font-weight:600">Vincular selecionados?</div>
                <button class="btn btn-primary" id="btn-vincular" style="margin-top:8px">Vincular${Icons.chevronR}</button>
              </div>
            ` : `
              <div class="muted text-sm" style="text-align:center">Selecione um item de cada lado para vincular</div>
            `}
          </div>
        </div>

        <!-- Lado direito: PIX sem comprovante -->
        <div>
          <div class="concil-header">
            <h3>PIX sem correspondência <span class="sidebar-badge" style="display:inline-flex">${orfaos.length}</span></h3>
            <p class="serif muted text-sm">Entradas do extrato sem pré-venda correspondente</p>
          </div>
          ${orfaos.length === 0 ? `<p class="muted serif">Nenhum PIX órfão.</p>` : `
            <input type="search" id="search-ext" class="filter-input concil-search" placeholder="Buscar por nome…" />
            <div class="concil-list" id="list-ext">
              ${orfaos.map(e => `
                <div class="concil-item ${State.selectedRight === e.id ? 'selected' : ''}" data-select-right="${e.id}">
                  <div class="row between">
                    <strong>${e.remetente}</strong>
                    <span class="cell-money">${fmtMoney(e.valor)}</span>
                  </div>
                  <div class="text-sm muted">${fmtDateTime(e.dataHora)}</div>
                  <div class="text-sm muted">${e.chavePix || '—'}</div>
                </div>
              `).join('')}
            </div>
          `}
        </div>

      </div>
    `}
  `, 'conciliacao');
};

Screens.conciliacaoBind = function() {
  const searchComp = document.getElementById('search-comp');
  const searchExt  = document.getElementById('search-ext');

  if (searchComp) {
    searchComp.addEventListener('input', () => {
      const q = searchComp.value.toLowerCase();
      document.querySelectorAll('#list-comp .concil-item').forEach(el => {
        const text = el.textContent.toLowerCase();
        el.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  if (searchExt) {
    searchExt.addEventListener('input', () => {
      const q = searchExt.value.toLowerCase();
      document.querySelectorAll('#list-ext .concil-item').forEach(el => {
        const text = el.textContent.toLowerCase();
        el.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  document.querySelectorAll('[data-preview-record]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const r = findRecord(btn.dataset.previewRecord);
      if (!r) return;
      const diff = r.valorReal != null ? r.valorReal - r.valorComprovante : null;
      openModal(
        `Pré-venda ${r.id}`,
        `
          <div class="detail-modal-grid">
            <div class="detail-modal-row">
              <span class="detail-modal-label">Status</span>
              <span>${statusChip(r.status)}</span>
            </div>
            <div class="detail-modal-row">
              <span class="detail-modal-label">Pagador</span>
              <span>${r.nomePagador}</span>
            </div>
            ${r.cpfPagador ? `
            <div class="detail-modal-row">
              <span class="detail-modal-label">CPF/CNPJ</span>
              <span style="font-family:monospace;font-weight:600">${r.cpfPagador}</span>
            </div>` : ''}
            ${r.nomePagador !== r.nomeCliente ? `
            <div class="detail-modal-row">
              <span class="detail-modal-label">Titular</span>
              <span>${r.nomeCliente} <span class="muted text-sm">· ${r.motivoDiferenca}</span></span>
            </div>` : ''}
            <div class="detail-modal-row">
              <span class="detail-modal-label">Comercial</span>
              <span>${r.gerenteNome}</span>
            </div>
            <div class="detail-modal-row">
              <span class="detail-modal-label">Data / hora</span>
              <span>${fmtDateTime(r.dataHora)}</span>
            </div>
            <div class="detail-modal-row">
              <span class="detail-modal-label">Valor comprovante</span>
              <span class="cell-money">${fmtMoney(r.valorComprovante)}</span>
            </div>
            ${r.valorReal != null ? `
            <div class="detail-modal-row">
              <span class="detail-modal-label">Valor contrato</span>
              <span class="cell-money">${fmtMoney(r.valorReal)}
                ${diff != null && Math.abs(diff) > 0.005 ? `<span class="text-sm" style="color:${diff > 0 ? 'var(--orange)' : 'var(--amber)'}"> (${diff > 0 ? '+' : ''}${fmtMoney(Math.abs(diff))} diferença)</span>` : ''}
              </span>
            </div>` : ''}
            ${r.comprovante ? `
            <div class="detail-modal-row">
              <span class="detail-modal-label">Comprovante</span>
              <span class="text-sm muted">📎 ${r.comprovante.fileName}</span>
            </div>` : ''}
            ${r.observacao ? `
            <div class="detail-modal-row">
              <span class="detail-modal-label">Observação</span>
              <span class="text-sm">${r.observacao}</span>
            </div>` : ''}
          </div>
          ${r.history && r.history.length ? `
            <h4 style="margin:16px 0 8px;font-size:13px;color:var(--navy)">Histórico</h4>
            <div class="historico-list" style="max-height:160px;overflow-y:auto">
              ${r.history.map(h => `
                <div class="historico-item">
                  <div class="historico-meta">${fmtDateTime(h.when)} · ${h.who}</div>
                  <div>${h.what}</div>
                </div>`).join('')}
            </div>` : ''}
        `
      );
    });
  });

  document.querySelectorAll('[data-select-left]').forEach(el => {
    el.addEventListener('click', () => {
      State.selectedLeft = State.selectedLeft === el.dataset.selectLeft ? null : el.dataset.selectLeft;
      Router.refresh();
    });
  });
  document.querySelectorAll('[data-select-right]').forEach(el => {
    el.addEventListener('click', () => {
      State.selectedRight = State.selectedRight === el.dataset.selectRight ? null : el.dataset.selectRight;
      Router.refresh();
    });
  });

  const btnVincular = document.getElementById('btn-vincular');
  if (btnVincular) btnVincular.addEventListener('click', () => {
    const r = findRecord(State.selectedLeft);
    const orphan = EXTRATO_ORPHANS.find(e => e.id === State.selectedRight);
    if (!r || !orphan) return;

    const now = new Date();
    const ts  = `${now.toISOString().slice(0,10)} ${now.toTimeString().slice(0,5)}`;

    const isCompl = r.comprovanteComplementar && r.extratoComplementar === null;

    if (isCompl) {
      r.extratoComplementar = { remetente: orphan.remetente, valor: orphan.valor, dataHora: orphan.dataHora, tipo: 'manual' };
      r.history.push({ when: ts, who: `${State.persona.name} (Fase 1)`, what: `Extrato complementar vinculado · ${orphan.remetente} · ${fmtMoney(orphan.valor)}` });
      const totalPago = r.valorComprovante + r.comprovanteComplementar.valor;
      if (totalPago >= r.valorReal - 0.005) {
        r.status = 'pronto';
        r.history.push({ when: ts, who: 'Sistema', what: `Total pago ${fmtMoney(totalPago)} confirmado · pronto para aprovação` });
        toast(`Complemento confirmado · ${r.nomePagador} pronto para aprovação`, 'success');
      } else {
        r.status = 'diferenca_pendente';
        r.history.push({ when: ts, who: 'Sistema', what: `Total pago ${fmtMoney(totalPago)} ainda abaixo do valor do contrato · diferença pendente` });
        toast(`Vinculado · total ainda insuficiente · falta ${fmtMoney(r.valorReal - totalPago)}`, 'error');
      }
    } else {
      r.extrato = { remetente: orphan.remetente, valor: orphan.valor, dataHora: orphan.dataHora, tipo: 'manual' };
      r.status  = 'aguardando_contrato';
      r.history.push({ when: ts, who: `${State.persona.name} (Fase 1)`, what: `PIX vinculado manualmente · ${orphan.remetente} · ${fmtMoney(orphan.valor)}` });
      toast(`Vinculado: ${r.nomePagador} ↔ ${orphan.remetente}`, 'success');
    }

    // Remove o órfão
    const idx = EXTRATO_ORPHANS.findIndex(e => e.id === State.selectedRight);
    if (idx !== -1) EXTRATO_ORPHANS.splice(idx, 1);

    State.selectedLeft  = null;
    State.selectedRight = null;
    Router.refresh();
  });
};

/* ==================== APROVAÇÃO DE COTA ==================== */

Screens.aprovacoes = function() {
  const campRecs   = RECORDS.filter(r => r.campanhaId === State.campaign.id);
  const prontos    = campRecs.filter(r => r.status === 'pronto');
  const concluidas = campRecs.filter(r => r.status === 'concluida');
  const pendentes  = campRecs.filter(r => !['pronto','concluida','cancelada'].includes(r.status));

  const activeTab = State.filter.aprovTab || 'pronto';
  const page      = State.filter.page     || 1;
  const pageSize  = State.filter.pageSize || 15;

  function buildTabHTML(allVis, emptyIcon, emptyMsg, emptyHint) {
    if (allVis.length === 0) {
      return `<div class="empty-state"><div class="ic">${emptyIcon}</div><h3>${emptyMsg}</h3><p>${emptyHint}</p></div>`;
    }
    const pageSlice = allVis.slice((page - 1) * pageSize, page * pageSize);
    return `<div class="venda-list com-urgente">${renderVendaListHeader(true)}${pageSlice.map(r => renderVendaCard(r, 'backoffice')).join('')}</div>
            ${renderPagination(allVis.length, page, pageSize)}`;
  }


  let listaHTML;
  if (activeTab === 'pronto') {
    const vis = applySearchSort(prontos);
    listaHTML = buildTabHTML(vis, '⊘',
      prontos.length === 0 ? 'Nenhuma venda pronta no momento' : 'Nenhum resultado',
      prontos.length === 0 ? 'As vendas aparecem aqui quando todos os documentos estão confirmados.' : 'Tente ajustar a busca.');
  } else if (activeTab === 'concluida') {
    const vis = applySearchSort(concluidas);
    listaHTML = buildTabHTML(vis, '✓',
      concluidas.length === 0 ? 'Nenhuma venda concluída ainda' : 'Nenhum resultado',
      'Tente ajustar a busca.');
  } else {
    const vis = applySearchSort(pendentes);
    listaHTML = buildTabHTML(vis, '✓',
      pendentes.length === 0 ? 'Todas chegaram aqui' : 'Nenhum resultado',
      'Tente ajustar a busca.');
  }

  return renderShell(`
    <div class="page-header">
      <div>
        <h1 class="page-title">Fase 2 · Remessas</h1>
        <p class="page-subtitle">${State.campaign.name}</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-secondary" id="btn-exportar-aprov">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Exportar relatório
        </button>
      </div>
    </div>

    <div class="summary-grid" style="grid-template-columns:repeat(3,1fr);max-width:640px;margin-bottom:28px">
      <button class="summary-card accent-blue ${activeTab === 'andamento' ? 'active' : ''}" data-aprov-tab="andamento">
        <div class="label">Em andamento</div>
        <div class="value">${pendentes.length}</div>
        <div class="hint">Ainda não chegaram aqui</div>
      </button>
      <button class="summary-card accent-green ${activeTab === 'pronto' ? 'active' : ''}" data-aprov-tab="pronto">
        <div class="label">Prontas para remessa</div>
        <div class="value">${prontos.length}</div>
        <div class="hint">Aguardando fechamento da remessa</div>
      </button>
      <button class="summary-card accent-skyblue ${activeTab === 'concluida' ? 'active' : ''}" data-aprov-tab="concluida">
        <div class="label">Concluídas</div>
        <div class="value">${concluidas.length}</div>
        <div class="hint">Incluídas em remessa Porto Seguro</div>
      </button>
    </div>

    ${renderSearchBar()}

    ${listaHTML}
  `, 'aprovacoes');
};

Screens.aprovacoesBind = function() {
  if (!State.filter.aprovTab) State.filter.aprovTab = 'pronto';

  bindSortFilter();
  bindSearchFilter();
  bindPagination();
  bindExportBtn('btn-exportar-aprov', 'aprovacao');

  document.querySelectorAll('[data-aprov-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      State.filter.aprovTab = btn.dataset.aprovTab;
      State.filter.page = 1;
      Router.refresh();
    });
  });

  document.querySelectorAll('[data-ver-aprov]').forEach(btn => {
    btn.addEventListener('click', () => {
      location.hash = `#/ver-venda/${btn.dataset.verAprov}`;
    });
  });

  bindVendaCardActions();
};

/* --- Fase 3 · Cobranças --- */

Screens.cobrancas = function() {
  const tab = State.filter.cobTab || 'absorvidas';

  const absorvidas    = RECORDS.filter(r => r.diferencaAbsorvida);
  const pendentes     = RECORDS.filter(r => r.status === 'diferenca_pendente');
  const devolucoes    = RECORDS.filter(r => r.valorReal !== null && (r.valorReal - r.valorComprovante) < -0.005);
  const cancelamentos = RECORDS.filter(r => r.status === 'cancelada' && r.cancelamento?.extornoNecessario);

  const totalAbsorvido    = absorvidas.reduce((s, r) => s + (r.diferencaAbsorvida?.valor || 0), 0);
  const totalPendente     = pendentes.reduce((s, r) => s + Math.max(0, (r.valorReal || 0) - r.valorComprovante), 0);
  const totalDevolucao    = devolucoes.reduce((s, r) => s + Math.abs((r.valorReal || 0) - r.valorComprovante), 0);
  const totalCancelamento = cancelamentos.reduce((s, r) => s + r.valorComprovante, 0);

  const lista = tab === 'absorvidas' ? absorvidas
    : tab === 'pendentes'     ? pendentes
    : tab === 'cancelamentos' ? cancelamentos
    : devolucoes;

  function rowValor(r) {
    if (tab === 'absorvidas')    return fmtMoney(r.diferencaAbsorvida?.valor);
    if (tab === 'pendentes')     return fmtMoney(Math.max(0, (r.valorReal || 0) - r.valorComprovante));
    if (tab === 'cancelamentos') return fmtMoney(r.valorComprovante);
    return fmtMoney(Math.abs((r.valorReal || 0) - r.valorComprovante));
  }

  return renderShell(`
    <div class="page-header">
      <div>
        <h1 class="page-title">Fase 3 · Cobranças e Devoluções</h1>
        <p class="page-subtitle">Gestão de diferenças entre o que o cliente pagou e o valor do contrato</p>
      </div>
    </div>

    <div class="cob-metrics">
      <button class="cob-card accent-amber ${tab === 'absorvidas' ? 'active' : ''}" data-cob-tab="absorvidas">
        <div class="cob-label">Porto Vale cobriu</div>
        <div class="cob-value">${fmtMoney(totalAbsorvido)}</div>
        <div class="cob-hint">${absorvidas.length} venda${absorvidas.length !== 1 ? 's' : ''} · a cobrar do Comercial</div>
      </button>
      <button class="cob-card accent-orange ${tab === 'pendentes' ? 'active' : ''}" data-cob-tab="pendentes">
        <div class="cob-label">Diferença pendente</div>
        <div class="cob-value">${fmtMoney(totalPendente)}</div>
        <div class="cob-hint">${pendentes.length} venda${pendentes.length !== 1 ? 's' : ''} · a cobrar do cliente</div>
      </button>
      <button class="cob-card accent-blue ${tab === 'devolucoes' ? 'active' : ''}" data-cob-tab="devolucoes">
        <div class="cob-label">A devolver ao cliente</div>
        <div class="cob-value">${fmtMoney(totalDevolucao)}</div>
        <div class="cob-hint">${devolucoes.length} venda${devolucoes.length !== 1 ? 's' : ''} · reembolso pendente</div>
      </button>
      <button class="cob-card accent-red ${tab === 'cancelamentos' ? 'active' : ''}" data-cob-tab="cancelamentos">
        <div class="cob-label">Extornos de cancelamento</div>
        <div class="cob-value">${fmtMoney(totalCancelamento)}</div>
        <div class="cob-hint">${cancelamentos.length} venda${cancelamentos.length !== 1 ? 's' : ''} · extorno ao cliente</div>
      </button>
    </div>

    ${lista.length === 0 ? `
      <div class="empty-state">
        <div class="ic">✓</div>
        <h3>Nenhum registro nesta categoria</h3>
        <p>Tudo certo por aqui.</p>
      </div>
    ` : `
      <div class="table-wrap">
        <table class="data">
          <thead>
            <tr>
              <th>Pré-venda</th>
              <th>Cliente</th>
              <th>Comercial</th>
              <th>Pago</th>
              <th>Contrato</th>
              <th>${tab === 'devolucoes' ? 'A devolver' : tab === 'cancelamentos' ? 'Valor pago' : 'Diferença'}</th>
              ${tab === 'cancelamentos' ? '<th>Motivo</th>' : ''}
              <th>Data</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${lista.map(r => `
              <tr>
                <td><strong>${r.id}</strong></td>
                <td>${r.nomeCliente}</td>
                <td>${r.gerenteNome}</td>
                <td>${fmtMoney(r.valorComprovante)}</td>
                <td>${fmtMoney(r.valorReal)}</td>
                <td><strong style="color:${tab === 'cancelamentos' ? 'var(--red)' : 'var(--amber)'}">${rowValor(r)}</strong></td>
                ${tab === 'cancelamentos' ? `<td style="color:var(--text-mute);font-size:12px;max-width:200px">${r.cancelamento?.motivo || '—'}</td>` : ''}
                <td style="color:var(--text-mute);font-size:12px">${fmtDateTime(r.dataHora)}</td>
                <td>${statusChip(r.status)}</td>
                <td><a href="#/ver-venda/${r.id}" class="btn btn-ghost btn-sm">Ver</a></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `}
  `, 'cobrancas');
};

Screens.cobrancasBind = function() {
  document.querySelectorAll('[data-cob-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      State.filter.cobTab = btn.dataset.cobTab;
      Router.refresh();
    });
  });
};

/* --- Campanhas --- */

Screens.campanhas = function() {
  return renderShell(`
    <div class="page-header">
      <div>
        <h1 class="page-title">Campanhas</h1>
        <p class="page-subtitle">Gestão de campanhas de pré-venda</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" data-action="new-campaign">+ Nova campanha</button>
      </div>
    </div>

    <div class="table-wrap">
      <table class="data">
        <thead>
          <tr><th>Código</th><th>Nome</th><th>Início</th><th>Lançamento</th><th>Status</th><th>Progresso</th><th></th></tr>
        </thead>
        <tbody>
          ${CAMPAIGNS.map(c => {
            const registros   = RECORDS.filter(r => r.campanhaId === c.id);
            const total       = registros.length;
            const concluidas  = registros.filter(r => r.status === 'concluida').length;
            const pct         = total > 0 ? Math.round((concluidas / total) * 100) : 0;
            const chipClass   = c.status === 'Ativa' ? 'chip-green' : 'chip-amber';
            return `
              <tr data-go-campaign="${c.id}">
                <td><strong>${c.id}</strong></td>
                <td>${c.name}</td>
                <td class="cell-secondary">${fmtDate(c.start)}</td>
                <td class="cell-secondary">${fmtDate(c.launch)}</td>
                <td><span class="chip ${chipClass}"><span class="dot"></span>${c.status}</span></td>
                <td style="min-width:220px">
                  <div class="progress-bar" style="margin:0"><div class="progress-fill" style="width:${pct}%"></div></div>
                  <div class="progress-text" style="margin-top:4px">
                    <span>${concluidas} concluída${concluidas !== 1 ? 's' : ''} de ${total} pré-venda${total !== 1 ? 's' : ''}</span>
                    <strong>${pct}%</strong>
                  </div>
                </td>
                <td><button class="btn btn-ghost btn-sm">Abrir</button></td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `, 'campanhas');
};

Screens.campanhasBind = function() {
  document.querySelectorAll('[data-go-campaign]').forEach(tr => {
    tr.addEventListener('click', () => {
      const c = CAMPAIGNS.find(x => x.id === tr.dataset.goCampaign);
      State.setCampaign(c);
      location.hash = '#/aprovacoes';
    });
  });
  const newBtn = document.querySelector('[data-action="new-campaign"]');
  if (newBtn) newBtn.addEventListener('click', () => {
    openModal('Nova campanha',
      `<div class="form-grid">
        <div class="form-field full"><label>Nome <span class="req">*</span></label><input type="text" placeholder="Ex: Pré-venda Setembro 2026" /></div>
        <div class="form-field"><label>Início <span class="req">*</span></label><input type="date" /></div>
        <div class="form-field"><label>Lançamento <span class="req">*</span></label><input type="date" /></div>
      </div>`,
      `<button class="btn btn-secondary" data-modal-close>Cancelar</button>
       <button class="btn btn-primary" id="save-camp">Criar campanha</button>`
    );
    document.getElementById('save-camp').addEventListener('click', () => {
      closeModal();
      toast('Campanha criada com sucesso', 'success');
    });
  });
};

/* ==================== COMPONENTES COMPARTILHADOS ==================== */

function renderVendaListHeader(showGerente) {
  return `
    <div class="venda-row venda-row-header">
      ${State.persona.role !== 'Comercial' ? '<div class="vcol-urgente">Urgente</div>' : ''}
      <div class="vcol-main">${showGerente ? 'Comercial · Cliente' : 'Cliente'}</div>

      <div class="vcol-doc">Comprovante</div>
      <div class="vcol-doc">Extrato</div>
      <div class="vcol-doc">Contrato</div>
      <div class="vcol-diff">Diferença</div>
      <div class="vcol-boleto">Boleto</div>
      <div class="vcol-status">Status</div>
      <div class="vcol-action"></div>
    </div>
  `;
}

function renderBoletoCell(r, viewAs) {
  const isFase2 = viewAs === 'backoffice';
  if (r.boleto?.pago) {
    return `<span class="icon-state ok" title="Boleto pago · ${r.boleto.pagoEm || ''}">✓</span>`;
  }
  if (r.status === 'pronto' && isFase2) {
    return `<button class="btn btn-primary btn-sm" style="font-size:11px;padding:3px 8px" data-pagar-boleto="${r.id}">Pagar</button>`;
  }
  return `<span style="color:var(--text-mute);font-size:13px">—</span>`;
}

function openDocModal(r, tipo) {
  let titulo, conteudo;
  if (tipo === 'comp' && r.comprovante) {
    titulo = `Comprovante · ${r.comprovante.fileName}`;
    conteudo = `
      <div style="background:#f5f7fa;border-radius:8px;padding:20px;font-family:monospace;font-size:13px">
        <div style="text-align:center;font-size:15px;font-weight:700;margin-bottom:16px">COMPROVANTE DE TRANSFERÊNCIA PIX</div>
        <div style="display:grid;grid-template-columns:auto 1fr;gap:6px 16px">
          <span style="color:#888">Tipo</span><span>PIX</span>
          <span style="color:#888">Valor</span><span style="font-weight:700">${fmtMoney(r.valorComprovante)}</span>
          <span style="color:#888">Pagador</span><span>${r.nomePagador}</span>
          ${r.cpfPagador ? `<span style="color:#888">CPF/CNPJ</span><span>${r.cpfPagador}</span>` : ''}
          <span style="color:#888">Favorecido</span><span>Porto Vale Consórcios</span>
          <span style="color:#888">Data/Hora</span><span>${fmtDateTime(r.dataHora)}</span>
          <span style="color:#888">Enviado em</span><span>${fmtDateTime(r.comprovante.uploadedAt)}</span>
        </div>
      </div>`;
  } else if (tipo === 'ext' && r.extrato) {
    titulo = `Extrato bancário · ${r.extrato.remetente}`;
    conteudo = `
      <div style="background:#f5f7fa;border-radius:8px;padding:20px;font-family:monospace;font-size:13px">
        <div style="text-align:center;font-size:15px;font-weight:700;margin-bottom:16px">LANÇAMENTO — EXTRATO BANCÁRIO</div>
        <div style="display:grid;grid-template-columns:auto 1fr;gap:6px 16px">
          <span style="color:#888">Remetente</span><span>${r.extrato.remetente}</span>
          <span style="color:#888">Valor</span><span style="font-weight:700">${fmtMoney(r.extrato.valor)}</span>
          <span style="color:#888">Tipo</span><span>${r.extrato.tipo === 'manual' ? 'Vinculado manualmente' : 'Vinculado automaticamente'}</span>
          <span style="color:#888">Conta</span><span>Porto Vale — C/C 12345-6</span>
        </div>
      </div>`;
  } else if (tipo === 'cont' && r.contrato) {
    titulo = `Contrato · ${r.contrato.fileName}`;
    conteudo = `
      <div style="background:#f5f7fa;border-radius:8px;padding:20px;font-family:monospace;font-size:13px">
        <div style="text-align:center;font-size:15px;font-weight:700;margin-bottom:16px">CONTRATO DE CONSÓRCIO</div>
        <div style="display:grid;grid-template-columns:auto 1fr;gap:6px 16px">
          <span style="color:#888">Nº Contrato</span><span style="font-weight:700">${r.contrato.numContrato}</span>
          <span style="color:#888">Cliente</span><span>${r.nomeCliente}</span>
          <span style="color:#888">Valor</span><span>${fmtMoney(r.valorReal)}</span>
          <span style="color:#888">Arquivo</span><span>${r.contrato.fileName}</span>
          <span style="color:#888">Enviado em</span><span>${fmtDateTime(r.contrato.uploadedAt)}</span>
        </div>
      </div>`;
  } else { return; }
  openModal(titulo, conteudo,
    `<button class="btn btn-secondary" data-modal-close>Fechar</button>
     <button class="btn btn-primary" onclick="toast('Download iniciado','success');closeModal()">⬇ Baixar</button>`
  );
}

function renderDiffCell(r) {
  if (!r.contrato || r.valorReal === null) {
    return `<span class="diff-cell pending">—</span>`;
  }
  const diff = r.valorReal - r.valorComprovante;
  if (Math.abs(diff) < 0.005) {
    return `<span class="diff-cell quitado">OK</span>`;
  }
  if (diff > 0) {
    return `<span class="diff-cell cobrar" title="Cliente pagou menos que o valor real do contrato">Cobrar<br>${fmtMoney(diff)}</span>`;
  }
  return `<span class="diff-cell devolver" title="Cliente pagou mais que o valor real do contrato">Devolver<br>${fmtMoney(Math.abs(diff))}</span>`;
}

function renderVendaCard(r, viewAs) {
  const icons   = recordStatusIcons(r);
  const isMine  = viewAs === 'gerente';

  const diff = r.valorReal !== null ? r.valorReal - r.valorComprovante : 0;
  let action;
  if (isMine && r.status === 'aguardando_contrato') {
    action = `<a href="#/ver-venda/${r.id}" class="btn btn-primary btn-sm">Enviar contrato${Icons.chevronR}</a>`;
  } else if (isMine && r.status === 'diferenca_pendente' && diff > 0.005) {
    action = `<a href="#/ver-venda/${r.id}" class="btn btn-danger btn-sm">Enviar complemento${Icons.chevronR}</a>`;
  } else if (isMine && r.status === 'diferenca_pendente' && diff < -0.005) {
    action = `<a href="#/ver-venda/${r.id}" class="btn btn-warning btn-sm">Abrir chamado${Icons.chevronR}</a>`;
  } else if (viewAs === 'backoffice' && r.status === 'pronto') {
    action = `<a href="#/ver-venda/${r.id}" class="btn btn-ghost btn-sm">Ver${Icons.chevronR}</a>`;
  } else {
    action = `<a href="#/ver-venda/${r.id}" class="btn btn-ghost btn-sm">Ver${Icons.chevronR}</a>`;
  }

  return `
    <div class="venda-row ${r.urgente && State.persona.role !== 'Comercial' ? 'urgente-row' : ''} ${r.status === 'cancelada' ? 'cancelada-row' : ''}" data-record="${r.id}">

      ${State.persona.role !== 'Comercial' ? `
        <div class="vcol-urgente">
          <input type="checkbox" class="check-urgente-row" data-id="${r.id}" ${r.urgente ? 'checked' : ''} title="Marcar como urgente">
        </div>` : ''}

      <div class="vcol-main">
        <div class="venda-id">
          ${r.id}${!r.mesmoNomeContrato ? `<span class="badge-pagador">Pagador ≠ titular</span>` : ''}
        </div>
        <div class="venda-name">
          ${r.nomeCliente}
          ${isMine && r.diferencaAbsorvida ? `<span class="chip chip-amber" style="font-size:10px;padding:1px 6px;margin-left:6px" title="Porto Vale cobriu diferença de ${fmtMoney(r.diferencaAbsorvida.valor)}">PV cobriu ${fmtMoney(r.diferencaAbsorvida.valor)}</span>` : ''}
        </div>
        <div class="venda-meta">${!isMine ? r.gerenteNome + ' · ' : ''}${fmtMoney(r.valorComprovante)} · ${fmtDateTime(r.dataHora)}</div>
      </div>

      <div class="vcol-doc">${icons.comp === 'ok' ? `<button class="icon-state ok icon-state-btn" data-doc-preview="comp" data-doc-id="${r.id}" title="Ver comprovante">✓</button>` : iconState(icons.comp)}</div>
      <div class="vcol-doc">${icons.ext  === 'ok' ? `<button class="icon-state ok icon-state-btn" data-doc-preview="ext"  data-doc-id="${r.id}" title="Ver extrato">✓</button>`      : iconState(icons.ext)}</div>
      <div class="vcol-doc">${icons.cont === 'ok' ? `<button class="icon-state ok icon-state-btn" data-doc-preview="cont" data-doc-id="${r.id}" title="Ver contrato">✓</button>`    : iconState(icons.cont)}</div>

      <div class="vcol-diff">${renderDiffCell(r)}</div>

      <div class="vcol-boleto">${renderBoletoCell(r, viewAs)}</div>

      <div class="vcol-status">${statusChip(r.status)}</div>

      <div class="vcol-action">${action}</div>

    </div>
  `;
}


function renderVendaDetalhe(r) {
  const icons = recordStatusIcons(r);

  return `
    <div style="display:grid;grid-template-columns:1fr 1fr 1.2fr;gap:20px">

      <div class="card card-pad">
        <h3 style="margin-top:0;color:var(--navy)">Dados da venda</h3>
        <dl class="info-dl">
          <dt>Pré-venda</dt>    <dd>${r.id}</dd>
          <dt>Campanha</dt>     <dd>${r.campanhaId}</dd>
          <dt>Comercial</dt>      <dd>${r.gerenteNome}</dd>
          <dt>Vendedor</dt>     <dd>${r.nomeVendedor}</dd>
          <dt>Pagador</dt>      <dd>${r.nomePagador}</dd>
          <dt>CPF/CNPJ</dt>    <dd>${r.cpfPagador || '—'}</dd>
          <dt>Cliente</dt>      <dd>${r.nomeCliente}</dd>
          ${!r.mesmoNomeContrato ? `<dt>Relação</dt><dd>${r.motivoDiferenca}</dd>` : ''}
          <dt>Data/Hora</dt>    <dd>${fmtDateTime(r.dataHora)}</dd>
          ${r.observacao ? `<dt>Obs.</dt><dd>${r.observacao}</dd>` : ''}
        </dl>
      </div>

      <div class="card card-pad">
        <h3 style="margin-top:0;color:var(--navy)">Status dos documentos</h3>

        <div class="doc-status-row">
          ${iconState(icons.comp)}
          <div style="flex:1;min-width:0">
            <div style="font-weight:600">Comprovante</div>
            ${r.comprovante
              ? `<div class="text-sm muted">${r.comprovante.fileName} · ${fmtDateTime(r.comprovante.uploadedAt)}</div>`
              : `<div class="text-sm muted">Não enviado</div>`}
          </div>
          <div class="cell-money">${fmtMoney(r.valorComprovante)}</div>
          ${r.comprovante ? `<button class="btn btn-ghost btn-sm" data-ver-doc="comp">Ver</button>` : ''}
        </div>

        <div class="doc-status-row">
          ${iconState(icons.ext)}
          <div style="flex:1;min-width:0">
            <div style="font-weight:600">Extrato bancário</div>
            ${r.extrato
              ? `<div class="text-sm muted">${r.extrato.remetente} · ${fmtMoney(r.extrato.valor)} · ${r.extrato.tipo === 'manual' ? 'Manual' : 'Automático'}</div>`
              : `<div class="text-sm muted">Aguardando vinculação pela Fase 1</div>`}
          </div>
          <div class="cell-money">${r.extrato ? fmtMoney(r.extrato.valor) : '—'}</div>
          ${r.extrato ? `<button class="btn btn-ghost btn-sm" data-ver-doc="ext">Ver</button>` : ''}
        </div>

        <div class="doc-status-row">
          ${iconState(icons.cont)}
          <div style="flex:1;min-width:0">
            <div style="font-weight:600">Contrato</div>
            ${r.contrato
              ? `<div class="text-sm muted">${r.contrato.fileName} · Contrato ${r.contrato.numContrato} · ${fmtDateTime(r.contrato.uploadedAt)}</div>`
              : `<div class="text-sm muted">Aguardando envio pelo gerente</div>`}
          </div>
          <div class="cell-money">${r.valorReal !== null ? fmtMoney(r.valorReal) : '—'}</div>
          ${r.contrato ? `<button class="btn btn-ghost btn-sm" data-ver-doc="cont">Ver</button>` : ''}
        </div>

        ${r.valorReal !== null && r.extrato && Math.abs(r.valorReal - r.extrato.valor) > 0.005 ? `
          <div class="tag-warning" style="margin-top:12px">
            Diferença: comprovante ${fmtMoney(r.extrato.valor)} vs. valor real ${fmtMoney(r.valorReal)}
          </div>
        ` : ''}

        ${r.boleto?.pago ? `
          <div class="doc-status-row" style="margin-top:12px">
            <div style="width:28px;height:28px;border-radius:50%;background:var(--green-bg);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--green);font-weight:700">✓</div>
            <div style="flex:1;min-width:0">
              <div style="font-weight:600">Pagamento à Porto Seguro</div>
              <div class="text-sm muted">${fmtDateTime(r.boleto.pagoEm)}${r.boleto.comprovante ? ` · ${r.boleto.comprovante}` : ''}</div>
            </div>
          </div>
        ` : ''}
      </div>

      <div class="card card-pad" style="overflow-y:auto;max-height:520px">
        <h3 style="margin-top:0;color:var(--navy)">Histórico</h3>
        <div class="timeline">
          ${(r.history || []).map(h => `
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <span class="who">${h.who}</span>
                <span class="when">${h.when}</span>
                <div class="what">${h.what}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}

/* --- Filtros comuns --- */

function renderSearchBar() {
  return `
    <div class="filters">
      <input class="filter-input" placeholder="Buscar nome, valor, ID…"
             value="${State.filter.search || ''}" data-filter-search />
      <div class="flex-grow"></div>
      ${State.persona.role !== 'Comercial' ? `<button class="filter-pill ${State.filter.urgente ? 'active urgente-pill' : ''}" data-filter-urgente>🚩 Urgentes</button>` : ''}
      <select class="filter-select" data-filter-sort>
        <option value="date_desc"  ${State.filter.sort === 'date_desc'  ? 'selected' : ''}>Mais recente primeiro</option>
        <option value="date_asc"   ${State.filter.sort === 'date_asc'   ? 'selected' : ''}>Mais antigo primeiro</option>
        <option value="value_desc" ${State.filter.sort === 'value_desc' ? 'selected' : ''}>Maior valor primeiro</option>
      </select>
    </div>
  `;
}

function renderResultCount(shown, total) {
  if (shown >= total) return '';
  const s = shown === 1 ? 'pré-venda' : 'pré-vendas';
  return `<p class="result-count">Exibindo <strong>${shown}</strong> de ${total} ${s}</p>`;
}

function renderPagination(total, page, pageSize) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return '';
  const start = (page - 1) * pageSize + 1;
  const end   = Math.min(page * pageSize, total);
  return `
    <div class="pagination">
      <div class="page-size-wrap">
        <span>Itens por página</span>
        <select class="filter-select" data-page-size>
          ${[10, 15, 20, 30, 50, 100].map(n =>
            `<option value="${n}" ${pageSize === n ? 'selected' : ''}>${n}</option>`
          ).join('')}
        </select>
      </div>
      <div class="page-nav">
        <button class="page-btn" data-page-prev ${page <= 1 ? 'disabled' : ''}>${Icons.chevronL} Anterior</button>
        <span class="page-info">${start}–${end} de ${total}</span>
        <button class="page-btn" data-page-next ${page >= totalPages ? 'disabled' : ''}>Próxima ${Icons.chevronR}</button>
      </div>
    </div>
  `;
}

function bindPagination() {
  const prev   = document.querySelector('[data-page-prev]');
  const next   = document.querySelector('[data-page-next]');
  const sizeEl = document.querySelector('[data-page-size]');
  if (prev) prev.addEventListener('click', () => {
    if (State.filter.page > 1) { State.filter.page--; Router.refresh(); }
  });
  if (next) next.addEventListener('click', () => {
    State.filter.page++;
    Router.refresh();
  });
  if (sizeEl) sizeEl.addEventListener('change', () => {
    State.filter.pageSize = parseInt(sizeEl.value);
    State.filter.page = 1;
    Router.refresh();
  });
}

function applySearchSort(records) {
  let out = records;
  if (State.filter.search) {
    const q = State.filter.search.toLowerCase();
    out = out.filter(r =>
      r.nomePagador.toLowerCase().includes(q) ||
      r.nomeCliente.toLowerCase().includes(q) ||
      r.nomeVendedor.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q) ||
      String(r.valorComprovante).includes(q)
    );
  }
  if (State.filter.urgente) {
    out = out.filter(r => r.urgente);
  }
  const sort = State.filter.sort || 'date_desc';
  out = [...out].sort((a, b) => {
    if (sort === 'date_asc')   return a.dataHora < b.dataHora ? -1 : 1;
    if (sort === 'date_desc')  return a.dataHora > b.dataHora ? -1 : 1;
    if (sort === 'value_desc') return b.valorComprovante - a.valorComprovante;
    return 0;
  });
  return out;
}

function hasActiveFilters() {
  const f = State.filter;
  return !!(f.search || f.urgente ||
    (f.status && f.status !== 'all') ||
    (f.superintendencia && f.superintendencia !== 'all') ||
    (f.diretoria && f.diretoria !== 'all') ||
    (f.gerente && f.gerente !== 'all'));
}

function renderPrevVendasFilters(showGerente = false) {
  const activeLabel = {
    aguardando_financeiro: 'Aguardando extrato',
    aguardando_contrato:   'Aguardando contrato',
    pronto:                'Pronto para aprovação',
    concluida:             'Concluída',
    cancelada:             'Cancelada',
  }[State.filter.status];

  const currSuper = State.filter.superintendencia || 'all';
  const currDir   = State.filter.diretoria        || 'all';
  const currGer   = State.filter.gerente          || 'all';

  const availDirs = currSuper === 'all'
    ? DIRETORIAS
    : DIRETORIAS.filter(d => d.superid === currSuper);

  const availManagers = MANAGERS.filter(m => {
    if (currDir   !== 'all') return m.dirid   === currDir;
    if (currSuper !== 'all') return m.superid === currSuper;
    return true;
  });

  return `
    <div class="filters">
      <input class="filter-input" placeholder="Buscar cliente, pagador ou ID…"
             value="${State.filter.search || ''}" data-filter-search />
      ${activeLabel ? `
        <button class="filter-pill active" data-filter-status="all">
          ${activeLabel} <span style="margin-left:4px;opacity:.7">×</span>
        </button>
      ` : ''}
      <div class="flex-grow"></div>
      ${State.persona.role !== 'Comercial' ? `<button class="filter-pill ${State.filter.urgente ? 'active urgente-pill' : ''}" data-filter-urgente>🚩 Urgentes</button>` : ''}
      ${showGerente ? `
        <select class="filter-select" data-filter-super>
          <option value="all">Todas as supts.</option>
          ${SUPERINTENDENCIAS.map(s => `<option value="${s.id}" ${currSuper === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}
        </select>
        <select class="filter-select" data-filter-dir>
          <option value="all">Todas as diretorias</option>
          ${availDirs.map(d => `<option value="${d.id}" ${currDir === d.id ? 'selected' : ''}>${d.name}</option>`).join('')}
        </select>
        <select class="filter-select" data-filter-gerente>
          <option value="all">Todos os gerentes</option>
          ${availManagers.map(m => `<option value="${m.id}" ${currGer === m.id ? 'selected' : ''}>${m.name}</option>`).join('')}
        </select>
      ` : ''}
      <select class="filter-select" data-filter-sort>
        <option value="date_desc" ${State.filter.sort === 'date_desc' ? 'selected' : ''}>Mais recente primeiro</option>
        <option value="date_asc"  ${State.filter.sort === 'date_asc'  ? 'selected' : ''}>Mais antigo primeiro</option>
        <option value="value_desc" ${State.filter.sort === 'value_desc' ? 'selected' : ''}>Maior valor primeiro</option>
      </select>
      ${hasActiveFilters() ? `<button class="btn-clear-filters" data-clear-filters>Limpar filtros</button>` : ''}
    </div>
  `;
}

function bindStatusFilters() {
  document.querySelectorAll('[data-filter-status]').forEach(el => {
    el.addEventListener('click', () => {
      const key = el.dataset.filterStatus;
      State.filter.status = (State.filter.status === key) ? 'all' : key;
      State.filter.page = 1;
      Router.refresh();
    });
  });
}

function bindSortFilter() {
  const s = document.querySelector('[data-filter-sort]');
  if (s) s.addEventListener('change', () => { State.filter.sort = s.value; State.filter.page = 1; Router.refresh(); });
}

function bindSearchFilter() {
  const inp = document.querySelector('[data-filter-search]');
  if (!inp) return;
  let t;
  inp.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      State.filter.search = inp.value;
      State.filter.page = 1;
      Router.refresh();
      const newInp = document.querySelector('[data-filter-search]');
      if (newInp) { newInp.focus(); newInp.setSelectionRange(inp.value.length, inp.value.length); }
    }, 250);
  });

  const btnUrgente = document.querySelector('[data-filter-urgente]');
  if (btnUrgente) {
    btnUrgente.addEventListener('click', () => {
      State.filter.urgente = !State.filter.urgente;
      State.filter.page = 1;
      Router.refresh();
    });
  }

  const btnClear = document.querySelector('[data-clear-filters]');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      State.filter.status = 'all';
      State.filter.search = '';
      State.filter.urgente = false;
      State.filter.superintendencia = 'all';
      State.filter.diretoria = 'all';
      State.filter.gerente = 'all';
      State.filter.page = 1;
      Router.refresh();
    });
  }
}

function bindHierarchyFilters() {
  const superSel = document.querySelector('[data-filter-super]');
  if (superSel) superSel.addEventListener('change', () => {
    State.filter.superintendencia = superSel.value;
    State.filter.diretoria = 'all';
    State.filter.gerente = 'all';
    State.filter.page = 1;
    Router.refresh();
  });
  const dirSel = document.querySelector('[data-filter-dir]');
  if (dirSel) dirSel.addEventListener('change', () => {
    State.filter.diretoria = dirSel.value;
    State.filter.gerente = 'all';
    State.filter.page = 1;
    Router.refresh();
  });
  const gerSel = document.querySelector('[data-filter-gerente]');
  if (gerSel) gerSel.addEventListener('change', () => {
    State.filter.gerente = gerSel.value;
    State.filter.page = 1;
    Router.refresh();
  });
}

function openCancelModal(r) {
  const temExtrato = !!r.extrato;

  openModal('Solicitar cancelamento',
    `<div id="cancel-step-1">
       <div style="margin-bottom:14px;font-size:13px;color:var(--muted)">
         <strong style="color:var(--navy)">${r.nomeCliente}</strong>${r.cpfPagador ? ` · ${r.cpfPagador}` : ''}
       </div>
       <div class="form-field">
         <label>Motivo do cancelamento <span class="req">*</span></label>
         <textarea id="cancel-motivo" rows="3" placeholder="Descreva o motivo do cancelamento…" style="resize:vertical"></textarea>
       </div>
     </div>
     <div id="cancel-step-2" style="display:none">
       ${temExtrato ? `
       <div style="background:var(--red-bg);border-left:3px solid var(--red);border-radius:6px;padding:10px 12px;font-size:12px;color:#8E2818;margin-bottom:14px">
         <strong>Atenção:</strong> esta venda já tem PIX vinculado ao extrato. O financeiro será notificado para processar o extorno ao cliente.
       </div>` : ''}
       <div class="tag-info" style="margin-bottom:12px">
         <strong>Confirmação de identidade</strong><br>
         Digite o CPF/CNPJ do pagador para confirmar o cancelamento.
       </div>
       <div class="form-field">
         <label>CPF/CNPJ do pagador <span class="req">*</span></label>
         <input type="text" id="cancel-codigo" placeholder="${r.cpfPagador || 'CPF ou CNPJ'}"
                style="font-family:monospace;font-size:15px;width:220px;display:block" />
       </div>
     </div>`,
    `<button class="btn btn-secondary" data-modal-close>Fechar</button>
     <button class="btn btn-danger" id="cancel-continuar">Continuar</button>`
  );

  const stripDoc = v => v.replace(/\D/g, '');

  let step = 1;
  document.getElementById('cancel-continuar').addEventListener('click', () => {
    if (step === 1) {
      const motivo = document.getElementById('cancel-motivo').value.trim();
      if (!motivo) {
        document.getElementById('cancel-motivo').style.outline = '2px solid var(--red)';
        return;
      }
      document.getElementById('cancel-step-1').style.display = 'none';
      document.getElementById('cancel-step-2').style.display = '';
      document.getElementById('cancel-continuar').textContent = 'Confirmar cancelamento';
      step = 2;
    } else {
      const digitado  = stripDoc(document.getElementById('cancel-codigo').value.trim());
      const esperado  = stripDoc(r.cpfPagador || '');
      if (!digitado || digitado !== esperado) {
        document.getElementById('cancel-codigo').style.outline = '2px solid var(--red)';
        toast('CPF/CNPJ incorreto. Tente novamente.', 'error');
        return;
      }
      const motivo = document.getElementById('cancel-motivo').value.trim();
      const now = new Date();
      const ts  = `${now.toISOString().slice(0,10)} ${now.toTimeString().slice(0,5)}`;
      r.status = 'cancelada';
      r.cancelamento = { motivo, em: ts, por: State.persona.name, extornoNecessario: temExtrato };
      r.history.push({ when: ts, who: `${State.persona.name} (Comercial)`, what: `Venda cancelada internamente · Motivo: ${motivo}` });
      if (temExtrato) {
        r.history.push({ when: ts, who: 'Sistema', what: 'Extorno pendente · financeiro notificado para devolver o valor ao cliente' });
      }
      closeModal();
      toast(`Venda ${r.id} cancelada`, 'error');
      Router.refresh();
    }
  });
}

function bindVendaCardActions() {
  document.querySelectorAll('[data-pagar-boleto]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const r = findRecord(btn.dataset.pagarBoleto);
      if (!r) return;
      openModal(`Pagar boleto · ${r.nomeCliente}`,
        `<dl class="info-dl" style="margin-bottom:16px">
           <dt>Pré-venda</dt><dd>${r.id}</dd>
           <dt>Cliente</dt>  <dd>${r.nomeCliente}</dd>
           <dt>Valor</dt>    <dd>${fmtMoney(r.valorReal ?? r.valorComprovante)}</dd>
         </dl>
         <div class="form-field">
           <label>Comprovante do pagamento à Porto Seguro <span class="req">*</span></label>
           <input type="file" id="bol-comprovante" accept="image/*,.pdf" style="padding:6px" />
         </div>`,
        `<button class="btn btn-secondary" data-modal-close>Cancelar</button>
         <button class="btn btn-primary" id="confirmar-pag-boleto">Confirmar pagamento</button>`
      );
      document.getElementById('confirmar-pag-boleto').addEventListener('click', () => {
        const input = document.getElementById('bol-comprovante');
        const comp = input.files?.[0]?.name || '';
        if (!comp) { input.style.outline = '2px solid var(--red)'; return; }
        const now = new Date();
        const ts  = `${now.toISOString().slice(0,10)} ${now.toTimeString().slice(0,5)}`;
        r.boleto = { pago: true, pagoEm: ts, comprovante: comp };
        r.status = 'concluida';
        r.history.push({ when: ts, who: `${State.persona.name} (Fase 2)`, what: `Boleto pago à Porto Seguro · ${comp}` });
        closeModal();
        toast(`Boleto pago · ${r.nomeCliente} concluída`, 'success');
        Router.refresh();
      });
    });
  });

  document.querySelectorAll('[data-doc-preview]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const r = findRecord(btn.dataset.docId);
      if (r) openDocModal(r, btn.dataset.docPreview);
    });
  });

  document.querySelectorAll('.check-urgente-row').forEach(chk => {
    chk.addEventListener('change', () => {
      const r = findRecord(chk.dataset.id);
      if (!r) return;
      r.urgente = chk.checked;
      const row = chk.closest('.venda-row');
      if (row) row.classList.toggle('urgente-row', r.urgente);
      toast(r.urgente ? `🚩 ${r.nomeCliente} marcada como urgente` : `Urgência removida · ${r.nomeCliente}`, r.urgente ? 'error' : 'success');
    });
  });

  document.querySelectorAll('[data-reembolso]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.reembolso;
      const r  = findRecord(id);
      if (!r) return;
      const diff = Math.abs(r.valorReal - r.valorComprovante);

      openModal('Solicitar reembolso ao financeiro',
        `<div class="form-grid" style="grid-template-columns:1fr">
          <div class="tag-info" style="margin-bottom:4px">
            <strong>${r.nomeCliente}</strong> pagou ${fmtMoney(r.valorComprovante)}, mas o valor do contrato é ${fmtMoney(r.valorReal)}.
            Diferença a devolver: <strong>${fmtMoney(diff)}</strong>.
          </div>
          <div class="form-field">
            <label>Dados para devolução (chave PIX ou conta do cliente)</label>
            <input type="text" id="reimb-chave" placeholder="Ex: CPF, e-mail ou telefone do cliente" />
          </div>
          <div class="form-field">
            <label>Observação</label>
            <textarea id="reimb-obs" placeholder="Contexto adicional para o financeiro…"></textarea>
          </div>
        </div>`,
        `<button class="btn btn-secondary" data-modal-close>Cancelar</button>
         <button class="btn btn-primary" id="confirmar-reembolso">Enviar chamado</button>`
      );

      document.getElementById('confirmar-reembolso').addEventListener('click', () => {
        const now = new Date();
        const ts  = `${now.toISOString().slice(0,10)} ${now.toTimeString().slice(0,5)}`;
        r.chamadoReembolso = {
          criadoEm: ts,
          chave:    document.getElementById('reimb-chave').value,
          obs:      document.getElementById('reimb-obs').value,
          valor:    diff,
        };
        r.history.push({ when: ts, who: `${State.persona.name} (Comercial)`, what: `Chamado de reembolso aberto para o financeiro · ${fmtMoney(diff)}` });
        closeModal();
        toast(`Chamado enviado ao financeiro · ${fmtMoney(diff)} a devolver`, 'success');
        Router.refresh();
      });
    });
  });
}

/* ==================== EXPORTAR RELATÓRIO ==================== */

function openExportModal(tipo) {
  const hoje = new Date().toISOString().slice(0, 10);
  const mesInicio = hoje.slice(0, 8) + '01';

  const colunasFin   = ['ID', 'Campanha', 'Comercial', 'Vendedor', 'Pagador', 'Cliente', 'Valor Comprovante', 'Valor Real', 'Status', 'Data/Hora', 'Extrato', 'Nº Contrato'];
  const colunasAprov = ['ID', 'Campanha', 'Comercial', 'Cliente', 'Valor Comprovante', 'Valor Real', 'Nº Contrato', 'Status', 'Data/Hora'];
  const colunas = tipo === 'financeiro' ? colunasFin : colunasAprov;

  openModal('Exportar relatório', `
    <div class="export-modal">
      <div class="export-section">
        <div class="export-section-title">Período</div>
        <div class="export-date-row">
          <div class="export-field">
            <label>De</label>
            <input type="date" id="exp-de" value="${mesInicio}" class="filter-input" style="min-width:0" />
          </div>
          <div class="export-field">
            <label>Até</label>
            <input type="date" id="exp-ate" value="${hoje}" class="filter-input" style="min-width:0" />
          </div>
        </div>
      </div>

      <div class="export-section">
        <div class="export-section-title">Status</div>
        <div class="export-status-grid" id="exp-status-grid">
          ${Object.entries(STATUS_LABEL).map(([k, v]) => `
            <label class="export-check">
              <input type="checkbox" value="${k}" checked /> ${v}
            </label>
          `).join('')}
        </div>
      </div>

      <div class="export-section">
        <div class="export-section-title">Colunas incluídas</div>
        <div class="export-cols">${colunas.map(c => `<span class="export-col-tag">${c}</span>`).join('')}</div>
      </div>

      <div class="export-preview" id="exp-preview">
        Calculando registros…
      </div>
    </div>
  `, `
    <button class="btn btn-secondary" data-modal-close>Cancelar</button>
    <button class="btn btn-primary" id="btn-baixar-rel">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Baixar Excel (.csv)
    </button>
  `);

  function getRegistros() {
    const de  = document.getElementById('exp-de').value;
    const ate = document.getElementById('exp-ate').value;
    const statusSel = [...document.querySelectorAll('#exp-status-grid input:checked')].map(i => i.value);
    return RECORDS.filter(r => {
      const data = r.dataHora.slice(0, 10);
      return data >= de && data <= ate && statusSel.includes(r.status);
    });
  }

  function atualizarPreview() {
    const n = getRegistros().length;
    document.getElementById('exp-preview').textContent = `${n} registro${n !== 1 ? 's' : ''} encontrado${n !== 1 ? 's' : ''} com os filtros selecionados`;
  }

  atualizarPreview();
  document.getElementById('exp-de').addEventListener('change', atualizarPreview);
  document.getElementById('exp-ate').addEventListener('change', atualizarPreview);
  document.querySelectorAll('#exp-status-grid input').forEach(i => i.addEventListener('change', atualizarPreview));

  document.getElementById('btn-baixar-rel').addEventListener('click', () => {
    const registros = getRegistros();
    const de  = document.getElementById('exp-de').value;
    const ate = document.getElementById('exp-ate').value;

    const linhas = tipo === 'financeiro'
      ? registros.map(r => [r.id, r.campanhaId, r.gerenteNome, r.nomeVendedor, r.nomePagador, r.nomeCliente,
          r.valorComprovante?.toFixed(2), r.valorReal?.toFixed(2) ?? '',
          STATUS_LABEL[r.status] ?? r.status, r.dataHora,
          r.extrato ? 'Sim' : 'Não', r.contrato?.numContrato ?? ''].join(';'))
      : registros.map(r => [r.id, r.campanhaId, r.gerenteNome, r.nomeCliente,
          r.valorComprovante?.toFixed(2), r.valorReal?.toFixed(2) ?? '',
          r.contrato?.numContrato ?? '', STATUS_LABEL[r.status] ?? r.status, r.dataHora].join(';'));

    const cabecalho = (tipo === 'financeiro' ? colunasFin : colunasAprov).join(';');
    const csv = '﻿' + cabecalho + '\n' + linhas.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `relatorio_${tipo}_${de}_${ate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    closeModal();
    toast(`Relatório exportado · ${registros.length} registros`, 'success');
  });
}

function bindExportBtn(idBtn, tipo) {
  const btn = document.getElementById(idBtn);
  if (btn) btn.addEventListener('click', () => openExportModal(tipo));
}
