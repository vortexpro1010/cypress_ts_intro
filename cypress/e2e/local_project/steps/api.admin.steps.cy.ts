import { Given, When, Then, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import { ScenarioContext } from '../utils/ScenarioContext';
import { AdminRequestDTO } from '../models/api/AdminRequestDTO';
import { DataTableToMap } from '../utils/DataTableToMap';
import { ShopDTO } from '../models/api/ShopDTO';
import { APIAdminClient } from '../clients/APIAdminClient';
import { ScenarioContextEnum } from "../utils/ScenarioContextEnum";

Given("user makes a POST call to admins-add endpoint with following data:", (dataTable: DataTable) => {
  let adminRequestMap = DataTableToMap.dataTableToMap(dataTable.raw());
  let adminRequestDTO: AdminRequestDTO = new AdminRequestDTO()
    .setUserName(adminRequestMap.get("userName") || "")
    .setPassword(adminRequestMap.get("password") || "")
    .setShop(new ShopDTO().setId(parseInt(adminRequestMap.get("shop") || "") || 0))

  APIAdminClient.addAdmin(adminRequestDTO);
});

Given("user makes a {string} call for the saved admin", (httpCallType: string) => {
  let savedAdminId = ScenarioContext.getData(ScenarioContextEnum.ADMIN_ID);
  switch (httpCallType.toLowerCase()) {
    case "get":
      APIAdminClient.getAdmin(savedAdminId);
      break;
    case "delete":
      APIAdminClient.deleteAdmin(savedAdminId);
      break;
    default:
      throw new Error("Call type " + httpCallType + " is not supported");
  }
});