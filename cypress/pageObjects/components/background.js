class BackgroundPage {
  // ====== SELECTORS ======
  get header() {
    return cy.get("h1", { timeout: 10000 }).should("contain", "Backgrounds");
  }

  get addBackgroundButton() {
    return cy.getButtonByText("Add background");
  }

  get setAsDefaultBackgroundCheckbox() {
    return cy.contains("label", "Set as default background").find("input");
  }

  get browseFilesButton() {
    return cy.getButtonByText("Browse files");
  }

  get uploadBackgroundButton() {
    return cy.getButtonByText("Upload background");
  }

  get cancelButton() {
    return cy.getButtonByText("Cancel");
  }

  get invalidFileFormatMessage() {
    return cy.get(
      'span[class="flex justify-center text-xs text-red-600 dark:text-red-400"]'
    );
  }

  get permissionsToast() {
    return cy.get('div[data-testid="flowbite-toast"]');
  }

  get backgrounds() {
    return cy.get("ul.flex.flex-row.gap-4.flex-wrap");
  }

  get backgroundsList() {
    return cy.get("body").then(($body) => {
      const $ul = $body.find("ul.flex.flex-row.gap-4.flex-wrap");
      const count = $ul.length > 0 ? $ul.children().length : 0;
      return cy.wrap(count);
    });
  }

  get backgroundCheckbox() {
    return cy.get(
      "input.h-4.w-4.appearance-none.rounded.border.border-gray-300"
    );
  }

  get backgroundDropdown() {
    return cy.get("button.flex.items-center");
  }

  get unsplashList() {
    return cy.get("div.flex.flex-col.gap-1", { timeout: 5000 });
  }

  get saveBackgroundsButton() {
    return cy.getButtonByText("Save backgrounds");
  }

  get backgroundDropdownButton() {
    return cy.get("button.flex.items-center");
  }

  get setAsDefaultBackgroundButton() {
    return cy.getButtonByText("Set as default background");
  }
  get editBackgroundButton() {
    return cy.getButtonByText("Edit background");
  }

  get deleteBackgroundButton() {
    return cy.getButtonByText("Delete Background");
  }

  get confirmDeleteBackgroundButton() {
    return cy.getButtonByText("Delete Background");
  }

  // ====== HELPERS ======
  logCount(label, count) {
    cy.log(`${label}: ${count}`);
  }

  waitForUploadCompletion(beforeCount) {
    const checkUntilIncreased = (retries = 10) => {
      return this.backgroundsList.then((afterCount) => {
        cy.log(`Current: ${afterCount}, Before: ${beforeCount}`);

        if (afterCount > beforeCount) {
          return cy.wrap(afterCount);
        } else if (retries > 0) {
          cy.wait(1000);
          return cy.wrap(null).then(() => checkUntilIncreased(retries - 1));
        } else if (afterCount < beforeCount) {
          return cy.log("no background added");
        }
      });
    };

    return checkUntilIncreased().then((afterCount) => {
      this.logCount("After upload", afterCount);
    });
  }

  toggleSwitch(index, expectedState) {
    cy.get('button[role="switch"]')
      .eq(index)
      .invoke("attr", "aria-checked")
      .then((isChecked) => {
        const shouldBeChecked = Boolean(expectedState);
        if ((isChecked === "true") !== shouldBeChecked) {
          cy.get('button[role="switch"]').eq(index).click();
        }
      });
  }

  verifyToastMessage(expectedText) {
    this.permissionsToast
      .should("contain.text", expectedText)
      .and("be.visible");
    return this;
  }

  // ====== ACTIONS ======
  clickAddBackgroundButton() {
    this.addBackgroundButton.click();
    return this;
  }

  setAsDefaultBG() {
    this.setAsDefaultBackgroundCheckbox.check({ force: true });
    return this;
  }

  uploadFile(filePath) {
    this.browseFilesButton.selectFile(filePath, { action: "drag-drop" });
    return this;
  }

  uploadAnImage() {
    cy.getButtonByText("Upload an image").click();
    this.uploadFile("cypress/fixtures/aslogo.png");
    this.uploadBackgroundButton.click();
    return this;
  }

  uploadAVideo() {
    cy.getButtonByText("Upload a Video").click();
    this.uploadFile("cypress/fixtures/muhehehe.mp4");
    this.uploadBackgroundButton.click();
    return this;
  }

  uploadUnsupportedFormat() {
    cy.getButtonByText("Upload an image").click();
    this.uploadFile("cypress/fixtures/muhehehe.mp4");
  }

  clickStockPhotoByUnsplash() {
    return cy.getButtonByText("Stock Photo by Unsplash");
  }

  deleteBackground() {
    // Get all background items
    cy.get("ul.flex.flex-row.gap-4.flex-wrap > li").then(($items) => {
      const count = $items.length;

      if (count === 0) {
        cy.log("⚠️ No backgrounds found to delete");
        return;
      }

      // Hover and check each background one by one
      cy.wrap($items).each(($item) => {
        cy.wrap($item)
          .realHover()
          .find('input[type="checkbox"]')
          .check({ force: true });
      });

      const buttonText =
        count === 1 ? "Delete Background" : `Delete ${count} Backgrounds`;

      cy.getButtonByText(buttonText).click();
      this.cancelButton.siblings("button").click();
    });
  }

  // ====== FLOWS ======
  addBackground(type, options = {}) {
    return this.backgroundsList.then((beforeCount) => {
      this.logCount(`Before ${type} upload`, beforeCount);
      this.clickAddBackgroundButton();

      switch (type) {
        case "image":
          this.uploadAnImage();
          break;
        case "video":
          this.uploadAVideo();
          break;
        case "unsupported":
          this.uploadUnsupportedFormat();
          this.invalidFileFormatMessage
            .contains("Invalid file. Please try again.")
            .should("be.visible");
          cy.wait(1000);
          this.cancelButton.should("be.visible").and("be.enabled").click();
          break;
        case "stock":
          this.clickStockPhotoByUnsplash().click();
          this.unsplashList.should("exist").children().first().click();
          this.saveBackgroundsButton.click();
          break;
        default:
          this.invalidFileFormatMessage
            .contains("Invalid file. Please try again.")
            .should("be.visible");
      }

      return this.waitForUploadCompletion(beforeCount);
    });
  }

  setBackgroundStateMemberSettings(state) {
    this.toggleSwitch(0, state);
  }

  setBackgroundPermissionSettings(state) {
    this.toggleSwitch(1, state);
  }
}

module.exports = new BackgroundPage();
