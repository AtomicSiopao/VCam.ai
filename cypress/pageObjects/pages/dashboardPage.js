class DashboardPage {
  // ====== URL & HEADER MAP ======
  sections = {
    dashboard: { url: "https://dashboard.vcam.ai/", header: "Dashboard" },
    backgrounds: {
      url: "https://dashboard.vcam.ai/app/backgrounds",
      header: "Backgrounds",
    },
    logos: { url: "https://dashboard.vcam.ai/app/logos", header: "Logos" },
    nametags: {
      url: "https://dashboard.vcam.ai/app/nametags",
      header: "Name Tags",
    },
    team: { url: "https://dashboard.vcam.ai/workspace/team", header: "Team" },
    billing: {
      url: "https://dashboard.vcam.ai/workspace/billing",
      header: "Billing",
    },
    settings: {
      url: "https://dashboard.vcam.ai/workspace/settings",
      header: "Settings",
    },
    userSettings: {
      url: "https://dashboard.vcam.ai/settings",
      header: "Personal Settings",
      linkText: "Profile Settings", // matches actual <a> in DOM
      global: true,
    },
    deployment: {
      url: "https://dashboard.vcam.ai/workspace/deployment",
      header: "Deployment",
    },
  };

  // Normalize helper
  normalize(str) {
    return str.toLowerCase().replace(/\s+/g, "");
  }

  // Resolve section from key OR header
  resolveSection(section) {
    const normalized = this.normalize(section);

    // Try direct key match
    if (this.sections[normalized]) {
      return this.sections[normalized];
    }

    // Try matching by header
    const fromHeader = Object.values(this.sections).find(
      (s) => this.normalize(s.header) === normalized
    );

    if (fromHeader) return fromHeader;

    throw new Error(`Invalid section: "${section}".`);
  }

  // ====== ACTIONS ======
  visit() {
    cy.visit(this.sections.dashboard.url);
    return this;
  }

  getLinkByText(text) {
    return cy.contains("a", text, { timeout: 10000 });
  }

  clickLink(text) {
    this.getLinkByText(text).click({ force: true });
    return this;
  }

  checkHeader(section) {
    const sec = this.resolveSection(section);
    cy.get("h1", { timeout: 10000 }).should("contain", sec.header);
    return this;
  }

  checkURL(section) {
    const sec = this.resolveSection(section);
    cy.url().should("eq", sec.url);
    return this;
  }

  // ====== NAVIGATION HELPERS ======
  navigateTo(section) {
    const sec = this.resolveSection(section);

    // Click the link using linkText if defined, otherwise header
    const clickText = sec.linkText || sec.header;
    this.clickLink(clickText);

    // Validate URL and header
    this.checkURL(section);
    this.checkHeader(section);

    return this;
  }

  // ====== SHORTCUTS ======
  goToDashboard() {
    return this.navigateTo("dashboard");
  }
  goToBackgrounds() {
    return this.navigateTo("backgrounds");
  }
  goToLogos() {
    return this.navigateTo("logos");
  }
  goToNameTags() {
    return this.navigateTo("nametags");
  }
  goToTeam() {
    return this.navigateTo("team");
  }
  goToBilling() {
    return this.navigateTo("billing");
  }
  goToSettings() {
    return this.navigateTo("settings");
  }
  goToDeployment() {
    return this.navigateTo("deployment");
  }

  goToBillingFromDashboard() {
    this.clickLink("Dashboard");
    this.clickLink("See plans");
    this.checkURL("billing").checkHeader("billing");
    return this;
  }

  get userSettingsLink(){
    return cy.getLinkByText("Settings");
  }

  get userAvatar() {
    return cy.get('img[data-testid="flowbite-avatar-img"]');
  }

  goToUserSettings() {
    this.userAvatar.click();
    this.userSettingsLink.click()
    return this;
  }

  // Optional helper to detect global pages
  isGlobalPage(section) {
    const sec = this.resolveSection(section);
    return sec.global === true;
  }
}

module.exports = new DashboardPage();
