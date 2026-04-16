import { Schema } from "mongoose";
import { LeaveInfo } from "../types";

export const LeaveInfoSchema = new Schema<LeaveInfo>(
  {
    leaveBalance: { type: Number, required: true, default: 0, min: 0 },
    sickLeaveBalance: { type: Number, default: 0, min: 0 },
    casualLeaveBalance: { type: Number, default: 0, min: 0 },
  },
  { _id: false },
);