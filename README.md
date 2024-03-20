SETUP:
- NodeJS should be installed and the following command should be run once in the project's terminal:
- npm install --save-dev cypress

STARTUP:
- To start up the Cypress Exclusive interface the following command should be executed:
npx cypress open

CONFIGURATION:

- Configuration can be modified in "cypress.env.json"
- Configuration can be overriden via following CLI example: 

- npx cypress run -e TAGS="@API and not (@UI or @DB or @Provisioning)",ENDPOINT_ADMINS="/admin"

EXAMPLES OF CLI RUNS:

- npx cypress run -e TAGS="@API and not (@UI or @DB or @Provisioning)" --headed
- npx cypress run -e TAGS="@DB and not (@UI or @Provisioning)" --headed
- npx cypress run -e TAGS="@UI and not (@API or @DB or @Provisioning)" --headed
- npx cypress run -e TAGS="@Provisioning" --headed
