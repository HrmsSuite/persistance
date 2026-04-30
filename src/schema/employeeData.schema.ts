import { Schema } from "mongoose";
import { EmployeeData } from "../types";
import { JobDetailSchema } from "./jobDetails.schema";
import { CompensationSchema, BankDetailSchema, LegalSchema, PayrollInfoSchema, AttendancePolicySchema, TaxInfoSchema } from "./pay.schema";
import { AddressSchema } from "./address.schema";
import { LeaveInfoSchema } from "./leave.schema";
import { DocumentSchema } from "./document.schema";
import { EmployeeBasicSchema } from "./employee.schema";

export const EmployeeDataSchema = new Schema<EmployeeData>(
  {
    // ── existing (unchanged) ──
    basic: { type: EmployeeBasicSchema, required: true },
    job: { type: JobDetailSchema, required: true },
    compensation: { type: CompensationSchema, required: true },
    address: { type: AddressSchema, required: true },
    bank: { type: BankDetailSchema },
    legal: { type: LegalSchema },
    leave: { type: LeaveInfoSchema },
    documents: { type: [DocumentSchema], default: [] },

    // ── new ──
    payroll: { type: PayrollInfoSchema },
    attendancePolicy: { type: AttendancePolicySchema },
    tax: { type: TaxInfoSchema },
  },
  { _id: false },
);