export class ScenarioContext {
    static data: { [key: string]: any } = {};

    static setData(key: any, value: any) {
        this.data[key] = value;
    }

    static getData(key: any): any {
        Cypress.config()
        return this.data[key];
    }
}

export const scenarioContext = new ScenarioContext();