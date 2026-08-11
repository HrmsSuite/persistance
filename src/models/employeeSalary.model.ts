import { model } from "mongoose";

import { EmployeeSalary } from "../types/employeeSalary.types"; 
import { EmployeeSalarySchema } from "../schema";

export const EmployeeSalaryModel = model<EmployeeSalary>(
  "EmployeeSalary",
  EmployeeSalarySchema,
  "employee_salaries",
);