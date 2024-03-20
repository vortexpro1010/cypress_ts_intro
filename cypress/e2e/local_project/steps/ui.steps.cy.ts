import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Navigate } from '../actions/ui/Navigate';
import { Click } from "../actions/ui/Click";
import { ScenarioContext } from '../utils/ScenarioContext';
import { ColumnCsvDTO } from '../models/ui/ColumnCsvDTO';
import { ScenarioContextEnum } from "../utils/ScenarioContextEnum";
import { DisplayedMedicinesDTO } from "../models/ui/DisplayedMedicinesDTO";

Given("user navigates to the {string} page", (pageName: string) => {
    Navigate.to(pageName);
});

When("user clicks on the {string} button", (buttonName: string) => {
    Click.on(buttonName);
});

Then("the {string} page is displayed", (pageName: string) => {
    cy.url().should('include', `/${pageName}`);
});

When("user searches for {string} medicine", (medicineName: string) => {
    cy.fixture(Cypress.env("FIXTURES_EMERGENCY_PAGE")).then((emergencyPageFixtures) => {
        cy.xpath(emergencyPageFixtures.tableFirstCell).waitUntilDisplayed();
        cy.xpath(emergencyPageFixtures.medicineSearchInput).waitUntilEnabled().type(medicineName);
    });
});

Then("record number {int} has the {string} column value {string} than record number {int}", (recordNumberOne: number, columnName: string, biggerSmallerFlag: string, recordNumberTwo: number) => {
    let firstValue: number;
    let secondValue: number;
    switch (columnName.toLocaleLowerCase()) {
        case "distanta":
            let getNumberRegex: RegExp = /\d+\.\d+/;
            let recordNumberOneXpath: string = `//tr[${recordNumberOne}]/td[6][not(contains(text(), 'NaN'))]`;
            let recordNumberTwoXpath: string = `//tr[${recordNumberTwo}]/td[6][not(contains(text(), 'NaN'))]`;
            debugger;
            cy.xpath(recordNumberOneXpath).waitUntilDisplayed();
            cy.xpath(recordNumberTwoXpath).waitUntilDisplayed();

            cy.xpath(recordNumberOneXpath).invoke('text').then((recordNumberOneText) => {
                firstValue = parseFloat(recordNumberOneText.match(getNumberRegex)![0]);
                cy.xpath(recordNumberTwoXpath).invoke('text').then((recordNumberTwoText) => {
                    secondValue = parseFloat(recordNumberTwoText.match(getNumberRegex)![0]);
                    debugger
                    if (biggerSmallerFlag.toLocaleLowerCase() === "bigger") {
                        cy.wrap(firstValue).should('be.gt', secondValue);
                    } else {
                        cy.wrap(firstValue).should('be.lt', secondValue);
                    }
                })
            })
            break;
        default:
            throw new Error(`Invalid column name: ${columnName}`);
    }
})

When("the CSV file is downloaded", () => {
    cy.wait(5000);
    const fileName = 'SampleCSVFile_2kb.csv';
    var filePath: string = `cypress/downloads/${fileName}`;

    ScenarioContext.setData(ScenarioContextEnum.FILE_PATH, filePath);
});

When("the CSV file content is displayed", () => {
    let filePath: string = ScenarioContext.getData(ScenarioContextEnum.FILE_PATH);
    let columnCsvDTOList: ColumnCsvDTO[] = [];
    cy.parseCsvFile(filePath).then((jsonContents: any[]) => {

        jsonContents.forEach((item) => {
            let columnCsvDTOElement: ColumnCsvDTO = new ColumnCsvDTO(
                item.column_1,
                item.column_2,
                item.column_3,
                item.column_4,
                item.column_5,
                item.column_6,
                item.column_7,
                item.column_8,
                item.column_9,
                item.column_10,
                item.column_11
            );
            columnCsvDTOList.push(columnCsvDTOElement);
        });

    })
    columnCsvDTOList.forEach(element => {
        cy.log(element.toString())
    });
});


Then("the displayed medicine records are not duplicated", () => {
    var displayedMedicines: DisplayedMedicinesDTO[] = [];

    cy.fixture(Cypress.env("FIXTURES_EMERGENCY_PAGE")).then((emergencyPageFixtures) => {
        cy.xpath(emergencyPageFixtures.displayedMedicineRecords).waitUntilDisplayed();
        cy.xpath(emergencyPageFixtures.displayedMedicineRecords).then(rows => {
            rows.each((index, row) => {
                const medicineName = Cypress.$(row).find('td:nth-child(1)').text()
                const medicineBranch = Cypress.$(row).find('td:nth-child(3)').text()
                const medicinePrice = Cypress.$(row).find('td:nth-child(4)').text()
                const medicineDistance = Cypress.$(row).find('td:nth-child(6)').text()
                const displayedMedicine = new DisplayedMedicinesDTO(medicineName, medicineBranch, medicinePrice, medicineDistance);
                displayedMedicines.push(displayedMedicine)
            });

            expect(hasDuplicates(displayedMedicines)).to.be.false;
        });
    });
});

function hasDuplicates(array: DisplayedMedicinesDTO[]): boolean {
    return (new Set(array.map(item => JSON.stringify(item)))).size !== array.length;
}