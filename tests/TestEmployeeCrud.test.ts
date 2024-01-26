import { MockDatabaseService } from "../src/services/MockDatabaseService";
import { EmployeeService } from "../src/services/EmployeeService";
import { employeesMock } from "../src/store/employeesMock";

describe("Test employee crud", () => {
    const employees = employeesMock;
    const service = new EmployeeService(MockDatabaseService);
    const testNewUser = {
        firstName: "Samuel",
        familyName: "L. Jackson",
        email: "holla@mothafaquer.com",
    };

    test("Creating employee works as expected and returns inserted employee", async () => {
        const emp = await service.createEmployee(testNewUser);
        expect(employees[employees.length - 1].firstName).toBe(
            testNewUser.firstName
        );
        expect(employees[employees.length - 1].familyName).toBe(
            testNewUser.familyName
        );
        expect(employees[employees.length - 1].email).toBe(testNewUser.email);
        expect(typeof employees[employees.length - 1].id).toBe("number");
        expect(emp.firstName).toBe(testNewUser.firstName);
        expect(emp.familyName).toBe(testNewUser.familyName);
        expect(emp.email).toBe(testNewUser.email);
        expect(typeof emp.id).toBe("number");
    });

    test("Delete employee works as expected", async () => {
        const userIdToDelete = 1;

        await service.deleteEmployee(userIdToDelete);

        const employees = await service.getEmployees();
        const index = employees.findIndex(
            (employee) => employee.id === userIdToDelete
        );
        expect(index).toBe(-1);
    });

    test("Add user with existing email causes error", async () => {
        testNewUser.email = "dfssdf";
        expect.assertions(1);
        try {
            await service.createEmployee(testNewUser);
        } catch (error) {
            expect(error).not.toBe(null);
        }
    });
});
