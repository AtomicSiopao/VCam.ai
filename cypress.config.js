const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports", // where reports are saved
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    chromeWebSecurity: false,
    baseUrl: "https://vcam.ai/",
    video: false,
    specPattern: "./cypress/e2e/*.spec.js",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
