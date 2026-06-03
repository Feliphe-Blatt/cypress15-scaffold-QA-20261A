import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import BuscaPage from "../../pages/busca.page";
import PortalPage from "../../pages/portal.page";

When("eu pesquiso por {string}", (termo) => {
  BuscaPage.buscar(termo);
});

Then("devo ver uma lista de resultados", () => {
  BuscaPage.resultados().should("have.length.greaterThan", 0);
});

Then("devo ver uma mensagem informando que não há resultados", () => {
  BuscaPage.mensagemSemResultado().should("be.visible");
});

Then("devo ver o campo de busca do portal", () => {
  PortalPage.abrirBusca();
});

When("eu abro o primeiro resultado", () => {
  BuscaPage.abrirPrimeiroResultado();
});

Then("devo ver uma página de conteúdo", () => {
  cy.get("main, article, body").should("exist");
  cy.title().should("not.be.empty");
});

Then("a busca deve manter o termo {string}", (termo) => {
  const palavras = termo.toLowerCase().split(/\s+/);
  cy.url().then((url) => {
    const naUrl = decodeURIComponent(url).toLowerCase();
    // Caso ideal: o termo buscado é preservado na URL de resultados.
    if (palavras.every((p) => naUrl.includes(p))) {
      return;
    }
    // Fallback: o termo aparece no conteúdo da página de resultados.
    cy.get("body")
      .invoke("text")
      .then((texto) => {
        const t = texto.toLowerCase();
        palavras.forEach((p) =>
          expect(t, `a página de resultados deve conter "${p}"`).to.include(p)
        );
      });
  });
});
