import { Then } from "@badeball/cypress-cucumber-preprocessor";
import PortalPage from "../../pages/portal.page";

Then("devo ver o logo da Câmara", () => {
  PortalPage.logo().should("be.visible");
});

Then("devo ver o campo de busca", () => {
  PortalPage.botaoBusca().should("be.visible");
});

Then("devo ver o menu principal", () => {
  PortalPage.menuPrincipal().should("exist");
});

Then("a página deve ser sobre atividade legislativa", () => {
  cy.get("body").invoke("text").should("match", /legisla/i);
});

Then("o rodapé deve exibir os canais de atendimento", () => {
  PortalPage.rodape().should("exist").and("be.visible");
});

Then("a página deve conter {string}", (conteudo) => {
  cy.get("body").invoke("text").should("match", new RegExp(conteudo, "i"));
});
