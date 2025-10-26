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

  // ====== NAVIGATION SHORTCUTS ======
  // GENERAL
  clickDashboard() {
    return this.clickLink("Dashboard");
  }
  clickDownloadForWindows() {
    return this.clickLink("Download for Windows");
  }
  clickLearnHowToUseVCam() {
    return this.clickLink("Learn how to use VCam");
  }
  clickSeePlans() {
    return this.clickLink("See plans");
  }
  clickInviteTeamNow() {
    return this.clickLink("Invite team now");
  }
  clickManage() {
    return this.clickLink("Manage");
  }

  // APP
  clickBackgrounds() {
    return this.clickLink("Backgrounds");
  }
  clickLogos() {
    return this.clickLink("Logos");
  }
  clickNameTags() {
    return this.clickLink("Name Tags");
  }

  // WORKSPACE
  clickTeam() {
    return this.clickLink("Team");
  }
  clickBilling() {
    return this.clickLink("Billing");
  }
  clickSettings() {
    return this.clickLink("Settings");
  }
  clickDeployment() {
    return this.clickLink("Deployment");
  }

  // OTHERS
  clickHelpCenter() {
    return this.clickLink("Help center");
  }
  clickGiveFeedback() {
    return this.clickLink("Give feedback");
  }

  // ====== GO TO ======
  goToDashboard() {
    this.clickBackgrounds().checkURL("dashboard");
  }

  goToBackgrounds() {
    this.clickBackgrounds().checkURL("backgrounds");
  }

  goToLogos() {
    this.clickLogos().checkURL("logos");
  }

  goToNameTags() {
    this.clickNameTags().checkURL("name tags");
  }

  goToTeam() {
    this.clickTeam().checkURL("team");
  }

  goToBilling() {
    this.clickBilling().checkURL("billing");
  }

  goToBillingFromDashboard() {
    this.clickDashboard().clickSeePlans().checkURL("billing");
  }

  goToSettings() {
    this.clickSettings().checkURL("settings");
  }
}

module.exports = new DashboardPage();
