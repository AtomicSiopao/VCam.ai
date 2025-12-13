class DashboardPage {

  // Normalize helper
  normalize(str) {
    return str.toLowerCase().replace(/\s+/g, "");
  }

  resolveSection(section) {
    const normalized = this.normalize(section);

    if (this.sections[normalized]) {
      return this.sections[normalized];
    }

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

  checkURL(section) {
    const sec = this.resolveSection(section);
    //cy.url().should("eq", sec.url);
    cy.location("pathname").should("eq", sec.url);
    return this;
  }

  checkHeader(section) {
    const sec = this.resolveSection(section);
    cy.get("h1", { timeout: 10000 }).should("contain", sec.header);
    return this;
  }

  // ====== NAVIGATION HELPERS ======

  navigateTo(section) {
    const sec = this.resolveSection(section);

    const clickText = sec.linkText || sec.header;
    this.clickLink(clickText);

    this.checkURL(section);
    this.checkHeader(section);

    return this;
  }

  get userSettingsLink() {
    return cy.getLinkByText("Settings");
  }

  get userAvatar() {
    return cy.get('img[data-testid="flowbite-avatar-img"]');
  }

  goToUserSettings() {
    this.userAvatar.click();
    this.userSettingsLink.click();
    return this;
  }

  isGlobalPage(section) {
    const sec = this.resolveSection(section);
    return sec.global === true;
  }
}

module.exports = new DashboardPage();
