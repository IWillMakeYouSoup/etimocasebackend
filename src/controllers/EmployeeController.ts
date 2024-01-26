import { NextFunction, Request, Response } from "express";
import { EmployeeService } from "../services/EmployeeService";

export const EmployeeController = {
    createEmployee: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const service = new EmployeeService();
            const employee = req.body;
            const { success, message } = await service.validateNewEmployee(
                employee
            );
            if (!success) {
                next({ statusCode: 400, message });
            } else {
                await service.createEmployee(employee);
                res.send({ success: true });
            }
        } catch (error: any) {
            next(error);
        }
    },
    ListEmployees: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const service = new EmployeeService();
            const employees = await service.getEmployees();
            res.send(employees);
        } catch (error: any) {
            return next(error);
        }
    },
    deleteEmployee: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const service = new EmployeeService();
            await service.deleteEmployee(parseInt(req.params.id));
        } catch (error: any) {
            return next(error);
        }
        return res.send({ success: true });
    },
};
