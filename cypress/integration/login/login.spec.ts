// a.map(el => Object.assign({linkedin: '', }, el))
// import Sheet from '../../sheet';

const username = Cypress.env('username');
const password = Cypress.env('password');
let graph = [];
let count;
let total;

const forceControl = (index: number) => {
  if (Number(total - index) % 10 === 0) {
    cy.pause();
  }
};

describe('login', () => {
  it.skip('hashtags on linkedin', () => {
    cy.linkedInLogin(username, password).waitForResources();
    cy.fixture('test').then(array => {
      total = array.length;
      array.forEach((item, index) => {
        cy.log(`🗣️🗣️🗣️🗣️🗣️ total : ${total - index}`);

        cy.linkedInHashtags(undefined, `#${item.hashtag}`);
        cy.linkedInTotalPageNumbers();

        cy.get('@times')
          .then(time => {
            graph.push({ website: item.website, hashtag: item.hashtag, linkedin: String(time).trim() });
            cy.log(JSON.stringify(graph));
          })
          .then(() => cy.writeFile(`cypress/fixtures/graph.json`, graph));

        // forceControl(index);
      });
    });
  });

  it.skip('links on google', () => {
    cy.fixture('test').then(array => {
      total = array.length;
      array.forEach((item, index) => {
        cy.log(`🗣️🗣️🗣️🗣️🗣️ total : ${total - index}`);

        cy.googleBackLinks(item.website);

        cy.get('#result-stats').invoke('text').as('result');
        cy.get('@result')
          .then(result => {
            // @ts-ignore
            item.googleCount = result.split('תוצאות')[0].replace(/^\D+/g, '').trim();
            graph.push(item);
            cy.log(JSON.stringify(graph));
          })
          .then(() => cy.writeFile(`cypress/fixtures/graph.json`, graph));
      });
    });
  });

  // it.skip('should be able to login', () => {
  //   cy.visit('https://www.facebook.com/');
  //   // cy.get('[data-testid="field-email"]').type('johndoe@gmail.com');
  //   // cy.get('[data-testid="field-password"]').type('helloworld123!');
  //   // cy.get('[data-testid="login-button"]').click();
  //   // cy.location('pathname').should('eq', '/home');
  // });

  // it.skip('sheet', () => {
  //   const url = 'https://validator.w3.org/nu/?doc=https://panorays.com/';
  //   const sheet = new Sheet();
  //   sheet.load();
  //   fetch(url).then(res => console.log(res.body));
  //   const rows = json.map(job => {
  //     return {
  //       company: job.company,
  //       url: job.url,
  //       name: job.name,
  //     };
  //   });
  //   sheet.addRows(rows);
  //   doc.updateProperties({ title: 'renamed doc' });
  //   // adding / removing sheets
  //   const newSheet = doc.addSheet({ title: 'hot new sheet!' });
  // });
});
