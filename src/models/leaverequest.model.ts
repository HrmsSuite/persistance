import { model } from "mongoose";
import { ILeaveRequest } from "../types";
import { LeaveRequestSchema } from "../schema";

export const LeaveRequestModel = model<ILeaveRequest>("Leaverequest",LeaveRequestSchema);
