const login = require("../pageObjects/components/login");
const settings = require("../pageObjects/components/settings");
const dashboard = require("../pageObjects/pages/dashboardPage");
const onboarding = require("../pageObjects/pages/onboardingPage");

describe("VCam.ai Onboarding", () => {
  beforeEach(() => {
    dashboard.visit();
    login.login();
    cy.ignoreReactError();
  });

  it("Should login and select 'For Personal Use' on the onboarding page", () => {
    onboarding.setForPersonalUse();
    dashboard.goToSettings();
    settings.deleteWorkspace();
  });

  it("Should login and select Team Use on the onboarding page", () => {
    onboarding.setForTeamUse();
    onboarding.setupTeamWorkspace();
    dashboard.goToSettings();
    settings.workspaceName.should("eq", wsName);
  });
});
