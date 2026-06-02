const { defineConfig } = require("cypress");
const browserify = require('@cypress/browserify-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    specPattern: 'cypress/e2e/features/**/*.feature',
    setupNodeEvents(on, config) {
      const options = browserify.defaultOptions;
      // register the cucumber preprocessor
      on('file:preprocessor', cucumber(options));
      return config;
    },
  },
});
