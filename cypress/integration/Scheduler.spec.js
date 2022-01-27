describe("Scheduler FORM +mode transitions + Buttons Interactions", () =>{
    it("loads the page properly", () =>{
        cy.visit('/')
    })
    it("can type in the form", () =>{
        cy.get('input').type("Valentin")
        cy.get("input").should("have.value", "Valentin")
        cy.get("input").type("{enter}")

    })
    it("can add a button for the student that was interviewer", () =>{
        cy.get("input").type("{enter}")
        
    })
    it("clears the name of interviewer after booked", () =>{})
    it("doesn't add a duplicate button when clicking button", () =>{})
})

describe("Find interview, then book and interview ", () =>{})
it("loads the page properly", () =>{
    cy.visit('/')
})
