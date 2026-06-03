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
