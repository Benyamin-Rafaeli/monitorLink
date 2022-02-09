/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    dataCy(value: string): Chainable<Element>;
    loginUi(email: string, password: string): Chainable<void>;
    navigate(page?: string, hashTag: string): Chainable<void>;
    visitGoogle(webSite: string): Chainable<void>;
    waitForResources(resources?: string[]): Chainable<void>;
    getTotalPageNumber(): Chainable<void>;
  }
}
