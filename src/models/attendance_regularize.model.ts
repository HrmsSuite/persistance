import { model } from "mongoose";
import { IAttendanceRegularization } from "../types";
import { AttendanceRegularizationSchema } from "../schema";

export const AttendanceRegularize = model<IAttendanceRegularization>(
  "AttendanceRegularization",
  AttendanceRegularizationSchema,
);
