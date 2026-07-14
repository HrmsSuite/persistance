import { model } from "mongoose";
import { AttendanceRegularizationPolicySchema } from "../schema";
import { IAttendanceRegularizationPolicy } from "../types";

export const attendanceRegularizationPolicyModel =
  model<IAttendanceRegularizationPolicy>(
    "regularizepolicy",
    AttendanceRegularizationPolicySchema,
  );
