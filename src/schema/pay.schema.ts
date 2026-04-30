import { Schema } from "mongoose";
import {
  BankDetails,
  Compensation,
  LegalDetails,
  PayFrequency,
  SalaryStructure,
  PayrollInfo,
  AttendancePolicy,
  TaxInfo,
  TaxRegime,
  PayslipPreference,
} from "../types";

const payFreq: PayFrequency[] = ["Monthly", "Bi-weekly"];
const taxRegimes: TaxRegime[] = ["Old", "New"];
const payslipPrefs: PayslipPreference[] = ["Email", "Download", "Both"];

export const BankDetailSchema = new Schema<BankDetails>(
  {
    bankName: { type: String, required: true, trim: true },
    accountNumber: { type: String, required: true, trim: true },
    ifscCode: { type: String, trim: true, uppercase: true },
    branch: { type: String, trim: true },
  },
  { _id: false },
);

export const LegalSchema = new Schema<LegalDetails>(
  {
    panNumber: { type: String, trim: true, uppercase: true },
    aadhaarNumber: { type: String, trim: true },
    uan: { type: String, trim: true },
  },
  { _id: false },
);

export const SalaryStructureSchema = new Schema<SalaryStructure>(
  {
    basic: { type: Number, required: true, min: 0 },
    hra: { type: Number, required: true, min: 0 },
    allowances: { type: Number, required: true, min: 0 },
    gross: { type: Number, required: true, min: 0 },
    effectiveFrom: { type: Date, required: true },
  },
  { _id: false },
);

export const CompensationSchema = new Schema<Compensation>(
  { 
    salary: { type: Number, required: true, min: 0 },
    payFrequency: { type: String, enum: payFreq, required: true }, 
    salaryStructure: { type: SalaryStructureSchema },
    salaryHistory: { type: [SalaryStructureSchema], default: [] },
  },
  { _id: false },
);

 
export const PayrollInfoSchema = new Schema<PayrollInfo>(
  {
    payrollId: { type: String, trim: true },
    payrollGroupId: { type: Schema.Types.ObjectId, ref: "PayrollGroup" },
    payslipPreference: { type: String, enum: payslipPrefs },
  },
  { _id: false },
);


export const AttendancePolicySchema = new Schema<AttendancePolicy>(
  {
    workingHoursPerDay: { type: Number, min: 0, max: 24 },
    halfDayThreshold: { type: Number, min: 0 },
    overtimeEligible: { type: Boolean, default: false },
  },
  { _id: false },
);

 
export const TaxInfoSchema = new Schema<TaxInfo>(
  {
    taxRegime: { type: String, enum: taxRegimes },
    taxDeclarationSubmitted: { type: Boolean, default: false },
  },
  { _id: false },
);