export class ColumnCsvDTO {
    column_1: string;
    column_2: string;
    column_3: string;
    column_4: string;
    column_5: string;
    column_6: string;
    column_7: string;
    column_8: string;
    column_9: string;
    column_10: string;
    column_11: string;

    constructor(column_1: string, column_2: string, column_3: string, column_4: string,
        column_5: string, column_6: string, column_7: string, column_8: string, column_9: string, column_10: string,
        column_11: string) {
        this.column_1 = column_1;
        this.column_2 = column_2;
        this.column_3 = column_3;
        this.column_4 = column_4;
        this.column_5 = column_5;
        this.column_6 = column_6;
        this.column_7 = column_7;
        this.column_8 = column_8;
        this.column_9 = column_9;
        this.column_10 = column_10;
        this.column_11 = column_11;
    }

    toString(): string {
        return `ColumnCsvDTO { column_1: ${this.column_1}, column_2: ${this.column_2}, column_3: ${this.column_3}, column_4: ${this.column_4}, column_5: ${this.column_5}, column_6: ${this.column_6}, column_7: ${this.column_7}, column_8: ${this.column_8}, column_9: ${this.column_9}, column_10: ${this.column_10}, column_11: ${this.column_11} }`;
    }
}