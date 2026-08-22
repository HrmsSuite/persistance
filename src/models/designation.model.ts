import { Schema, model } from "mongoose";
import { Designations } from "../types";

const DesignationSchema = new Schema<Designations>(
  {
    companyId: {                          
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
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
  { timestamps: true },
);

DesignationSchema.index(
  {
    companyId: 1,
    "data.name": 1,
    "data.sortHand": 1,
    "data.level": 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      "meta.isDeleted": false,
    },
    name: "unique_active_designation",
  },
);
DesignationSchema.index({ "data.level": 1 });
DesignationSchema.index({ "meta.isDeleted": 1 });

export const DesignationModel = model<Designations>(
  "Designation",
  DesignationSchema,
);
