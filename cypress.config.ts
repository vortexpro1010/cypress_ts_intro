import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { preprocessor } from "@badeball/cypress-cucumber-preprocessor/browserify";
import { IConnectionInfo } from "./cypress/e2e/local_project/configuration/utils/IConfigurationInfo";
import mysql from 'mysql';

function queryDB(connectionInfo: IConnectionInfo, query: string): Promise<any> {
  const connection = mysql.createConnection(connectionInfo)

  connection.connect()

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error)
      }

      connection.end()

      return resolve(results)
    })
  })
}

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  // Reporting with mochawesome-reporter;
  require('cypress-mochawesome-reporter/plugin')(on);

  on(
    "file:preprocessor",
    preprocessor(config, {
      typescript: require.resolve("typescript"),
    })
  );

  on('task', {
    queryDatabase({ connectionInfo, query }) {
      if (!connectionInfo) {
        throw new Error(`Do not have DB connection under name ${connectionInfo.dbName}`)
      }
      return queryDB(connectionInfo, query)
    },
  })

  return config;
}

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: "http://localhost:3000/",
    defaultCommandTimeout: 10000,
    specPattern: "**/*.feature",
    setupNodeEvents,
  },
});
