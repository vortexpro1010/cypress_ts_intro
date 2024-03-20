export class Navigate {

    static to(pageName: string) {
        switch (pageName.toLocaleLowerCase()) {
            case "home":
                cy.visit('/');
                break;
            case "search medicine":
                cy.visit(Cypress.env("BASE_UI_URL") + "/emergency/");
                break;
            case "csv files":
                cy.visit("https://sample-videos.com/download-sample-csv.php");
                break;
            default:
                console.log("Invalid choice, navigating to home page");
                cy.visit('/');
                break;
        }
    }
}