class header {
  getButtonByText(btnText) {
    return cy.contains("button", btnText);
  }

  getLinkByText(linkText) {
    return cy.contains("a", linkText);
  }
  clickUseCasesMenuButton() {
    return this.getButtonByText("Use Cases").click();
  }

  clickFeaturesMenuLink() {
    return this.getLinkByText("Features").click();
  }

  clickPricingMenuLink() {
    return this.getLinkByText("Pricing").click();
  }

  clickResourcesMenuButton() {
    return this.getButtonByText("Resources").click();
  }

  checkURLInLink(text, url) {
    return this.getLinkByText(text).invoke("attr", "href").should("eq", url);
  }

  checkHeaderLinks() {
    const headerLinks = [
      {
        text: "Finance",
        url: "https://www.vcam.ai/use-cases/finance",
      },
      {
        text: "Telehealth",
        url: "https://www.vcam.ai/use-cases/telehealth",
      },
      {
        text: "Remote Work",
        url: "https://www.vcam.ai/use-cases/remote-work",
      },
      {
        text: "Content Creators",
        url: "https://www.vcam.ai/use-cases/content-creators",
      },
      {
        text: "Education",
        url: "https://www.vcam.ai/use-cases/education",
      },
      {
        text: "Features",
        url: "https://www.vcam.ai/features",
      },
      {
        text: "Pricing",
        url: "https://www.vcam.ai/pricing",
      },
      {
        text: "News & Blog",
        url: "https://www.vcam.ai/blog",
      },
    ];
    headerLinks.map(({ text, url }) => this.checkURLInLink(text, url));
  }
}

module.exports = new header();
