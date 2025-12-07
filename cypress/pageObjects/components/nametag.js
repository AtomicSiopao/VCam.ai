class NameTagPage {
  get header() {
    return cy.get("h1", { timeout: 10000 }).should("contain", "Name Tags");
  }

  get nameTagDesigns() {
    return cy.get("div.relative.group.aspect-video.w-64.h-36.rounded-md");
  }

  get nameTagDesignDropdown() {
    return cy.get("button.flex.items-center");
  }

  get setAsDefault() {
    return cy.getButtonByText("Set as default");
  }

  get nameTagsList() {
    return cy.get("body").then(($body) => {
      const $ul = $body.find("ul.flex.flex-row.gap-4");
      const count = $ul.length > 0 ? $ul.children().length : 0;
      return cy.wrap(count);
    });
  }

  get nameField() {
    return cy.get('input[name="name"]');
  }

  get descriptionField() {
    return cy.get('input[name="description"]');
  }

  get saveButton() {
    return cy.getButtonByText("Save");
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
    return this;
  }

  selectNameTagDesign(index) {
    return this.nameTagDesigns
      .eq(index)
      .should("be.visible")
      .realHover()
      .within(() => {
        this.nameTagDesignDropdown.click({ force: true });
        this.setAsDefault.click({ force: true });
      });
  }

  setName(name) {
    return this.nameField.clear().type(name);
  }

  setDescription(desc) {
    return this.descriptionField.clear().type(desc);
  }

  setNameTag(name, desc) {
    this.setName(name);
    this.setDescription(desc);
    this.saveButton.click();
    return this;
  }

  allowNameTagsInApp(state) {
    return this.toggleSwitch(0, state);
  }

  allowMembersToToggleNameTag(state) {
    return this.toggleSwitch(1, state);
  }

  allowMembersToSetDetails(state) {
    return this.toggleSwitch(2, state);
  }

  allowMembersToSetDesign(state) {
    return this.toggleSwitch(3, state);
  }
}

module.exports = new NameTagPage();
