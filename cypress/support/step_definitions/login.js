import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que o usuário está na página de login', () => {
  // substitua pela URL real do sistema alvo
  cy.visit('https://example.cypress.io/commands/actions');
});

When('ele informa usuário e senha válidos', () => {
  // usar um campo real da página de exemplo
  cy.get('.action-email').type('usuario@example.com');
});

Then('ele deve ver a mensagem de boas-vindas', () => {
  // verificar que a página carregou e contém o título 'Actions'
  cy.contains('Actions').should('exist');
});
