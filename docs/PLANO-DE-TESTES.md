# Plano de Testes — Consulta no Portal da Câmara dos Deputados

Projeto VA02 QA · BDD com Cypress + Cucumber (Gherkin) · Turma P5A · Feliphe Blatt

> Cobre "**planejar os testes**" e "**escrever os cenários**" do rubric, no formato de casos
> de teste do `ANEXO - Criação de casos de testes.pdf`.

---

## 1. Planejamento dos testes

| Item | Definição |
|---|---|
| **Objetivo** | Verificar **busca**, **consulta de deputados** e **navegação** no Portal da Câmara. |
| **Alvo (app)** | `https://www.camara.leg.br` (Câmara dos Deputados — legislativo federal). |
| **Tipo de teste** | Funcional, E2E (interface), automatizado, abordagem BDD. |
| **Em escopo** | Busca por termo, busca sem resultado, consulta/filtro de deputados, navegação por menus e rodapé. |
| **Fora de escopo** | Login/autenticação; áreas com captcha; download de arquivos. |
| **Dados de teste** | `cypress/fixtures/dados.json` (termos, temas, UFs, nome de deputado). |
| **Ambiente** | Cypress 15.14.1, Node 22, navegador Chrome/Electron. |
| **Critério de aceite** | Os 15 testes verdes em `npx cypress run`. |

### Estratégia (metodologia do anexo)
Para cada funcionalidade mapeamos o **fluxo principal** e os **fluxos alternativos/exceção**,
como o anexo propõe (principal + alternativos). Total: **12 Cenários + 3 Esquemas do
Cenário = 15 testes** (mínimo do rubric: 4).

## 2. Lista de cenários (15)

### Feature 1 — Busca no Portal (`busca.feature`)
| ID | Tipo | Cenário |
|---|---|---|
| CT-Busca-001 | Cenário | Busca com termo válido retorna resultados |
| CT-Busca-002 | Cenário | Busca sem correspondência exibe aviso |
| CT-Busca-003 | Cenário | Campo de busca disponível na página inicial |
| CT-Busca-004 | Cenário | Abrir o primeiro resultado da busca |
| CT-Busca-005 | Cenário | O termo pesquisado é preservado nos resultados |
| CT-Busca-006 | **Esquema do Cenário** (3 linhas) | Buscar por diferentes temas |

### Feature 2 — Consulta de Deputados (`deputados.feature`)
| ID | Tipo | Cenário |
|---|---|---|
| CT-Dep-001 | Cenário | Acessar a página de Deputados pelo menu |
| CT-Dep-002 | Cenário | A lista de deputados é exibida |
| CT-Dep-003 | Cenário | Buscar um deputado por nome |
| CT-Dep-004 | Cenário | Abrir o perfil de um deputado |
| CT-Dep-005 | **Esquema do Cenário** (2 linhas) | Consultar deputados por UF |

### Feature 3 — Navegação no portal (`navegacao.feature`)
| ID | Tipo | Cenário |
|---|---|---|
| CT-Nav-001 | Cenário | Página inicial carrega elementos essenciais |
| CT-Nav-002 | Cenário | Acessar a área "Atividade Legislativa" |
| CT-Nav-003 | Cenário | Rodapé exibe canais de atendimento |
| CT-Nav-004 | **Esquema do Cenário** (2 linhas) | Navegar por diferentes áreas do menu |

## 3. Cenários em Gherkin (prévia das features)

> Cenários validados contra o site real, com execução local 100% verde (15/15).

