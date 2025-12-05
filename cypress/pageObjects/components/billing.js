class billingPage {

  // ===== GETTERS ======

  get redeemLicenseLink() {
    return cy.getLinkByText("Redeem a license key");
  }

  get redemptionCodeField() {
    return cy.get(
      'input[placeholder="eg. 7073925a-5826-4c34-b432-c9c87e4ba87c"]'
    );
  }

  get redeemButton() {
    return cy.getButtonByText("Redeem license key");
  }

  // ===== METHODS ======
  upgradeLicense(code) {
    this.redeemLicenseLink.click();
    this.redemptionCodeField.clear().type(code);
    this.redeemButton.click();
    return this;
  }
}

module.exports = new billingPage();
