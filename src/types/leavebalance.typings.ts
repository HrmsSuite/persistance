import { Types } from "mongoose";

export interface LeavePolicy {
    policyId: Types.ObjectId;
    total: number;
    balance: number;
    used: number;
}

export interface LeaveBalance {
    companyId: Types.ObjectId;
    employeeId: Types.ObjectId;
    leave: LeavePolicy[];
    createdAt?: Date;
    updatedAt?: Date;
}