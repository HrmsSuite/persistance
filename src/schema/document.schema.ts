import { Schema } from "mongoose";
import { Document } from "../types";

export const DocumentSchema = new Schema<Document>(
  {
    name: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    uploadedAt: { type: Date, required: true, default: Date.now },
  },
  { _id: false },
);