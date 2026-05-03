import mongoose, { Schema } from "mongoose";
import { AccountDetails } from "../types";

const AccountsSchema = new Schema<AccountDetails>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true, 
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    tempPassword: { type: String, default: null },
    isActive: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["employee"],
      default: "employee",
      immutable: true,
    },
    isPasswordChanged: {
      type: Boolean,
      default: false,       
    },
    passwordChangedAt: {
      type: Date,
      default: null,       
    },
    meta: {
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
      },
    },
  },
  { timestamps: true },
);
//index:
AccountsSchema.index({ companyId: 1, employee: 1 });
export const AccountsModel = mongoose.model<AccountDetails>(
  "Accounts",
  AccountsSchema,
);
