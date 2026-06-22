/* =========================================================
   Mock data — Porto Vale Pré-Venda PIX
   ========================================================= */

const SUPERINTENDENCIAS = [
  { id: 'lotus',  name: 'Lótus'  },
  { id: 'eagles', name: 'Eagles' },
];

const DIRETORIAS = [
  { id: 'fenix',     name: 'Fênix',         superid: 'lotus'  },
  { id: 'diamantes', name: 'Diamantes',     superid: 'lotus'  },
  { id: 'atena',     name: 'Atena',         superid: 'lotus'  },
  { id: 'anjos',     name: 'Anjos',         superid: 'lotus'  },
  { id: 'groove',    name: 'Groove',        superid: 'lotus'  },
  { id: 'aya',       name: 'Aya',           superid: 'eagles' },
  { id: 'quimera',   name: 'Quimera',       superid: 'eagles' },
  { id: 'bell',      name: 'Bell Breakers', superid: 'eagles' },
  { id: 'dunamis',   name: 'Dunamis',       superid: 'eagles' },
];

// 45 gerentes — 5 por diretoria
const MANAGERS = [
  // Lótus › Fênix
  { id: 'g1',  name: 'Carlos Mendes',      superid: 'lotus',  dirid: 'fenix'     },
  { id: 'g5',  name: 'Fernanda Lima',      superid: 'lotus',  dirid: 'fenix'     },
  { id: 'g6',  name: 'Ricardo Souza',      superid: 'lotus',  dirid: 'fenix'     },
  { id: 'g7',  name: 'Marcos Figueiredo',  superid: 'lotus',  dirid: 'fenix'     },
  { id: 'g8',  name: 'Daniela Rocha',      superid: 'lotus',  dirid: 'fenix'     },
  // Lótus › Diamantes
  { id: 'g2',  name: 'Juliana Faria',      superid: 'lotus',  dirid: 'diamantes' },
  { id: 'g9',  name: 'Rafael Alves',       superid: 'lotus',  dirid: 'diamantes' },
  { id: 'g10', name: 'Carolina Pires',     superid: 'lotus',  dirid: 'diamantes' },
  { id: 'g11', name: 'Thiago Santos',      superid: 'lotus',  dirid: 'diamantes' },
  { id: 'g12', name: 'Amanda Melo',        superid: 'lotus',  dirid: 'diamantes' },
  // Lótus › Atena
  { id: 'g3',  name: 'Eduardo Pinho',      superid: 'lotus',  dirid: 'atena'     },
  { id: 'g13', name: 'Lucas Vieira',       superid: 'lotus',  dirid: 'atena'     },
  { id: 'g14', name: 'Beatriz Campos',     superid: 'lotus',  dirid: 'atena'     },
  { id: 'g15', name: 'Henrique Nunes',     superid: 'lotus',  dirid: 'atena'     },
  { id: 'g16', name: 'Sofia Martins',      superid: 'lotus',  dirid: 'atena'     },
  // Lótus › Anjos
  { id: 'g4',  name: 'Renata Sales',       superid: 'lotus',  dirid: 'anjos'     },
  { id: 'g17', name: 'Felipe Ramos',       superid: 'lotus',  dirid: 'anjos'     },
  { id: 'g18', name: 'Larissa Ferreira',   superid: 'lotus',  dirid: 'anjos'     },
  { id: 'g19', name: 'Bruno Teixeira',     superid: 'lotus',  dirid: 'anjos'     },
  { id: 'g20', name: 'Vanessa Oliveira',   superid: 'lotus',  dirid: 'anjos'     },
  // Lótus › Groove
  { id: 'g21', name: 'Otávio Cunha',       superid: 'lotus',  dirid: 'groove'    },
  { id: 'g22', name: 'Isabela Moreira',    superid: 'lotus',  dirid: 'groove'    },
  { id: 'g23', name: 'Caio Barros',        superid: 'lotus',  dirid: 'groove'    },
  { id: 'g24', name: 'Priscila Gomes',     superid: 'lotus',  dirid: 'groove'    },
  { id: 'g25', name: 'Rodrigo Carvalho',   superid: 'lotus',  dirid: 'groove'    },
  // Eagles › Aya
  { id: 'g26', name: 'Aline Nascimento',   superid: 'eagles', dirid: 'aya'       },
  { id: 'g27', name: 'Diego Monteiro',     superid: 'eagles', dirid: 'aya'       },
  { id: 'g28', name: 'Tatiane Araújo',     superid: 'eagles', dirid: 'aya'       },
  { id: 'g29', name: 'Victor Correia',     superid: 'eagles', dirid: 'aya'       },
  { id: 'g30', name: 'Mônica Freitas',     superid: 'eagles', dirid: 'aya'       },
  // Eagles › Quimera
  { id: 'g31', name: 'André Silveira',     superid: 'eagles', dirid: 'quimera'   },
  { id: 'g32', name: 'Débora Pereira',     superid: 'eagles', dirid: 'quimera'   },
  { id: 'g33', name: 'Gustavo Moura',      superid: 'eagles', dirid: 'quimera'   },
  { id: 'g34', name: 'Ingrid Borges',      superid: 'eagles', dirid: 'quimera'   },
  { id: 'g35', name: 'Leonardo Lima',      superid: 'eagles', dirid: 'quimera'   },
  // Eagles › Bell Breakers
  { id: 'g36', name: 'Kamila Ribeiro',     superid: 'eagles', dirid: 'bell'      },
  { id: 'g37', name: 'Fábio Azevedo',      superid: 'eagles', dirid: 'bell'      },
  { id: 'g38', name: 'Natália Cavalcanti', superid: 'eagles', dirid: 'bell'      },
  { id: 'g39', name: 'Sérgio Paiva',       superid: 'eagles', dirid: 'bell'      },
  { id: 'g40', name: 'Juliane Matos',      superid: 'eagles', dirid: 'bell'      },
  // Eagles › Dunamis
  { id: 'g41', name: 'Paulo Caixeta',      superid: 'eagles', dirid: 'dunamis'   },
  { id: 'g42', name: 'Adriana Lopes',      superid: 'eagles', dirid: 'dunamis'   },
  { id: 'g43', name: 'Roberto Vieira',     superid: 'eagles', dirid: 'dunamis'   },
  { id: 'g44', name: 'Simone Queiroz',     superid: 'eagles', dirid: 'dunamis'   },
  { id: 'g45', name: 'Tiago Rodrigues',    superid: 'eagles', dirid: 'dunamis'   },
];

