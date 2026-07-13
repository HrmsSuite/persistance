import { model } from "mongoose";
import { AttendanceRegularizationPolicySchema } from "../schema";
import { IAttendanceRegularizationPolicy } from "../types";

export const AttendanceRegularizationPolicyModel = model<IAttendanceRegularizationPolicy>(
  "AttendanceEvents",
  AttendanceRegularizationPolicySchema,
);
