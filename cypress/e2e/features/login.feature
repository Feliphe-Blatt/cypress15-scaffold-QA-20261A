Feature: Login

  Scenario: Usuário faz login com credenciais válidas
    Given que o usuário está na página de login
    When ele informa usuário e senha válidos
    Then ele deve ver a mensagem de boas-vindas