// Login personas — 1 gerente representativo por diretoria + operacional
const PERSONAS = [
  // ── Lótus ──
  { id: 'g1',  role: 'Comercial', name: 'Carlos Mendes',    initials: 'CM', superid: 'lotus',  dirid: 'fenix',     description: 'Diretoria Fênix · Lótus'          },
  { id: 'g2',  role: 'Comercial', name: 'Juliana Faria',    initials: 'JF', superid: 'lotus',  dirid: 'diamantes', description: 'Diretoria Diamantes · Lótus'      },
  { id: 'g3',  role: 'Comercial', name: 'Eduardo Pinho',    initials: 'EP', superid: 'lotus',  dirid: 'atena',     description: 'Diretoria Atena · Lótus'          },
  { id: 'g4',  role: 'Comercial', name: 'Renata Sales',     initials: 'RS', superid: 'lotus',  dirid: 'anjos',     description: 'Diretoria Anjos · Lótus'          },
  { id: 'g21', role: 'Comercial', name: 'Otávio Cunha',     initials: 'OC', superid: 'lotus',  dirid: 'groove',    description: 'Diretoria Groove · Lótus'         },
  // ── Eagles ──
  { id: 'g26', role: 'Comercial', name: 'Aline Nascimento', initials: 'AN', superid: 'eagles', dirid: 'aya',       description: 'Diretoria Aya · Eagles'           },
  { id: 'g31', role: 'Comercial', name: 'André Silveira',   initials: 'AS', superid: 'eagles', dirid: 'quimera',   description: 'Diretoria Quimera · Eagles'       },
  { id: 'g36', role: 'Comercial', name: 'Kamila Ribeiro',   initials: 'KR', superid: 'eagles', dirid: 'bell',      description: 'Diretoria Bell Breakers · Eagles' },
  { id: 'g41', role: 'Comercial', name: 'Paulo Caixeta',    initials: 'PC', superid: 'eagles', dirid: 'dunamis',   description: 'Diretoria Dunamis · Eagles'       },
  // ── Operacional ──
  { id: 'financeiro',     role: 'Fase 1', name: 'Marcelo Tavares', initials: 'MT', description: 'Importa extrato bancário e vincula valores'       },
  { id: 'backoffice_adm', role: 'Fase 2', name: 'Patrícia Lopes',  initials: 'PL', description: 'Confere vendas prontas e paga boletos para Porto Seguro' },
  { id: 'fase3',          role: 'Fase 3', name: 'Roberta Lima',     initials: 'RL', description: 'Gestão de cobranças pendentes e devoluções ao cliente'   },
];

