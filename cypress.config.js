require("dotenv").config();
const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

// Function to get config from cypress.env.json
const getConfigFromEnvFile = () => {
  const envConfigPath = path.resolve(__dirname, "cypress.env.json");
  try {
    const environmentConfig = JSON.parse(fs.readFileSync(envConfigPath, "utf-8"));
    const environment = process.env.CYPRESS_ENV || "live";
    const config = environmentConfig[environment];

    if (!config) {
      throw new Error(`Configuration for environment "${environment}" not found in cypress.env.json`);
    }
    return {
      baseUrl: config.baseUrl,
      email: config.email,
      password: config.password,
    };
  } catch (e) {
    if (e.code === "ENOENT") {
      // Suppress error if running in CI with env vars
      if (process.env.BASEURL && process.env.USER_EMAIL && process.env.USER_PASSWORD) {
        return null;
      }
      throw new Error(
        `\n\nERROR: cypress.env.json not found.\n` +
        `Please create this file by copying cypress.env.json.example to cypress.env.json and filling in the values.\n` +
        `You can do this by running the following command in your terminal:\n` +
        `cp cypress.env.json.example cypress.env.json\n\n`
      );
    }
    throw e;
  }
};

// Determine config from environment variables or file
const baseUrl = process.env.BASEURL;
const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;

let finalConfig;

if (baseUrl && email && password) {
  finalConfig = { baseUrl, email, password };
} else {
  finalConfig = getConfigFromEnvFile();
  if (!finalConfig) {
      throw new Error("Cypress configuration could not be loaded. Please provide environment variables or a valid cypress.env.json file.");
  }
}

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
    baseUrl: finalConfig.baseUrl,
    video: false,
    specPattern: "./cypress/e2e/*.spec.js",
    viewportWidth: 1280,
    viewportHeight: 720,
    env: {
      credentials: {
        email: finalConfig.email,
        password: finalConfig.password,
      },
    },
  },
});
