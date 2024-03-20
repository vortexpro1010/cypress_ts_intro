import { MedicineTypeGetAllResponseDTO } from '../models/api/MedicineTypeGetAllResponseDTO';
import { ScenarioContext } from '../utils/ScenarioContext';
import { ScenarioContextEnum } from '../utils/ScenarioContextEnum';

export class APIMedicineTypeClient {

    static getAllMedicineType() {
        var medicineTypes: MedicineTypeGetAllResponseDTO[];

        return cy.request('GET', Cypress.env("BASE_API_URL") + Cypress.env("ENDPOINT_MEDICINE_TYPES") + "/getAll")
            .then((response) => {
                ScenarioContext.setData(ScenarioContextEnum.RESPONSE_CODE, response.status)
                medicineTypes = response.body.map((item: MedicineTypeGetAllResponseDTO) => new MedicineTypeGetAllResponseDTO(item.name));
                ScenarioContext.setData(ScenarioContextEnum.MEDICINE_TYPES_API, medicineTypes)
            });
    }
}