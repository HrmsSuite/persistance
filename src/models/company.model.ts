import mongoose from "mongoose";

export interface Company {
  name: string;
  email: string;
  password: string;
}

const companySchema = new mongoose.Schema<Company>(
  {
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
  },
  {
    timestamps: true,
  }
);

export const CompanyModel = mongoose.model<Company>("Company", companySchema);