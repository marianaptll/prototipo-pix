/* =========================================================
   Hash router
   ========================================================= */

const Router = {
  routes: {
    'login':             { render: () => Screens.login(),            bind: () => Screens.loginBind(),           public: true },
    'campanha':          { render: () => Screens.campaign(),         bind: () => Screens.campaignBind() },
    // Gerente
    'nova-prevenda':     { render: () => Screens.novaPrevenda(),     bind: () => Screens.novaPrevendaBind() },
    'minhas-vendas':     { render: () => Screens.minhasVendas(),     bind: () => Screens.minhasVendasBind() },
    'vendas-concluidas': { render: () => Screens.vendasConcluidas(), bind: () => Screens.vendasConcluidasBind() },
    // Financeiro
    'dashboard':         { render: () => Screens.dashboard(),        bind: () => Screens.dashboardBind() },
    'importar-extrato':  { render: () => Screens.importarExtrato(),  bind: () => Screens.importarExtratoBind() },
    'conciliacao':       { render: () => Screens.conciliacao(),      bind: () => Screens.conciliacaoBind() },
    // Aprovação de Cota
    'aprovacoes':        { render: () => Screens.aprovacoes(),       bind: () => Screens.aprovacoesBind() },
    'campanhas':         { render: () => Screens.campanhas(),        bind: () => Screens.campanhasBind() },
  },

  current: 'login',

  start() {
    window.addEventListener('hashchange', () => this.handle());
    this.handle();
  },

  handle() {
    const hash = location.hash.replace(/^#\//, '') || 'login';
    const [route, ...rest] = hash.split('/');

    if (!State.persona && route !== 'login') {
      location.hash = '#/login';
      return;
    }

    // Detalhe de pré-venda: #/ver-venda/<id>
    if (route === 'ver-venda' && rest[0]) {
      this.current = 'ver-venda';
      document.getElementById('app').innerHTML = Screens.verVenda(rest[0]);
      Screens.verVendaBind && Screens.verVendaBind(rest[0]);
      this.bindGlobalShellActions();
      window.scrollTo(0, 0);
      return;
    }

    // Enviar contrato: #/enviar-contrato/<id>
    if (route === 'enviar-contrato' && rest[0]) {
      this.current = 'enviar-contrato';
      document.getElementById('app').innerHTML = Screens.enviarContrato(rest[0]);
      Screens.enviarContratoBind && Screens.enviarContratoBind(rest[0]);
      this.bindGlobalShellActions();
      window.scrollTo(0, 0);
      return;
    }

    // Enviar complemento (diferença): #/enviar-complemento/<id>
    if (route === 'enviar-complemento' && rest[0]) {
      this.current = 'enviar-complemento';
      document.getElementById('app').innerHTML = Screens.enviarComplemento(rest[0]);
      Screens.enviarComplementoBind && Screens.enviarComplementoBind(rest[0]);
      this.bindGlobalShellActions();
      window.scrollTo(0, 0);
      return;
    }

    const r = this.routes[route];
    if (!r) {
      const home = this._homeRoute();
      location.hash = '#/' + home;
      return;
    }

    // Restrições por perfil
    const role = State.persona
      ? (State.persona.role === 'Gerente de Vendas' ? 'gerente' : State.persona.id)
      : null;

    const gerenteOnly   = ['nova-prevenda', 'minhas-vendas', 'vendas-concluidas'];
    const financeiroOnly = ['dashboard', 'importar-extrato', 'conciliacao'];
    const aprovOnly      = ['aprovacoes', 'campanhas'];

    if (role === 'gerente'       && (financeiroOnly.includes(route) || aprovOnly.includes(route))) {
      location.hash = '#/minhas-vendas'; return;
    }
    if (role === 'financeiro'    && (gerenteOnly.includes(route)    || aprovOnly.includes(route))) {
      location.hash = '#/dashboard'; return;
    }
    if (role === 'backoffice_adm' && (gerenteOnly.includes(route)   || financeiroOnly.includes(route))) {
      location.hash = '#/aprovacoes'; return;
    }

    this.current = route;
    document.getElementById('app').innerHTML = r.render();
    r.bind && r.bind();
    if (!r.public) this.bindGlobalShellActions();
    window.scrollTo(0, 0);
  },

  _homeRoute() {
    if (!State.persona) return 'login';
    const role = State.persona.role === 'Gerente de Vendas' ? 'gerente' : State.persona.id;
    if (role === 'gerente')       return 'minhas-vendas';
    if (role === 'financeiro')    return 'dashboard';
    return 'aprovacoes';
  },

  refresh() {
    this.handle();
  },

  bindGlobalShellActions() {
    document.querySelectorAll('[data-action="switch-persona"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.persona;
        const p = PERSONAS.find(x => x.id === id);
        State.setPersona(p);
        const home = this._homeRoute();
        location.hash = '#/' + home;
        if (location.hash === '#/' + home) this.refresh();
        toast(`Perfil: ${p.role}`, 'success');
      });
    });
    document.querySelectorAll('[data-action="switch-role-gerente"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (State.persona && State.persona.role === 'Gerente de Vendas') return;
        const p = PERSONAS.find(x => x.id === 'g1');
        State.setPersona(p);
        location.hash = '#/minhas-vendas';
        if (location.hash === '#/minhas-vendas') this.refresh();
        toast(`Perfil: Gerente de Vendas`, 'success');
      });
    });
    document.querySelectorAll('[data-action="logout"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        State.logout();
        location.hash = '#/login';
      });
    });
  },
};
