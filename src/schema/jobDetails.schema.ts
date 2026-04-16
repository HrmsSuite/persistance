import { Schema, Types } from "mongoose";
import { JobDetails, EmploymentType, EmployeeStatus } from "../types";

const empType: EmploymentType[] = ["Full-time", "Part-time", "Contract", "Intern"];
const empStatus: EmployeeStatus[] = ["Active", "Inactive", "On Leave", "Terminated"];

export const JobDetailSchema = new Schema<JobDetails>(
  {
    designation: { type: Schema.Types.ObjectId, ref: "Designation", required: true },
    department: { type: Schema.Types.ObjectId, ref: "Department", required: true },
    employmentType: { type: String, enum: empType, required: true },
    dateOfJoining: { type: Date, required: true },
    reportingManagerId: { type: Schema.Types.ObjectId, ref: "Employee" },
    workLocation: { type: String, required: true, trim: true },
    employeeStatus: { type: String, enum: empStatus, required: true, default: "Active" },
  },
  { _id: false },
);