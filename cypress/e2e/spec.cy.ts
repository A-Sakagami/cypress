describe('ログイン', () => {
  it('一般ユーザーでログイン', () => {
    cy.visit('/');
    cy.title().should('include', 'Workflow Tool');
  })
})