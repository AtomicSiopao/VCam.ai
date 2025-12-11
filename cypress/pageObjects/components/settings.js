class Settings {
  get header() {
    return cy
      .get("h1", { timeout: 10000 })
      .should("contain", "Workspace Settings");
  }

  get uploadLogoButton() {
    return cy.get('button[title="Upload logo"]');
  }

  get workspaceNameField() {
    return cy.get('input[name="name"]');
  }

  get workspaceName() {
    return this.workspaceNameField.invoke("val").as("workspaceName");
  }

  get saveButton() {
    return cy.getButtonByText("Save");
  }

  get workspaceDiscoveryHeader() {
    return cy.get("h2").should("contain", "Workspace Discovery");
  }

  get addDomainButton() {
    return cy.getButtonByText("Add domain");
  }

  get verificationEmailField() {
    return cy.get('input[name="emailAddress"]');
  }

  get addDomainButtonOnModal() {
    //return cy.get('button[type="submit"]');
    return cy.getButtonByText("Cancel").siblings("button");
  }

  get domainField() {
    return cy.get('input[name="domain"]');
  }

  get leaveWorkspaceHeader() {
    return cy.get("h2").should("contain", "Leave Workspace");
  }

  get cancelButton() {
    return cy.getButtonByText("Cancel");
  }

  setDomainDiscovery(type) {
    cy.getButtonByText(type).click();
  }

  renameWorkspace(newWSName) {
    const now = new Date();
    const timestamp = now.getTime();
    let ts = `${newWSName} ${timestamp}`;

    // cy.intercept("GET", "**/v1/organizations/org_36QNxkuTZtVaHhnI5DnOh2xKdWY?*").as("workspaceDetails");
    // cy.wait("@workspaceDetails").its("response.statusCode").should("eq", 200);
    cy.wait(1500);
    cy.log("Renaming workspace to: ", ts);
    this.workspaceNameField.clear().type(ts, { delay: 50 });
    this.saveButton.click();
    return this;
  }

  leaveWorkspace() {
    this.workspaceName;
    cy.get("@workspaceName").then((name) => {
      cy.getButtonByText(`Leave "${name}"`).click();
      this.workspaceNameField.last().type(name);
      this.cancelButton.siblings("button").click();
    });
    return this;
  }

  addDomain(domain, type, verificationEmail) {
    this.addDomainButton.click();
    this.domainField.clear().type(domain);
    this.setDomainDiscovery(type);
    this.addDomainButtonOnModal.click();
    this.verificationEmailField.clear().type(verificationEmail);
  }

  deleteWorkspace() {
    this.workspaceName;
    cy.get("@workspaceName").then((name) => {
      cy.getButtonByText(`Delete "${name}"`).click();
      this.workspaceNameField.last().type(name);
      this.cancelButton.siblings("button").click();
    });
  }
}
module.exports = new Settings();
