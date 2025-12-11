require("dotenv").config();
const { defineConfig } = require("cypress");
// const fs = require("fs");
// const path = require("path");

// Define the path to the cypress.env.json file
// const envConfigPath = path.resolve(__dirname, "cypress.env.json");

// let environmentConfig;

// try {
//   // Read the cypress.env.json file
//   environmentConfig = JSON.parse(fs.readFileSync(envConfigPath, "utf-8"));
// } catch (e) {
//   // If the file doesn't exist, throw a helpful error
//   if (e.code === "ENOENT") {
//     throw new Error(
//       `\n\nERROR: cypress.env.json not found.\n` +
//       `Please create this file by copying cypress.env.json.example to cypress.env.json and filling in the values.\n` +
//       `You can do this by running the following command in your terminal:\n` +
//       `cp cypress.env.json.example cypress.env.json\n\n`
//     );
//   }
//   // If there's another error, re-throw it
//   throw e;
// }

// Get the current environment from the CYPRESS_ENV variable, default to 'live'
// const environment = process.env.CYPRESS_ENV || "live";

// Get the configuration for the current environment
// const config = environmentConfig[environment];
// const config = {
//   baseUrl: process.env.BASEURL,
//   email: process.env.VCAM_EMAIL,
//   password: process.env.VCAM_PASSWORD,
// }

// if (!config) {
//   throw new Error(`Configuration for environment "${environment}" not found in cypress.env.json`);
// }

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
    baseUrl: process.env.BASEURL,
    video: false,
    specPattern: "./cypress/e2e/*.spec.js",
    viewportWidth: 1280,
    viewportHeight: 720,
    env: {
      credentials: {
        email: process.env.VCAM_EMAIL,
        password: process.env.VCAM_PASSWORD,
      },
    },
  },
});
