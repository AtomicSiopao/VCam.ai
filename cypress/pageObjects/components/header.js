class header {
  getButtonByText(btnText) {
    return cy.contains("button", btnText);
  }

  getLinkByText(linkText) {
    return cy.contains("a", linkText);
  }
  clickUseCasesMenuButton() {
    return this.getButtonByText("Use Cases").click();
  }

  clickFeaturesMenuLink() {
    return this.getLinkByText("Features").click();
  }

  clickPricingMenuLink() {
    return this.getLinkByText("Pricing").click();
  }

  clickResourcesMenuButton() {
    return this.getButtonByText("Resources").click();
  }

  checkURLInLink(text, url) {
    return this.getLinkByText(text).invoke("attr", "href").should("eq", url);
  }

  checkHeaderLinks() {
    cy.fixture("links.json").then((links) => {
      links.headerLinks.map(({ text, url }) => this.checkURLInLink(text, url));
    });
  }
}

module.exports = new header();
