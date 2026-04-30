import { Schema } from "mongoose";
import { JobDetails, EmploymentType, EmployeeStatus, AttendanceMode } from "../types";

const empType: EmploymentType[] = ["Full-time", "Part-time", "Contract", "Intern"];
const empStatus: EmployeeStatus[] = ["Active", "Inactive", "On Leave", "Terminated"];
const attendanceModes: AttendanceMode[] = ["Manual", "Biometric", "GPS", "Hybrid"];

export const JobDetailSchema = new Schema<JobDetails>(
  {
    // ── existing (unchanged) ──
    designation: { type: Schema.Types.ObjectId, ref: "Designation", required: true },
    department: { type: Schema.Types.ObjectId, ref: "Department", required: true },
    employmentType: { type: String, enum: empType, required: true },
    dateOfJoining: { type: Date, required: true },
    reportingManagerId: { type: Schema.Types.ObjectId, ref: "Employee" },
    workLocation: { type: String, required: true, trim: true },
    employeeStatus: { type: String, enum: empStatus, required: true, default: "Active" },

    // ── new: shift & attendance mapping ──
    shiftId: { type: Schema.Types.ObjectId, ref: "Shift" },
    weeklyOff: { type: [String], default: [] },
    attendanceMode: { type: String, enum: attendanceModes },

    // ── new: exit & final settlement ──
    dateOfExit: { type: Date },
    exitReason: { type: String, trim: true },
    fullAndFinalSettled: { type: Boolean, default: false },
  },
  { _id: false },
);