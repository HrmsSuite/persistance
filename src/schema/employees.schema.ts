import { Schema, model } from "mongoose";
import { Employee } from "../types";
import { EmployeeDataSchema } from "../schema/employeeData.schema";

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
      auditTrail: {
        type: [
          {
            changedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
            changedAt: { type: Date, default: Date.now },
            changes: { type: String, trim: true },
            _id: false,
          },
        ],
        default: [],
      },
    },
  },
  { timestamps: true },
);

//indexes 
EmployeeModelSchema.index({ companyId: 1, "meta.isDeleted": 1 });
EmployeeModelSchema.index({ companyId: 1, "data.job.department": 1 });
EmployeeModelSchema.index({ companyId: 1, "data.job.designation": 1 });
EmployeeModelSchema.index({ companyId: 1, "data.job.employeeStatus": 1 });
EmployeeModelSchema.index({ companyId: 1, "data.basic.employeeId": 1 }, { unique: true });
EmployeeModelSchema.index({ companyId: 1, "data.basic.email": 1 }, { unique: true });
EmployeeModelSchema.index({ companyId: 1, "data.payroll.payrollGroupId": 1 });
EmployeeModelSchema.index({ companyId: 1, "data.job.shiftId": 1 });
EmployeeModelSchema.index({companyId: 1,"data.job.roleIds": 1,});
EmployeeModelSchema.index({ companyId: 1, "data.job.employeeStatus": 1, "data.job.fullAndFinalSettled": 1 });
 