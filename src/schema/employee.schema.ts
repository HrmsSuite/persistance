import { Schema } from "mongoose";
import { EmployeeBasic, Gender } from "../types";

const genderEnum: Gender[] = ["Male", "Female", "Other"];

export const EmployeeBasicSchema = new Schema<EmployeeBasic>(
  {
    employeeId: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    gender: { type: String, enum: genderEnum },
    dateOfBirth: { type: Date },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    profilePhotoUrl: { type: String, trim: true },
  },
  { _id: false },
);

// fullName as virtual — no need to store it
EmployeeBasicSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});