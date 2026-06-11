# Protótipo · Conciliação PIX — Porto Vale Consórcios

Protótipo navegável construído a partir do `prototipo_conciliacao_pix.md`.
Cobre as duas fases do processo (pré-venda + lançamento oficial) e os quatro perfis (Gerente, Pós-Venda, Financeiro, Backoffice ADM).

## Como rodar

Não precisa de servidor — é HTML/CSS/JS puro. Basta abrir o arquivo:

```
prototipo_pix/index.html
```

Em qualquer navegador moderno (Chrome, Edge, Firefox). Se preferir um servidor local:

```powershell
# PowerShell — a partir da pasta prototipo_pix
python -m http.server 8000
# depois acesse http://localhost:8000
```

## Telas implementadas

Todas as 8 telas mapeadas no markdown:

| # | Tela | Quem vê |
|---|---|---|
| 4.1 | Login + Seleção de campanha | Todos |
| 4.2 | Dashboard / Painel da campanha | Pós-Venda, Financeiro, Backoffice |
| 4.3 | Upload de comprovante | Gerente |
| 4.4 | Importação de extrato (A: upload / B: manual) | Financeiro, Backoffice |
| 4.5 | Painel de conciliação manual (split) | Pós-Venda, Financeiro, Backoffice |
| 4.6 | Detalhe do registro (4 seções + timeline) | Todos |
| 4.7 | Upload de contrato | Gerente |
| 4.8 | Tela de fantasmas (Painel A + B) | Pós-Venda, Financeiro, Backoffice |

Extras: tela de "Minhas vendas" (gerente), "Diferenças de valor" (financeiro), "Campanhas" (backoffice).

## O que dá pra testar

- **Troca de perfil em tempo real** (canto superior direito) — a sidebar e as rotas disponíveis se ajustam.
- **Filtros do dashboard** — por status, por gerente, busca por nome.
- **Conciliação manual** — selecione 1 comprovante à esquerda + 1 PIX à direita e clique em "Vincular".
- **Alerta de ambiguidade** — selecione um comprovante que tenha valor/data igual a outro.
- **Marcar fantasma** — exige justificativa (regra de imutabilidade).
- **Upload de comprovante** — toggle "Pagador ≠ titular" mostra campo de motivo.
- **Upload de contrato** — modal calcula a diferença automaticamente.
- **Diferenças** — vermelho (cobrar) / verde (devolver) / cinza (quitado).
- **Detalhe** — clique em qualquer linha da tabela para ver o registro completo com timeline.

## Estrutura de arquivos

```
prototipo_pix/
├── index.html             entrada
├── css/
│   └── styles.css         paleta Porto Vale, Sora + Lora, componentes
└── js/
    ├── data.js            mock data (registros, campanhas, gerentes, extrato)
    ├── state.js           store mutável + helpers de formato e contagem
    ├── components.js      shell, sidebar, modal, toast
    ├── screens.js         renderização e bindings de cada tela
    ├── router.js          hash router com guards por perfil
    └── app.js             bootstrap
```

## Pontos em aberto (intencionais, da seção 7 do briefing)

Sinalizados visualmente no protótipo:

- Formato de importação do extrato (banner amarelo na tela 4.4)
- Tratativa de devolução/cobrança (banner azul na tela de Diferenças)
- Prazo para fantasma (placeholder de 3 dias usado no mock)
- Notificações (estrutura pronta no `data.js` mas sem implementação visual ainda)

## Próximos passos sugeridos

1. Validar com cada perfil (gerente, pós-venda, financeiro) qual o fluxo mais fluido
2. Definir o formato do extrato (A vs B)
3. Conectar a um backend real (substituir `RECORDS` por chamada de API)
4. Adicionar autenticação (hoje é apenas seleção de perfil)
5. Persistência de uploads (hoje os arquivos só são visualizados localmente)
