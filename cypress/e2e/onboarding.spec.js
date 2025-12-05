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

  it("Should select 'For Personal Use' on the onboarding page", () => {
    onboarding.setForPersonalUse();
  });

  it("Should select 'for Team Use' on the onboarding page", () => {
    onboarding.setForTeamUse();
    cy.fixture("workspace/positive.json").then((workspace) => {
      cy.fixture("users/positive.json").then((users) => {
        onboarding.setupTeamWorkspace(workspace.name, users);
        dashboard.navigateTo("Settings");
        settings.workspaceName.should("eq", workspace.name);
      });
    });
  });
});
