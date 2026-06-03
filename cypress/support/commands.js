/// <reference types="cypress" />

// ***********************************************
// Comandos customizados do projeto.
// Doc: https://on.cypress.io/custom-commands
// ***********************************************

// Pesquisa um termo na busca global do portal da Câmara.
// O campo de busca fica num "collapse" escondido (display:none) e só aparece
// após clicar na lupa do topo — por isso abrimos a caixa antes de digitar.
const CAMPO_BUSCA = "#termo-busca-geral, input[name='termo']";
const LUPA_BUSCA =
  ".menu-global--btnsearch, [data-target='#buscaportal'], a[href='#buscaportal']";

Cypress.Commands.add("buscarNoPortal", (termo) => {
  cy.get(CAMPO_BUSCA)
    .first()
    .then(($input) => {
      if (!$input.is(":visible")) {
        cy.get(LUPA_BUSCA).first().click({ force: true });
      }
    });
  cy.get(CAMPO_BUSCA).first().should("be.visible").clear().type(`${termo}{enter}`);
});
