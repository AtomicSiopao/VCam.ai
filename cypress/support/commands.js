// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js
Cypress.Commands.add("ignoreReactError", () => {
  cy.on("uncaught:exception", (err) => {
    if (
      err.message.includes("Minified React error") ||
      err.message.includes("React error #418") ||
      err.message.includes('ResizeObserver loop')
    ) {
      return false;
    }
  });
});

Cypress.Commands.add("getButtonByText", (text) => {
  return cy.contains("button", text, { timeout: 10000 });
});

Cypress.Commands.add("getLinkByText", (text) => {
  return cy.contains("a", text, { timeout: 10000 });
});

Cypress.Commands.add("exists", (selector) => {
  return cy.get("body").then(($body) => $body.find(selector).length > 0);
});

Cypress.Commands.add("textExists", (selector, text) => {
  return cy.get("body").then(($body) => {
    Array.from($body.find(selector)).find(
      (el) => el.textContent.trim() === text
    );
  });
});
