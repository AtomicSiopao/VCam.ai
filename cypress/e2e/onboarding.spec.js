const login = require("../pageObjects/components/login");
const settings = require("../pageObjects/components/settings");
const dashboard = require("../pageObjects/pages/dashboardPage");
const onboarding = require("../pageObjects/pages/onboardingPage");

describe("VCam.ai Dashboard", () => {
  beforeEach(() => {
    dashboard.visit();
    login.login();
    cy.ignoreReactError();
    // SETUP
    dashboard.navigateTo("Settings");
    settings.deleteWorkspace();
  });

  it("Should select 'For Personal Use' on the onboarding page", () => {
    onboarding.setForPersonalUse();
    // CLEAN UP
  });

  it.skip("Should select 'for Team Use' on the onboarding page", () => {
    onboarding.setForTeamUse();
    onboarding.setupTeamWorkspace();
    dashboard.navigateTo("Settings");
    cy.fixture("workspace.json")
      .as("workspace")
      .then((workspace) => {
        const wsName = workspace.name;
        settings.workspaceName.should("eq", wsName);
      });
  });
});
