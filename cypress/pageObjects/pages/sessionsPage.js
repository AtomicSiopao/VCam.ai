class SessionsPage {
  get createSessionButton() {
    return cy.get('[data-testid="create-session-button"]');
  }

  get sessionNameInput() {
    return cy.get('[data-testid="session-name-input"]');
  }

  get createButton() {
    return cy.get('[data-testid="create-button"]');
  }

  getSessionRow(sessionName) {
    return cy.contains('[data-testid="session-row"]', sessionName);
  }

  getDeleteButtonForSession(sessionName) {
    return this.getSessionRow(sessionName).find(
      '[data-testid="delete-session-button"]'
    );
  }

  getConfirmDeleteButton() {
    return cy.get('[data-testid="confirm-delete-button"]');
  }

  createSession(sessionName) {
    this.createSessionButton.click();
    this.sessionNameInput.type(sessionName);
    this.createButton.click();
    this.getSessionRow(sessionName).should("be.visible");
  }

  deleteSession(sessionName) {
    this.getDeleteButtonForSession(sessionName).click();
    this.getConfirmDeleteButton().click();
    this.getSessionRow(sessionName).should("not.exist");
  }
}

module.exports = new SessionsPage();
