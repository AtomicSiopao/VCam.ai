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
    cy.visit("https://dashboard.vcam.ai/");
    return this;
  }

  inputEmailAddress() {
    cy.ignoreReactError();
    const email = Cypress.env("VCAM_EMAIL");
    this.emailAddressField.clear().click().type(email);
    return this;
  }

  inputPassword() {
    const password = Cypress.env("VCAM_PASSWORD");
    this.passwordField.clear({ force: true }).click({ force: true }).type(password, { force: true });
    return this;
  }

  clickContinue() {
    this.continueButton.click();
    return this;
  }

  login() {
    this.inputEmailAddress();
    this.inputPassword().clickContinue();
  }
}

module.exports = new Login();
