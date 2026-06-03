import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import DeputadosPage from "../../pages/deputados.page";

Given("que estou na página de deputados", () => {
  DeputadosPage.visitar();
});

When("eu listo os deputados", () => {
  DeputadosPage.listarTodos();
});

Then("devo ver a página de deputados", () => {
  cy.url().should("include", "/deputados");
  cy.contains(/deputad/i).should("exist");
});

Then("devo ver uma lista de deputados", () => {
  DeputadosPage.lista().should("have.length.greaterThan", 0);
});

When("eu pesquiso o deputado {string}", (nome) => {
  DeputadosPage.buscarPorNome(nome);
});

Then("devo ver resultados de deputados", () => {
  DeputadosPage.lista().should("have.length.greaterThan", 0);
});

When("eu abro o primeiro deputado da lista", () => {
  DeputadosPage.abrirPrimeiro();
});

Then("devo ver o perfil do deputado", () => {
  cy.url().should("include", "/deputados/");
  DeputadosPage.perfil().should("exist");
});

When("eu filtro os deputados pela UF {string}", (uf) => {
  DeputadosPage.filtrarPorUf(uf);
});
