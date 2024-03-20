export class DataTableToMap {
    static dataTableToMap(dataTable: string[][]): Map<string, string> {
        const map = new Map<string, string>();
        for (const [key, value] of dataTable) {
            const trimmedKey = key.trim();
            const trimmedValue = value.trim();
            if (trimmedKey && trimmedValue) {
                map.set(trimmedKey, trimmedValue);
            }
        }
        return map;
    }
}