### `busca.feature`
```gherkin
# language: pt
Funcionalidade: Busca no Portal da Câmara dos Deputados
  Como cidadão
  Quero pesquisar conteúdos no portal da Câmara
  Para encontrar informações legislativas

  Contexto:
    Dado que estou na página inicial do portal da Câmara

  Cenário: CT-Busca-001 - Busca com termo válido retorna resultados
    Quando eu pesquiso por "educação"
    Então devo ver uma lista de resultados

  Cenário: CT-Busca-002 - Busca sem correspondência exibe aviso
    Quando eu pesquiso por "zxqwk123naoexiste"
    Então devo ver uma mensagem informando que não há resultados

  Cenário: CT-Busca-003 - Campo de busca disponível na página inicial
    Então devo ver o campo de busca do portal

  Cenário: CT-Busca-004 - Abrir o primeiro resultado da busca
    Quando eu pesquiso por "orçamento"
    E eu abro o primeiro resultado
    Então devo ver uma página de conteúdo

  Cenário: CT-Busca-005 - O termo pesquisado é preservado nos resultados
    Quando eu pesquiso por "meio ambiente"
    Então a busca deve manter o termo "meio ambiente"

  Esquema do Cenário: CT-Busca-006 - Buscar por diferentes temas
    Quando eu pesquiso por "<tema>"
    Então devo ver uma lista de resultados

    Exemplos:
      | tema     |
      | saúde    |
      | educação |
      | economia |
```

### `deputados.feature`
```gherkin
# language: pt
Funcionalidade: Consulta de Deputados
  Como cidadão
  Quero consultar os deputados federais
  Para conhecer meus representantes

  Cenário: CT-Dep-001 - Acessar a página de Deputados pelo menu
    Dado que estou na página inicial do portal da Câmara
    Quando eu acesso a área "Deputados" pelo menu
    Então devo ver a página de deputados

  Cenário: CT-Dep-002 - A lista de deputados é exibida
    Dado que estou na página de deputados
    Quando eu listo os deputados
    Então devo ver uma lista de deputados

  Cenário: CT-Dep-003 - Buscar um deputado por nome
    Dado que estou na página de deputados
    Quando eu pesquiso o deputado "Silva"
    Então devo ver resultados de deputados

  Cenário: CT-Dep-004 - Abrir o perfil de um deputado
    Dado que estou na página de deputados
    Quando eu listo os deputados
    E eu abro o primeiro deputado da lista
    Então devo ver o perfil do deputado

  Esquema do Cenário: CT-Dep-005 - Consultar deputados por UF
    Dado que estou na página de deputados
    Quando eu filtro os deputados pela UF "<uf>"
    Então devo ver uma lista de deputados

    Exemplos:
      | uf |
      | SP |
      | RJ |
```

### `navegacao.feature`
```gherkin
# language: pt
Funcionalidade: Navegação no Portal da Câmara
  Como cidadão
  Quero navegar pelas áreas do portal
  Para acessar diferentes informações

  Contexto:
    Dado que estou na página inicial do portal da Câmara

  Cenário: CT-Nav-001 - Página inicial carrega elementos essenciais
    Então devo ver o logo da Câmara
    E devo ver o campo de busca
    E devo ver o menu principal

  Cenário: CT-Nav-002 - Acessar a área "Atividade Legislativa"
    Quando eu acesso a área "Atividade Legislativa" pelo menu
    Então a página deve ser sobre atividade legislativa

  Cenário: CT-Nav-003 - Rodapé exibe canais de atendimento
    Então o rodapé deve exibir os canais de atendimento

  Esquema do Cenário: CT-Nav-004 - Navegar por diferentes áreas do menu
    Quando eu acesso a área "<area>" pelo menu
    Então a página deve conter "<conteudo>"

    Exemplos:
      | area                  | conteudo      |
      | Transparência         | transparência |
      | Atividade Legislativa | legislativa   |
```

## 4. Casos de teste detalhados (formato do anexo)

> Campos do anexo: ID · Objetivo · Pré-condições · Passos · Dados · Resultado esperado ·
> Resultado obtido (preencher após execução). Pré-condição comum: **portal da Câmara
> acessível**.

