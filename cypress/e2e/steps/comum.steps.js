import { Given, When } from "@badeball/cypress-cucumber-preprocessor";
import PortalPage from "../../pages/portal.page";

// Steps compartilhados por mais de uma feature (o @badeball carrega todos globalmente).

Given("que estou na página inicial do portal da Câmara", () => {
  PortalPage.visitarHome();
});

When("eu acesso a área {string} pelo menu", (area) => {
  PortalPage.acessarArea(area);
});
