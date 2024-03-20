import { Given, When, Then, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import { AdminDBDTO } from "../models/db/AdminDBDTO";
import { DBQueries } from "../actions/db/DBQueries";

Given("user inserts the following users in DB:", (dataTable: DataTable) => {
  const rows = dataTable.raw();
  const adminsToInsert: AdminDBDTO[] = rows.slice(1).map((row: any[]) => new AdminDBDTO(
    NaN,
    row[0],
    row[1],
    parseInt(row[2])
  ));

  cy.queryDatabase(DBQueries.SELECT_ALL_FROM_ADMINS).then((allAdmins: AdminDBDTO[]) => {
    let filteredAdminsToInsert: AdminDBDTO[];

    if (allAdmins.length === 0) {
      filteredAdminsToInsert = adminsToInsert;
    } else {
      filteredAdminsToInsert = adminsToInsert.filter(insertAdmin => {
        return !allAdmins.some(existingAdmin => existingAdmin.user_name === insertAdmin.user_name);
      });
    }

    if (filteredAdminsToInsert.length === 0) {
      cy.log("All required users exist in the DB")

    } else {
      const insertAdminsQuery = `
      ${DBQueries.INSERT_INTO_ADMINS_VALUES}
      ${filteredAdminsToInsert.map(admin => `('${admin.getUserName()}', '${admin.getPassword()}', ${admin.getShopId()})`).join(',')}
    `;

      cy.queryDatabase(insertAdminsQuery).then(results => {
        console.log('Users inserted successfully:', results);
      });
    }
  })
});
