import { Schema } from "mongoose";
import { Document } from "../types";

export const DocumentSchema = new Schema<Document>(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "Aadhaar",
        "PAN",
        "Experience Letter",
        "Conduct Certificate",
        "Resume",
        "Offer Letter",
        "Passport Photo",
        "Bank Passbook",
      ],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);
