import { Schema, model } from "mongoose";
import { Department } from "../types";

const DepartmentSchema = new Schema<Department>(
  {
    companyId: {                          
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    data: {
      name: { type: String, required: true, trim: true },
      designation: [{ type: Schema.Types.ObjectId, ref: "Designation" }],
    },
    meta: {
      version: { type: Number, default: 1 },
      isDeleted: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

DepartmentSchema.index({ companyId: 1, "data.name": 1 }, { unique: true });
DepartmentSchema.index({ "meta.isDeleted": 1 });

export const DepartmentModel = model<Department>("Department", DepartmentSchema);