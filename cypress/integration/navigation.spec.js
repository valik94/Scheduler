describe("Navigation", () => {
  //TEST 1 - VISIT /
  it("should visit root", () => {
    cy.visit("/");
  });

  //TEST 2 - TUESDAY
  it("should navigate to Tuesday", () => {
    cy.contains("li", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
