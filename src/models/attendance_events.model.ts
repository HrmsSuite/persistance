import { model } from "mongoose";
import { AttendanceEventSchema } from "../schema";
import { IAttendanceEvents } from "../types";

export const AttendanceEvents = model<IAttendanceEvents>(
  "AttendanceEvents",
  AttendanceEventSchema,
);
