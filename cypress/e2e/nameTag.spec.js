const login = require("../pageObjects/components/login");
const team = require("../pageObjects/components/team");
const dashboard = require("../pageObjects/pages/dashboardPage");

describe("VCam.ai Dashboard", () => {
  beforeEach(() => {
    dashboard.visit();
  });

  it("Should login to VCam.ai Dashboard using valid credentials", () => {
    const emails = [
      "test@test.com",
      "test2@test.com",
      "test3@test.com",
      "test4@test.com",
      "test5@test.com",
    ];
    login.login();
    cy.ignoreReactError();
    dashboard.goToTeam();
    team.inviteUsers(emails, "Admin");
  });
});
