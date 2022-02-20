// a.map(el => Object.assign({linkedin: '', }, el))

let graph = [];
let count;
let total;

const forceControl = (index: number) => {
  if (Number(total - index) % 10 === 0) {
    cy.pause();
  }
};

describe('login', () => {
  before(() => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    cy.loginUi(username, password).waitForResources();
  });

  it.skip('count all general', () => {
    cy.fixture('test').then(array => {
      total = array.length;
      array.forEach((item, index) => {
        cy.log(`total : ${total - index}`);

        cy.navigate(undefined, `#${item.hashtag}`);
        cy.getTotalPageNumber();

        cy.get('@times')
          .then(time => {
            graph.push({ website: item.website, hashtag: item.hashtag, linkedin: String(time).trim() });
            cy.log(JSON.stringify(graph));
          })
          .then(() => cy.writeFile(`cypress/fixtures/graph.json`, graph));

        forceControl(index);
      });
    });
  });

  it.only('google links counts', () => {
    cy.fixture('2_test').then(array => {
      total = array.length;
      array.forEach((item, index) => {
        cy.log(`total : ${total - index}`);

        cy.visit('https://www.google.com/search', { qs: { q: item.website } }).waitForResources();
        cy.get('#result-stats').invoke('text').as('result');
        cy.get('@result')
          .then(result => {
            // @ts-ignore
            item.googleCount = result.split('תוצאות')[0].replace(/^\D+/g, '').trim();
            graph.push(item);
            cy.log(JSON.stringify(graph));
            cy.pause();
          })
          .then(() => cy.writeFile(`cypress/fixtures/graph.json`, graph));

        forceControl(index);
      });
    });
  });

  it.skip('should be able to login', () => {
    cy.visit('https://www.facebook.com/');
    // cy.get('[data-testid="field-email"]').type('johndoe@gmail.com');
    // cy.get('[data-testid="field-password"]').type('helloworld123!');
    // cy.get('[data-testid="login-button"]').click();
    // cy.location('pathname').should('eq', '/home');
  });
});
