/// <reference types="cypress" />
import { IConnectionInfo } from '../e2e/local_project/configuration/utils/IConfigurationInfo';
import 'cypress-wait-until';

// import neatCsv from "neat-csv";
// import neatCsv from 'neat-csv';
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      queryDatabase(query: string): Chainable<any[]>;
      parseCsvFile(filePath: string): Chainable<any[]>;
      waitUntilEnabled(timeout?: number): Chainable<JQuery>;
      waitUntilDisplayed(timeout?: number): Chainable<JQuery>;
    }
  }
}

// DB Commands:

const dbConnections: Record<string, IConnectionInfo> = {
  core: {
    host: Cypress.env("DB_HOST"),
    user: Cypress.env("DB_USER"),
    password: Cypress.env("DB_PASSWORD"),
    database: Cypress.env("DB_NAME"),
  },
  stagingB: {
    host: 'staging-b.my.co',
    user: 'test',
    password: '***',
    database: 'users',
  },
}

Cypress.Commands.add("queryDatabase", (query: string) => {
  return cy.task('queryDatabase', { connectionInfo: dbConnections[Cypress.env("DB_ENV")], query });
});

// Parsing commands:

Cypress.Commands.add('parseCsvFile', { prevSubject: false }, (filePath: string, hasHeaders: boolean = false) => {
  return cy.readFile(filePath, 'utf8').then((fileContent) => {
    return new Promise<any[]>((resolve, reject) => {
      const lines = fileContent.split('\n');
      let headers: string[] = [];
      let startIndex = 0;

      if (hasHeaders) {
        headers = lines[0].split(',');
        startIndex = 1;
      }

      const parsedData: any[] = [];
      for (let i = startIndex; i < lines.length; i++) {
        const fields = lines[i].split(',');
        const row: any = {};
        for (let j = 0; j < fields.length; j++) {
          const fieldName = hasHeaders ? headers[j] : `column_${j + 1}`;
          row[fieldName] = fields[j];
        }
        parsedData.push(row);
      }

      resolve(parsedData);
    });
  });
});

// UI Commands:

Cypress.Commands.add('waitUntilEnabled', { prevSubject: true }, (subject: JQuery<HTMLElement>, timeout = 5000) => {
  return cy.wrap(subject).should('not.be.disabled', { timeout });
});

Cypress.Commands.add('waitUntilDisplayed', { prevSubject: true }, (subject: JQuery<HTMLElement>, timeout = 5000) => {
  return cy.wrap(subject).should('be.visible', { timeout });
});