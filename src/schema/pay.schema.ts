import { Schema } from "mongoose";

import {
  BankDetails,
  LegalDetails,
  PayrollInfo,
  TaxInfo,
  TaxRegime,
  PayslipPreference,
} from "../types";

const taxRegimes: TaxRegime[] = ["Old", "New"];

const payslipPrefs: PayslipPreference[] = ["Email", "Download", "Both"];

export const BankDetailSchema = new Schema<BankDetails>(
  {
    bankName: {
      type: String,
      required: true,
      trim: true,
    },

    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },

    ifscCode: {
      type: String,
      trim: true,
      uppercase: true,
    },

    branch: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

export const LegalSchema = new Schema<LegalDetails>(
  {
    panNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },

    aadhaarNumber: {
      type: String,
      trim: true,
    },

    uan: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

export const PayrollInfoSchema = new Schema<PayrollInfo>(
  {
    payrollId: {
      type: String,
      trim: true,
    },

    payrollGroupId: {
      type: Schema.Types.ObjectId,
    },

    payslipPreference: {
      type: String,
      enum: payslipPrefs,
    },
  },
  {
    _id: false,
  },
);

export const TaxInfoSchema = new Schema<TaxInfo>(
  {
    taxRegime: {
      type: String,
      enum: taxRegimes,
    },

    taxDeclarationSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);
