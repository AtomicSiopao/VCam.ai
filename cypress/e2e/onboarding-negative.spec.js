const login = require("../pageObjects/components/login");
const dashboard = require("../pageObjects/pages/dashboardPage");
const onboarding = require("../pageObjects/pages/onboardingPage");

describe("VCam.ai Onboarding - Negative and Edge Cases", () => {
  beforeEach(() => {
    dashboard.visit();
    login.login();
    cy.ignoreReactError();
  });

  it("Should ensure that skipping the onboarding process leads the user to a default, functional state", () => {
    // This test assumes that there is a way to skip the onboarding process.
    // If not, this test will fail and should be adjusted based on the application's behavior.
    const skipButton = cy.get("button").contains("Skip");
    if (skipButton) {
      skipButton.click();
      dashboard.header.should("be.visible");
    }
  });

  it("Should test completing the onboarding process with the minimum required information", () => {
    onboarding.setForPersonalUse();
    dashboard.header.should("be.visible");
  });
});
