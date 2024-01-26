import { Employee } from "../types/Employee";
import { DatabaseService } from "./DatabaseService";

export class EmployeeService {
    dataHandler;
    constructor(handler = DatabaseService) {
        this.dataHandler = new handler();
    }

    getEmployees = async (): Promise<Employee[]> => {
        return this.dataHandler.getData("employees");
    };

    validateNewEmployee = async ({
        firstName,
        familyName,
        email,
    }: Employee): Promise<{ success: boolean; message: string | null }> => {
        if (!firstName)
            return { success: false, message: "First name is required" };
        if (!familyName)
            return { success: false, message: "Family name is required" };
        if (!email) return { success: false, message: "Email is required" };
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            return { success: false, message: "Email not valid" };
        return { success: true, message: null };
    };

    createEmployee = async (employee: Employee): Promise<Employee> => {
        try {
            const employees = await this.dataHandler.getData("employees");
            const emailAlreadyExists = employees.find(
                (emp) => emp.email === employee.email
            );
            if (emailAlreadyExists)
                throw new Error("Email already exists in database");
            return this.dataHandler.create("employees", employee);
        } catch (error) {
            throw error;
        }
    };

    deleteEmployee = async (id: number): Promise<void> => {
        try {
            this.dataHandler.delete("employees", id);
        } catch (error) {
            throw error;
        }
    };
}
