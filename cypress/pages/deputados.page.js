/// <reference types="cypress" />

// PageObject da consulta de deputados (camara.leg.br/deputados/quem-sao).
// Seletores PROVISÓRIOS — confirmar ao vivo na Fase 6.
class DeputadosPage {
  visitar() {
    cy.visit("/deputados/quem-sao");
  }

  // Lista todos os deputados submetendo o formulário de filtro (sem filtros). A lista de
  // resultados (a.nome-deputado) só é renderizada após submeter a busca. O formulário é
  // identificado pelo <select> de UF (que contém opções como "SP").
  listarTodos() {
    cy.get("select").then(($sels) => {
      const ufSelect = [...$sels].find((s) =>
        [...s.options].some((o) => o.value.trim() === "SP" || o.text.trim() === "SP")
      );
      const form = ufSelect?.closest("form");
      if (form) {
        cy.wrap(form).submit();
      }
    });
  }

  // Links de perfis de deputados na lista de resultados (carrega via AJAX).
  // Ex.: <a class="nome-deputado" href="https://www.camara.leg.br/deputados/204554">
  lista() {
    return cy.get("a.nome-deputado");
  }

  buscarPorNome(nome) {
    // o campo "Nome" é o primeiro input de texto visível do formulário de filtro.
    cy.get("input[name='nome'], input[type='text']")
      .filter(":visible")
      .first()
      .clear()
      .type(nome)
      .then(($input) => {
        const form = $input[0].closest("form");
        if (form) {
          cy.wrap(form).submit();
        }
      });
  }

  // Acha em toda a página o <select> com a opção da UF (ex.: SP, RJ), seleciona e submete o form.
  filtrarPorUf(uf) {
    cy.get("select").then(($sels) => {
      const alvo = [...$sels].find((s) =>
        [...s.options].some((o) => o.value.trim() === uf || o.text.trim() === uf)
      );
      expect(alvo, `<select> com a UF "${uf}"`).to.exist;
      cy.wrap(alvo).select(uf);
      const form = alvo.closest("form");
      if (form) {
        cy.wrap(form).submit();
      }
    });
  }

  // Abre o primeiro perfil de deputado da lista de resultados.
  abrirPrimeiro() {
    this.lista().first().scrollIntoView().click({ force: true });
  }

  // Conteúdo do perfil de um deputado. PROVISÓRIO.
  perfil() {
    return cy.get("main, .deputado, #deputado, h1");
  }
}

export default new DeputadosPage();
