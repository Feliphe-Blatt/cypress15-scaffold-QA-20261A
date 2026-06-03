/// <reference types="cypress" />

// PageObject da busca do portal da Câmara dos Deputados.
// Seletores PROVISÓRIOS — confirmar ao vivo na Fase 6.
class BuscaPage {
  // Reaproveita o comando customizado cy.buscarNoPortal (boas práticas).
  buscar(termo) {
    cy.buscarNoPortal(termo);
  }

  // Lista de resultados da busca. PROVISÓRIO.
  resultados() {
    return cy.get(
      '.busca-resultados a, .resultado a, [class*="result"] a, main article a, main ul li a'
    );
  }

  abrirPrimeiroResultado() {
    this.resultados().first().click();
  }

  // Mensagem exibida quando a busca não encontra nada. PROVISÓRIO (confirmar texto real).
  mensagemSemResultado() {
    return cy.contains(/nenhum resultado|não encontr|0 resultado|sem resultado/i);
  }
}

export default new BuscaPage();
