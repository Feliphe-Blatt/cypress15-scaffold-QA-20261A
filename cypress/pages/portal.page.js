/// <reference types="cypress" />

// PageObject do portal (home / navegação) da Câmara dos Deputados.
// Observação: os seletores marcados como PROVISÓRIO devem ser confirmados ao vivo
// na Fase 6 (DevTools / Selector Playground do Cypress).
class PortalPage {
  visitarHome() {
    cy.visit("/");
  }

  // Logo do cabeçalho que leva à home. PROVISÓRIO.
  logo() {
    return cy.get('header a[href="/"], header a[href*="camara.leg.br"], .logo a, header a').first();
  }

  // Botão (lupa) que abre a caixa de busca colapsada no topo do portal.
  botaoBusca() {
    return cy
      .get(".menu-global--btnsearch, [data-target='#buscaportal'], a[href='#buscaportal']")
      .first();
  }

  // Campo de busca global (fica num collapse escondido até clicar na lupa).
  campoBusca() {
    return cy.get("#termo-busca-geral, input[name='termo']").first();
  }

  // Abre a caixa de busca se estiver escondida e retorna o campo já visível.
  abrirBusca() {
    this.campoBusca().then(($input) => {
      if (!$input.is(":visible")) {
        this.botaoBusca().click({ force: true });
      }
    });
    return this.campoBusca().should("be.visible");
  }

  // Menu/navegação principal. PROVISÓRIO.
  menuPrincipal() {
    return cy.get("nav, header nav, #menu, .menu").first();
  }

  // Acessa uma área do portal. O menu da Câmara é um off-canvas (mmenu) escondido cujos
  // itens apenas abrem submenus, então navegamos direto pela URL da seção (robusto).
  acessarArea(nome) {
    const rotas = {
      deputados: "/deputados/quem-sao",
      legislativa: "/legislacao",
      transpar: "/transparencia/",
    };
    const n = nome.toLowerCase();
    const rota = Object.keys(rotas).find((k) => n.includes(k));
    cy.visit(rota ? rotas[rota] : "/");
  }

  rodape() {
    return cy.get("footer");
  }
}

export default new PortalPage();
