import { model } from "mongoose";
import { SalaryStructure } from "../types";
import { SalaryStructureSchema } from "../schema";

export const SalaryStructureModel = model<SalaryStructure>(
  "SalaryStructure",
  SalaryStructureSchema,
  "salary_structures",
);