| ID | Objetivo | Passos (resumo) | Dados | Resultado esperado | Obtido |
|---|---|---|---|---|---|
| CT-Busca-001 | Busca válida lista resultados | Home → buscar termo | `educação` | Lista de resultados exibida | ✅ Lista de resultados exibida, mencionando "educação" |
| CT-Busca-002 | Tratar busca sem resultado | Home → buscar termo improvável | `zxqwk123naoexiste` | Mensagem "nenhum resultado" | ✅ Exibida a mensagem de nenhum resultado encontrado |
| CT-Busca-003 | Campo de busca presente | Verificar campo na home | — | Campo de busca visível | ✅ Campo de busca exibido ao acionar a lupa |
| CT-Busca-004 | Navegar a partir do resultado | Buscar → abrir 1º resultado | `orçamento` | Página de conteúdo aberta | ✅ Primeiro resultado aberto; página de conteúdo carregada |
| CT-Busca-005 | Termo preservado nos resultados | Buscar termo | `meio ambiente` | Busca mantém o termo | ✅ Termo "meio ambiente" preservado nos resultados |
| CT-Busca-006 | Busca parametrizada (Esquema) | Para cada linha: buscar `<tema>` | `saúde`, `educação`, `economia` | Lista de resultados exibida | ✅ Resultados exibidos para os 3 temas |
| CT-Dep-001 | Acessar área de Deputados | Home → menu "Deputados" | — | Página de deputados carrega | ✅ Página de deputados carregada (/deputados/quem-sao) |
| CT-Dep-002 | Listar deputados | Abrir página de deputados | — | Lista de deputados exibida | ✅ Lista de deputados exibida após a busca |
| CT-Dep-003 | Buscar deputado por nome | Página deputados → buscar nome | `Silva` | Resultados de deputados | ✅ Resultados retornados para o nome "Silva" |
| CT-Dep-004 | Abrir perfil do deputado | Abrir 1º deputado da lista | — | Perfil do deputado exibido | ✅ Perfil do deputado aberto (/deputados/{id}) |
| CT-Dep-005 | Filtrar deputados por UF (Esquema) | Para cada linha: filtrar por `<uf>` | `SP`, `RJ` | Lista de deputados exibida | ✅ Lista exibida para SP e RJ |
| CT-Nav-001 | Home expõe logo, busca e menu | Verificar elementos na home | — | Elementos visíveis | ✅ Logo, campo de busca e menu visíveis |
| CT-Nav-002 | Navegar a Atividade Legislativa | Clicar no item do menu | — | Página da área correspondente | ✅ Página de Atividade Legislativa carregada |
| CT-Nav-003 | Rodapé com atendimento | Verificar rodapé | — | Canais de atendimento presentes | ✅ Rodapé com canais de atendimento exibido |
| CT-Nav-004 | Navegar por áreas do menu (Esquema) | Para cada linha: acessar `<area>` | `Transparência`, `Atividade Legislativa` | Página contém `<conteudo>` | ✅ Navegação OK para Transparência e Atividade Legislativa |

## 5. Reflexão — casos de teste sem × com casos de uso (atividade do anexo)

- **Sem casos de uso (só requisitos):** cobriríamos só "buscar e ver resultado".
- **Com casos de uso** ("Buscar conteúdo", "Consultar deputados", "Navegar no portal"): ao
  mapear fluxos principal **e** alternativos surgiram naturalmente os cenários de **exceção**
  (busca sem resultado), **filtro/consulta** (deputados por nome/UF) e **navegação**
  (menu/rodapé/logo) — que seriam facilmente esquecidos sem a visão de fluxo do usuário.
- **Conclusão:** casos de uso aumentam a cobertura ao forçar o pensamento em exceções e
  caminhos alternativos.

## 6. Rastreabilidade

| Requisito | Cenário(s) |
|---|---|
| Busca (fluxo principal) | CT-Busca-001, 004, 005, 006 |
| Tratamento de exceção (sem resultado) | CT-Busca-002 |
| Interface de busca | CT-Busca-003, CT-Nav-001 |
| Consulta de deputados | CT-Dep-001, 002, 003, 004, 005 |
| Navegação no portal | CT-Nav-002, 003, 004 |
| Esquema do Cenário (rubric) | CT-Busca-006, CT-Dep-005, CT-Nav-004 |
