import sessionsPage from "../../pageObjects/pages/sessionsPage";
import dashboardPage from "../../pageObjects/pages/dashboardPage";

describe("Session Management", () => {
  beforeEach(() => {
    // Assuming a custom login command exists and is configured
    cy.session("loginSession", () => {
      cy.login(
        Cypress.env("credentials").email,
        Cypress.env("credentials").password
      );
    });
    dashboardPage.visit();
    dashboardPage.navigateTo("Sessions");
  });

  it("should allow creating and deleting a single session", () => {
    const sessionName = `Test Session ${new Date().getTime()}`;

    sessionsPage.createSession(sessionName);
    sessionsPage.deleteSession(sessionName);
  });
});
