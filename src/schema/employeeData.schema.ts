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
    basic: EmployeeBasicSchema,
    job: JobDetailSchema,
    compensation: CompensationSchema,
    bank: BankDetailSchema,
    legal: LegalSchema,
    address: AddressSchema,
    leave: LeaveInfoSchema,
    documents: [DocumentSchema],
  },
  { _id: false },
);