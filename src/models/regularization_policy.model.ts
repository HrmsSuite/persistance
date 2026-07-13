import { model } from "mongoose";
import { AttendanceRegularizationPolicySchema } from "../schema";
import { IAttendanceRegularizationPolicy } from "../types";

export const AttendanceEvents = model<IAttendanceRegularizationPolicy>(
  "AttendanceEvents",
  AttendanceRegularizationPolicySchema,
);
