const login = require("../pageObjects/components/login");
const dashboard = require("../pageObjects/pages/dashboardPage");
const background = require("../pageObjects/components/background");
const logo = require("../pageObjects/components/logo");
const nametag = require("../pageObjects/components/nametag");
const settings = require("../pageObjects/components/settings");
const team = require("../pageObjects/components/team");

describe("VCam.ai Dashboard", () => {
  beforeEach(() => {
    dashboard.visit();
    login.login();
    cy.ignoreReactError();
  });

  describe("DASHBOARD NAVIGATION", () => {
    it("Should check navigation in the Dashboard while logged in", () => {
      dashboard.navigateTo("Dashboard");
      dashboard.navigateTo("Backgrounds");
      dashboard.navigateTo("Logos");
      dashboard.navigateTo("Name Tags");
      dashboard.navigateTo("Team");
      dashboard.navigateTo("Billing");
      dashboard.navigateToBillingFromDashboard();
      dashboard.navigateTo("Settings");
    });
  });

  describe("BACKGROUNDS", () => {
    beforeEach(() => {
      dashboard.navigateTo("Backgrounds");
    });

    it("Should upload image file as background then remove all backgrounds", () => {
      background.addBackground("image");
      background.deleteBackground(); // cleanup
    });

    it("Should upload video file as background", () => {
      background.addBackground("video");
      background.deleteBackground(); // cleanup
    });

    it("Should select a stock photo as background", () => {
      background.addBackground("stock");
      background.setBackgroundStateMemberSettings(1);
      background.setBackgroundPermissionSettings(0);
      background.deleteBackground(); // cleanup
    });
  });

  describe("LOGOS", () => {
    beforeEach(() => {
      dashboard.navigateTo("Logos");
    });

    it("Should upload image file as logo", () => {
      logo.addLogoByImageUpload();
      logo.deleteLogo(); // cleanup
    });

    it("Should upload video file as logo", () => {
      logo.addLogoByVideoUpload();
      logo.setLogoPermissionSettings(1);
      logo.deleteLogo(); // cleanup
    });
  });

  describe("NAME TAGS", () => {
    beforeEach(() => {
      dashboard.navigateTo("Name Tags");
    });

    it.only("Should setup a Name Tag", () => {
      cy.fixture("users.json")
        .as("users")
        .then((user) => {
          nametag.selectNameTagDesign(2);
          nametag.setNameTag(user[1].name, user[1].nametag);
          nametag.allowNameTagsInApp(1); // 1 to enable
          nametag.allowMembersToToggleNameTag(0);
          nametag.allowMembersToSetDetails(0);
          nametag.allowMembersToSetDesign(0);
          nametag.selectNameTagDesign(0); //Cleanup. Set to default design again.
        });
    });
  });

  describe("SETTINGS", () => {
    beforeEach(() => {
      dashboard.navigateTo("Settings");
    });

    it("Should set new workspace name", () => {
      cy.fixture("workspace.json").then((workspace) => {
        settings.renameWorkspace(workspace.name);
      });
    });

    it("Should leave workspace if account has more than 1 workspace", () => {
      settings.leaveWorkspace();
    });

    it.skip("[SKIP] Should delete workspace if account has more than 1 workspace", () => {
      // CURRENTLY SKIPPED DUE TO NUMBER OF WORKSPACES AVAILABLE IN TEST ACCOUNT
      settings.deleteWorkspace();
    });

    it.skip("[SKIP] Domain and Workspace Discovery - Current LIMITATION", () => {
      // Workspace Discovery cannot be tested via automation
      const domain = "marco.com";
      const verificationEmail = "kopi@marco.com";
      settings.addDomain(domain, "Invite only", verificationEmail); // type: Instant Access, Request to join, Invite only
    });
  });

  describe("TEAM", () => {
    beforeEach(() => {
      dashboard.navigateTo("Team");
    });

    it.skip("[SKIP] Should invite Users/Team Members via the Team Menu", () => {
      team.inviteUsers(emails, "Member");
    });
  });
});
