import { model } from "mongoose";
import { Employee } from "../types";
import { EmployeeModelSchema } from "../schema";

export const EmployeeModel = model<Employee>("Employee", EmployeeModelSchema);