import { AdminRequestDTO } from '../models/api/AdminRequestDTO';
import { ScenarioContext } from '../utils/ScenarioContext';
import { ScenarioContextEnum } from '../utils/ScenarioContextEnum';

export class APIAdminClient {

    static addAdmin(adminRequestDTO: AdminRequestDTO) {
        cy.request({
            method: 'POST',
            url: (Cypress.env("BASE_API_URL") + Cypress.env("ENDPOINT_ADMINS") + "/add"),
            body: adminRequestDTO
        }).then((response) => {
            ScenarioContext.setData(ScenarioContextEnum.RESPONSE_CODE, response.status)
            ScenarioContext.setData(ScenarioContextEnum.ADMIN_ID, response.body.id)
        });
    }

    static getAdmin(adminId: number) {
        let responseAdmin: AdminRequestDTO;
        return cy.request({
            method: 'GET',
            url: (Cypress.env("BASE_API_URL") + Cypress.env("ENDPOINT_ADMINS") + "/getAdmin/" + adminId),
            failOnStatusCode: false
        })
            .then((response: Cypress.Response<any>) => {
                ScenarioContext.setData(ScenarioContextEnum.RESPONSE_CODE, response.status);
                if (response.status == 200) {
                    responseAdmin = new AdminRequestDTO()
                        .setUserName(response.body.userName)
                        .setPassword(response.body.password)
                        .setShop(response.body.shop)
                    ScenarioContext.setData(ScenarioContextEnum.RESPONSE_ADMIN, responseAdmin);
                }
            });
    }

    static deleteAdmin(adminId: number) {
        cy.request('DELETE', Cypress.env("BASE_API_URL") + Cypress.env("ENDPOINT_ADMINS") + "/deleteAdmin/" + adminId)
            .then((response) => {
                ScenarioContext.setData("RESPONSE_CODE", response.status);
            });
    }
}