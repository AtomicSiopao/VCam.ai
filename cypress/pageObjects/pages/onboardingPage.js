class OnboardingPage {
  get header() {
    return cy
      .get("h1", { timeout: 10000 })
      .should("contain", "How will you be using VCam?");
  }

  get personalUse() {
    return cy
      .get("div.flex.h-full.flex-col.justify-center.gap-4.p-6", {
        timeout: 10000,
      })
      .eq(0);
  }

  get teamUse() {
    return cy
      .get("div.flex.h-full.flex-col.justify-center.gap-4.p-6", {
        timeout: 10000,
      })
      .eq(1);
  }

  get downloadButton() {
    return cy.get('a[at-name="download-button"]');
  }

  get workspaceNameField() {
    return cy.get('input[name="name"]');
  }

  get membersEmailField() {
    return cy.get('textarea[name="emails"]');
  }

  get nextButton() {
    return cy.get('button[type="submit"]');
  }

  get dashboardLink() {
    return cy.getLinkByText("Dashboard");
  }

  setForPersonalUse() {
    // TOOLTIP: selecting personal use automatically creates a workspace
    this.personalUse.click();
    //this.downloadVCam();
    this.goToDashboard();
    return this;
  }

  setForTeamUse() {
    return this.teamUse.click();
  }

  // PERSONAL
  downloadVCam() {
    return this.downloadButton.click();
  }

  // TEAM
  setWorkspaceName() {
    cy.fixture("workspace/positive.json").then((data) => {
      this.workspaceNameField.clear().type(data.workspace.name);
    });
    return this;
  }

  inviteMembers() {
    cy.fixture("workspace/positive.json").then((data) => {
      cy.wrap(data.workspace.members).each((member) => {
        this.membersEmailField.type(member + ",");
      });
      this.nextButton.click();
    });

    return this;
  }

  setupTeamWorkspace() {
    this.setWorkspaceName();
    this.inviteMembers();
    this.goToDashboard();
  }

  goToDashboard() {
    this.dashboardLink.click();
    cy.url().should("eq", "https://dashboard.vcam.ai/");
  }
}
module.exports = new OnboardingPage();
