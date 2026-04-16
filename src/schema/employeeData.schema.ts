import { Schema } from "mongoose";
import { EmployeeData } from "../types";
import {
  JobDetailSchema,
  CompensationSchema,
  BankDetailSchema,
  LegalSchema,
  AddressSchema,
  LeaveInfoSchema,
  DocumentSchema,
  EmployeeBasicSchema,
} from "./index";

export const EmployeeDataSchema = new Schema<EmployeeData>(
  {
    basic: { type: EmployeeBasicSchema, required: true },
    job: { type: JobDetailSchema, required: true },
    compensation: { type: CompensationSchema, required: true },
    bank: { type: BankDetailSchema },
    legal: { type: LegalSchema },
    address: { type: AddressSchema, required: true },
    leave: { type: LeaveInfoSchema },
    documents: { type: [DocumentSchema], default: [] },
  },
  { _id: false },
);