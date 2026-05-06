import { model } from "mongoose";
import { CalendarEventSchema } from "../schema";
import { ICalendarEvent } from "../types";
export const CalendarEventModel = model<ICalendarEvent>("CalendarEvent",CalendarEventSchema);