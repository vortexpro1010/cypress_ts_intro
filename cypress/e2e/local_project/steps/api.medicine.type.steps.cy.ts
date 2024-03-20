import { Given, When, Then, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import { MedicineTypeGetAllResponseDTO } from '../models/api/MedicineTypeGetAllResponseDTO';
import { ScenarioContext } from '../utils/ScenarioContext';
import { APIMedicineTypeClient } from '../clients/APIMedicineTypeClient';
import { ScenarioContextEnum } from "../utils/ScenarioContextEnum";

Given("user makes a GET call to medicineTypes-getAll endpoint", () => {
    APIMedicineTypeClient.getAllMedicineType();
});

Then("the following medicine types are displayed:", (dataTable: DataTable) => {
    const actualMedicineTypesRAW: MedicineTypeGetAllResponseDTO[] = ScenarioContext.getData(ScenarioContextEnum.MEDICINE_TYPES_API)
    const actualMedicineTypes = actualMedicineTypesRAW.map((e) => e.name).sort();
    const expectedMedicineTypes = dataTable.raw().map(row => row[0].trim()).sort();

    const expectedMedicineTypesJSON = JSON.stringify(expectedMedicineTypes);
    const actualMedicineTypesJSON = JSON.stringify(actualMedicineTypes);

    cy.wrap(actualMedicineTypesJSON).should('deep.equal', expectedMedicineTypesJSON);
});