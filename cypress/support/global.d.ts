/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    dataCy(value: string): Chainable<Element>;
    googleBackLinks(webSite: string): Chainable<void>;
    linkedInLogin(email: string, password: string): Chainable<void>;
    linkedInHashtags(page?: string, hashTag: string): Chainable<void>;
    linkedInTotalPageNumbers(): Chainable<void>;
    waitForResources(resources?: string[]): Chainable<void>;
  }
}
