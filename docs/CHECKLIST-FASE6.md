# Checklist — Fase 6 (Validação local dos testes)

Objetivo: rodar as 3 features na sua máquina, confirmar os seletores reais da Câmara e deixar
os **15 testes verdes**. Os PageObjects têm seletores marcados como `PROVISÓRIO` — esta fase é
para confirmá-los/ajustá-los.

---

## 0. Pré-requisitos
- [x] Node.js 18+ instalado — `node -v`
- [x] Dependências instaladas — `npm install` (sem erros)
- [x] Cypress ok — `npx cypress verify`
- [x] Internet liberada para `https://www.camara.leg.br`

## 1. Abrir o Cypress
- [x] `npm run cy:open`
- [x] Escolher **E2E Testing**
- [x] Escolher **Chrome** (recomendado — tem o *Selector Playground*)
- [x] Confirmar que aparecem **3 specs**: `busca.feature`, `deputados.feature`, `navegacao.feature`

## 2. Como ajustar um seletor quando um teste falhar
1. No runner, clique no ícone de **mira (Selector Playground)** no topo.
2. Passe o mouse sobre o elemento real (campo, link, botão) → o Cypress sugere o seletor.
3. Copie o seletor e cole no **PageObject** correspondente (veja a tabela abaixo).
4. Alternativa: **F12 (DevTools)** → inspecionar o elemento → pegar `id`, `name` ou `placeholder`.
5. Salve o arquivo — o Cypress re-executa sozinho.

> 💡 Dica: rode uma feature por vez para iterar rápido:
> `npx cypress run --spec "cypress/e2e/features/busca.feature"`

## 3. Banner de cookies / LGPD (se aparecer)
- [x] Se o portal exibir um aviso de cookies que **bloqueia cliques**, capture o seletor do botão
      de aceitar e adicione no início do fluxo (ex.: em `portal.page.js > visitarHome()`):
      `cy.contains("button", /aceitar|entendi|ok/i).click({ force: true })`

## 4. Validação por cenário

### Busca — `busca.feature`  → ajustes em `cypress/pages/busca.page.js` e `cypress/support/commands.js`
- [x] **CT-Busca-001** — buscar "educação" mostra resultados
      → confirmar o **campo de busca** (`cy.buscarNoPortal` em `commands.js`) e a lista `resultados()`
- [x] **CT-Busca-002** — buscar termo inexistente mostra aviso
      → confirmar o **texto real** de "nenhum resultado" e ajustar o regex em `mensagemSemResultado()`
- [x] **CT-Busca-003** — campo de busca visível na home
      → confirmar `campoBusca()` em `portal.page.js`
- [x] **CT-Busca-004** — abrir o 1º resultado leva a uma página de conteúdo
      → confirmar `resultados()` (seletor dos links de resultado)
- [x] **CT-Busca-005** — o termo continua no campo na página de resultados
      → confirmar `campoBuscaResultados()`. Se a página **não** repetir o termo num input,
      trocar a verificação (ex.: `cy.url().should("include", "ambiente")` ou checar um título)
- [x] **CT-Busca-006** *(Esquema)* — buscar "saúde", "educação", "economia" mostra resultados

### Deputados — `deputados.feature`  → ajustes em `cypress/pages/deputados.page.js`
- [x] **CT-Dep-001** — menu "Deputados" abre a página de deputados
      → confirmar `acessarArea("Deputados")` (link do menu) e a URL `/deputados`
- [x] **CT-Dep-002** — a lista de deputados aparece
      → confirmar `lista()` (seletor `a[href*="/deputados/"]`)
- [x] **CT-Dep-003** — buscar "Silva" retorna deputados
      → confirmar o campo **Nome** e o botão **Buscar** em `buscarPorNome()`
- [x] **CT-Dep-004** — abrir o 1º deputado mostra o perfil
      → confirmar que o clique vai para `/deputados/{id}` e o seletor `perfil()`
- [x] **CT-Dep-005** *(Esquema)* — filtrar por UF "SP" e "RJ" mostra a lista
      → confirmar o `<select>` de **UF** em `filtrarPorUf()` (ex.: `select[name="uf"]`).
      Plano B (mais robusto): trocar por `cy.visit("/deputados/quem-sao?...")` com o parâmetro real

### Navegação — `navegacao.feature`  → ajustes em `cypress/pages/portal.page.js`
- [x] **CT-Nav-001** — home tem logo, busca e menu
      → confirmar `logo()`, `campoBusca()`, `menuPrincipal()`
- [x] **CT-Nav-002** — menu "Atividade Legislativa" abre a área certa
      → confirmar `acessarArea("Atividade Legislativa")`
- [x] **CT-Nav-003** — rodapé com canais de atendimento
      → confirmar `rodape()` (`footer`)
- [x] **CT-Nav-004** *(Esquema)* — navegar para "Transparência" e "Atividade Legislativa"
      → confirmar que o texto do link bate (a Câmara usa "Transparência e prestação de contas")

## 5. Fechamento da Fase 6
- [x] Rodar tudo headless: `npm run cy:run`
- [x] **15/15 testes verdes** (4 cenários Busca + 1 esquema; 4 cenários Dep + 1 esquema; 3 cenários Nav + 1 esquema)
- [x] Atualizar a coluna "Resultado obtido" em `docs/PLANO-DE-TESTES.md` (opcional, mas fica completo)
- [x] Se algum cenário for inviável no site real, ajustar o seletor/asserção **ou** substituir
      por um equivalente (mantendo ≥ 15 testes) — anotar no commit

## 6. Tabela rápida: arquivo × o que conferir
| Arquivo | Métodos a confirmar |
|---|---|
| `cypress/support/commands.js` | `buscarNoPortal` (campo de busca) |
| `cypress/pages/busca.page.js` | `resultados`, `abrirPrimeiroResultado`, `mensagemSemResultado`, `campoBuscaResultados` |
| `cypress/pages/deputados.page.js` | `lista`, `buscarPorNome`, `filtrarPorUf`, `clicarBuscar`, `perfil` |
| `cypress/pages/portal.page.js` | `logo`, `campoBusca`, `menuPrincipal`, `acessarArea`, `rodape` |
