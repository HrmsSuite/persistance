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