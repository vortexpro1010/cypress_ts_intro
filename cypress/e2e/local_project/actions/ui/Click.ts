export class Click {

    static on(buttonName: string) {
        switch (buttonName.toLocaleLowerCase()) {
            case "cautare rapida":
                cy.fixture(Cypress.env("FIXTURES_MAIN_PAGE")).then((mainPageFixtures) => {
                    cy.xpath(mainPageFixtures.fastSearchButton).click();
                });
                break;
            case "download sample csv file":
                cy.fixture(Cypress.env("FIXTURES_XLSX_PAGE")).then((xlsxPageFixtures) => {
                    cy.xpath(xlsxPageFixtures.downloadXLSXButton).click();
                });
                break;
            default:
                throw new Error(`Invalid button name: ${buttonName}`);
        }
    }
}