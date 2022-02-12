describe('login', () => {
  it('should be able to login', () => {
    cy.visit('https://www.facebook.com/');
    // cy.get('[data-testid="field-email"]').type('johndoe@gmail.com');
    // cy.get('[data-testid="field-password"]').type('helloworld123!');
    // cy.get('[data-testid="login-button"]').click();
    // cy.location('pathname').should('eq', '/home');
  });

  it.only('orders', () => {
    cy.fixture('test.json').each(el => {
      const url = `${el.website}`;
      cy.log(url);
      cy.visit('https://www.google.com/search', { qs: { q: url } }).waitForResources();
      cy.get('#result-stats').invoke('text').as('result');
      cy.get('@result').then(str => cy.log(str.split('תוצאות')[0].replace(/\D/g, '')));
      cy.pause();
    });
    // cy.writeFile(`cypress/fixtures/googleSum.json`, googleSum);
  });
});
