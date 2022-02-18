// a.map(el => Object.assign({linkedin: '', }, el))

let graph = [];

describe('login', () => {
  before(() => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    cy.loginUi(username, password).waitForResources();
  });

  it('count all general', () => {
    let count;
    let total;
    cy.fixture('test').then(array => {
      count = array.length;
      total = array.length;

      array.forEach((item, index) => {
        cy.log(`count : ${count}`);
        cy.log(`total : ${total - index}`);

        cy.navigate(undefined, `#${item.hashtag}`);
        cy.getTotalPageNumber();

        cy.get('@times')
          .then(time => {
            graph.push({ website: item.website, hashtag: item.hashtag, linkedin: String(time).trim() });
            cy.log(JSON.stringify(graph));
            cy.log(String(count));
            count -= 1;
          })
          .then(() => cy.writeFile(`cypress/fixtures/graph.json`, graph));

        if (Number(total - index) % 10 === 0) {
          cy.pause();
        }
      });
    });
  });

  it.skip('gulugulu', () => {
    let times;
    let check;
    cy.fixture('1_test.json').then(all => (times = all.length));

    cy.fixture('1_test.json').each((el, index) => {
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

  it.skip('should be able to login', () => {
    cy.visit('https://www.facebook.com/');
    // cy.get('[data-testid="field-email"]').type('johndoe@gmail.com');
    // cy.get('[data-testid="field-password"]').type('helloworld123!');
    // cy.get('[data-testid="login-button"]').click();
    // cy.location('pathname').should('eq', '/home');
  });
});
