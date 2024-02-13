import { employeesMock } from "../store/employeesMock";
import { DatabaseService } from "./DatabaseService";

export class MockDatabaseService extends DatabaseService {
    constructor(database = employeesMock) {
        super(database);
    }
}
