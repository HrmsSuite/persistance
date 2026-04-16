import { Schema, model } from "mongoose";
import { Banks } from "../types";

const BankSchema = new Schema<Banks>(
  { name: { type: String, required: true, trim: true } },
  { timestamps: true }
);
BankSchema.index({ name: 1 }, { unique: true });
export const BankModel = model<Banks>("Bank", BankSchema);