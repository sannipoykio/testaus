describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173');
    // Täytetään lomake
    cy.get('#topic').type('Test Task'); // tehtävän nimi
    cy.get('#priority').select('High'); // valitaan prioriteetti
    cy.get('#status').select('To do'); // valitaan status
    cy.get('#description').type('This is a test task'); // kuvaus

    // Klikataan Save/Submit
    cy.get('#save-btn').click();

    // Tarkistetaan, että tehtävä näkyy listassa
    cy.get('#task-list').contains('Test Task').should('exist');
  });
});
