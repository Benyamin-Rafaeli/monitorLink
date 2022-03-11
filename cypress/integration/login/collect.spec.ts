// a.map(el => Object.assign({linkedin: '', }, el))
// import Sheet from '../../sheet';

const googleTrends = require('google-trends-api');

const username = Cypress.env('username');
const password = Cypress.env('password');
let checkUrl;
let graph = [];
let count;
let total;
const forceControl = (index: number) => {
  if (Number(total - index) % 10 === 0) {
    cy.pause();
  }
};

describe('collect', () => {
  beforeEach(() => cy.fixture('test.json').as('companiesArray'));

  it('similar web', () => {
    cy.get('@companiesArray').then(company => {
      Cypress._.times(company.length, index => {
        checkUrl = company[index]['website'];
        cy.visit('https://www.similarweb.com/').waitForResources();
        cy.get('[data-test="search"]').click({ multiple: true, force: true });
        cy.get('[data-test="input"]').type(checkUrl).waitForResources();
        cy.get('[data-test="submit"]').should('be.visible').click().waitForResources();

        // cy.scrollTo('bottom');
        // cy.wait(3000);
        // cy.scrollTo('top');
        // cy.wait(3000);
        // cy.get('body').then(body => {
        //   cy.wrap(body).find('[data-test="input"]').click();
        // });

        // cy.get('[data-test="input"]').then(inputField => {
        //   cy.wrap(inputField).eq(0).click().type(checkUrl);

        //   // debugger;
        // });

        cy.pause();

        // cy.get('#submit').click().waitForResources();
        // cy.get('#results')
        //   .find('li')
        //   .then(foundErrors => {
        //     company[index]['errorValidator'] = String(foundErrors.length);
        //     graph.push(company);
        //     cy.log(JSON.stringify(graph));
        //     cy.pause();
        //   })
        //   .then(() => cy.writeFile(`cypress/fixtures/graph.json`, graph));
      });
    });
  });

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
    let checkUrl;
    cy.get('@companiesArray').then(company => {
      Cypress._.times(company.length, index => {
        checkUrl = company[index]['website'];
        cy.googleBackLinks(checkUrl);
        cy.get('#result-stats').invoke('text').as('result');
        cy.get('@result')
          .then(result => {
            // @ts-ignore
            company[index]['gCount'] = result.split('תוצאות')[0].replace(/^\D+/g, '').trim();
            graph.push(company);
            cy.log(JSON.stringify(graph));
          })
          .then(() => cy.writeFile(`cypress/fixtures/graph.json`, graph));
      });
    });
  });

  it.skip('error validator w3', () => {
    cy.get('@companiesArray').then(company => {
      Cypress._.times(company.length, index => {
        checkUrl = company[index]['website'];
        cy.visit('https://validator.w3.org/').waitForResources();
        cy.get('#doc').type(checkUrl);
        cy.get('#submit').click().waitForResources();
        cy.get('#results')
          .find('li')
          .then(foundErrors => {
            company[index]['errorValidator'] = String(foundErrors.length);
            graph.push(company);
            cy.log(JSON.stringify(graph));
            cy.pause();
          })
          .then(() => cy.writeFile(`cypress/fixtures/graph.json`, graph));
      });
    });
  });
  // todo - not ready
  it.skip('google trends', () => {
    // googleTrends.relatedQueries({ keyword: string, startTime: Date, endTime: Date, geo: string }, cbFunc);
    const startTime = new Date(2020, 1, 1, 0, 0, 0);
    const endTime = new Date(2022, 1, 1, 0, 0, 0);
    const keyword = 'https://panorays.com/';
    // const keyword = 'q=/g/11gk78qmq6';

    googleTrends
      .relatedTopics({ keyword: 'Chipotle', startTime: new Date('2015-01-01'), endTime: new Date('2017-02-10') })
      .then(res => {
        cy.log(res);
      })
      .catch(err => {
        cy.log(err);
      });

    // relatedQueries
    // googleTrends
    //   // .relatedQueries({ keyword, startTime, endTime, geo: 'Worldwide' })
    //   .relatedQueries({ keyword })
    //   // if (err) cy.log('there was an error!', err);
    //   // else cy.log('my sweet sweet results', results);
    //   .then(res => {
    //     cy.log(res);
    //   })
    //   .catch(err => {
    //     cy.log(err);
    //   });

    // googleTrends.interestOverTime({ keyword: "Women's march" }, function (err, results) {
    //   if (err) cy.log('there was an error!', err);
    //   else cy.log('my sweet sweet results', results);
    // });
  });
});
