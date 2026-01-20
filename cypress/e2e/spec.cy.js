describe('ToDo App Filter Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    // Tyhjennetään localStorage ennen jokaista testiä
    cy.clearLocalStorage();
  });

  it('creates tasks and tests priority filters', () => {
    // Lisää Medium-task
    cy.get('#topic').type('Medium Task');
    cy.get('#priority').select('Medium');
    cy.get('#status').select('To do');
    cy.get('#description').type('Medium priority task');
    cy.get('#save-btn').click();

    // Lisää High-task
    cy.get('#topic').type('High Task');
    cy.get('#priority').select('High');
    cy.get('#status').select('To do');
    cy.get('#description').type('High priority task');
    cy.get('#save-btn').click();

    // Varmistetaan, että molemmat näkyvät All
    cy.get('#task-list li').should('have.length', 2);
    cy.get('#task-list').contains('Medium Task').should('exist');
    cy.get('#task-list').contains('High Task').should('exist');

    // Klikataan Medium filtteri
    cy.get('#priority-filters button[data-filter="medium"]').click();
    cy.get('#task-list li').should('have.length', 1);
    cy.get('#task-list').contains('Medium Task').should('exist');
    cy.get('#task-list').contains('High Task').should('not.exist');

    // Klikataan High filtteri
    cy.get('#priority-filters button[data-filter="high"]').click();
    cy.get('#task-list li').should('have.length', 1);
    cy.get('#task-list').contains('High Task').should('exist');
    cy.get('#task-list').contains('Medium Task').should('not.exist');

    // Klikataan All filtteri
    cy.get('#priority-filters button[data-filter="all"]').click();
    cy.get('#task-list li').should('have.length', 2);
    cy.get('#task-list').contains('High Task').should('exist');
    cy.get('#task-list').contains('Medium Task').should('exist');

    // Siivotaan testidata
    cy.get('#task-list li')
      .contains('Medium Task')
      .closest('li')
      .within(() => {
        cy.get('.controls button[data-action="delete"]').click();
      });
    cy.get('#task-list li')
      .contains('High Task')
      .closest('li')
      .within(() => {
        cy.get('.controls button[data-action="delete"]').click();
      });

    // Varmistetaan, että lista tyhjä
    cy.get('#task-list li').should('have.length', 0);
  });
});
