import { model } from "mongoose";
import { LeaveBalance } from "../types";
import { LeaveBalanceSchema } from "../schema";

export const LeaveBalanceModel = model<LeaveBalance>(
    "LeaveBalance",
    LeaveBalanceSchema
);