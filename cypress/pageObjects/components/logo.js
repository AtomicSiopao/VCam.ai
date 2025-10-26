class LogoPage {
  // ====== SELECTORS ======
  get header() {
    return cy.get("h1", { timeout: 10000 }).should("contain", "Logos");
  }

  get addLogoButton() {
    return cy.getButtonByText("Add logo");
  }

  get setAsDefaultLogoCheckbox() {
    return cy.contains("label", "Set as default logo").find("input");
  }

  get browseFilesButton() {
    return cy.getButtonByText("Browse files");
  }

  get uploadLogoButton() {
    return cy.getButtonByText("Upload logo");
  }

  get cancelButton() {
    return cy.getButtonByText("Cancel");
  }

  get permissionsToast() {
    return cy.get('div[data-testid="flowbite-toast"]');
  }

  get numberOfLogos() {
    return cy.get("body").then(($body) => {
      const $ul = $body.find("ul.flex.flex-row.gap-4.flex-wrap");
      const count = $ul.length > 0 ? $ul.children().length : 0;
      return cy.wrap(count);
    });
  }

  get saveLogosButton() {
    return cy.getButtonByText("Save Logos");
  }

  // ====== HELPERS ======
  logCount(label, count) {
    cy.log(`${label}: ${count}`);
  }

  waitForUploadCompletion(beforeCount) {
    const checkUntilIncreased = (retries = 10) => {
      return this.numberOfLogos.then((afterCount) => {
        cy.log(`Current: ${afterCount}, Before: ${beforeCount}`);

        if (afterCount > beforeCount) {
          return cy.wrap(afterCount);
        } else if (retries > 0) {
          cy.wait(1000);
          return cy.wrap(null).then(() => checkUntilIncreased(retries - 1)); // 👈 safe chaining
        } else {
          throw new Error("Logo count did not increase");
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
  clickAddLogoButton() {
    this.addLogoButton.click();
    return this;
  }

  setAsDefaultLogo() {
    this.setAsDefaultLogoCheckbox.check({ force: true });
    return this;
  }

  uploadFile(filePath) {
    this.browseFilesButton.selectFile(filePath, { action: "drag-drop" });
    this.uploadLogoButton.click();
    return this;
  }

  uploadAnImage() {
    cy.getButtonByText("Upload an image").click();
    return this.uploadFile("cypress/fixtures/aslogo.png");
  }

  uploadAVideo() {
    cy.getButtonByText("Upload a Video").click();
    return this.uploadFile("cypress/fixtures/muhehehe.mp4");
  }

  clickStockPhotoByUnsplash() {
    return cy.getButtonByText("Stock Photo by Unsplash");
  }

  deleteLogo() {
    // Get all logo items
    cy.get("ul.flex.flex-row.gap-4.flex-wrap > li").then(($items) => {
      const count = $items.length;

      if (count === 0) {
        cy.log("⚠️ No logo found to delete");
        return;
      }

      // Hover and check each logo one by one
      cy.wrap($items).each(($item) => {
        cy.wrap($item)
          .realHover()
          .find('input[type="checkbox"]')
          .check({ force: true });
      });

      const buttonText =
        count === 1 ? "Delete Logo" : `Delete ${count} Logos`;

      cy.getButtonByText(buttonText).click();
      this.cancelButton.siblings('button').click();
    });
  }

  // ====== FLOWS ======
  /**
   * Adds logo via image upload and verifies increment
   */

  addLogoByImageUpload() {
    return this.numberOfLogos.then((beforeCount) => {
      this.logCount("Before image upload", beforeCount);

      this.clickAddLogoButton();
      this.uploadAnImage();

      cy.wait(7000);

      return this.waitForUploadCompletion(beforeCount);
    });
  }

  /**
   * Adds logo via video upload and verifies increment
   */
  addLogoByVideoUpload() {
    return this.numberOfLogos.then((beforeCount) => {
      this.logCount("Before video upload", beforeCount);

      this.clickAddLogoButton();
      this.uploadAVideo();
      cy.wait(7000);

      return this.waitForUploadCompletion(beforeCount);
    });
  }

  setLogoPermissionSettings(state) {
    this.toggleSwitch(0, state);
  }
}

module.exports = new LogoPage();