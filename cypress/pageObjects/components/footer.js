class footer {
  getButtonByText(btnText) {
    return cy.contains("button", btnText);
  }

  getLinkByText(linkText) {
    return cy.contains("a", linkText);
  }
  clickUseCasesMenuButton() {
    return cy.getButtonByText("Use Cases").click();
  }

  clickFeaturesMenuLink() {
    return cy.getLinkByText("Features").click();
  }

  clickPricingMenuLink() {
    return cy.getLinkByText("Pricing").click();
  }

  clickResourcesMenuButton() {
    return cy.getButtonByText("Resources").click();
  }

  checkURLInLink(text, url) {
    return this.getLinkByText(text).invoke("attr", "href").should("contain", url);
  }

  checkFooterLinks() {
    cy.fixture("navigation/positive.json").then((links) => {
      links.footerLinks.map(({ text, url }) => this.checkURLInLink(text, url));
    });
  }
}
module.exports = new footer();
