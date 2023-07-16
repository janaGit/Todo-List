describe('Update tasks', () => {
  it('Add a new task', () => {
    cy.visit('/')
    cy.get('#list').children().should('have.length', 0);
    cy.get('#new-task-title').type('New task');
    cy.get('#add-task').click();
    cy.get('#list').children().should('have.length', 1);
  })
})
