const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    reportFilename: "[name]",
  },
  numTestsKeptInMemory: 5,
  e2e: {
    experimentalMemoryManagement: true,
    chromeWebSecurity: false,
    baseUrl: "https://vcam.ai/",
    video: false,
    specPattern: ["./cypress/e2e/*.spec.js", "./cypress/e2e/features/*.feature"],
    viewportWidth: 1280,
    viewportHeight: 720,
    env: {
      credentials: {
        email: process.env.VCAM_EMAIL,
        password: process.env.VCAM_PASSWORD,
        baseUrl: process.env.DASHBOARD_URL,
      },
    },
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
