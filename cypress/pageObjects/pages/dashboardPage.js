class DashboardPage {
  // ====== SELECTORS ======
  get header() {
    return cy.get("h1", { timeout: 10000 }).should("contain", "Dashboard");
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
    if (!expectedURL) {
      throw new Error(
        `Invalid section: "${section}". Check your dashboardURLs map.`
      );
    }

    cy.url().should("eq", expectedURL);
    return this;
  }

  // ====== NAVIGATION ======
  navigateTo(page) {
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
}

module.exports = new DashboardPage();
