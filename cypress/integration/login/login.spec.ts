let googleSum = [];
describe('login', () => {
  it('should be able to login', () => {
    cy.visit('https://www.facebook.com/');

    // cy.get('[data-testid="field-email"]').type('johndoe@gmail.com');
    //
    // cy.get('[data-testid="field-password"]').type('helloworld123!');
    //
    // cy.get('[data-testid="login-button"]').click();
    //
    // cy.location('pathname').should('eq', '/home');
  });

  it.only('orders', () => {
    cy.fixture('shortCompaniesGraph.json').each(el => {
      const url = `www.${el.Letter}.com`;
      cy.visit('https://www.google.com/search', {
        qs: { q: url },
      }).waitForResources();

      cy.get('#result-stats')
        .invoke('text')
        .then(str => {
          // graph.push({ Letter: shortName, Freq: value });
          googleSum.push({ site: el, count: str.split('תוצאות')[0].replace(/\D/g, '') });
          cy.log(JSON.stringify(googleSum));
        });
    });
    cy.writeFile(`cypress/fixtures/googleSum.json`, googleSum);
  });
});
