import { Given, When, Then, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import { MedicineTypeGetAllResponseDTO } from '../models/api/MedicineTypeGetAllResponseDTO';
import { ScenarioContext } from '../utils/ScenarioContext';
import { ScenarioContextEnum } from "../utils/ScenarioContextEnum";

When("user captures the DB records of the following sql query: {string}", (sqlQuery: string) => {
    cy.queryDatabase(sqlQuery).then((results) => {
        ScenarioContext.setData(ScenarioContextEnum.MEDICINE_TYPES_DB, results);
    })
});

Then("the records captured in API match with the records from DB", () => {
    const apiMedicineTypes: MedicineTypeGetAllResponseDTO[] = ScenarioContext.getData(ScenarioContextEnum.MEDICINE_TYPES_API).sort();;
    const dbMedicineTypes: MedicineTypeGetAllResponseDTO[] = ScenarioContext.getData(ScenarioContextEnum.MEDICINE_TYPES_DB).sort();;

    const apiMedicineTypesJSON = JSON.stringify(apiMedicineTypes);
    const dbMedicineTypesJSON = JSON.stringify(dbMedicineTypes);

    expect(apiMedicineTypesJSON).to.deep.equal(dbMedicineTypesJSON);
});