require("dotenv").config();
const { defineConfig } = require("cypress");

const getBaseUrl = () => {
  // Always prioritize process.env.BASEURL from GitHub Secrets or .env
  if (process.env.BASEURL) {
    return process.env.BASEURL;
  }
  // Default to live dashboard if no BASEURL is provided
  return "https://dashboard.vcam.ai/";
};

const baseUrl = getBaseUrl();

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
    testIsolation: true,
    chromeWebSecurity: false,
    baseUrl: baseUrl,
    video: false,
    specPattern: "./cypress/e2e/*.spec.js",
    viewportWidth: 1280,
    viewportHeight: 720,
    env: {
      landingPageUrl: baseUrl.replace("dashboard.", ""),
      credentials: {
        email: process.env.VCAM_EMAIL,
        password: process.env.VCAM_PASSWORD,
      },
    },
  },
});
