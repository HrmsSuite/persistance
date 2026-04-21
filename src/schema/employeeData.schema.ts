import { Schema } from "mongoose";
import { EmployeeData } from "../types";
import { JobDetailSchema } from "./jobDetails.schema";
import { CompensationSchema } from "./pay.schema";
import { BankDetailSchema } from "./pay.schema";
import { LegalSchema } from "./pay.schema";
import { AddressSchema } from "./address.schema";
import { LeaveInfoSchema } from "./leave.schema";
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
    leave: { type: LeaveInfoSchema },
    documents: { type: [DocumentSchema], default: [] },
  },
  { _id: false },
);