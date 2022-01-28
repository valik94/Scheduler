describe("Navigation", () => {
    //TEST 1 - VISIT /
    it("should visit root", () => {
      cy.visit("/");
    });
   

//TEST 2 - TUESDAY
  it("should navigate to Tuesday", () => {
 
  cy.contains("li", "Tuesday").click()
  .should("have.class", "day-list__item--selected");
  });
}); 

// //TEST 3 - BOOK INTERVIEW /
// describe("BOOKING - should book an interview", () => {
    
//     it("visits root of web server", () => {
//       cy.visit("/");
//     }
//     it("Clicks on 'Add' button in second appointment", () => {
//       cy.contains("Add").click()
//     }
//     it("Enters their name (John Smith)", () => {
//       cy.get('input').type('John Smith')
//     });
//     it("Enters their name (John Smith)", () => {
//         cy.get('input').type('John Smith')
//       });
    // it("Should click on Add button in second appointment"), () =>{
    
    // }

})

//TEST 4 - EDIT INTERVIEW /
describe("EDITING Interview", () => {
    
    it("should edit an interview", () => {
      cy.visit("/");
    });

})
//TEST 4 - CANCEL INTERVIEW /
describe("CANCEL Interview", () => {
    
    it("should cancel an interview", () => {
      cy.visit("/");
    });

})





// describe("Scheduler FORM +mode transitions + Buttons Interactions", () =>{
//     it("loads the page properly", () =>{
//         cy.visit('/')
//     })
//     it("can type in the form", () =>{
//         cy.get('input').type("Valentin")
//         cy.get("input").should("have.value", "Valentin")
//         cy.get("input").type("{enter}")

//     })
//     it("can add a button for the student that was interviewer", () =>{
//         cy.get("input").type("{enter}")
        
//     })
//     it("clears the name of interviewer after booked", () =>{})
//     it("doesn't add a duplicate button when clicking button", () =>{})
// })

// describe("Find interview, then book and interview ", () =>{})
// it("loads the page properly", () =>{
//     cy.visit('/')
// })
