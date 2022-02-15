let count;
let googleCount = [];

describe('login', () => {
  it('should be able to login', () => {
    cy.visit('https://www.facebook.com/');
    // cy.get('[data-testid="field-email"]').type('johndoe@gmail.com');
    // cy.get('[data-testid="field-password"]').type('helloworld123!');
    // cy.get('[data-testid="login-button"]').click();
    // cy.location('pathname').should('eq', '/home');
  });

  it.only('orders', () => {
    let times;
    let check;
    cy.fixture('test.json').then(all => (times = all.length));

    cy.fixture('test.json').each((el, index) => {
      const url = `${el.website}`;
      cy.log(url);
      cy.visit('https://www.google.com/search', { qs: { q: url } }).waitForResources();
      cy.get('#result-stats').invoke('text').as('result');

      cy.get('@result').then(result => {
        const test = result.find('#taw');
        cy.log(test);
        // if (result.find('#taw')) check = !!result.find('#taw');
        debugger;
      });

      // cy.get('@result').then(str => (count = str.split('תוצאות')[0].replace(/\D/g, '')));
      // el.google_count = check ? count : 0;
      // googleCount.push(el);
      // cy.log(JSON.stringify(googleCount));
      // times--;
      // cy.log(`times - ${times}`);
      // cy.pause();

      // debugger;
    });
    // cy.writeFile(`cypress/fixtures/googleSum.json`, googleSum);
  });
});
