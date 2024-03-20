import { Given, When, Then, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import { ScenarioContext } from '../utils/ScenarioContext';
import { ScenarioContextEnum } from "../utils/ScenarioContextEnum";

Then("the response code is {int}", (expectedResponseCode: number) => {
    let actualResponseCode: number = ScenarioContext.getData(ScenarioContextEnum.RESPONSE_CODE);
    expect(expectedResponseCode).to.equal(actualResponseCode);
});