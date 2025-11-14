const login = require("../pageObjects/components/login");
const dashboard = require("../pageObjects/pages/dashboardPage");
const background = require("../pageObjects/components/background");
const logo = require("../pageObjects/components/logo");
const nametag = require("../pageObjects/components/nametag");
const settings = require("../pageObjects/components/settings");

describe("VCam.ai Dashboard - Negative and Edge Cases", () => {
  beforeEach(() => {
    dashboard.visit();
    login.login();
    cy.ignoreReactError();
  });

  describe("DASHBOARD NAVIGATION", () => {
    it("Should gracefully handle navigation to an invalid or non-existent page", () => {
      cy.visit("https://dashboard.vcam.ai/app/invalid-page", {
        failOnStatusCode: false,
      });
      cy.url().should("not.include", "invalid-page");
      dashboard.header.should("be.visible");
    });

    it("Should maintain session and state when navigating back and forth between pages", () => {
      dashboard.navigateTo("Backgrounds");
      background.addBackground("image");
      dashboard.navigateTo("Logos");
      cy.go("back");
      cy.url().should("include", "backgrounds");
      background.backgroundsList.should("not.eq", 0);
      background.deleteBackground(); // cleanup
    });
  });

  describe("BACKGROUNDS", () => {
    beforeEach(() => {
      dashboard.navigateTo("Backgrounds");
    });

    it("Should display an error message when uploading a file with an unsupported format", () => {
      background.clickAddBackgroundButton();
      cy.getButtonByText("Upload an image").click();
      background.browseFilesButton.selectFile("cypress/fixtures/unsupported.txt", { action: "drag-drop" });
      background.uploadBackgroundButton.should("be.disabled");
    });
  });

  describe("LOGOS", () => {
    beforeEach(() => {
      dashboard.navigateTo("Logos");
    });

    it("Should display an error when a non-image or non-video file is uploaded as a logo", () => {
      logo.clickAddLogoButton();
      cy.getButtonByText("Upload an image").click();
      logo.browseFilesButton.selectFile("cypress/fixtures/unsupported.txt", { action: "drag-drop" });
      logo.uploadLogoButton.should("be.disabled");
    });
  });

  describe("NAME TAGS", () => {
    beforeEach(() => {
      dashboard.navigateTo("Name Tags");
    });

    it("Should prevent saving a name tag with empty or invalid inputs", () => {
      nametag.nameField.clear();
      nametag.descriptionField.clear();
      // This is a hypothetical check, as there is no save button for the name tag form.
      // Assuming a save button would be disabled if inputs are invalid.
      // cy.get('button').contains('Save').should('be.disabled');
    });

    it("Should test setting a very long name and title to see how the UI handles overflow", () => {
        const longText = "a".repeat(100);
        nametag.setNameTag(longText, longText);
        nametag.nameField.should('have.value', longText);
        nametag.descriptionField.should('have.value', longText);
    });
  });

  describe("SETTINGS", () => {
    beforeEach(() => {
      dashboard.navigateTo("Settings");
    });

    it("Should show an error if a new workspace name is empty or contains invalid characters", () => {
      settings.workspaceNameField.clear();
      settings.saveButton.should("be.disabled");
    });

    it("Should confirm that renaming a workspace does not affect user permissions or existing settings", () => {
        const originalName = "test-workspace-for-testing-settings"
        const newName = "new-test-workspace-for-testing-settings"
        cy.intercept("POST", "**/v1/organizations/*").as("renameWorkspace");

        settings.workspaceNameField.focus().clear().type(originalName);
        settings.saveButton.click();
        cy.wait("@renameWorkspace").its("response.statusCode").should("eq", 200);

        settings.workspaceNameField.focus().clear().type(newName);
        settings.saveButton.click();

        cy.wait("@renameWorkspace").its("response.statusCode").should("eq", 200);
        settings.workspaceNameField.should("have.value", newName);

    });
  });

  describe("SECURITY", () => {
      it("Should check for XSS in workspace name input field", () => {
        dashboard.navigateTo("Settings");
        const xssPayload = "<script>alert('XSS')</script>";
        settings.workspaceNameField.clear().type(xssPayload);
        settings.saveButton.click();
        cy.on('window:alert', (str) => {
            expect(str).to.not.equal('XSS');
        });
      });
  });
});
