import { Employee, insertEmployee } from "../types/Employee";
import { DatabaseService } from "./DatabaseService";

export class EmployeeService {
    dataHandler;
    constructor(handler = DatabaseService) {
        this.dataHandler = new handler();
    }

    getEmployees = async (): Promise<Employee[]> => {
        return await this.dataHandler.getList<Employee>("employees");
    };

    validateNewEmployee = ({
        firstName,
        familyName,
        email,
    }: Employee): { success: boolean; message: string | null } => {
        if (!firstName)
            return { success: false, message: "First name is required" };
        if (!familyName)
            return { success: false, message: "Family name is required" };
        if (!email) return { success: false, message: "Email is required" };
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            return { success: false, message: "Email not valid" };
        return { success: true, message: null };
    };

    createEmployee = async (employee: insertEmployee): Promise<Employee> => {
        const employees: Employee[] = await this.dataHandler.getList<Employee>(
            "employees"
        );
        const emailAlreadyExists = employees.find(
            (emp) => emp.email === employee.email
        );
        if (emailAlreadyExists)
            throw new Error("Email already exists in database");
        return this.dataHandler.create<insertEmployee>(
            "employees",
            employee
        ) as Employee;
    };

    deleteEmployee = async (id: number): Promise<void> => {
        this.dataHandler.delete("employees", id);
    };

    updateEmployee = async (employee: Employee): Promise<void> => {
        this.dataHandler.update("employees", employee);
    };
}

export default new EmployeeService();
