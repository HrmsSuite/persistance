import { Schema, model } from "mongoose";
import { City } from "../types";

const CitySchema = new Schema<City>(
  {
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

CitySchema.index({ name: 1 }, { unique: true });

export const CityModel = model<City>("City", CitySchema);