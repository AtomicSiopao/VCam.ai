class DashboardPage {
  // ====== SELECTORS ======
  get header() {
    return cy.get("h1", { timeout: 10000 }).should("contain", "Dashboard");
  }

  get invalidURLHeader() {
    return cy.get("p").should("contain", "404");
  }

  get passwordField() {
    return cy.get('input[name="password"]');
  }

  get continueButton() {
    return cy.get('button[data-localization-key="formButtonPrimary"]');
  }

  // ====== CONSTANT MAP ======
  dashboardURLs = {
    dashboard: "https://dashboard.vcam.ai/",
    backgrounds: "https://dashboard.vcam.ai/app/backgrounds",
    logos: "https://dashboard.vcam.ai/app/logos",
    "name tags": "https://dashboard.vcam.ai/app/nametags",
    team: "https://dashboard.vcam.ai/workspace/team",
    billing: "https://dashboard.vcam.ai/workspace/billing",
    settings: "https://dashboard.vcam.ai/workspace/settings",
    deployment: "https://dashboard.vcam.ai/workspace/deployment",
    invalid: "https://dashboard.vcam.ai/asdasdasd",
  };

  // ====== ACTIONS ======
  visit() {
    cy.visit("https://dashboard.vcam.ai/");
    return this;
  }

  getLinkByText(text) {
    return cy.contains("a", text, { timeout: 10000 });
  }

  clickLink(text) {
    this.getLinkByText(text).click({ force: true });
    return this;
  }

  checkURL(section) {
    const expectedURL = this.dashboardURLs[section.toLowerCase()];
    cy.url().should("eq", expectedURL);
    return this;
  }

  // ====== NAVIGATION ======
  navigateTo(page) {
    // Wait for a stable navigation element to ensure the menu is loaded
    this.getLinkByText("Backgrounds").should("be.visible");

    if (page.toLowerCase() === "dashboard") {
      this.clickLink("Backgrounds");
      this.checkURL("dashboard");
    } else {
      this.clickLink(page);
      this.checkURL(page);
    }
    return this;
  }

  navigateToBillingFromDashboard() {
    this.clickLink("Dashboard");
    this.clickLink("See plans");
    this.checkURL("billing");
    return this;
  }

  navigateToInvalidPage() {
    cy.visit(this.dashboardURLs.invalid, { failOnStatusCode: false });
    this.invalidURLHeader.should("be.visible");
    return this;
  }
}

module.exports = new DashboardPage();
