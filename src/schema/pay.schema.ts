import { Schema } from "mongoose";
import { BankDetails, Compensation, LegalDetails, PayFrequency } from "../types";

const payFreq: PayFrequency[] = ["Monthly", "Bi-weekly"];

export const CompensationSchema = new Schema<Compensation>(
  {
    salary: { type: Number, required: true, min: 0 },
    payFrequency: { type: String, enum: payFreq, required: true },
  },
  { _id: false },
);

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