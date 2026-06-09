import { model } from "mongoose";
import { AttendanceDailySchema } from "../schema";
import { IAttendanceDaily } from "../types";

export const AttendanceDaily = model<IAttendanceDaily>(
  "AttendanceDaily",
  AttendanceDailySchema,
);
