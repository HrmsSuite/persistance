import { Schema } from "mongoose";
import { EmployeeData } from "../types";
import { JobDetailSchema } from "./jobDetails.schema";
import { CompensationSchema, BankDetailSchema, LegalSchema, PayrollInfoSchema, TaxInfoSchema } from "./pay.schema";
import { AddressSchema } from "./address.schema";
import { DocumentSchema } from "./document.schema";
import { EmployeeBasicSchema } from "./employee.schema";

export const EmployeeDataSchema = new Schema<EmployeeData>(
  {
    basic: { type: EmployeeBasicSchema, required: true },
    job: { type: JobDetailSchema, required: true },
    compensation: { type: CompensationSchema, required: true },
    address: { type: AddressSchema, required: true },
    bank: { type: BankDetailSchema },
    legal: { type: LegalSchema },
    documents: { type: [DocumentSchema], default: [] },
    payroll: { type: PayrollInfoSchema },
    tax: { type: TaxInfoSchema },
  },
  { _id: false },
);