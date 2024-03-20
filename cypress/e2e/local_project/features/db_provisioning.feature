@Provisioning
Feature: Provision Database with the required data

    Scenario Outline: Scenario Outline name: Provision users in admins table
        Given user inserts the following users in DB:
            | Username           | Password  | ShopId |
            | operator.admin     | formula1  | 1      |
            | operator.manager   | suzuki23  | 1      |
            | operator.maintance | toyotat25 | 1      |
            | doina.op           | fluff123  | 2      |
