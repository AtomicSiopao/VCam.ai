const dashboard = require("../pages/dashboardPage");
class Login {
  get header() {
    return cy
      .get("h1", { timeout: 10000 })
      .should("contain", "Welcome to VCam");
  }

  get appleSocialButton() {
    return cy.get(".cl-socialButtonsIconButton__apple");
  }

  get googleSocialButton() {
    return cy.get(".cl-socialButtonsIconButton__google");
  }

  get microsoftSocialButton() {
    return cy.get(".cl-socialButtonsIconButton__microsoft");
  }

  get emailAddressField() {
    return cy.get("input#identifier-field", { timeout: 10000 });
  }

  get passwordField() {
    return cy.get('input[name="password"]');
  }

  get continueButton() {
    return cy.get('button[data-localization-key="formButtonPrimary"]');
  }

  visit() {
    return cy.visit(Cypress.config("baseUrl"));
  }

  inputEmailAddress() {
    cy.ignoreReactError();
    const { email } = Cypress.env("credentials");
    this.emailAddressField.clear().click().type(email, { log: false });
    return this;
  }

  inputPassword() {
    const { password } = Cypress.env("credentials");
    this.passwordField.clear().click().type(password, { log: false });
    return this;
  }

  clickContinue() {
    this.continueButton.click();
    return this;
  }

  login() {
    cy.visit("/");
    this.inputEmailAddress().clickContinue();
    this.passwordField.should("be.visible");
    this.inputPassword().clickContinue();
  }

  createSession() {
    cy.session("dashboardSession", () => {
      this.login();
      dashboard.checkHeader("Dashboard");
    });
  }

  createSessionForOnboarding() {
    cy.session("onboardingSession", () => {
      this.login();
      //dashboard.checkHeader("Onboarding");
    });
  }

  destroySession() {
    Cypress.session.clearAllSavedSessions();
  }
}

module.exports = new Login();
