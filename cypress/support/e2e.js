// ***********************************************************
// Carregado automaticamente antes de cada arquivo de teste (spec).
// Bom lugar para configuração e comportamento globais.
// Doc: https://on.cypress.io/configuration
// ***********************************************************

import "./commands";

// O Portal da Câmara é um site público de terceiros e pode lançar exceções de
// JavaScript (scripts de analytics/terceiros, etc.) que não têm relação com os
// nossos testes. Por padrão o Cypress falharia o teste nesse caso — e no Windows
// isso ainda dispara o bug do "toPosix" (cypress-io/cypress#26142).
// Ignoramos essas exceções da aplicação para os cenários não quebrarem por algo
// fora do nosso escopo de teste.
Cypress.on("uncaught:exception", () => false);
