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

  //LOGIN
  // it("Should login to VCam.ai Dashboard using valid credentials", () => {
  //   login.login();
  // });

  // DASHBOARD NAVIGATION
  it("Should check navigation in the Dashboard while logged in", () => {
    dashboard.goToDashboard();
    dashboard.goToBackgrounds();
    dashboard.goToLogos();
    dashboard.goToNameTags();
    dashboard.goToTeam();
    dashboard.goToBilling();
    dashboard.goToBillingFromDashboard();
    dashboard.goToSettings();
  });

  // BACKGROUNDS
  it("Should go to the Backgrounds page and upload image file as background then remove all backgrounds", () => {
    dashboard.goToBackgrounds();
    background.addBackgroundByImageUpload();
    background.deleteBackground(); // cleanup
  });

  it("Should go to the Backgrounds page and upload video file as background ", () => {
    dashboard.goToBackgrounds();
    background.addBackgroundByVideoUpload();
    background.deleteBackground(); // cleanup
  });

  it("Should go to the Backgrounds page and select a stock photo as background ", () => {
    dashboard.goToBackgrounds();
    background.addBackgroundByStockPhoto();
    background.setBackgroundStateMemberSettings(1);
    background.setBackgroundPermissionSettings(0);
    background.deleteBackground(); // cleanup
  });

  // LOGOS
  it("Should go to the Logos page and upload image file as logo ", () => {
    dashboard.goToLogos();
    logo.addLogoByImageUpload();
    logo.deleteLogo(); // cleanup
  });

  it("Should go to the Logos page and upload video file as logo ", () => {
    dashboard.goToLogos();
    logo.addLogoByVideoUpload();
    logo.setLogoPermissionSettings(1);
    logo.deleteLogo(); // cleanup
  });

  // NAME TAGS
  it("Should go to Name Tags and setup a Name Tag", () => {
    dashboard.goToNameTags();
    nametag.selectNameTagDesign(2);
    nametag.setNameTag("KopiBoi", "Resident Sleeper");
    nametag.allowNameTagsInApp(0); // 1 to enable
    nametag.allowMembersToToggleNameTag(0);
    nametag.allowMembersToSetDetails(0);
    nametag.allowMembersToSetDesign(0);
    nametag.selectNameTagDesign(0); //Cleanup. Set to default design again.
  });

  it("Should go to Settings and set new workspace name", () => {
    dashboard.goToSettings();
    settings.renameWorkspace("Workspace ni Kopi");
  });

  it("Should go to Settings and leave workspace if account has more than 1 workspace", () => {
    dashboard.goToSettings();
    settings.leaveWorkspace();
  });

  it("Should go to Settings set delete workspace if account has more than 1 workspace", () => {
    dashboard.goToSettings();
    settings.deleteWorkspace();
  });

  it.skip("SKIP: Domain and Workspace Discovery - Current LIMITATION", () => {
    // Workspace Discovery cannot be tested via automation
    const domain = "marco.com";
    const verificationEmail = "kopi@marco.com";
    dashboard.goToSettings();
    settings.addDomain(domain, "Invite only", verificationEmail); // type: Instant Access, Request to join, Invite only
  });

  it.skip("[SKIP] Should invite Users/Team Members via the Team Menu", () => {
    const emails = [
      "test@tesuto.com",
      "test2@tesuto.com",
      "test3@tesuto.com",
      //"test4@test.com",
      //"test5@test.com",
    ];
    dashboard.goToTeam();
    team.inviteUsers(emails, "Member");
  });
});
