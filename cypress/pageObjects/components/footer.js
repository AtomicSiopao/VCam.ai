class footer {
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
    return cy.getLinkByText(text).invoke("attr", "href").should("contain", url);
  }

  checkFooterLinks(links) {
    links.footerLinks.map(({ text, url }) => this.checkURLInLink(text, url));
  }
}
module.exports = new footer();
