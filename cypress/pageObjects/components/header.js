class header {
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
    return cy.getLinkByText(text).invoke("attr", "href").should("eq", url);
  }

  checkHeaderLinks(links) {
    links.headerLinks.map(({ text, url }) => this.checkURLInLink(text, url));
  }
}

module.exports = new header();
