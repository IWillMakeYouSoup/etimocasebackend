import { NextFunction, Request, Response } from "express";
import employeeService from "../services/EmployeeService";

export const EmployeeController = {
    createEmployee: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const employee = req.body;
            const { success, message } =
                await employeeService.validateNewEmployee(employee);
            if (!success) {
                next({ statusCode: 400, message });
            } else {
                await employeeService.createEmployee(employee);
                res.send({ success: true });
            }
        } catch (error: any) {
            next(error);
        }
    },
    ListEmployees: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const employees = await employeeService.getEmployees();
            res.send(employees);
        } catch (error: any) {
            return next(error);
        }
    },
    deleteEmployee: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await employeeService.deleteEmployee(parseInt(req.params.id));
        } catch (error: any) {
            return next(error);
        }
        return res.send({ success: true });
    },
    updateEmployee: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const employee = req.body;
            await employeeService.updateEmployee(employee);
        } catch (error: any) {
            return next(error);
        }
        return res.send({ success: true });
    },
};
