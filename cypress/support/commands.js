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

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/"); // Adjust if your login page is not the root
  cy.get("input#identifier-field", { timeout: 10000 }).as("emailAddressField");
  cy.get('input[name="password"]').as("passwordField");
  cy.get('button[data-localization-key="formButtonPrimary"]').as(
    "continueButton"
  );

  cy.get("@emailAddressField").clear().click().type(email, { log: false });
  cy.get("@continueButton").click();
  cy.get("@passwordField")
    .should("be.visible")
    .clear()
    .click()
    .type(password, { log: false });
  cy.get("@continueButton").click();

  // Add a check to ensure login was successful, e.g., by verifying a dashboard element
  cy.get("h1", { timeout: 10000 }).should("contain", "Dashboard");
});

Cypress.Commands.add("logout", () => {
  // Replace with your application's logout logic
  cy.get('[data-testid="user-avatar"]').click();
  cy.contains("Logout").click();
  cy.url().should("include", "/login");
});
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");
  cy.get("input#identifier-field", { timeout: 10000 }).as("emailAddressField");
  cy.get('input[name="password"]').as("passwordField");
  cy.get('button[data-localization-key="formButtonPrimary"]').as(
    "continueButton"
  );

  cy.get("@emailAddressField").clear().click().type(email, { log: false });
  cy.get("@continueButton").click();
  cy.get("@passwordField")
    .should("be.visible")
    .clear()
    .click()
    .type(password, { log: false });
  cy.get("@continueButton").click();

  // Add a check to ensure login was successful, e.g., by verifying a dashboard element
  cy.get("h1", { timeout: 10000 }).should("contain", "Dashboard");
});
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js
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
