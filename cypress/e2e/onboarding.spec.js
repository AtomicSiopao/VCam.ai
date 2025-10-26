const login = require("../pageObjects/components/login");
const settings = require("../pageObjects/components/settings");
const dashboard = require("../pageObjects/pages/dashboardPage");
const onboarding = require("../pageObjects/pages/onboardingPage");

describe("VCam.ai Dashboard", () => {
  beforeEach(() => {
    dashboard.visit();
    login.login();
    cy.ignoreReactError();
  });

  it("Should login and select 'For Personal Use' on the onboarding page", () => {
    onboarding.setForPersonalUse();
    onboarding.downloadVCam();
    dashboard.goToSettings();
    settings.deleteWorkspace();
  });

  it.only("Should login and select Team Use on the onboarding page", () => {
    const wsName = "wowowork";
    const members = [
      "test@test.com",
      "test2@test.com",
      "test3@test.com",
      //"test4@test.com",
      //"test5@test.com",
    ];
    onboarding.setForTeamUse();
    onboarding.setupTeamWorkspace(wsName, members);
    dashboard.goToSettings();
    settings.workspaceName.should('eq', wsName);
  });
});
