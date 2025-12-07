class UserSettingsPage {
  // ====== SELECTORS ======

  get firstNameField() {
    return cy.get('input[name="firstName"]');
  }

  get lastNameField() {
    return cy.get('input[name="lastName"]');
  }

  get emailField() {
    // display only
    return cy.get('input[type="email"]');
  }

  get saveButton() {
    return cy.getButtonByText("Save");
  }

  get changePasswordButton() {
    return cy.getButtonByText("Change password");
  }

  get currentPasswordField() {
    return cy.get('input[name="currentPassword"]');
  }

  get newPasswordField() {
    return cy.get('input[name="newPassword"]');
  }

  get confirmNewPasswordField() {
    return cy.get('input[name="confirmNewPassword"]');
  }

  get signOutOfOtherSessionsCheckbox() {
    return cy.get('input[name="signOutOfOtherSessions"]');
  }

  get deleteMyAccountButton() {
    return cy.getButtonByText("Delete my account");
  }

  // ====== METHODS ======

  updateFirstName(firstName) {
    this.firstNameField.clear().type(firstName);
  }

  updateLastName(lastName) {
    this.lastNameField.clear().type(lastName);
  }

  updateUserInfo(firstName, lastName) {
    this.updateFirstName(firstName);
    this.updateLastName(lastName);
    this.saveButton.click();
    return this;
  }

  changePassword() {
    this.changePasswordButton.click();
  }
}
module.exports = new UserSettingsPage();
