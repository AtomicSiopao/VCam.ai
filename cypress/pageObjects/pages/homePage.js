class HomePage {
  // GETTERS / LOCATORS
  get vcamLogo() {
    return cy.get('svg[aria-label="VCam logo"]');
  }

  get dashboardURL() {
    return cy.url();
  }

  // ASSERTIONS
  verifyDashboardURL() {
    this.dashboardURL.should("include", "dashboard.vcam.ai");
    return this;
  }

  // ACTIONS
  visit() {
    cy.visit(Cypress.env("landingPageUrl") || "https://vcam.ai/");
    this.vcamLogo.should("be.visible");
    return this;
  }

  clickLink(text) {
    cy.ignoreReactError();
    cy.getLinkByText(text).click();
    return this;
  }

  clickButton(text) {
    cy.getButtonByText(text).click();
    return this;
  }

  // NAVIGATION SHORTCUTS
  clickLogInLink() {
    return this.clickLink("Log in");
  }
  clickGetStartedLink() {
    return this.clickLink("Get started");
  }
  clickForCompaniesAndTeamsLink() {
    return this.clickLink("For companies & teams");
  }
  clickUseCasesMenuButton() {
    return this.clickButton("Use Cases");
  }
  clickFeaturesMenuLink() {
    return this.clickLink("Features");
  }
  clickPricingMenuLink() {
    return this.clickLink("Pricing");
  }
  clickResourcesMenuButton() {
    return this.clickButton("Resources");
  }

  // VALIDATIONS
  checkURLInLink(text, expectedUrl) {
    cy.getLinkByText(text).should("have.attr", "href", expectedUrl);
    return this;
  }

  getAllGetStartedButtons() {
    cy.getLinkByText("Get started").each(($el) => {
      cy.wrap($el).should("have.attr", "href", "https://dashboard.vcam.ai/");
    });
    return this;
  }

  checkHomePageLinks() {
    cy.fixture("links").then((links) => {
      links.homePageLinks.forEach(({ text, url }) => {
        this.checkURLInLink(text, url);
      });
    });
    return this;
  }
}

module.exports = new HomePage();
