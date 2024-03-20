@API @DB
Feature: Medicine API Flows validation

    Scenario: Verify successful GET API call to medicineTypes endpoint data match with DB records
        Given user makes a GET call to medicineTypes-getAll endpoint
        Then the response code is 200
        And the following medicine types are displayed:
            | Analgezice și Antipiretice                 |
            | Antibiotice                                |
            | Antidepresive și Anxiolitice               |
            | Antiacide și Antiulceroase                 |
            | Antialergice                               |
            | Anticoagulante și Antiagregante Plachetare |
        When user captures the DB records of the following sql query: "SELECT name FROM medicine_types"
        Then the records captured in API match with the records from DB
