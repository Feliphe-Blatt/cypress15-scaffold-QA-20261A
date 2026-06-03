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
