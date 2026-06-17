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
  { id: 'backoffice_adm', role: 'Fase 2', name: 'Patrícia Lopes',  initials: 'PL', description: 'Confere vendas prontas e fecha remessa para Porto Seguro' },
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

let REMESSAS = [];

let RECORDS = [
  // ── Carlos (g1 · Fênix / Lótus) ──
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
  {
    id: 'PV-002',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g1',
    gerenteNome: 'Carlos Mendes',
    nomeVendedor: 'Carlos Mendes',
    nomePagador: 'Maria Oliveira',
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
      { when: '2026-06-04 09:00', who: 'Sistema',          what: 'PIX vinculado automaticamente ao extrato bancário · R$ 980,00' },
      { when: '2026-06-04 09:00', who: 'Sistema',          what: 'Aguardando envio do contrato pelo gerente' },
    ],
  },
  {
    id: 'PV-003',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g1',
    gerenteNome: 'Carlos Mendes',
    nomeVendedor: 'Carlos Mendes',
    nomePagador: 'Bruno Costa',
    nomeCliente: 'Bruno Costa',
    mesmoNomeContrato: true,
    urgente: true,
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
      { when: '2026-06-04 14:00', who: 'Sistema',          what: 'PIX vinculado ao extrato · R$ 1.180,00' },
      { when: '2026-06-05 16:30', who: 'Carlos (Comercial)', what: 'Contrato enviado · valor real R$ 1.260 · Contrato 0894' },
      { when: '2026-06-05 16:30', who: 'Sistema',          what: 'Diferença detectada · cliente pagou R$ 1.180 mas contrato exige R$ 1.260 · aguardando comprovante complementar de R$ 80,00' },
    ],
  },
  {
    id: 'PV-011',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g1',
    gerenteNome: 'Carlos Mendes',
    nomeVendedor: 'Carlos Mendes',
    nomePagador: 'Ana Beatriz Souza',
    nomeCliente: 'Ana Beatriz Souza',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1350.00,
    dataHora: '2026-06-07 11:05',
    comprovante: { fileName: 'pix_ana_beatriz.pdf', uploadedAt: '2026-06-07 11:15' },
    observacao: '',
    status: 'pronto',
    extrato: { remetente: 'ANA BEATRIZ SOUZA', valor: 1350.00, dataHora: '2026-06-07 11:05', tipo: 'auto' },
    valorReal: 1350.00,
    contrato: { fileName: 'contrato_ana_beatriz.pdf', uploadedAt: '2026-06-08 10:40', numContrato: '0901' },
    history: [
      { when: '2026-06-07 11:15', who: 'Carlos (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-07 16:00', who: 'Sistema',          what: 'PIX vinculado automaticamente ao extrato · R$ 1.350,00' },
      { when: '2026-06-08 10:40', who: 'Carlos (Comercial)', what: 'Contrato enviado · valor real R$ 1.350,00 · Contrato 0901' },
      { when: '2026-06-08 10:40', who: 'Sistema',          what: 'Comprovante, extrato e contrato confirmados · pronto para aprovação de cota' },
    ],
  },
  {
    id: 'PV-012',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g1',
    gerenteNome: 'Carlos Mendes',
    nomeVendedor: 'Carlos Mendes',
    nomePagador: 'Ricardo Alves',
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
    history: [
      { when: '2026-06-02 09:42', who: 'Carlos (Comercial)',     what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-02 15:00', who: 'Sistema',              what: 'PIX vinculado automaticamente ao extrato · R$ 1.120,00' },
      { when: '2026-06-03 14:20', who: 'Carlos (Comercial)',     what: 'Contrato enviado · Contrato 0887' },
      { when: '2026-06-04 09:00', who: 'Patrícia (Fase 2)', what: 'Contrato 0887 lançado na administradora · venda concluída' },
    ],
  },

  // ── Juliana (g2 · Diamantes / Lótus) ──
  {
    id: 'PV-004',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g2',
    gerenteNome: 'Juliana Faria',
    nomeVendedor: 'Ana Paula Reis',
    nomePagador: 'Roberta Almeida',
    nomeCliente: 'Roberta Almeida',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1400.00,
    dataHora: '2026-06-04 11:22',
    comprovante: { fileName: 'pix_roberta.pdf', uploadedAt: '2026-06-04 11:30' },
    observacao: 'Cliente ligou confirmando pagamento',
    status: 'aguardando_financeiro',
    extrato: null,
    valorReal: null,
    contrato: null,
    history: [
      { when: '2026-06-04 11:30', who: 'Juliana (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
    ],
  },
  {
    id: 'PV-005',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g2',
    gerenteNome: 'Juliana Faria',
    nomeVendedor: 'Rafael Costa',
    nomePagador: 'Diego Martins',
    nomeCliente: 'Diego Martins',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1080.00,
    dataHora: '2026-06-06 09:21',
    comprovante: { fileName: 'pix_diego.pdf', uploadedAt: '2026-06-06 09:30' },
    observacao: '',
    status: 'aguardando_contrato',
    extrato: { remetente: 'DIEGO MARTINS', valor: 1080.00, dataHora: '2026-06-06 09:21', tipo: 'auto' },
    valorReal: null,
    contrato: null,
    history: [
      { when: '2026-06-06 09:30', who: 'Juliana (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-06 16:00', who: 'Sistema',           what: 'PIX vinculado ao extrato · R$ 1.080,00' },
    ],
  },
  {
    id: 'PV-006',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g2',
    gerenteNome: 'Juliana Faria',
    nomeVendedor: 'Ana Paula Reis',
    nomePagador: 'Vinícius Reis',
    nomeCliente: 'Vinícius Reis',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1260.00,
    dataHora: '2026-06-08 08:15',
    comprovante: { fileName: 'pix_vinicius.pdf', uploadedAt: '2026-06-08 08:25' },
    observacao: '',
    status: 'pronto',
    extrato: { remetente: 'VINICIUS REIS', valor: 1260.00, dataHora: '2026-06-08 08:15', tipo: 'auto' },
    valorReal: 1260.00,
    contrato: { fileName: 'contrato_vinicius.pdf', uploadedAt: '2026-06-09 09:10', numContrato: '0898' },
    history: [
      { when: '2026-06-08 08:25', who: 'Juliana (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-08 14:00', who: 'Sistema',           what: 'PIX vinculado ao extrato · R$ 1.260,00' },
      { when: '2026-06-09 09:10', who: 'Juliana (Comercial)', what: 'Contrato enviado · Contrato 0898' },
    ],
  },

  // ── Eduardo (g3 · Atena / Lótus) ──
  {
    id: 'PV-007',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g3',
    gerenteNome: 'Eduardo Pinho',
    nomeVendedor: 'Lucas Ferreira',
    nomePagador: 'Larissa Vieira',
    nomeCliente: 'Larissa Vieira',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1320.00,
    dataHora: '2026-06-05 16:12',
    comprovante: { fileName: 'pix_larissa.pdf', uploadedAt: '2026-06-05 16:20' },
    observacao: '',
    status: 'pronto',
    extrato: { remetente: 'LARISSA VIEIRA', valor: 1320.00, dataHora: '2026-06-05 16:12', tipo: 'auto' },
    valorReal: 1320.00,
    contrato: { fileName: 'contrato_larissa.pdf', uploadedAt: '2026-06-06 11:00', numContrato: '0897' },
    history: [
      { when: '2026-06-05 16:20', who: 'Eduardo (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-06 08:00', who: 'Sistema',           what: 'PIX vinculado ao extrato · R$ 1.320,00' },
      { when: '2026-06-06 11:00', who: 'Eduardo (Comercial)', what: 'Contrato enviado · Contrato 0897' },
    ],
  },
  {
    id: 'PV-008',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g3',
    gerenteNome: 'Eduardo Pinho',
    nomeVendedor: 'Lucas Ferreira',
    nomePagador: 'Camila Andrade',
    nomeCliente: 'Camila Andrade',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1450.00,
    dataHora: '2026-06-07 10:00',
    comprovante: { fileName: 'pix_camila.pdf', uploadedAt: '2026-06-07 10:12' },
    observacao: 'Pagamento feito por transferência antes do PIX ser configurado',
    status: 'aguardando_financeiro',
    extrato: null,
    valorReal: null,
    contrato: null,
    history: [
      { when: '2026-06-07 10:12', who: 'Eduardo (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
    ],
  },

  // ── Renata (g4 · Anjos / Lótus) ──
  {
    id: 'PV-009',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g4',
    gerenteNome: 'Renata Sales',
    nomeVendedor: 'Fernanda Dias',
    nomePagador: 'Helena Souza',
    nomeCliente: 'Pedro Souza',
    mesmoNomeContrato: false,
    motivoDiferenca: 'Mãe comprando para o filho',
    valorComprovante: 1000.00,
    dataHora: '2026-06-05 10:11',
    comprovante: { fileName: 'pix_helena_souza.pdf', uploadedAt: '2026-06-05 10:20' },
    observacao: 'Mãe (Helena Souza) pagando em nome do filho (Pedro Souza)',
    status: 'diferenca_pendente',
    extrato: { remetente: 'HELENA SOUZA', valor: 1000.00, dataHora: '2026-06-05 10:11', tipo: 'manual' },
    valorReal: 950.00,
    contrato: { fileName: 'contrato_pedro_souza.pdf', uploadedAt: '2026-06-06 09:55', numContrato: '0896' },
    comprovanteComplementar: null,
    chamadoReembolso: null,
    history: [
      { when: '2026-06-05 10:20', who: 'Renata (Comercial)',     what: 'Pré-venda criada · pagador ≠ titular (mãe → filho)' },
      { when: '2026-06-05 15:00', who: 'Marcelo (Fase 1)', what: 'PIX vinculado manualmente · remetente: Helena Souza' },
      { when: '2026-06-06 09:55', who: 'Renata (Comercial)',     what: 'Contrato enviado · Contrato 0896' },
      { when: '2026-06-06 09:55', who: 'Sistema',              what: 'Pagamento excede o valor do contrato · R$ 50,00 a devolver ao cliente · aguardando abertura de chamado' },
    ],
  },
  {
    id: 'PV-010',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g4',
    gerenteNome: 'Renata Sales',
    nomeVendedor: 'Tiago Moraes',
    nomePagador: 'Tatiana Lima',
    nomeCliente: 'Tatiana Lima',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1100.00,
    dataHora: '2026-06-06 13:00',
    comprovante: { fileName: 'pix_tatiana_lima.jpg', uploadedAt: '2026-06-06 13:18' },
    observacao: 'Cliente confirmou pagamento por telefone às 13h',
    status: 'aguardando_contrato',
    extrato: { remetente: 'TATIANA LIMA', valor: 1100.00, dataHora: '2026-06-06 13:00', tipo: 'manual' },
    valorReal: null,
    contrato: null,
    history: [
      { when: '2026-06-06 13:18', who: 'Renata (Comercial)',     what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-07 11:00', who: 'Marcelo (Fase 1)', what: 'PIX vinculado manualmente · R$ 1.100,00' },
    ],
  },

  // ── Otávio (g21 · Groove / Lótus) ──
  {
    id: 'PV-013',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g21',
    gerenteNome: 'Otávio Cunha',
    nomeVendedor: 'Otávio Cunha',
    nomePagador: 'Rodrigo Silva',
    nomeCliente: 'Rodrigo Silva',
    urgente: true,
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1190.00,
    dataHora: '2026-06-09 10:15',
    comprovante: { fileName: 'pix_rodrigo_silva.pdf', uploadedAt: '2026-06-09 10:22' },
    observacao: '',
    status: 'aguardando_financeiro',
    extrato: null,
    valorReal: null,
    contrato: null,
    history: [
      { when: '2026-06-09 10:22', who: 'Otávio (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
    ],
  },

  // ── Aline (g26 · Aya / Eagles) ──
  {
    id: 'PV-014',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g26',
    gerenteNome: 'Aline Nascimento',
    nomeVendedor: 'Aline Nascimento',
    nomePagador: 'Carla Fontana',
    nomeCliente: 'Carla Fontana',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1380.00,
    dataHora: '2026-06-07 14:40',
    comprovante: { fileName: 'pix_carla_fontana.pdf', uploadedAt: '2026-06-07 14:50' },
    observacao: '',
    status: 'aguardando_contrato',
    extrato: { remetente: 'CARLA FONTANA', valor: 1380.00, dataHora: '2026-06-07 14:40', tipo: 'auto' },
    valorReal: null,
    contrato: null,
    history: [
      { when: '2026-06-07 14:50', who: 'Aline (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-08 09:00', who: 'Sistema',         what: 'PIX vinculado automaticamente ao extrato · R$ 1.380,00' },
    ],
  },

  // ── André (g31 · Quimera / Eagles) ──
  {
    id: 'PV-015',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g31',
    gerenteNome: 'André Silveira',
    nomeVendedor: 'André Silveira',
    nomePagador: 'Felipe Drummond',
    nomeCliente: 'Felipe Drummond',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1560.00,
    dataHora: '2026-06-05 11:00',
    comprovante: { fileName: 'pix_felipe_drummond.pdf', uploadedAt: '2026-06-05 11:12' },
    observacao: '',
    status: 'pronto',
    extrato: { remetente: 'FELIPE DRUMMOND', valor: 1560.00, dataHora: '2026-06-05 11:00', tipo: 'auto' },
    valorReal: 1560.00,
    contrato: { fileName: 'contrato_felipe_drummond.pdf', uploadedAt: '2026-06-06 15:30', numContrato: '0910' },
    history: [
      { when: '2026-06-05 11:12', who: 'André (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-05 16:00', who: 'Sistema',         what: 'PIX vinculado automaticamente ao extrato · R$ 1.560,00' },
      { when: '2026-06-06 15:30', who: 'André (Comercial)', what: 'Contrato enviado · Contrato 0910' },
      { when: '2026-06-06 15:30', who: 'Sistema',         what: 'Comprovante, extrato e contrato confirmados · pronto para aprovação de cota' },
    ],
  },

  // ── Kamila (g36 · Bell Breakers / Eagles) ──
  {
    id: 'PV-016',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g36',
    gerenteNome: 'Kamila Ribeiro',
    nomeVendedor: 'Kamila Ribeiro',
    nomePagador: 'Juliana Castro',
    nomeCliente: 'Juliana Castro',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1050.00,
    dataHora: '2026-06-01 13:30',
    comprovante: { fileName: 'pix_juliana_castro.pdf', uploadedAt: '2026-06-01 13:42' },
    observacao: '',
    status: 'concluida',
    extrato: { remetente: 'JULIANA CASTRO', valor: 1050.00, dataHora: '2026-06-01 13:30', tipo: 'auto' },
    valorReal: 1050.00,
    contrato: { fileName: 'contrato_juliana_castro.pdf', uploadedAt: '2026-06-02 10:15', numContrato: '0905' },
    history: [
      { when: '2026-06-01 13:42', who: 'Kamila (Comercial)',     what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-01 18:00', who: 'Sistema',              what: 'PIX vinculado automaticamente ao extrato · R$ 1.050,00' },
      { when: '2026-06-02 10:15', who: 'Kamila (Comercial)',     what: 'Contrato enviado · Contrato 0905' },
      { when: '2026-06-02 17:00', who: 'Patrícia (Fase 2)', what: 'Contrato 0905 lançado na administradora · venda concluída' },
    ],
  },

  // ── Paulo (g41 · Dunamis / Eagles) ──
  {
    id: 'PV-017',
    campanhaId: 'CMP-2026-08',
    gerenteId: 'g41',
    gerenteNome: 'Paulo Caixeta',
    nomeVendedor: 'Paulo Caixeta',
    nomePagador: 'Marcos Vinicius',
    nomeCliente: 'Marcos Vinicius',
    mesmoNomeContrato: true,
    motivoDiferenca: '',
    valorComprovante: 1300.00,
    dataHora: '2026-06-08 16:00',
    comprovante: { fileName: 'pix_marcos_vinicius.pdf', uploadedAt: '2026-06-08 16:10' },
    observacao: '',
    status: 'diferenca_pendente',
    extrato: { remetente: 'MARCOS VINICIUS', valor: 1300.00, dataHora: '2026-06-08 16:00', tipo: 'auto' },
    valorReal: 1250.00,
    contrato: { fileName: 'contrato_marcos_vinicius.pdf', uploadedAt: '2026-06-09 09:00', numContrato: '0921' },
    comprovanteComplementar: null,
    chamadoReembolso: null,
    history: [
      { when: '2026-06-08 16:10', who: 'Paulo (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
      { when: '2026-06-08 18:00', who: 'Sistema',         what: 'PIX vinculado automaticamente ao extrato · R$ 1.300,00' },
      { when: '2026-06-09 09:00', who: 'Paulo (Comercial)', what: 'Contrato enviado · Contrato 0921' },
      { when: '2026-06-09 09:00', who: 'Sistema',         what: 'Pagamento excede o valor do contrato · R$ 50,00 a devolver ao cliente · aguardando abertura de chamado' },
    ],
  },
];

// ── Gerador de registros adicionais — stress test 200 pré-vendas ──
(function gerarRegistros() {
  const nomesFirst = [
    'Ana','Beatriz','Camila','Carla','Carolina','Daniela','Débora','Elisa','Fernanda','Gabriela',
    'Helena','Isabela','Juliana','Karen','Larissa','Laura','Letícia','Lívia','Luiza','Mariana',
    'Mônica','Natália','Patrícia','Priscila','Rafaela','Renata','Sabrina','Simone','Tatiane','Vanessa',
    'Vitória','Yasmin','André','Bruno','Carlos','Daniel','Diego','Eduardo','Felipe','Fernando',
    'Flávio','Gabriel','Gustavo','Henrique','João','Jorge','José','Leonardo','Lucas','Luís',
    'Marcelo','Marcos','Mateus','Otávio','Paulo','Pedro','Rafael','Renato','Ricardo','Roberto',
    'Rodrigo','Sérgio','Thiago','Victor',
  ];
  const nomesLast = [
    'Almeida','Alves','Andrade','Araújo','Barbosa','Batista','Borges','Campos','Cardoso','Carvalho',
    'Castro','Coelho','Correia','Costa','Cunha','Dias','Faria','Ferreira','Figueiredo','Fontes',
    'Freitas','Gomes','Gonçalves','Guimarães','Lima','Lopes','Machado','Marques','Martins','Melo',
    'Mendes','Miranda','Monteiro','Moraes','Moreira','Moura','Nascimento','Nunes','Oliveira','Paiva',
    'Pereira','Pinheiro','Pinto','Pires','Ramos','Reis','Ribeiro','Rocha','Rodrigues','Sales',
    'Santos','Silva','Silveira','Sousa','Souza','Tavares','Teixeira','Torres','Vieira','Xavier',
  ];
  const vendedoresPorGerente = {
    g1: ['Carlos Mendes','Paulo Freire','Sandra Lima'],         g2: ['Juliana Faria','Ana Paula Reis','Rafael Costa'],
    g3: ['Eduardo Pinho','Lucas Ferreira','Carla Mendes'],      g4: ['Renata Sales','Fernanda Dias','Tiago Moraes'],
    g5: ['Fernanda Lima','Carlos Mota','Aline Torres'],         g6: ['Ricardo Souza','Ana Torres','Bruno Prado'],
    g7: ['Marcos Figueiredo','Silvia Prado','Felipe Neto'],     g8: ['Daniela Rocha','Pedro Esteves','Vanessa Melo'],
    g9: ['Rafael Alves','Paula Cunha','Lucas Borges'],          g10:['Carolina Pires','João Batista','Mariana Gomes'],
    g11:['Thiago Santos','Renata Borges','Diego Lopes'],        g12:['Amanda Melo','Felipe Leal','Simone Cruz'],
    g13:['Lucas Vieira','Cecília Ramos','Antônio Faria'],       g14:['Beatriz Campos','Eduardo Neto','Priscila Sá'],
    g15:['Henrique Nunes','Patrícia Costa','Jorge Lima'],       g16:['Sofia Martins','Diogo Freitas','Clara Duarte'],
    g17:['Felipe Ramos','Maria Clara','Sandro Moura'],          g18:['Larissa Ferreira','Roberto Dias','Cíntia Pires'],
    g19:['Bruno Teixeira','Sônia Ribeiro','Fábio Cunha'],       g20:['Vanessa Oliveira','Cláudio Pinto','Rita Soares'],
    g21:['Otávio Cunha','Amanda Souza','Paulo Sá'],             g22:['Isabela Moreira','Jorge Lima','Vera Matos'],
    g23:['Caio Barros','Tatiana Mota','Nilson Ramos'],          g24:['Priscila Gomes','André Cunha','Mário Fonseca'],
    g25:['Rodrigo Carvalho','Fernanda Saes','Celso Neves'],     g26:['Aline Nascimento','Marcos Duarte','Eliane Costa'],
    g27:['Diego Monteiro','Carla Neves','Rogério Brito'],       g28:['Tatiane Araújo','Nelson Faria','Estela Lima'],
    g29:['Victor Correia','Bianca Moura','Flávio Teles'],       g30:['Mônica Freitas','Leandro Pires','Sandra Maia'],
    g31:['André Silveira','Flávia Costa','Wilson Braga'],       g32:['Débora Pereira','Renato Lopes','Glória Santos'],
    g33:['Gustavo Moura','Simone Alves','Cássio Ramos'],        g34:['Ingrid Borges','Walter Santos','Ivone Cruz'],
    g35:['Leonardo Lima','Cristina Melo','Paulo Brum'],         g36:['Kamila Ribeiro','Paulo Ferreira','Leda Braga'],
    g37:['Fábio Azevedo','Luciana Rocha','Cleber Matos'],       g38:['Natália Cavalcanti','Rodrigo Pinho','Diana Luz'],
    g39:['Sérgio Paiva','Vanessa Correia','Edson Faria'],       g40:['Juliane Matos','Eduardo Macedo','Sílvia Nunes'],
    g41:['Paulo Caixeta','Sônia Batista','Davi Rocha'],         g42:['Adriana Lopes','Ricardo Maia','Elza Correia'],
    g43:['Roberto Vieira','Larissa Andrade','Ciro Pinto'],      g44:['Simone Queiroz','Carlos Neto','Tereza Moura'],
    g45:['Tiago Rodrigues','Mariana Teles','Rui Campos'],
  };

  const managerIds = Object.keys(vendedoresPorGerente);
  const mgMap = {};
  MANAGERS.forEach(function(g) { mgMap[g.id] = g; });

  // status weights: 30% ag_fin, 25% ag_cont, 10% diferenca, 20% pronto, 15% concluida
  const statuses    = ['aguardando_financeiro','aguardando_contrato','diferenca_pendente','pronto','concluida'];
  const statusBuckets = [30, 55, 65, 85, 100];

  function pickStatus(i) {
    var v = (i * 7 + 13) % 100;
    for (var j = 0; j < statusBuckets.length; j++) {
      if (v < statusBuckets[j]) return statuses[j];
    }
    return statuses[statuses.length - 1];
  }

  function pick(arr, i) { return arr[Math.abs(i) % arr.length]; }

  function pad2(n) { return String(n).padStart(2, '0'); }

  function fmtDate(day, hour, min) {
    return '2026-06-' + pad2(Math.min(Math.max(day, 1), 14)) + ' ' + pad2(Math.min(hour, 23)) + ':' + pad2(Math.min(min, 59));
  }

  function slug(name) {
    return name.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  }

  var diffValues = [50, 80, 100, 120, 150];
  var contratoSeq = 921;

  for (var i = 18; i <= 200; i++) {
    var mgid   = pick(managerIds, i * 7 + 13);
    var mgObj  = mgMap[mgid];
    var mgName = mgObj ? mgObj.name : 'Gerente';
    var mgFirst = mgName.split(' ')[0];

    var vendedor = pick(vendedoresPorGerente[mgid] || [mgName], i + 5);

    var pagFirst = pick(nomesFirst, i * 2 + 3);
    var pagLast  = pick(nomesLast,  i * 3 + 11);
    var pagador  = pagFirst + ' ' + pagLast;

    var diffPag  = (i % 20 === 0);
    var cliFirst = diffPag ? pick(nomesFirst, i * 4 + 7)  : pagFirst;
    var cliLast  = diffPag ? pick(nomesLast,  i * 5 + 19) : pagLast;
    var cliente  = cliFirst + ' ' + cliLast;

    var valores = [800,900,980,1000,1050,1080,1100,1120,1150,1180,1200,1240,1260,1300,1320,1350,1380,1400,1450,1500,1560,1600,1650,1700,1750,1800,1900,2000];
    var valor = pick(valores, i * 7 + 3);

    var day  = ((i * 3 + 1) % 14) + 1;
    var hour = ((i * 5 + 8) % 10) + 8;
    var min  = (i * 7) % 60;
    var dataHora   = fmtDate(day, hour, min);
    var uploadedAt = fmtDate(day, hour + 1 > 17 ? 8 : hour + 1, (min + 15) % 60);

    var status = pickStatus(i);
    var pvId   = 'PV-' + String(i).padStart(3, '0');
    var fSlug  = slug(pagador);
    var fExt   = i % 3 === 0 ? 'jpg' : 'pdf';

    var temExtrato  = status !== 'aguardando_financeiro';
    var temContrato = status === 'diferenca_pendente' || status === 'pronto' || status === 'concluida';

    var tipoExtrato = i % 4 === 0 ? 'manual' : 'auto';
    var extrato = temExtrato
      ? { remetente: pagador.toUpperCase(), valor: valor, dataHora: dataHora, tipo: tipoExtrato }
      : null;

    var valorReal   = null;
    var numContrato = null;
    if (temContrato) {
      contratoSeq++;
      numContrato = String(contratoSeq).padStart(4, '0');
      if (status === 'diferenca_pendente') {
        var delta = pick(diffValues, i);
        valorReal = i % 2 === 0 ? valor + delta : valor - delta;
      } else {
        valorReal = valor;
      }
    }

    var contratoDay = Math.min(day + 1, 14);
    var contrato = temContrato
      ? { fileName: 'contrato_' + fSlug + '.pdf', uploadedAt: fmtDate(contratoDay, 10, 0), numContrato: numContrato }
      : null;

    var history = [
      { when: uploadedAt, who: mgFirst + ' (Comercial)', what: 'Pré-venda criada · comprovante enviado' },
    ];

    if (temExtrato) {
      var vinculoWho  = tipoExtrato === 'auto' ? 'Sistema' : 'Marcelo (Fase 1)';
      var vinculoWhat = tipoExtrato === 'auto'
        ? 'PIX vinculado automaticamente ao extrato bancário · R$ ' + valor.toFixed(2).replace('.', ',')
        : 'PIX vinculado manualmente · R$ ' + valor.toFixed(2).replace('.', ',');
      history.push({ when: fmtDate(day, Math.min(hour + 2, 23), 0), who: vinculoWho, what: vinculoWhat });
    }

    if (temContrato) {
      history.push({ when: fmtDate(contratoDay, 10, 0), who: mgFirst + ' (Comercial)', what: 'Contrato enviado · Contrato ' + numContrato });
      if (status === 'diferenca_pendente') {
        var absDelta    = Math.abs(valorReal - valor);
        var deltaStr    = absDelta.toFixed(2).replace('.', ',');
        var valorRealStr = valorReal.toFixed(2).replace('.', ',');
        var valorStr    = valor.toFixed(2).replace('.', ',');
        if (valorReal > valor) {
          history.push({ when: fmtDate(contratoDay, 10, 1), who: 'Sistema', what: 'Diferença detectada · cliente pagou R$ ' + valorStr + ' mas contrato exige R$ ' + valorRealStr + ' · aguardando comprovante complementar de R$ ' + deltaStr });
        } else {
          history.push({ when: fmtDate(contratoDay, 10, 1), who: 'Sistema', what: 'Pagamento excede o valor do contrato · R$ ' + deltaStr + ' a devolver ao cliente · aguardando abertura de chamado' });
        }
      } else if (status === 'pronto') {
        history.push({ when: fmtDate(contratoDay, 10, 2), who: 'Sistema', what: 'Comprovante, extrato e contrato confirmados · pronto para aprovação de cota' });
      } else if (status === 'concluida') {
        var aprovDay = Math.min(contratoDay + 1, 14);
        history.push({ when: fmtDate(contratoDay, 10, 2), who: 'Sistema', what: 'Comprovante, extrato e contrato confirmados · pronto para aprovação de cota' });
        history.push({ when: fmtDate(aprovDay, 9, 0), who: 'Patrícia (Fase 2)', what: 'Contrato ' + numContrato + ' lançado na administradora · venda concluída' });
      }
    }

    var rec = {
      id: pvId,
      campanhaId: 'CMP-2026-08',
      gerenteId: mgid,
      gerenteNome: mgName,
      nomeVendedor: vendedor,
      nomePagador: pagador,
      nomeCliente: cliente,
      mesmoNomeContrato: !diffPag,
      motivoDiferenca: diffPag ? 'Pagador distinto do titular da cota' : '',
      valorComprovante: valor,
      dataHora: dataHora,
      comprovante: { fileName: 'pix_' + fSlug + '.' + fExt, uploadedAt: uploadedAt },
      observacao: '',
      status: status,
      extrato: extrato,
      valorReal: valorReal,
      contrato: contrato,
      history: history,
    };

    if (i % 15 === 7) rec.urgente = true;
    if (status === 'diferenca_pendente') {
      rec.comprovanteComplementar = null;
      rec.chamadoReembolso = null;
    }

    RECORDS.push(rec);
  }
})();

// Histórico de extratos importados
let EXTRATO_HISTORY = [
  {
    id: 'EXT-001',
    fileName: 'extrato_01_06_junho.pdf',
    importedAt: '2026-06-02 08:45',
    importedBy: 'Marcelo Tavares',
    autoLinked: 3,
    pending: 1,
    entries: [
      { remetente: 'MARIA OLIVEIRA',  valor: 980.00,  dataHora: '2026-06-03 15:18', vinculadoId: 'PV-002', vinculadoNome: 'Maria Oliveira',  status: 'auto'    },
      { remetente: 'RICARDO ALVES',   valor: 1120.00, dataHora: '2026-06-02 09:30', vinculadoId: 'PV-012', vinculadoNome: 'Ricardo Alves',   status: 'auto'    },
      { remetente: 'VINICIUS REIS',   valor: 1260.00, dataHora: '2026-06-08 08:15', vinculadoId: 'PV-006', vinculadoNome: 'Vinícius Reis',   status: 'auto'    },
      { remetente: 'FERNANDA COUTO',  valor: 1200.00, dataHora: '2026-06-06 15:44', vinculadoId: null,     vinculadoNome: null,              status: 'pending' },
    ],
  },
  {
    id: 'EXT-002',
    fileName: 'extrato_06_junho.pdf',
    importedAt: '2026-06-07 09:10',
    importedBy: 'Marcelo Tavares',
    autoLinked: 3,
    pending: 2,
    entries: [
      { remetente: 'DIEGO MARTINS',   valor: 1080.00, dataHora: '2026-06-06 09:21', vinculadoId: 'PV-005', vinculadoNome: 'Diego Martins',   status: 'auto'    },
      { remetente: 'LARISSA VIEIRA',  valor: 1320.00, dataHora: '2026-06-05 16:12', vinculadoId: 'PV-007', vinculadoNome: 'Larissa Vieira',  status: 'auto'    },
      { remetente: 'ANA BEATRIZ SOUZA',valor:1350.00, dataHora: '2026-06-07 11:05', vinculadoId: 'PV-011', vinculadoNome: 'Ana Beatriz Souza',status:'auto'    },
      { remetente: 'SERGIO PINTO',    valor: 1750.00, dataHora: '2026-06-01 08:55', vinculadoId: null,     vinculadoNome: null,              status: 'pending' },
      { remetente: 'TATIANA LIMA',    valor: 1100.00, dataHora: '2026-06-06 13:00', vinculadoId: 'PV-010', vinculadoNome: 'Tatiana Lima',    status: 'manual'  },
    ],
  },
];

// PIX no extrato sem pré-venda correspondente
let EXTRATO_ORPHANS = [
  { id: 'E-100', remetente: 'FERNANDA COUTO',    valor: 1200.00, dataHora: '2026-06-06 15:44', chavePix: '(não disponível)' },
  { id: 'E-101', remetente: 'SERGIO PINTO',      valor: 1750.00, dataHora: '2026-06-01 08:55', chavePix: '(não disponível)' },
  { id: 'E-102', remetente: 'ROBERTA C ALMEIDA', valor: 1400.00, dataHora: '2026-06-04 11:22', chavePix: '(não disponível)' },
  { id: 'E-103', remetente: 'RODRIGO SILVA',     valor: 1190.00, dataHora: '2026-06-09 10:15', chavePix: '(não disponível)' },
];

const STATUS_CHIP = {
  'aguardando_financeiro': 'chip-amber',
  'aguardando_contrato':   'chip-blue',
  'diferenca_pendente':    'chip-orange',
  'pronto':                'chip-green',
  'concluida':             'chip-teal',
};

const STATUS_LABEL = {
  'aguardando_financeiro': 'Análise financeira',
  'aguardando_contrato':   'Aguardando contrato',
  'diferenca_pendente':    'Diferença pendente',
  'pronto':                'Pronto para aprovação',
  'concluida':             'Concluída',
};
