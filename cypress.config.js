require("dotenv").config();
const { defineConfig } = require("cypress");

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
