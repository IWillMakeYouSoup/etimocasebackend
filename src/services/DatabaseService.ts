import { employees } from "../store/employees";
import { DatabaseObject } from "src/types/DatabaseObject";

export class DatabaseService {
    database: DatabaseObject[];
    constructor(database = employees) {
        this.database = database;
    }

    getList<T extends DatabaseObject>(table: string): T[] {
        switch (table) {
            case "employees":
                return this.database as T[];
            default:
                throw new Error("Table not found");
        }
    }

    create<T extends Partial<DatabaseObject>>(table: string, data: T): T {
        switch (table) {
            case "employees":
                // fake increment id
                data.id = this.database.reduce((maxId, employee) => {
                    return Math.max(maxId, employee.id) + 1;
                }, 0);
                this.database.push(data as DatabaseObject);
                return data;
                break;
            default:
                throw new Error("Table not found");
        }
    }

    update<T extends DatabaseObject>(table: string, employee: T): boolean {
        return true;
    }

    delete(table: string, id: number): void {
        switch (table) {
            case "employees":
                const index = this.database.findIndex((row) => row.id === id);
                if (index === -1) throw new Error("Employee not found");
                this.database.splice(index, 1);
                break;
            default:
                throw new Error("Table not found");
        }
    }
}
