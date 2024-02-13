import { Router } from "express";
import { EmployeeController } from "../controllers/EmployeeController";

export = Router()
    .get("/employee", EmployeeController.ListEmployees)
    .post("/employee", EmployeeController.createEmployee)
    .delete("/employee/:id", EmployeeController.deleteEmployee)
    .put("/employee/:id", EmployeeController.updateEmployee);
