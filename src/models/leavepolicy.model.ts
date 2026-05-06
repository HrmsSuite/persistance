import { model } from "mongoose";
import { LeavePolicySchema } from "../schema";
import { ILeavePolicy } from "../types";

export const LeavePolicyModel = model<ILeavePolicy>("Leavepolicy",LeavePolicySchema);