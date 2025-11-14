const homePage = require("../pageObjects/pages/homePage");

describe("VCam.ai Home Page - Negative and Edge Cases", () => {
  beforeEach(() => {
    homePage.visit();
  });

  it("Should verify that broken or dead links are handled gracefully", () => {
    cy.get("a").each((page) => {
      const link = page.prop("href");
      cy.request({
        url: link,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.not.equal(404);
      });
    });
  });

  it("Should test the responsiveness of the home page on various screen sizes", () => {
    const viewports = ["iphone-6", "ipad-2", "macbook-15"];
    viewports.forEach((viewport) => {
      cy.viewport(viewport);
      cy.wait(200); // Allow time for the page to resize
      homePage.checkHomePageLinks();
    });
  });
});