const CAMPAIGNS = [
  {
    id: 'CMP-2026-08',
    name: 'Acelera Agosto 2026',
    start: '2026-07-28',
    launch: '2026-08-15',
    status: 'Ativa',
  },
];

/*
  Status flow:
    aguardando_financeiro  → gerente subiu comprovante, financeiro ainda não vinculou extrato
    aguardando_contrato    → extrato vinculado, gerente precisa enviar contrato
    pronto                 → comprovante + extrato + contrato OK, esperando Aprovação de Cota
    concluida              → cota lançada e venda encerrada
*/

let RECORDS = [
  // ─────────────────────────────────────────────────────────────────
  //  Cada registro representa UMA situação distinta do fluxo.
  //  Use os filtros e telas para ver cada estado em ação.
  // ─────────────────────────────────────────────────────────────────

  // 1. AGUARDANDO EXTRATO — comprovante enviado, financeiro ainda não vinculou
  //    Login: Carlos (g1)  |  Fase 1: aparece em "sem extrato" / conciliação
  {
    id: 'PV-001',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g1',
    gerenteNome: 'Carlos Mendes',
    nomeVendedor: 'Carlos Mendes',
    nomePagador: 'João da Silva',
    nomeCliente: 'João da Silva',
    mesmoNomeContrato: true,
    urgente: true,
    motivoDiferenca: '',
    valorComprovante: 1240.00,
    dataHora: '2026-06-08 14:32',
    comprovante: { fileName: 'pix_joao_silva.pdf', uploadedAt: '2026-06-08 14:45' },
    observacao: '',
    status: 'aguardando_financeiro',
    extrato: null,
    valorReal: null,
    contrato: null,
    history: [
      { when: '2026-06-08 14:45', who: 'Carlos (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
    ],
  },
  // 2. AGUARDANDO CONTRATO — extrato auto-vinculado, gerente deve enviar contrato
  //    Login: Carlos (g1)
  {
    id: 'PV-002',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g1',
    gerenteNome: 'Carlos Mendes',
    nomeVendedor: 'Carlos Mendes',
    nomePagador: 'Maria Oliveira',
    cpfPagador: '321.456.789-00',
    nomeCliente: 'Maria Oliveira',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 980.00,
    dataHora: '2026-06-03 15:18',
    comprovante: { fileName: 'pix_maria_oliveira.jpg', uploadedAt: '2026-06-03 15:25' },
    observacao: '',
    status: 'aguardando_contrato',
    extrato: { remetente: 'MARIA OLIVEIRA', valor: 980.00, dataHora: '2026-06-03 15:18', tipo: 'auto' },
    valorReal: null,
    contrato: null,
    history: [
      { when: '2026-06-03 15:25', who: 'Carlos (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-04 09:00', who: 'Sistema', what: 'PIX vinculado automaticamente ao extrato bancário · R$ 980,00' },
    ],
  },

  // 3. DIFERENÇA PENDENTE (faltou pagar) — cliente pagou menos que o contrato
  //    Ação: Comercial precisa enviar comprovante complementar
  //    Login: Carlos (g1)  |  Fase 3: aparece em "Diferença pendente"
  {
    id: 'PV-003',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g1',
    gerenteNome: 'Carlos Mendes',
    nomeVendedor: 'Carlos Mendes',
    nomePagador: 'Bruno Costa',
    cpfPagador: '456.789.123-00',
    nomeCliente: 'Bruno Costa',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1180.00,
    dataHora: '2026-06-04 09:48',
    comprovante: { fileName: 'pix_bruno_costa.pdf', uploadedAt: '2026-06-04 10:02' },
    observacao: '',
    status: 'diferenca_pendente',
    extrato: { remetente: 'BRUNO COSTA', valor: 1180.00, dataHora: '2026-06-04 09:48', tipo: 'auto' },
    valorReal: 1260.00,
    contrato: { fileName: 'contrato_bruno.pdf', uploadedAt: '2026-06-05 16:30', numContrato: '0894' },
    comprovanteComplementar: null,
    chamadoReembolso: null,
    history: [
      { when: '2026-06-04 10:02', who: 'Carlos (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-04 14:00', who: 'Sistema', what: 'PIX vinculado automaticamente ao extrato · R$ 1.180,00' },
      { when: '2026-06-05 16:30', who: 'Carlos (Comercial)', what: 'Contrato enviado · valor real R$ 1.260,00 · Contrato 0894' },
      { when: '2026-06-05 16:30', who: 'Sistema', what: 'Diferença detectada · cliente pagou R$ 1.180,00 mas contrato exige R$ 1.260,00 · aguardando comprovante complementar de R$ 80,00' },
    ],
  },

  // 4. DIFERENÇA PENDENTE (pagou a mais) + PAGADOR ≠ TITULAR
  //    Ação: Comercial precisa abrir chamado de reembolso
  //    Login: Renata (g4)  |  Fase 3: aparece em "A devolver ao cliente"
  {
    id: 'PV-004',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g4',
    gerenteNome: 'Renata Sales',
    nomeVendedor: 'Fernanda Dias',
    nomePagador: 'Helena Souza',
    cpfPagador: '654.321.987-00',
    nomeCliente: 'Pedro Souza',
    mesmoNomeContrato: false,
    motivoDiferenca: 'Mãe comprando para o filho',
    valorComprovante: 1000.00,
    dataHora: '2026-06-05 10:11',
    comprovante: { fileName: 'pix_helena_souza.pdf', uploadedAt: '2026-06-05 10:20' },
    observacao: 'Helena Souza (mãe) pagou em nome de Pedro Souza (filho)',
    status: 'diferenca_pendente',
    extrato: { remetente: 'HELENA SOUZA', valor: 1000.00, dataHora: '2026-06-05 10:11', tipo: 'manual' },
    valorReal: 950.00,
    contrato: { fileName: 'contrato_pedro_souza.pdf', uploadedAt: '2026-06-06 09:55', numContrato: '0896' },
    comprovanteComplementar: null,
    chamadoReembolso: null,
    history: [
      { when: '2026-06-05 10:20', who: 'Renata (Comercial)', what: 'Pré-venda criada · pagador ≠ titular (mãe → filho)' },
      { when: '2026-06-05 15:00', who: 'Marcelo (Fase 1)', what: 'PIX vinculado manualmente · remetente: Helena Souza · R$ 1.000,00' },
      { when: '2026-06-06 09:55', who: 'Renata (Comercial)', what: 'Contrato enviado · Contrato 0896' },
      { when: '2026-06-06 09:55', who: 'Sistema', what: 'Pagamento excede o valor do contrato · R$ 50,00 a devolver ao cliente · aguardando abertura de chamado' },
    ],
  },

  // 5. PRONTO — diferença pequena absorvida pela Porto Vale (≤ R$5)
  //    Login: Juliana (g2)  |  Fase 2: aparece em "Prontas para remessa"
  //    Fase 3: aparece em "Porto Vale cobriu"
  {
    id: 'PV-005',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g2',
    gerenteNome: 'Juliana Faria',
    nomeVendedor: 'Ana Paula Reis',
    nomePagador: 'Ana Beatriz Souza',
    cpfPagador: '789.123.456-00',
    nomeCliente: 'Ana Beatriz Souza',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1350.00,
    dataHora: '2026-06-07 11:05',
    comprovante: { fileName: 'pix_ana_beatriz.pdf', uploadedAt: '2026-06-07 11:15' },
    observacao: '',
    status: 'pronto',
    extrato: { remetente: 'ANA BEATRIZ SOUZA', valor: 1350.00, dataHora: '2026-06-07 11:05', tipo: 'auto' },
    valorReal: 1355.00,
    contrato: { fileName: 'contrato_ana_beatriz.pdf', uploadedAt: '2026-06-08 10:40', numContrato: '0901' },
    diferencaAbsorvida: { valor: 5.00, absorvidaEm: '2026-06-08 10:40' },
    history: [
      { when: '2026-06-07 11:15', who: 'Juliana (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-07 16:00', who: 'Sistema', what: 'PIX vinculado automaticamente ao extrato · R$ 1.350,00' },
      { when: '2026-06-08 10:40', who: 'Juliana (Comercial)', what: 'Contrato enviado · valor real R$ 1.355,00 · Contrato 0901' },
      { when: '2026-06-08 10:40', who: 'Sistema', what: 'Diferença de R$ 5,00 absorvida pela Porto Vale · venda pronta para aprovação' },
    ],
  },

  // 6. PRONTO — fluxo normal, sem diferença
  //    Login: Eduardo (g3)  |  Fase 2: aparece em "Prontas para remessa"
  {
    id: 'PV-006',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g3',
    gerenteNome: 'Eduardo Pinho',
    nomeVendedor: 'Lucas Ferreira',
    nomePagador: 'Carla Fontana',
    cpfPagador: '112.233.445-56',
    nomeCliente: 'Carla Fontana',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1380.00,
    dataHora: '2026-06-07 14:40',
    comprovante: { fileName: 'pix_carla_fontana.pdf', uploadedAt: '2026-06-07 14:50' },
    observacao: '',
    status: 'pronto',
    extrato: { remetente: 'CARLA FONTANA', valor: 1380.00, dataHora: '2026-06-07 14:40', tipo: 'auto' },
    valorReal: 1380.00,
    contrato: { fileName: 'contrato_carla_fontana.pdf', uploadedAt: '2026-06-08 09:00', numContrato: '0910' },
    history: [
      { when: '2026-06-07 14:50', who: 'Eduardo (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-08 09:00', who: 'Sistema', what: 'PIX vinculado automaticamente ao extrato · R$ 1.380,00' },
      { when: '2026-06-08 09:00', who: 'Eduardo (Comercial)', what: 'Contrato enviado · Contrato 0910' },
      { when: '2026-06-08 09:00', who: 'Sistema', what: 'Comprovante, extrato e contrato confirmados · pronto para aprovação de cota' },
    ],
  },

  // 7. CONCLUÍDA — boleto pago à Porto Seguro
  //    Login: Otávio (g21)  |  Fase 2: aparece em "Concluídas"
  {
    id: 'PV-007',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g21',
    gerenteNome: 'Otávio Cunha',
    nomeVendedor: 'Otávio Cunha',
    nomePagador: 'Ricardo Alves',
    cpfPagador: '223.344.556-67',
    nomeCliente: 'Ricardo Alves',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1120.00,
    dataHora: '2026-06-02 09:30',
    comprovante: { fileName: 'pix_ricardo_alves.pdf', uploadedAt: '2026-06-02 09:42' },
    observacao: '',
    status: 'concluida',
    extrato: { remetente: 'RICARDO ALVES', valor: 1120.00, dataHora: '2026-06-02 09:30', tipo: 'auto' },
    valorReal: 1120.00,
    contrato: { fileName: 'contrato_ricardo_alves.pdf', uploadedAt: '2026-06-03 14:20', numContrato: '0887' },
    boleto: { pago: true, pagoEm: '2026-06-04 09:00', comprovante: 'boleto_pv007.pdf' },
    history: [
      { when: '2026-06-02 09:42', who: 'Otávio (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-02 15:00', who: 'Sistema', what: 'PIX vinculado automaticamente ao extrato · R$ 1.120,00' },
      { when: '2026-06-03 14:20', who: 'Otávio (Comercial)', what: 'Contrato enviado · Contrato 0887' },
      { when: '2026-06-03 14:20', who: 'Sistema', what: 'Comprovante, extrato e contrato confirmados · pronto para aprovação de cota' },
      { when: '2026-06-04 09:00', who: 'Patrícia (Fase 2)', what: 'Boleto pago à Porto Seguro · boleto_pv007.pdf' },
    ],
  },

  // 8. CANCELADA sem extorno — cancelada antes de vincular extrato
  //    Login: Aline (g26)
  {
    id: 'PV-008',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g26',
    gerenteNome: 'Aline Nascimento',
    nomeVendedor: 'Aline Nascimento',
    nomePagador: 'Felipe Drummond',
    cpfPagador: '334.455.667-78',
    nomeCliente: 'Felipe Drummond',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1560.00,
    dataHora: '2026-06-05 11:00',
    comprovante: { fileName: 'pix_felipe_drummond.pdf', uploadedAt: '2026-06-05 11:12' },
    observacao: '',
    status: 'cancelada',
    extrato: null,
    valorReal: null,
    contrato: null,
    cancelamento: { motivo: 'Cliente desistiu — não tem mais interesse no consórcio', em: '2026-06-05 14:30', por: 'Aline Nascimento', extornoNecessario: false },
    history: [
      { when: '2026-06-05 11:12', who: 'Aline (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-05 14:30', who: 'Aline (Comercial)', what: 'Venda cancelada internamente · Motivo: Cliente desistiu — não tem mais interesse no consórcio' },
    ],
  },

  // 9. CANCELADA com extorno — cancelada após PIX já vinculado ao extrato
  //    Login: André (g31)  |  Fase 3: aparece em "Extornos de cancelamento"
  //    Fase 1: exibe aviso de extorno pendente
  {
    id: 'PV-009',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g31',
    gerenteNome: 'André Silveira',
    nomeVendedor: 'André Silveira',
    nomePagador: 'Juliana Castro',
    cpfPagador: '445.566.778-89',
    nomeCliente: 'Juliana Castro',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1050.00,
    dataHora: '2026-06-01 13:30',
    comprovante: { fileName: 'pix_juliana_castro.pdf', uploadedAt: '2026-06-01 13:42' },
    observacao: '',
    status: 'cancelada',
    extrato: { remetente: 'JULIANA CASTRO', valor: 1050.00, dataHora: '2026-06-01 13:30', tipo: 'auto' },
    valorReal: null,
    contrato: null,
    cancelamento: { motivo: 'Contrato recusado pela seguradora · CPF com restrição interna', em: '2026-06-03 10:15', por: 'André Silveira', extornoNecessario: true },
    history: [
      { when: '2026-06-01 13:42', who: 'André (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-01 18:00', who: 'Sistema', what: 'PIX vinculado automaticamente ao extrato · R$ 1.050,00' },
      { when: '2026-06-03 10:15', who: 'André (Comercial)', what: 'Venda cancelada internamente · Motivo: Contrato recusado pela seguradora · CPF com restrição interna' },
      { when: '2026-06-03 10:15', who: 'Sistema', what: 'Extorno pendente · financeiro notificado para devolver o valor ao cliente' },
    ],
  },

  // 10. AGUARDANDO CONTRATO — urgente, de outra superintendência (Eagles)
  //     Demonstra filtros de hierarquia (Supt / Diretoria / Comercial) e urgência
  //     Login: Kamila (g36)
  {
    id: 'PV-010',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g36',
    gerenteNome: 'Kamila Ribeiro',
    nomeVendedor: 'Kamila Ribeiro',
    nomePagador: 'Tatiana Lima',
    cpfPagador: '556.677.889-90',
    nomeCliente: 'Tatiana Lima',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    urgente: true,
    valorComprovante: 1300.00,
    dataHora: '2026-06-08 16:00',
    comprovante: { fileName: 'pix_tatiana_lima.jpg', uploadedAt: '2026-06-08 16:10' },
    observacao: 'Cliente com prazo apertado para fechar',
    status: 'aguardando_contrato',
    extrato: { remetente: 'TATIANA LIMA', valor: 1300.00, dataHora: '2026-06-08 16:00', tipo: 'manual' },
    valorReal: null,
    contrato: null,
    history: [
      { when: '2026-06-08 16:10', who: 'Kamila (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-09 09:00', who: 'Marcelo (Fase 1)', what: 'PIX vinculado manualmente · R$ 1.300,00' },
      { when: '2026-06-09 09:05', who: 'Marcelo (Fase 1)', what: 'Marcado como urgente' },
    ],
  },
];


// Histórico de extratos importados
let EXTRATO_HISTORY = [
  {
    id: 'EXT-001',
    fileName: 'extrato_03_junho.pdf',
    importedAt: '2026-06-04 08:45',
    importedBy: 'Marcelo Tavares',
    autoLinked: 3,
    pending: 1,
    entries: [
      { remetente: 'MARIA OLIVEIRA',  valor: 980.00,  dataHora: '2026-06-03 15:18', vinculadoId: 'PV-002', vinculadoNome: 'Maria Oliveira',  status: 'auto'    },
      { remetente: 'RICARDO ALVES',   valor: 1120.00, dataHora: '2026-06-02 09:30', vinculadoId: 'PV-007', vinculadoNome: 'Ricardo Alves',   status: 'auto'    },
      { remetente: 'JULIANA CASTRO',  valor: 1050.00, dataHora: '2026-06-01 13:30', vinculadoId: 'PV-009', vinculadoNome: 'Juliana Castro',  status: 'auto'    },
      { remetente: 'FERNANDA COUTO',  valor: 1200.00, dataHora: '2026-06-06 15:44', vinculadoId: null,     vinculadoNome: null,              status: 'pending' },
    ],
  },
  {
    id: 'EXT-002',
    fileName: 'extrato_07_junho.pdf',
    importedAt: '2026-06-08 09:10',
    importedBy: 'Marcelo Tavares',
    autoLinked: 3,
    pending: 1,
    entries: [
      { remetente: 'ANA BEATRIZ SOUZA', valor: 1350.00, dataHora: '2026-06-07 11:05', vinculadoId: 'PV-005', vinculadoNome: 'Ana Beatriz Souza', status: 'auto'   },
      { remetente: 'CARLA FONTANA',     valor: 1380.00, dataHora: '2026-06-07 14:40', vinculadoId: 'PV-006', vinculadoNome: 'Carla Fontana',     status: 'auto'   },
      { remetente: 'TATIANA LIMA',      valor: 1300.00, dataHora: '2026-06-08 16:00', vinculadoId: 'PV-010', vinculadoNome: 'Tatiana Lima',      status: 'manual' },
      { remetente: 'SERGIO PINTO',      valor: 1750.00, dataHora: '2026-06-08 08:55', vinculadoId: null,     vinculadoNome: null,                status: 'pending'},
    ],
  },
];

// PIX no extrato sem pré-venda correspondente (usados na tela de Conciliação)
let EXTRATO_ORPHANS = [
  { id: 'E-100', remetente: 'FERNANDA COUTO', valor: 1200.00, dataHora: '2026-06-06 15:44', chavePix: '(não disponível)' },
  { id: 'E-101', remetente: 'SERGIO PINTO',   valor: 1750.00, dataHora: '2026-06-08 08:55', chavePix: '(não disponível)' },
];

const STATUS_CHIP = {
  'aguardando_financeiro': 'chip-amber',
  'aguardando_contrato':   'chip-blue',
  'diferenca_pendente':    'chip-orange',
  'pronto':                'chip-green',
  'concluida':             'chip-teal',
  'cancelada':             'chip-red',
};

const STATUS_LABEL = {
  'aguardando_financeiro': 'Aguardando extrato',
  'aguardando_contrato':   'Aguardando contrato',
  'diferenca_pendente':    'Diferença pendente',
  'pronto':                'Pronto para aprovação',
  'concluida':             'Concluída',
  'cancelada':             'Cancelada',
};
