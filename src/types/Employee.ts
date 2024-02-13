import { DatabaseObject } from "./DatabaseObject";

export interface insertEmployee
    extends Partial<Employee>,
        Partial<DatabaseObject> {}

export interface Employee extends DatabaseObject {
    firstName: string;
    familyName: string;
    email: string;
}
