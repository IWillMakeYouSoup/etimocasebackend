import { Employee } from "src/types/Employee";
import { employees } from "../store/employees";

export class DatabaseService {
    database: Employee[];
    constructor(database = employees) {
        this.database = database;
    }

    getData = (table: string): any[] => {
        switch (table) {
            case "employees":
                return this.database;
            default:
                throw new Error("Table not found");
        }
    };

    create = (table: string, data: any): any => {
        switch (table) {
            case "employees":
                // fake increment id
                data.id = this.database.reduce((maxId, employee) => {
                    return Math.max(maxId, employee.id as number) + 1;
                }, 0);
                this.database.push(data);
                return data;
                break;
            default:
                throw new Error("Table not found");
        }
    };

    delete = (table: string, id: number): void => {
        switch (table) {
            case "employees":
                const index = this.database.findIndex(
                    (employee) => employee.id === id
                );
                if (index === -1) throw new Error("Employee not found");
                this.database.splice(index, 1);
                break;
            default:
                throw new Error("Table not found");
        }
    };
}
