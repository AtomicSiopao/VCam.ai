const settings = require("../pageObjects/components/settings");
const dashboard = require("../pageObjects/pages/dashboardPage");
const onboarding = require("../pageObjects/pages/onboardingPage");

describe("VCam.ai Onboarding", () => {
  beforeEach(() => {
    cy.login(
      Cypress.env("credentials").email,
      Cypress.env("credentials").password
    );
  });

  it("Should login and select 'For Personal Use' on the onboarding page", () => {
    onboarding.setForPersonalUse();
    dashboard.goToSettings();
    settings.deleteWorkspace();
  });

  it("Should select 'for Team Use' on the onboarding page", () => {
    onboarding.setForTeamUse();
    cy.fixture("workspace/positive.json").then((data) => {
      cy.fixture("users/positive.json").then((users) => {
        onboarding.setupTeamWorkspace(data.workspace.name, users);
        dashboard.navigateTo("Settings");
        settings.workspaceName.should("eq", data.workspace.name);
      });
    });
  });
});
