@API
Feature: Admin API Flows validation

    Scenario: Verify successful Admin create flow
        Given user makes a POST call to admins-add endpoint with following data:
            | userName | TestUserName |
            | password | TestPassword |
            | shop     | 1            |
        Then the response code is 201

    @DB
    Scenario: Verify successful Admin delete flow
        Given user makes a POST call to admins-add endpoint with following data:
            | userName | TestUserName |
            | password | TestPassword |
            | shop     | 1            |
        And the response code is 201
        And user makes a 'GET' call for the saved admin
        And the response code is 200
        And the admin 'is' found in DB
        When user makes a 'DELETE' call for the saved admin
        Then the response code is 200
        And user makes a 'GET' call for the saved admin
        And the response code is 404
        And the admin 'is not' found in DB