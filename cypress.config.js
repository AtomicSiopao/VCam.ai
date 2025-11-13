require('dotenv').config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports", // where reports are saved
    overwrite: false,
    html: false,
    json: true,
  },
  numTestsKeptInMemory: 5,
  e2e: {
    experimentalMemoryManagement: true,
    chromeWebSecurity: false,
    baseUrl: "https://vcam.ai/",
    video: false,
    specPattern: "./cypress/e2e/*.spec.js",
    viewportWidth: 1280,
    viewportHeight: 720,
    env: {
      credentials: {
        email: process.env.VCAM_EMAIL,
        password: process.env.VCAM_PASSWORD,
        baseUrl: process.env.DASHBOARD_URL,
      },
    },
  },
});
