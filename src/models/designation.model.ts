import { Schema, model } from "mongoose";
import { Designations } from "../types";

const DesignationSchema = new Schema<Designations>(
  {
    data: {
      name: { type: String, required: true, trim: true },
      sortHand: { type: String, trim: true },
      level: { type: Number, min: 0 },
    },
    meta: {
      version: { type: Number, default: 1 },
      isDeleted: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

DesignationSchema.index({ "data.name": 1 }, { unique: true });
DesignationSchema.index({ "data.level": 1 });
DesignationSchema.index({ "meta.isDeleted": 1 });

export const DesignationModel = model<Designations>("Designation", DesignationSchema);