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
