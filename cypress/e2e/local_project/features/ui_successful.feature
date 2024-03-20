@UI
Feature: Medicine UI Flows validation

Scenario: Verify that shops are sorted from closest to furthest order for the guest user
Given user navigates to the 'Home' page
And user clicks on the 'CAUTARE RAPIDA' button
And the 'emergency' page is displayed
When user searches for 'A ferin Forte' medicine
Then record number 1 has the 'Distanta' column value 'smaller' than record number 2

Scenario: Verify that the displayed medicine records are not duplicated
Given user navigates to the 'Home' page
And user clicks on the 'CAUTARE RAPIDA' button
When the 'emergency' page is displayed
Then the displayed medicine records are not duplicated
And user searches for 'A ferin Forte' medicine
And the displayed medicine records are not duplicated

@CSV
Scenario: Verify download and parse sucessfully CSV file
Given user navigates to the 'CSV files' page
When user clicks on the 'download sample csv file' button
Then the CSV file is downloaded
And the CSV file content is displayed