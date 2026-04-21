import { Schema, model } from "mongoose";
import { Employee } from "../types";
import { EmployeeDataSchema } from "./employeeData.schema";

export const EmployeeModelSchema = new Schema<Employee>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,  
    },
    data: { type: EmployeeDataSchema, required: true },
    meta: {
      version: { type: Number, default: 1 },
      isDeleted: { type: Boolean, default: false },
    },
  },
  { timestamps: true },
);

// Indexes
EmployeeModelSchema.index({ companyId: 1, "meta.isDeleted": 1 });
EmployeeModelSchema.index({ companyId: 1, "data.job.department": 1 });
EmployeeModelSchema.index({ companyId: 1, "data.job.designation": 1 });
EmployeeModelSchema.index({ companyId: 1, "data.job.employeeStatus": 1 });
EmployeeModelSchema.index(
  { companyId: 1, "data.basic.employeeId": 1 },
  { unique: true }
);
EmployeeModelSchema.index(
  { companyId: 1, "data.basic.email": 1 },
  { unique: true }
);