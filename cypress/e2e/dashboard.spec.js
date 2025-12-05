const login = require("../pageObjects/components/login");
const dashboard = require("../pageObjects/pages/dashboardPage");
const background = require("../pageObjects/components/background");
const logo = require("../pageObjects/components/logo");
const nametag = require("../pageObjects/components/nametag");
const settings = require("../pageObjects/components/settings");
const team = require("../pageObjects/components/team");
const billing = require("../pageObjects/components/billing");
const userSettings = require("../pageObjects/components/userSettings");
const now = new Date().toLocaleTimeString();

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
      dashboard.navigateTo("Settings");
      dashboard.goToBillingFromDashboard();
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

    it("Negative: Should display an error message when uploading a file with an unsupported format", () => {
      background.addBackground("unsupported");
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

    it("Should setup a Name Tag", () => {
      cy.fixture("users/positive.json")
        .then((user) => {
        user = user[1];
          nametag.selectNameTagDesign(user.nametag.design);
          nametag.setNameTag(user.name, user.nametag.position);
          nametag.allowNameTagsInApp(user.nametag.allowNameTagsInApp);
          nametag.allowMembersToToggleNameTag(user.nametag.allowMembersToToggleNameTag);
          nametag.allowMembersToSetDetails(user.nametag.allowMembersToSetDetails);
          nametag.allowMembersToSetDesign(user.nametag.allowMembersToSetDesign);
          nametag.selectNameTagDesign(0); //Cleanup. Set to default design again.
        });
    });
  });

  describe("SETTINGS", () => {
    beforeEach(() => {
      dashboard.navigateTo("Settings");
    });

    it("Should set new workspace name", () => {
      settings.renameWorkspace();
    });

    // it.skip("Should leave workspace if account has more than 1 workspace", () => {
    //   settings.leaveWorkspace();
    // });

    // it.skip("[SKIP] Should delete workspace if account has more than 1 workspace", () => {
    //   // CURRENTLY SKIPPED DUE TO NUMBER OF WORKSPACES AVAILABLE IN TEST ACCOUNT
    //   settings.deleteWorkspace();
    // });

    // it.skip("[SKIP] Domain and Workspace Discovery - Current LIMITATION", () => {
    //   // Workspace Discovery cannot be tested via automation
    //   const domain = "marco.com";
    //   const verificationEmail = "kopi@marco.com";
    //   settings.addDomain(domain, "Invite only", verificationEmail); // type: Instant Access, Request to join, Invite only
    // });
  });

  // describe("TEAM", () => {
  //   beforeEach(() => {
  //     dashboard.navigateTo("Team");
  //   });

  //   it.skip("[SKIP] Should invite Users/Team Members via the Team Menu", () => {
  //     team.inviteUsers(emails, "Member");
  //   });
  // });

  describe("License Upgrade", () => {
    beforeEach(() => {
      dashboard.goToBilling();
    });

    it("should upgrade license by redeeming license code", () => {
      cy.fixture("workspace/positive").then((data) => {
        billing.upgradeLicense(data.workspace.code);
      });
    });
  });

  describe("User Profile", () => {
    beforeEach(() => {
      dashboard.goToUserSettings();
    });

    it("should update user's name", () => {
      cy.fixture("workspace/positive").then((data) => {
        userSettings.updateUserInfo(data.user.firstName, data.user.lastName);
      });
    });
  });
});
