import mongoose from "mongoose";
import { Company } from "../types";

const companySchema = new mongoose.Schema<Company>(
  {
    //existing
    name: {
      type: String,
      required: true,
      trim: true,
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
      minlength: 6,
    },

    // basic info
    phone: { type: String, trim: true },
    industry: { type: String, trim: true },
    companySize: { type: String, trim: true },
    website: { type: String, trim: true },
    logoUrl: { type: String, trim: true },

    // address
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      postalCode: { type: String, trim: true },
      _id: false,
    },

    //status
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },

    //payroll settings
    payrollSettings: {
      currency: { type: String, default: "INR" },
      payrollCycle: {
        type: String,
        enum: ["Monthly", "Bi-weekly"],
        default: "Monthly",
      },
      payDayOfMonth: { type: Number, min: 1, max: 31 },
      _id: false,
    },

    //leave policy
    leavePolicy: {
      annualLeave: { type: Number, default: 12 },
      sickLeave: { type: Number, default: 6 },
      casualLeave: { type: Number, default: 6 },
      _id: false,
    },

    //working schedule
    workingDays: {
      type: [String],
      default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    workingHours: {
      start: { type: String, default: "09:00" },
      end: { type: String, default: "18:00" },
      _id: false,
    },

    // ── new: meta 
    meta: {
      version: { type: Number, default: 1 },
      isDeleted: { type: Boolean, default: false },
      _id: false,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
companySchema.index({ email: 1 }, { unique: true });
companySchema.index({ "meta.isDeleted": 1 });

export const CompanyModel = mongoose.model<Company>("Company", companySchema);