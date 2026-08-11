import { model } from "mongoose";
import { SalaryComponent } from "../types";
import { SalaryComponentSchema } from "../schema";

export const SalaryComponentModel = model<SalaryComponent>(
  "SalaryComponent",
  SalaryComponentSchema,
);
