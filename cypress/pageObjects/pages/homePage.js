class HomePage {
  // GETTERS / LOCATORS
  get vcamLogo() {
    return cy.get('svg[aria-label="VCam logo"]');
  }

  get dashboardURL() {
    return cy.url();
  }

  get contactSalesButton(){
    return cy.getButtonByText("Contact Sales");
  }

  // ASSERTIONS
  verifyDashboardURL() {
    this.dashboardURL.should("include", "dashboard.vcam.ai");
    return this;
  }

  // ACTIONS
  visit() {
    cy.visit("https://vcam.ai/");
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
  clickLogInLink() { return this.clickLink("Log in"); }
  clickGetStartedLink() { return this.clickLink("Get started"); }
  clickForCompaniesAndTeamsLink() { return this.clickLink("For companies & teams"); }
  clickUseCasesMenuButton() { return this.clickButton("Use Cases"); }
  clickFeaturesMenuLink() { return this.clickLink("Features"); }
  clickPricingMenuLink() { return this.clickLink("Pricing"); }
  clickResourcesMenuButton() { return this.clickButton("Resources"); }

  // VALIDATIONS
  checkURLInLink(text, expectedUrl) {
    cy.getLinkByText(text)
      .should("have.attr", "href", expectedUrl);
    return this;
  }

  getAllGetStartedButtons() {
    cy.getLinkByText("Get started").each(($el) => {
      cy.wrap($el)
        .should("have.attr", "href", "https://dashboard.vcam.ai/");
    });
    return this;
  }

  checkHomePageLinks() {
    const linksToCheck = [
      {
        text: "Read the Intel white paper",
        url: "https://www.intel.com/content/dam/develop/external/us/en/documents/xsplitvcam.pdf",
      },
      {
        text: "Learn how to get started",
        url: "https://help.vcam.ai/en/article/quick-start-guide-1a762y2/",
      },
      {
        text: "Contact Sales",
        url: "https://www.vcam.ai/sales",
      },
    ];

    linksToCheck.forEach(({ text, url }) => this.checkURLInLink(text, url));
    return this;
  }
}

module.exports = new HomePage();
