import { Given, When, Then, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import { ScenarioContext } from '../utils/ScenarioContext';
import { ScenarioContextEnum } from "../utils/ScenarioContextEnum";
import { DBQueries } from "../actions/db/DBQueries";

Given("the admin {string} found in DB", (isNotFlag: string) => {
  let savedAdminId = ScenarioContext.getData(ScenarioContextEnum.ADMIN_ID);

  let selectAdminByIdQuery = DBQueries.SELECT_ALL_FROM_ADMINS_WHERE + "id = '" + savedAdminId + "'";
  cy.queryDatabase(selectAdminByIdQuery).then((result) => {
    if (isNotFlag === "is") {
      expect(result.length).to.equal(1);
    } else {
      expect(result.length).to.equal(0);
    }
  })
});