const footer = require("../pageObjects/components/footer");
const header = require("../pageObjects/components/header");
const homePage = require("../pageObjects/pages/homePage");

describe("VCam.ai Home Page", () => {
  beforeEach(() => {
    homePage.visit();
  });

  it("Should check that all the URLs in the header are correct", () => {
    header.checkHeaderLinks();
  });

  it("Should check that all the URLs in the footer are correct", () => {
    footer.checkFooterLinks();
  });

  it("Should check all URLs in the Home Page are correct", () => {
    homePage.checkHomePageLinks();
  });
});
