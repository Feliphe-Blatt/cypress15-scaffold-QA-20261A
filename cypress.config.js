const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.camara.leg.br",
    specPattern: "cypress/e2e/features/**/*.feature",
    // Site externo de terceiros: relaxa a política de same-origin do Cypress.
    chromeWebSecurity: false,
    // Portal público pode ter latência; dá folga aos comandos.
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
  },
});
