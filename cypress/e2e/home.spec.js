const header = require("../pageObjects/components/header");
const footer = require("../pageObjects/components/footer");
const homePage = require("../pageObjects/pages/homePage");

describe("VCam.ai Home Page", () => {
  beforeEach(() => {
    homePage.visit();
  });

  it("Should check that all the URLs in the header are correct", () => {
    cy.fixture("navigation/positive.json").then((links) => {
      header.checkHeaderLinks(links);
    });
  });

  it("Should check that all the URLs in the footer are correct", () => {
    cy.fixture("navigation/positive.json").then((links) => {
      footer.checkFooterLinks(links);
    });
  });

  it("Should check all URLs in the Home Page are correct", () => {
    homePage.checkHomePageLinks();
  });
});
